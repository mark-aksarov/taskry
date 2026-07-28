import { useEffect } from "react";
import { Button } from "@/ui/Button";
import { SearchBar } from "../SearchBar";
import { SearchModal } from "../SearchModal";
import { SearchListSkeleton } from "../SearchList";
import { useModal } from "@/common/ModalManagerContext";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalDialog } from "./SearchModalDialog";
import { SearchListExample } from "../SearchList/__stories__";
import { SearchModalDialogBody } from "./SearchModalDialogBody";
import { SearchModalDialogHeader } from "./SearchModalDialogHeader";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/search/SearchModal",
  component: SearchModal,
  decorators: [withDashboardLayoutProviders],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: ({ children }) => {
    const { onOpenChange } = useModal("search");

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Search modal" onClick={() => onOpenChange(true)} />
        <SearchModal>
          <SearchModalDialog>
            <SearchModalDialogHeader>Search modal</SearchModalDialogHeader>
            <SearchModalDialogBody>
              <SearchBar />
              {children}
            </SearchModalDialogBody>
          </SearchModalDialog>
        </SearchModal>
      </>
    );
  },
  args: {
    children: <SearchListExample />,
  },
};

export const Default = {
  ...Template,
} satisfies Story;

export const Skeleton = {
  ...Template,
  args: {
    children: <SearchListSkeleton />,
  },
} satisfies Story;
