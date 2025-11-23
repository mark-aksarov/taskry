import React from "react";
import "@testing-library/jest-dom";
import { Switch } from "./Switch";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

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

    expect(label).toHaveClass(
      "disabled:text-gray-400 dark:disabled:text-gray-500",
    );
  });

  test("applies selected styles when checked prop is true", () => {
    render(<Switch {...defaultProps} isSelected />);

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    const trackDiv = screen.getByTestId("label").querySelector("div");

    expect(switchEl).toBeChecked();

    expect(trackDiv).toHaveClass("bg-blue-600 dark:bg-blue-700");
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
    const onChange = jest.fn();
    render(<Switch {...defaultProps} onChange={onChange} />);
    const user = userEvent.setup();

    const switchEl = screen.getByRole("switch", { name: "Switch Label" });
    await user.click(switchEl);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
