import Loader from "./components/Loader";
import useTransactionsHook from "./customHooks/useTransactionshook";
import CommonTable from "../src/components/CommonTable";
import { logger } from "./utils/logger";

const DEFAULT_EMPTY_ARRAY = [];
const CONTAINER_STYLE = { padding: "20px" };

const App = () => {
  const {
    data = DEFAULT_EMPTY_ARRAY,
    monthlyData = DEFAULT_EMPTY_ARRAY,
    totalData = DEFAULT_EMPTY_ARRAY,
    loading,
    error
  } = useTransactionsHook();

  if (loading) return <Loader />;

  if (error) {
    logger.error("App Error:", error);
    return <div>{error?.message || "Something went wrong"}</div>;
  }

  // Ensure consistent order (latest first if date exists)
  const sortedData = [...data].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const tabs = [
    {
      label: "Transactions",
      data: sortedData,
      columns: [
        { field: "transactionId", header: "Transaction ID" },
        { field: "customerId", header: "Customer ID" },
        { field: "customerName", header: "Customer Name" },
        { field: "date", header: "Purchase Date" },
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

  return (
    <div style={CONTAINER_STYLE}>
      <CommonTable tabs={tabs} />
    </div>
  );
};
export default App;


