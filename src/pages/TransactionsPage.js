import CommonTable from "../components/CommonTable";
import useTransactions from "../hooks/useTransactions";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
/**
 * Page component to display transactions and reward data
 * @component
 * @returns {JSX.Element} Rendered transactions page with table
 */
const TransactionsPage = () => {
  const { data, monthlyData, totalData, loading, error } = useTransactions();

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} />;

  const tabs = [
    {
      label: "Transactions",
      data,
      columns: [
        { field: "transactionId", header: "Transaction ID" },
        { field: "customerId", header: "Customer ID" },
        { field: "customerName", header: "Customer Name" },
        { field: "date", header: "Purchase Date" }, // (also missing before)
        { field: "product", header: "Product" },
        { field: "price", header: "Price" },
        { field: "points", header: "Reward Points" },
      ],
    },
    {
      label: "Monthly Rewards",
      data: monthlyData,
      columns: [
        { field: "customerId", header: "Customer ID" },
        { field: "customerName", header: "Customer Name" },
        { field: "month", header: "Month" },
        { field: "year", header: "Year" },
        { field: "points", header: "Reward Points" },
      ],
    },
    {
      label: "Total Rewards",
      data: totalData,
      columns: [
        { field: "customerId", header: "Customer ID" }, 
        { field: "customerName", header: "Customer Name" },
        { field: "points", header: "Reward Points" },
      ],
    },
  ];

  return <CommonTable tabs={tabs} />;
};

export default TransactionsPage;