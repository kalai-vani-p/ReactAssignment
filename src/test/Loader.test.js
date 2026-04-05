import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader";

test("renders loader text", () => {
  render(<Loader />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});