import { render, screen, fireEvent } from "@testing-library/react";
import CommonTable from "../components/CommonTable";
import { transactions } from "../sampleData/Transactions";

const mockTabs = [
  {
    label: "Transactions",
    data: transactions.slice(0, 5),
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
    data: [],
    columns: [],
  },
  {
    label: "Total Rewards",
    data: [],
    columns: [],
  },
];

describe("CommonTable", () => {
  test("renders table data", () => {
    render(<CommonTable tabs={mockTabs} />);

    expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
  });

  test("search works", () => {
    render(<CommonTable tabs={mockTabs} />);

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "USB" } });

    expect(screen.getByText(/USB/i)).toBeInTheDocument();
  });

  test("no data found case", () => {
    render(<CommonTable tabs={mockTabs} />);

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "ZZZZ" } });

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});