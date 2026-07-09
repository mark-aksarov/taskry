import { ToggleButton } from "./ToggleButton";
import { describe, expect, test } from "vitest";
import { render } from "@/lib/test-utils/customRender";
import { screen } from "@testing-library/react";
import { ToggleButtonGroup } from "./ToggleButtonGroup";
import { ToggleButtonGroupProps } from "react-aria-components";

const TestToggleButtonGroup = (props: ToggleButtonGroupProps) => (
  <ToggleButtonGroup {...props}>
    <ToggleButton id="apple">Apple</ToggleButton>
    <ToggleButton id="banana">Banana</ToggleButton>
    <ToggleButton id="oranges">Oranges</ToggleButton>
  </ToggleButtonGroup>
);

describe("ToggleButtonGroup", () => {
  test("renders with default props", () => {
    render(<TestToggleButtonGroup />);

    const buttonGroup = screen.getByRole("radiogroup");
    expect(buttonGroup).toBeInTheDocument();
  });

  test("applies selected styles", () => {
    render(<TestToggleButtonGroup selectedKeys={["apple"]} />);

    const button = screen.getByRole("radio", { name: "Apple" });
    expect(button).toHaveClass("bg-(--accent)");
  });

  test("applies non-selected styles", () => {
    render(<TestToggleButtonGroup selectedKeys={["apple"]} />);

    const button = screen.getByRole("radio", { name: "Banana" });
    expect(button).toHaveClass("hover:bg-(--surface-secondary-hover)");
  });

  test("applies disabled styles", () => {
    render(<TestToggleButtonGroup isDisabled />);

    const button = screen.getByRole("radio", { name: "Apple" });
    expect(button).toHaveClass("bg-gray-200 dark:bg-gray-800");
  });
});
