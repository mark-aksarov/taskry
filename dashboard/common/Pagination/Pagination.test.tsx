import React from "react";
import { Pagination, createPageArray } from "./Pagination";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/utils/test-utils";

describe("Pagination Logic (createPageArray)", () => {
  it("should return all pages if totalPages is 7 or less", () => {
    expect(createPageArray(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(createPageArray(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should show ellipsis at the end when current page is at the start (page <= 4)", () => {
    const result = createPageArray(3, 10);
    expect(result).toEqual([1, 2, 3, 4, 5, "...", 10]);
  });

  it("should show ellipsis at the start when current page is at the end", () => {
    const result = createPageArray(8, 10);
    expect(result).toEqual([1, "...", 6, 7, 8, 9, 10]);
  });

  it("should show ellipsis on both sides when page is in the middle", () => {
    const result = createPageArray(6, 12);
    expect(result).toEqual([1, "...", 5, 6, 7, "...", 12]);
  });
});

describe("Pagination Component", () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    page: 1,
    totalPages: 10,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("disables the 'Previous' button on the first page", () => {
    render(<Pagination {...defaultProps} page={1} />);
    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];

    expect(prevButton).toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    render(<Pagination {...defaultProps} page={10} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[buttons.length - 1];

    expect(nextButton).toBeDisabled();
  });

  it("calls onChange with the correct page number when a page button is clicked", () => {
    render(<Pagination {...defaultProps} page={5} />);

    const pageSix = screen.getByText("6");
    fireEvent.click(pageSix);

    expect(mockOnChange).toHaveBeenCalledWith(6);
  });

  it("calls onChange when navigation arrows are clicked", () => {
    render(<Pagination {...defaultProps} page={5} />);

    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    const nextButton = buttons[buttons.length - 1];

    fireEvent.click(prevButton);
    expect(mockOnChange).toHaveBeenCalledWith(4);

    fireEvent.click(nextButton);
    expect(mockOnChange).toHaveBeenCalledWith(6);
  });

  it("does not call onChange when the current (active) page is clicked", () => {
    render(<Pagination {...defaultProps} page={1} />);

    const pageOne = screen.getByText("1");
    fireEvent.click(pageOne);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("hides page numbers when showPageItems is false", () => {
    render(<Pagination {...defaultProps} showPageItems={false} />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("10")).not.toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("applies correct tailwind gap classes based on the size prop", () => {
    const { container: smallContainer, rerender } = render(
      <Pagination {...defaultProps} size="small" />,
    );
    expect(smallContainer.firstChild).toHaveClass("gap-1.5");

    rerender(<Pagination {...defaultProps} size="large" />);
    expect(smallContainer.firstChild).toHaveClass("gap-2");
  });

  it("forwards custom className to the wrapper", () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-test-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-test-class");
  });
});
