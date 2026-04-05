import { groupByTotal } from "../utils/rewardOperations";
import { transactions } from "../sampleData/Transactions";

test("groupByTotal aggregates correctly", () => {
  const testData = transactions.slice(0, 5).map(item => ({
    ...item,
    points: 100, // ensure points exist
  }));

  const result = groupByTotal(testData);

  const expectedPoints = testData.reduce((sum, item) => sum + item.points, 0);

  const totalPoints = result.reduce((sum, item) => sum + item.points, 0);

  expect(totalPoints).toBe(expectedPoints);
});