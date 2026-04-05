import { logger } from "./logger";

/**
 * Calculate reward points based on transaction amount
 * @param {number} amount
 * @returns {number}
 */
export const calculatePoints = (amount) => {
  try {
    const numericAmount = Number(amount);

    // Validate input
    if (!Number.isFinite(numericAmount) || numericAmount <= 50) {
      return 0;
    }

    let rewardPoints = 0;

    if (numericAmount > 100) {
      rewardPoints += (numericAmount - 100) * 2;
      rewardPoints += 50;
    } else {
      rewardPoints += numericAmount - 50;
    }

    const finalPoints = Math.floor(rewardPoints);

    logger.debug("Calculated points:", {
      amount: numericAmount,
      points: finalPoints,
    });

    return finalPoints;
  } catch (error) {
    logger.error("Error calculating points", error);
    return 0;
  }
};

/**
 * Safely parse date and return structured values
 */
const getMonthYear = (dateValue) => {
  const date = new Date(dateValue);

  if (isNaN(date)) {
    return null;
  }

  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: date.getFullYear(),
  };
};

/**
 * Group transactions by customer + month
 * @param {Array} data
 * @returns {Array}
 */
export const groupByMonths = (data = []) => {
  try {
    const result = data.reduce((acc, item) => {
      const dateInfo = getMonthYear(item?.date);

      if (!dateInfo || !item?.customerId) {
        return acc;
      }

      const key = `${item.customerId}-${dateInfo.year}-${dateInfo.month}`;

      if (!acc[key]) {
        acc[key] = {
          customerId: item.customerId,
          customerName: item.customerName,
          month: dateInfo.month,
          year: dateInfo.year,
          points: 0,
        };
      }

      acc[key].points += Number(item.points) || 0;

      return acc;
    }, {});

    // Ensure consistent order
    return Object.values(result).sort(
      (a, b) =>
        a.customerId - b.customerId ||
        a.year - b.year ||
        a.month.localeCompare(b.month)
    );
  } catch (error) {
    logger.error("Error grouping by months", error);
    return [];
  }
};

/**
 * Group total points by customer
 * @param {Array} data
 * @returns {Array}
 */
export const groupByTotal = (data = []) => {
  try {
    const result = data.reduce((acc, item) => {
      if (!item?.customerId) return acc;

      if (!acc[item.customerId]) {
        acc[item.customerId] = {
          customerId: item.customerId,
          customerName: item.customerName,
          points: 0,
        };
      }

      acc[item.customerId].points += Number(item.points) || 0;

      return acc;
    }, {});

    // Ensure consistent order
    return Object.values(result).sort(
      (a, b) => a.customerId - b.customerId
    );
  } catch (error) {
    logger.error("Error grouping totals", error);
    return [];
  }
};