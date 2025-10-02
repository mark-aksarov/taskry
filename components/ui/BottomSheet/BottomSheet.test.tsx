import React from "react";
import "@testing-library/jest-dom";
import { Button } from "../Button";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { render, screen, waitFor } from "@testing-library/react";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "../Dialog";
import { BottomSheet, BottomSheetProps } from "./BottomSheet";
import userEvent from "@testing-library/user-event";
import { TextField } from "../TextField";

const TestBottomSheet = (
  props: Omit<BottomSheetProps, "state" | "children">,
) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="Open Bottom Sheet" />
      <BottomSheet {...props} state={state}>
        <Dialog>
          <DialogHeader>
            <DialogHeading className="text-base">
              Bottom sheet title
            </DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <TextField label="Name" placeholder="Start typing ..." />
          </DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
};

describe("BottomSheet", () => {
  test("should render with default props", async () => {
    render(<TestBottomSheet />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();

    const title = screen.getByText("Bottom sheet title");
    expect(title).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("should render with custom className", async () => {
    render(<TestBottomSheet className="custom-class" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet.children[0]).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<TestBottomSheet ref={ref} />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBe(ref.current);
  });

  test("should close the bottom sheet when the escape key is pressed", async () => {
    render(<TestBottomSheet />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();

    await user.keyboard("[Escape]");

    waitFor(() => expect(bottomSheet).not.toBeInTheDocument());
  });

  test("should close the bottom sheet when the close button is clicked", async () => {
    render(<TestBottomSheet />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    await waitFor(() => {
      expect(bottomSheet).not.toBeInTheDocument();
    });
  });

  test("should close the bottom sheet when clicked outside", async () => {
    render(<TestBottomSheet isDismissable />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();

    const overlay = screen.getByTestId("overlay");
    await user.click(overlay);
    waitFor(() => expect(bottomSheet).not.toBeInTheDocument());
  });

  test("should trap focus within the bottom sheet", async () => {
    render(<TestBottomSheet />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.tab();
    await expect(closeButton).toHaveFocus();

    const input = screen.getByRole("textbox");
    await user.tab();
    await expect(input).toHaveFocus();

    await user.tab();
    await expect(closeButton).toHaveFocus();
  });
});
