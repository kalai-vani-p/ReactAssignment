// centralized logger utility
const isDev = process.env.NODE_ENV !== "production";
const isTest = process.env.NODE_ENV === "test";
/**
 * Logger utility for consistent logging across the application
 * - Logs are enabled based on environment
 * - Suppresses logs during testing
 */
export const logger = {
  info: (...args) => {
    if (isDev && !isTest) console.log("[INFO]:", ...args);
  },
/**
 * Log warning messages (development only)
 * @param {...any} args - Data to log
 */
  warn: (...args) => {
    if (isDev && !isTest) console.warn("[WARN]:", ...args);
  },
/**
   * Log error messages (always except test environment)
   * @param {...any} args - Error details to log
   */
  error: (...args) => {
    if (!isTest) console.error("[ERROR]:", ...args); // Always log errors
  },
 /**
   * Log debug messages (development only)
   * @param {...any} args - Debug data
   */
  debug: (...args) => {
    if (isDev && !isTest) console.debug("[DEBUG]:", ...args);
  },
};