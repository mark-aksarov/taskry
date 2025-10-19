import { Button } from "../Button";
import { fn } from "storybook/test";
import { Item } from "react-stately";
import { MenuTrigger } from "./MenuTrigger";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { DialogCloseButton, DialogHeader, DialogHeading } from "../Dialog";

const meta: Meta<typeof MenuTrigger> = {
  title: "Components/ui/Menu",
  component: MenuTrigger,
  tags: ["autodocs"],
  args: {
    onAction: fn(),
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function getItems() {
  const items = [
    <Item textValue="Delete" key="delete">
      <Trash size={16} /> Delete
    </Item>,
    <Item textValue="Mark as Pending" key="pending">
      <CircleEllipsis size={16} /> Mark as Pending
    </Item>,
    <Item textValue="Mark as Done" key="done">
      <Check size={16} />
      Mark as Done
    </Item>,
    <Item textValue="Mark as In Progress" key="progress">
      <Clock size={16} />
      Mark as In Progress
    </Item>,
  ];

  return items;
}

const MenuTemplate: Story = {
  render: (args) => {
    return (
      <MenuTrigger renderButton={() => <Button label="Actions" />} {...args}>
        {getItems()}
      </MenuTrigger>
    );
  },
};

export const BottomLeftPlacement = {
  ...MenuTemplate,
} satisfies Story;

export const BottomRightPlacement = {
  ...MenuTemplate,
  args: {
    placement: "bottom right",
  },
} satisfies Story;

export const LeftTopPlacement = {
  ...MenuTemplate,
  args: {
    placement: "left top",
  },
} satisfies Story;

export const LeftBottomPlacement = {
  ...LeftTopPlacement,
  args: {
    placement: "left bottom",
  },
} satisfies Story;

export const WithSheet = {
  ...MenuTemplate,
  args: {
    overlayType: "bottomsheet",
  },
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;

export const WithSheetAndHeader = {
  args: {
    overlayType: "bottomsheet",
  },
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  render: (args) => {
    return (
      <MenuTrigger
        renderDialogHeader={() => (
          <DialogHeader className="px-4 py-3">
            <DialogHeading className="text-base">Actions</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        renderButton={() => <Button label="Actions" />}
        {...args}
      >
        {getItems()}
      </MenuTrigger>
    );
  },
} satisfies Story;
