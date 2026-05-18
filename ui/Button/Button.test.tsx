import React from "react";
import { Button } from "./Button";
import { render } from "@/lib/utils/test-utils";
import { screen } from "@testing-library/react";
import { ButtonSize, ButtonVariant } from "./types";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  test("renders with default props", () => {
    render(<Button label="Button" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test.each<[ButtonVariant, string]>([
    ["accent", "hover:bg-(--accent-hover)"],
    ["primary", "hover:bg-(--surface-primary-hover)"],
    ["secondary", "hover:bg-(--surface-secondary-hover)"],
    ["tertiary", "pressed:bg-(--surface-tertiary-pressed)"],
    ["contrast", "hover:bg-gray-900 dark:hover:bg-gray-200"],
  ])("applies '%s' variant styles", (variant, expectedClass) => {
    render(<Button label="Button" variant={variant} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(expectedClass);
  });

  test("applies disabled styles", () => {
    render(<Button label="Button" isDisabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-(--text-disabled)");
  });

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

  test.each<[boolean, ButtonSize, boolean, boolean, string]>([
    [true, "small", true, true, "p-2"],
    [true, "medium", true, true, "p-3"],
    [true, "large", true, true, "p-4"],

    [true, "small", true, false, "px-3 py-2"],
    [true, "medium", true, false, "px-5 py-3"],
    [true, "large", true, false, "px-6 py-4"],

    [true, "small", false, true, "p-[calc(var(--spacing)*2-1px)]"],
    [true, "medium", false, true, "p-[calc(var(--spacing)*3-1px)]"],
    [true, "large", false, true, "p-[calc(var(--spacing)*4-1px)]"],

    [
      true,
      "small",
      false,
      false,
      "px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*2-1px)]",
    ],
    [
      true,
      "medium",
      false,
      false,
      "px-[calc(var(--spacing)*5-1px)] py-[calc(var(--spacing)*3-1px)]",
    ],
    [
      true,
      "large",
      false,
      false,
      "px-[calc(var(--spacing)*6-1px)] py-[calc(var(--spacing)*4-1px)]",
    ],
  ])(
    "applies compound styles for outlined=%s size=%s disabled=%s iconButton=%s",
    (outlined, size, isDisabled, iconButton, expectedClass) => {
      render(
        <Button
          label={iconButton ? undefined : "Button"}
          iconLeft={iconButton ? <svg /> : undefined}
          outlined={outlined}
          size={size}
          isDisabled={isDisabled}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    },
  );

  test("renders loader icon and applies styles when isPending is true", () => {
    const { getByTestId } = render(<Button label="Button" isPending />);
    const button = screen.getByRole("button");

    expect(getByTestId("loader-icon")).toBeInTheDocument();
    expect(button).toHaveClass("opacity-50 pointer-events-none");
  });

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
    const handlePress = vi.fn();

    render(<Button label="Button" onPress={handlePress} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
