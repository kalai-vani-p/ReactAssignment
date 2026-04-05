import { fetchTransactionData } from "../apis/api";

test("fetchTransactionData resolves data", async () => {
  const data = await fetchTransactionData();
  expect(data.length).toBeGreaterThan(0);
});