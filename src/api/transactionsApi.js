import { logger } from "../utils/logger";

const API_URL = "/transactions.json";
/**
 * Fetch transaction data from API endpoint
 * @async
 * @function fetchTransactions
 * @returns {Promise<Array>} Resolves with an array of transaction objects
 * @throws {Error} Throws error if API request fails or data format is invalid
 */
export const fetchTransactions = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    logger.error("API failed", response.status);
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid data format");
  }

  logger.info("Transactions fetched", { count: data.length });

  return data;
};