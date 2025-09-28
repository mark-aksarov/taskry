import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Button, ButtonSize, ButtonVariant } from "./Button";

describe("Button", () => {
  test("renders with default props", () => {
    render(<Button label="Button" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600 px-3 py-2");
  });

  test("renders as an <a> element when 'as' is 'a'", () => {
    render(<Button as="a" href="https://example.com" />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test.each<[ButtonVariant, string]>([
    ["primary", "hover:bg-blue-500"],
    ["secondary", "hover:bg-blue-200"],
    ["ghost", "hover:bg-gray-200"],
    ["outlined", "hover:bg-gray-200"],
    ["contrast", "hover:bg-gray-900"],
  ])("applies '%s' variant styles", (variant, expectedClass) => {
    render(<Button label="Button" variant={variant} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(expectedClass);
  });

  test.each<[ButtonVariant, boolean, string]>([
    ["primary", true, "bg-gray-100"],
    ["ghost", true, "text-gray-400"],
    ["primary", false, "bg-blue-600"],
    ["secondary", false, "bg-blue-50"],
    ["outlined", false, "border border-gray-300"],
    ["contrast", false, "bg-black"],
    ["ghost", false, "text-black"],
  ])(
    "applies compound styles for variant=%s disabled=%s",
    (variant, isDisabled, expectedClass) => {
      render(
        <Button label="Button" variant={variant} isDisabled={isDisabled} />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    },
  );

  test.each<[ButtonSize, boolean, string]>([
    ["small", true, "p-2"],
    ["medium", true, "p-3"],
    ["large", true, "p-4"],

    ["small", false, "px-3 py-2"],
    ["medium", false, "px-5 py-3"],
    ["large", false, "px-6 py-4"],
  ])("applies '%s' size styles", (size, iconButton, expectedClass) => {
    render(
      <Button
        label={iconButton ? undefined : "Button"}
        iconLeft={iconButton ? <svg /> : undefined}
        size={size}
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(expectedClass);
  });

  test.each<[ButtonVariant, ButtonSize, boolean, boolean, string]>([
    ["outlined", "small", true, true, "p-2"],
    ["outlined", "medium", true, true, "p-3"],
    ["outlined", "large", true, true, "p-4"],

    ["outlined", "small", true, false, "px-3 py-2"],
    ["outlined", "medium", true, false, "px-5 py-3"],
    ["outlined", "large", true, false, "px-6 py-4"],

    ["outlined", "small", false, true, "p-[calc(var(--spacing)*2-1px)]"],
    ["outlined", "medium", false, true, "p-[calc(var(--spacing)*3-1px)]"],
    ["outlined", "large", false, true, "p-[calc(var(--spacing)*4-1px)]"],

    [
      "outlined",
      "small",
      false,
      false,
      "px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*2-1px)]",
    ],
    [
      "outlined",
      "medium",
      false,
      false,
      "px-[calc(var(--spacing)*5-1px)] py-[calc(var(--spacing)*3-1px)]",
    ],
    [
      "outlined",
      "large",
      false,
      false,
      "px-[calc(var(--spacing)*6-1px)] py-[calc(var(--spacing)*4-1px)]",
    ],
  ])(
    "applies compound styles for variant=%s size=%s disabled=%s iconButton=%s",
    (variant, size, isDisabled, iconButton, expectedClass) => {
      render(
        <Button
          label={iconButton ? undefined : "Button"}
          iconLeft={iconButton ? <svg /> : undefined}
          variant={variant}
          size={size}
          isDisabled={isDisabled}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    },
  );

  test("renders with left and right icons", () => {
    const LeftIcon = <svg data-testid="left-icon" />;
    const RightIcon = <svg data-testid="right-icon" />;

    const { getByTestId } = render(
      <Button label="Button" iconLeft={LeftIcon} iconRight={RightIcon} />,
    );

    expect(getByTestId("left-icon")).toBeInTheDocument();
    expect(getByTestId("right-icon")).toBeInTheDocument();
  });

  test("should apply the given className", () => {
    render(<Button label="Button" className="custom-class" />);

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  test("should apply the given inline styles", () => {
    render(<Button label="Button" style={{ color: "rgb(255, 0, 0)" }} />);

    expect(screen.getByRole("button")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(<Button ref={ref} label="Button" />);
    const button = screen.getByRole("button");

    expect(ref.current).toBe(button);
  });

  test("should trigger onPress handler", async () => {
    const handlePress = jest.fn();

    render(<Button label="Button" onPress={handlePress} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
