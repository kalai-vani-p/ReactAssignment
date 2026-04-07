describe("logger", () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;

    jest.resetModules(); // 🔥 VERY IMPORTANT
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  test("error logs outside test env", () => {
    process.env.NODE_ENV = "development";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // 🔥 re-import AFTER env change
    const { logger } = require("../utils/logger");

    logger.error("error");

    expect(consoleSpy).toHaveBeenCalled();
  });

  test("does NOT log in test env", () => {
    process.env.NODE_ENV = "test";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { logger } = require("../utils/logger");

    logger.error("error");

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});