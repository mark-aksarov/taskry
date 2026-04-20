import React from "react";
import { Link } from "./Link";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Link", () => {
  test("renders with default props", () => {
    render(<Link href="https://example.com">Link</Link>);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("applies className", () => {
    render(<Link href="https://example.com" className="custom-class" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(<Link href="https://example.com" ref={ref} />);

    const link = screen.getByRole("link");
    expect(link).toBe(ref.current);
  });
});
