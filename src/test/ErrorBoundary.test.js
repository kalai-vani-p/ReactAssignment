import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";

// Component that throws error
const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // error logs
  });

  afterEach(() => {
    jest.restoreAllMocks(); // restore after test
  });

  test("renders fallback UI on error", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});