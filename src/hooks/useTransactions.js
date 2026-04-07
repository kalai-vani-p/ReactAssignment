import { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "../api/transactionsApi";
import {
  calculatePoints,
  groupByMonths,
  groupByTotal,
} from "../utils/rewardOperations";
/**
 * Custom hook to fetch transactions and compute reward data
 * @hook
 * @returns {Object} state and processed data
 * @returns {Array<Object>} returns.data - Transactions with reward points
 * @returns {boolean} returns.loading - Loading state
 * @returns {string|null} returns.error - Error message if fetch fails
 * @returns {Array<Object>} returns.monthlyData - Grouped monthly reward data
 * @returns {Array<Object>} returns.totalData - Total reward points per customer
 */
const useTransactions = () => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchTransactions()
      .then((res) => {
        const enriched = res.map((t) => ({
          ...t,
          points: calculatePoints(t.price),
        }));

        setState({ data: enriched, loading: false, error: null });
      })
      .catch(() => {
        setState({ data: [], loading: false, error: "Failed to load data" });
      });
  }, []);

  const monthlyData = useMemo(() => groupByMonths(state.data), [state.data]);
  const totalData = useMemo(() => groupByTotal(state.data), [state.data]);

  return { ...state, monthlyData, totalData };
};

export default useTransactions;