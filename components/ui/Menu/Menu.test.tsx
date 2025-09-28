import React from "react";
import { Button } from "../Button";
import "@testing-library/jest-dom";
import { Item } from "react-stately";
import { User } from "@react-aria/test-utils";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MenuTrigger, MenuTriggerProps } from "./MenuTrigger";
import { DialogHeader } from "../Dialog";

const TestMenu = (props: Partial<MenuTriggerProps>) => (
  <MenuTrigger {...props}>
    <Item key="delete">Delete</Item>
    <Item key="pending">Mark as Pending</Item>
    <Item key="done">Mark as Done</Item>
  </MenuTrigger>
);

describe("Menu", () => {
  test("renders with default props", () => {
    render(<TestMenu />);

    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toBeInTheDocument();
  });

  test("renders with custom button", () => {
    render(<TestMenu renderButton={() => <Button label="Actions" />} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Actions");
  });

  test("renders with items", async () => {
    render(
      <TestMenu
        renderButton={() => <Button label="Actions" />}
        items={[
          { id: "delete", label: "Delete" },
          { id: "pending", label: "Mark as Pending" },
          { id: "done", label: "Mark as Done" },
        ]}
      />,
    );

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Delete");
    expect(items[1]).toHaveTextContent("Mark as Pending");
    expect(items[2]).toHaveTextContent("Mark as Done");
  });

  test("should open popover when overlayType is popover", async () => {
    render(<TestMenu overlayType="popover" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    const popover = screen.getByTestId("popover");
    expect(popover).toBeInTheDocument();
  });

  test("should open bottom sheet when overlayType is bottomsheet", async () => {
    render(<TestMenu overlayType="bottomsheet" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();
  });

  test("should render dialog header when renderDialogHeader is provided", async () => {
    render(
      <TestMenu
        overlayType="bottomsheet"
        renderDialogHeader={() => <DialogHeader>Header</DialogHeader>}
      />,
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();
    const header = screen.getByText("Header");
    expect(header).toBeInTheDocument();
  });

  test("should select an option via keyboard", async () => {
    const onAction = jest.fn();

    render(<TestMenu onAction={onAction} />);

    const testUtilUser = new User();

    const menuTester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button"),
      interactionType: "keyboard",
    });
    await menuTester.open();
    expect(menuTester.menu).toBeInTheDocument();

    await menuTester.selectOption({ option: "Delete" });

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith("delete");
  });

  test("should select an option via typeahead", async () => {
    const onAction = jest.fn();

    render(<TestMenu onAction={onAction} />);

    const user = userEvent.setup();
    const testUtilUser = new User();

    const menuTester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button"),
      interactionType: "keyboard",
    });
    await menuTester.open();
    expect(menuTester.menu).toBeInTheDocument();

    await user.keyboard("Mark as P");
    await user.keyboard("{Enter}");

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith("pending");
  });
});
