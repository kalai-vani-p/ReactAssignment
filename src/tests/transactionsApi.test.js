import { fetchTransactions } from "../api/transactionsApi";

describe("fetchTransactions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("success case", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const data = await fetchTransactions();
    expect(data.length).toBe(1);
  });

  test("handles API failure", async () => {
    fetch.mockResolvedValue({ ok: false });

    await expect(fetchTransactions()).rejects.toThrow();
  });

  test("invalid JSON format", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => null,
    });

    await expect(fetchTransactions()).rejects.toThrow();
  });
});