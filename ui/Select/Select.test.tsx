import React from "react";
import { Item } from "react-stately";
import { User } from "@react-aria/test-utils";
import { Select, SelectProps } from "./Select";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button, Form } from "react-aria-components";
import { render, screen } from "@testing-library/react";

const TestSelect = (props: Partial<SelectProps>) => (
  <Select name="select" label="Label" placeholder="Select an option" {...props}>
    <Item key="apple">Apple</Item>
    <Item key="banana">Banana</Item>
    <Item key="orange">Orange</Item>
  </Select>
);

describe("Select", () => {
  test("applies default button styles", () => {
    render(<TestSelect />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("group border-(--border-primary)");
  });

  test("applies focus-visible styles", async () => {
    render(<TestSelect />);

    const user = userEvent.setup();

    await user.tab();

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-(--control-border-focused)");
  });

  test("applies invalid styles", async () => {
    render(<TestSelect isInvalid />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-(--control-border-error)");
  });

  test("applies disabled styles", async () => {
    render(<TestSelect isDisabled />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-(--text-disabled)");
  });

  test("applies placeholder styles", async () => {
    render(<TestSelect />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-(--text-secondary)");
  });

  test("renders with label", () => {
    render(<TestSelect />);

    const label = screen.getByTestId("select-label");
    expect(label).toBeInTheDocument();
  });

  test("should render placeholder inside Button when no value is selected", () => {
    render(<TestSelect />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Select an option");
  });

  test("renders error message", () => {
    render(<TestSelect errorMessage="Error message" isInvalid />);

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders items inside ListBox", async () => {
    render(
      <Select
        label="Label"
        items={
          [
            { id: "apple", label: "Apple" },
            { id: "banana", label: "Banana" },
            { id: "orange", label: "Orange" },
          ] as any
        }
      >
        {(item: any) => <Item key={item.id}>{item.label}</Item>}
      </Select>,
    );

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    user.click(button);

    const items = await screen.findAllByRole("option");
    expect(items).toHaveLength(3);
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<TestSelect ref={ref} />);

    const select = screen.getByTestId("select");
    expect(select).toBe(ref.current);
  });

  test("should open Popover when overlayType is popover", async () => {
    render(<TestSelect overlayType="popover" />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    user.click(button);

    const popover = await screen.findByTestId("popover");
    expect(popover).toBeInTheDocument();
  });

  test("should open BottomSheet when overlayType is bottomsheet", async () => {
    render(<TestSelect overlayType="bottomsheet" />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    user.click(button);

    const bottomSheet = await screen.findByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();
  });

  test("should submit selected value", async () => {
    const handleSelectionChange = vi.fn();
    const onSubmit = vi.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <TestSelect isRequired onSelectionChange={handleSelectionChange} />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const testUtilUser = new User();

    const select = screen.getByTestId("select");
    const selectTester = testUtilUser.createTester("Select", { root: select });
    await selectTester.selectOption({ option: "Apple" });
    const submit = screen.getByTestId("submit");
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith("apple");
  });

  test("should not submit if required and value is not selected", async () => {
    const onSubmit = vi.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <TestSelect isRequired />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("should select an option via keyboard", async () => {
    const handleSelectionChange = vi.fn();
    render(<TestSelect onSelectionChange={handleSelectionChange} />);

    const testUtilUser = new User();

    const select = screen.getByTestId("select");
    const selectTester = testUtilUser.createTester("Select", {
      root: select,
      interactionType: "keyboard",
    });
    const trigger = selectTester.trigger;

    await selectTester.selectOption({ option: "Apple" });
    expect(trigger).toHaveTextContent("Apple");
    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith("apple");
  });

  test("should select an option via typeahead", async () => {
    const handleSelectionChange = vi.fn();
    render(<TestSelect onSelectionChange={handleSelectionChange} />);

    const user = userEvent.setup();
    const testUtilUser = new User();

    const select = screen.getByTestId("select");
    await user.tab();
    await user.keyboard("App");
    const selectTester = testUtilUser.createTester("Select", {
      root: select,
      interactionType: "keyboard",
    });
    const trigger = selectTester.trigger;
    expect(trigger).toHaveTextContent("Apple");
    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith("apple");
  });

  test("supports custom validation errors", async () => {
    const onSubmit = vi.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <TestSelect
          isRequired
          errorMessage={(validation) =>
            validation.validationDetails.valueMissing ? "Name is required" : ""
          }
        />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    const errorMessage = screen.getByText("Name is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
