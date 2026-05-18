import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "../Dialog";

import React from "react";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { Modal, ModalProps } from "./Modal";
import { render } from "@/lib/utils/test-utils";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { DialogTrigger } from "react-aria-components";
import { screen, waitFor } from "@testing-library/react";

const TestModal = (props: Omit<ModalProps, "children">) => {
  return (
    <DialogTrigger>
      <Button label="Open modal" />
      <Modal {...props}>
        <Dialog>
          <DialogHeader>
            <DialogHeading>Modal title</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <TextField label="Name" placeholder="Start typing ..." />
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

describe("Modal", () => {
  test("renders with correct heading and children", async () => {
    render(<TestModal />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const title = screen.getByText("Modal title");
    expect(title).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("should use the provided ref for the component", async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<TestModal ref={ref} data-testid="modal" />);

    const user = userEvent.setup();
    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const modal = screen.getByTestId("modal");
    expect(modal).toBe(ref.current);
  });

  test("should close the modal when the escape key is pressed", async () => {
    render(<TestModal data-testid="modal" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    await user.keyboard("[Escape]");
    expect(modal).not.toBeInTheDocument();
  });

  test("should close the modal when the close button is clicked", async () => {
    render(<TestModal data-testid="modal" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  test("should close the modal when clicked outside", async () => {
    render(<TestModal isDismissable data-testid="modal" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    await user.click(modal);

    waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  test("should trap focus within the modal", async () => {
    render(<TestModal data-testid="modal" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

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
