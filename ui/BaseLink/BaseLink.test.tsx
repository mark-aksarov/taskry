import React from "react";
import { BaseLink } from "./BaseLink";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

describe("BaseLink", () => {
  test("renders with default props", () => {
    render(<BaseLink href="https://example.com">BaseLink</BaseLink>);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("applies className", () => {
    render(<BaseLink href="https://example.com" className="custom-class" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });
});
