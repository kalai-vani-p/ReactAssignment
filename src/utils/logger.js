// centralized logger utility
const isDev = process.env.NODE_ENV !== "production";
const isTest = process.env.NODE_ENV === "test";

export const logger = {
  info: (...args) => {
    if (isDev && !isTest) console.log("[INFO]:", ...args);
  },

  warn: (...args) => {
    if (isDev && !isTest) console.warn("[WARN]:", ...args);
  },

  error: (...args) => {
    if (!isTest) console.error("[ERROR]:", ...args); // Always log errors
  },

  debug: (...args) => {
    if (isDev && !isTest) console.debug("[DEBUG]:", ...args);
  },
};