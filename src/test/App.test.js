import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import * as api from "../apis/api";
import { transactions as mockTransactions } from "./TestData";

//  Mock the API before each test
beforeEach(() => {
  jest.spyOn(api, "fetchTransactionData").mockResolvedValue(mockTransactions);
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

test("renders transactions table after loading", async () => {
  render(<App />);

  // Loading indicator should be visible first
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the data to render
  await waitFor(() => {
    expect(screen.getByText("David Lee")).toBeInTheDocument();
    expect(screen.getByText("USB Cable")).toBeInTheDocument();
  });

  // Optional: check error is not shown
  expect(screen.queryByText("Failed to load data")).not.toBeInTheDocument();
});