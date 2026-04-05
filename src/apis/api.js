import { transactions } from "../sampleData/Transactions";
import { logger } from "../utils/logger";
// Simulates an API call to fetch transaction data
export const fetchTransactionData = async () => {
    try {
        const isValidData =
            Array.isArray(transactions) && transactions.length > 0;

        if (isValidData) {
            logger.info("Transaction data fetched successfully", {
                count: transactions.length
            });

            return transactions; // resolves automatically
        }

        const errorMessage = "No transaction data found";

        logger.error(errorMessage, {
            receivedData: transactions
        });

        throw new Error(errorMessage); // triggers .catch()
    } catch (error) {
        logger.error("Unexpected error while fetching transactions", error);

        throw new Error("Failed to fetch transaction data");
    }
};
