import React from "react";
import { Switch } from "./Switch";
import { render } from "@/lib/test-utils/customRender";
import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Switch", () => {
  const defaultProps = {
    children: "Switch Label",
    "data-testid": "label",
  };

  test("renders with default props and label", () => {
    render(<Switch {...defaultProps} />);

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).not.toBeChecked();
  });

  test("applies disabled styles when disabled prop is true", () => {
    render(<Switch {...defaultProps} isDisabled />);

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    const label = screen.getByTestId("label");

    expect(switchEl).toBeDisabled();

    expect(label).toHaveClass("disabled:text-(--text-disabled)");
  });

  test("applies selected styles when isSelected prop is true", () => {
    render(<Switch {...defaultProps} isSelected />);

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    const trackSpan = screen.getByTestId("switch-track");

    expect(switchEl).toBeChecked();

    expect(trackSpan).toHaveClass("bg-(--accent)");
  });

  test("should apply the given className to the label", () => {
    render(<Switch {...defaultProps} className="custom-class" />);

    const label = screen.getByTestId("label");
    expect(label).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component's label element", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(
      <Switch ref={ref} data-testid="label">
        Switch
      </Switch>,
    );
    const label = screen.getByTestId("label");
    expect(label).toBe(ref.current);
  });

  test("should trigger onChange handler on click", async () => {
    const onChange = vi.fn();
    render(<Switch {...defaultProps} onChange={onChange} />);
    const user = userEvent.setup();

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    await user.click(switchEl);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
