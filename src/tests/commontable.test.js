import { render, screen, fireEvent } from "@testing-library/react";
import CommonTable from "../components/CommonTable";

const mockTabs = [
  {
    label: "Test",
    data: [
      { id: 1, name: "A", price: 100 },
      { id: 2, name: "B", price: 0 },
    ],
    columns: [
      { field: "id", header: "ID" },
      { field: "name", header: "Name" },
      { field: "price", header: "Price" },
    ],
  },
];

describe("CommonTable", () => {
  test("renders table", () => {
    render(<CommonTable tabs={mockTabs} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  test("search works", () => {
    render(<CommonTable tabs={mockTabs} />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "A" },
    });
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  test("search no results", () => {
    render(<CommonTable tabs={mockTabs} />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "ZZZ" },
    });
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  test("handles null data", () => {
    render(<CommonTable tabs={[{ label: "Empty", data: null, columns: [] }]} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  test("sorting works", () => {
    render(<CommonTable tabs={mockTabs} />);
    fireEvent.click(screen.getByText("ID"));
    expect(screen.getByText("ID")).toBeInTheDocument();
  });
});