import { renderHook, waitFor } from "@testing-library/react";
import useTransactionsHook from "../customHooks/useTransactionshook";
import * as api from "../apis/api";
import { transactions as mockTransactions } from "../sampleData/Transactions";

describe("useTransactionsHook", () => {
  // Mock the API before each test
  beforeEach(() => {
    jest.spyOn(api, "fetchTransactionData").mockResolvedValue(mockTransactions);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  test("fetches and processes data successfully", async () => {
    const { result } = renderHook(() => useTransactionsHook());

    // Wait for loading to finish
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert main data
    expect(result.current.data.length).toBe(mockTransactions.length);
    expect(result.current.data[0]).toHaveProperty("points");

    // Assert monthly and total data
    expect(result.current.monthlyData.length).toBeGreaterThan(0);
    expect(result.current.totalData.length).toBeGreaterThan(0);

    // No error
    expect(result.current.error).toBeNull();
  });

  test("handles API failure", async () => {
    // Mock rejection
    api.fetchTransactionData.mockRejectedValueOnce("API error");

    const { result } = renderHook(() => useTransactionsHook());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Data should be empty
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Failed to load data");
  });
});