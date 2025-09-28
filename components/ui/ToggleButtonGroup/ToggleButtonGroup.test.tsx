import "@testing-library/jest-dom";
import { ToggleButton } from "./ToggleButton";
import { render, screen } from "@testing-library/react";
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
    expect(button).toHaveClass("bg-blue-600 dark:bg-blue-700");
  });

  test("applies non-selected styles", () => {
    render(<TestToggleButtonGroup selectedKeys={["apple"]} />);

    const button = screen.getByRole("radio", { name: "Banana" });
    expect(button).toHaveClass("hover:bg-gray-100 dark:hover:bg-gray-600");
  });

  test("applies disabled styles", () => {
    render(<TestToggleButtonGroup isDisabled />);

    const button = screen.getByRole("radio", { name: "Apple" });
    expect(button).toHaveClass("bg-gray-100 dark:bg-gray-800");
  });
});
