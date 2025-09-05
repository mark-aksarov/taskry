import { Button } from "../Button";
import { fn } from "storybook/test";
import { Item } from "react-stately";
import { MenuTrigger } from "./MenuTrigger";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";

const meta: Meta<typeof MenuTrigger> = {
  title: "Components/Menu",
  component: MenuTrigger,
  tags: ["autodocs"],
  args: {
    onAction: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const MenuTemplate: Story = {
  render: (args) => {
    const itemClasses = "flex items-center gap-4";

    return (
      <MenuTrigger renderButton={() => <Button label="Actions" />} {...args}>
        <Item textValue="Delete" key="delete">
          <div className={itemClasses}>
            <Trash size={16} /> Delete
          </div>
        </Item>
        <Item textValue="Mark as Pending" key="pending">
          <div className={itemClasses}>
            <CircleEllipsis size={16} /> Mark as Pending
          </div>
        </Item>
        <Item textValue="Mark as Done" key="done">
          <div className={itemClasses}>
            <Check size={16} />
            Mark as Done
          </div>
        </Item>
        <Item textValue="Mark as In Progress" key="progress">
          <div className={itemClasses}>
            <Clock size={16} />
            Mark as In Progress
          </div>
        </Item>
      </MenuTrigger>
    );
  },
};

export const Default: Story = {
  ...MenuTemplate,
};

export const WithSheet: Story = {
  ...MenuTemplate,
  args: {
    overlayType: "bottomsheet",
  },
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
