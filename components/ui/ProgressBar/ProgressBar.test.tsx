import "@testing-library/jest-dom";
import { ProgressBar } from "./ProgressBar";
import { render, screen } from "@testing-library/react";

describe("ProgressBar", () => {
  test("renders with label and value", () => {
    render(<ProgressBar label="Label" />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const label = screen.getByText("Label");
    expect(label).toBeInTheDocument();

    const value = screen.getByText("0%");
    expect(value).toBeInTheDocument();
  });

  test("renders red fill when percentage is less than 33", () => {
    render(<ProgressBar label="Label" value={30} />);

    const fill = screen.getByTestId("progressbar-fill");
    expect(fill).toHaveClass("bg-red-500 dark:bg-red-700");
  });

  test("renders red fill when percentage is less than 66", () => {
    render(<ProgressBar label="Label" value={60} />);

    const fill = screen.getByTestId("progressbar-fill");
    expect(fill).toHaveClass("bg-orange-400 dark:bg-orange-600");
  });

  test("renders green fill when percentage is greater than 66", () => {
    render(<ProgressBar label="Label" value={90} />);

    const fill = screen.getByTestId("progressbar-fill");
    expect(fill).toHaveClass("bg-green-600 dark:bg-green-700");
  });

  test("applies className", () => {
    render(<ProgressBar label="Label" className="custom-class" />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveClass("custom-class");
  });
});
