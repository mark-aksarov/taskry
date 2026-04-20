import { useEffect } from "react";
import { SearchBar } from "../SearchBar";
import { SearchModal } from "../SearchModal";
import { Button } from "@/ui/Button";
import { SearchListSkeleton } from "../SearchList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalDialog } from "./SearchModalDialog";
import { SearchListExample } from "../SearchList/__stories__";
import { SearchModalDialogBody } from "./SearchModalDialogBody";
import { withSearchBarProvider } from "../SearchBar/__stories__";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { SearchModalDialogHeader } from "./SearchModalDialogHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";

const meta = {
  title: "dashboard/search/SearchModal",
  component: SearchModal,
  decorators: [
    withModalManagerProvider,
    withSearchBarProvider,
    withThemedBackground,
  ],
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
