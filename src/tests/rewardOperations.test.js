import {
  calculatePoints,
  groupByMonths,
  groupByTotal,
} from "../utils/rewardOperations";

describe("calculatePoints", () => {
  test("normal case", () => {
    expect(calculatePoints(120)).toBeGreaterThan(0);
  });

  test("zero", () => {
    expect(calculatePoints(0)).toBe(0);
  });

  test("negative", () => {
    expect(calculatePoints(-100)).toBe(0);
  });

  test("null", () => {
    expect(calculatePoints(null)).toBe(0);
  });

  test("string", () => {
    expect(calculatePoints("abc")).toBe(0);
  });
});

describe("groupByMonths", () => {
  test("groups correctly", () => {
    const data = [
      { customerId: "1", date: "2024-01-01", points: 10 },
    ];
    expect(groupByMonths(data).length).toBe(1);
  });

  test("handles invalid date", () => {
    const data = [{ customerId: "1", date: "invalid", points: 10 }];
    expect(groupByMonths(data).length).toBe(0);
  });

  test("handles empty", () => {
    expect(groupByMonths([])).toEqual([]);
  });
});

describe("groupByTotal", () => {
  test("groups total", () => {
    const data = [
      { customerId: "1", points: 10 },
      { customerId: "1", points: 20 },
    ];
    expect(groupByTotal(data)[0].points).toBe(30);
  });

  test("handles null", () => {
    expect(groupByTotal([])).toEqual([]);
  });
});