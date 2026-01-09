import { describe, expect, test } from "vitest";
import { ProgressBar } from "./ProgressBar";
import { render, screen } from "@testing-library/react";

describe("ProgressBar", () => {
  test("renders only label when showValueText is false", () => {
    render(<ProgressBar label="Label" showValueText={false} value={40} />);

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.queryByText("40%")).not.toBeInTheDocument();
  });

  test("renders only value text when label is not provided but showValueText is true", () => {
    render(<ProgressBar aria-label="Label" value={70} />);

    expect(screen.queryByText("Label")).not.toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  test("renders nothing when neither label nor showValueText are provided", () => {
    render(<ProgressBar showValueText={false} aria-label="Label" value={20} />);

    expect(screen.queryByText("20%")).not.toBeInTheDocument();
    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });

  test("renders both label and value text when both are provided", () => {
    render(<ProgressBar label="Label" showValueText value={50} />);

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
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
