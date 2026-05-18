import React from "react";
import { Checkbox } from "./Checkbox";
import { render } from "@/lib/utils/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Checkbox", () => {
  test("renders with default props", () => {
    render(<Checkbox>Checkbox</Checkbox>);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("applies disabled styles", () => {
    render(
      <Checkbox isDisabled data-testid="label">
        Checkbox
      </Checkbox>,
    );

    const label = screen.getByTestId("label");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(label).toHaveClass("text-(--text-disabled)");
  });

  test("applies selected styles", () => {
    render(
      <Checkbox isSelected data-testid="label">
        Checkbox
      </Checkbox>,
    );

    const box = screen.getByTestId("label").querySelector("div");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    expect(box).toHaveClass("bg-(--accent)");
  });

  test("should apply the given className", () => {
    render(
      <Checkbox className="custom-class" data-testid="label">
        Checkbox
      </Checkbox>,
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(
      <Checkbox ref={ref} data-testid="label">
        Checkbox
      </Checkbox>,
    );
    const label = screen.getByTestId("label");
    expect(label).toBe(ref.current);
  });

  test("should trigger onChange handler", async () => {
    const onChange = vi.fn();

    render(
      <Checkbox onChange={onChange} data-testid="label">
        Checkbox
      </Checkbox>,
    );
    const user = userEvent.setup();

    const label = screen.getByTestId("label");
    await user.click(label);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
