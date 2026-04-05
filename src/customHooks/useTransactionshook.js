import { useEffect, useMemo, useState } from "react";
import { fetchTransactionData } from "../apis/api";
import { calculatePoints, groupByMonths, groupByTotal } from "../utils/rewardOperations";
import { logger } from "../utils/logger";
/**
 * Custom hook to fetch transactions and calculate reward points.
 * Returns:
 *   - data: array of transactions with points
 *   - monthlyData: grouped by month per customer
 *   - totalData: total points per customer
 *   - loading: boolean
 *   - error: string|null
 */
const useTransactionshook = () => {
  const [state, setState] = useState({data: [], loading: true, error: null});

  useEffect(() => {
    (async () => {
      try {
        logger.info("Fetching transaction data...");
        const res = await fetchTransactionData();
        // each transaction with calculated reward points
        const dataWithPoints = res.map((i) => ({
          ...i,
          points: calculatePoints(i.price),
        }));

        // setState now happens in one line with precomputed data
        setState({ data: dataWithPoints, loading: false, error: null });
      } catch(e) {
        logger.error("Failed to load transactions:", e);
        setState({ data: [], loading: false, error: "Failed to load data" });
      }
    })();
  }, []);
  // Memoized monthly data to avoid recalculation on re-renders
  const monthlyData = useMemo(() => {
    logger.debug("Calculating monthly data");
    return Array.isArray(state.data) ? groupByMonths(state.data) : [];
  }, [state.data]);

  // Memoized total points per customer
  const totalData = useMemo(() => {
    logger.debug("Calculating total data");
    return Array.isArray(state.data) ? groupByTotal(state.data) : [];
  }, [state.data]);


  return { ...state, monthlyData, totalData };
};

export default useTransactionshook;