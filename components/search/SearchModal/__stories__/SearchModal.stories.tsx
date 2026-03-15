import { useEffect } from "react";
import { SearchBar } from "../../SearchBar";
import { SearchModal } from "../SearchModal";
import { Button } from "@/components/ui/Button";
import { useSearchModal } from "../SearchModalContext";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalDialog } from "../SearchModalDialog";
import { SearchListStory } from "../../SearchList/__stories__";
import { SearchModalDialogBody } from "../SearchModalDialogBody";
import { SearchList, SearchListSkeleton } from "../../SearchList";
import { withSearchBarProvider } from "../../SearchBar/__stories__";
import { withSearchModalProvider } from "./withSearchModalProvider";
import { SearchModalDialogHeader } from "../SearchModalDialogHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchModal",
  component: SearchModal,
  decorators: [
    withSearchModalProvider,
    withSearchBarProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: ({ children }) => {
    const { onOpenChange } = useSearchModal();

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
    children: <SearchList {...SearchListStory.args} />,
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
