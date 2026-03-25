import { type Decorator } from "@storybook/react";
import { CreatePositionModalProvider } from "@/components/position/CreatePositionModal";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedCreatePositionProvider } from "@/components/position/CreatePositionProvider/__stories__";
import { MockedDeletePositionsProvider } from "@/components/position/DeletePositionsProvider/__stories__";

export const PositionsPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeletePositionsProvider>
        <CreatePositionModalProvider>
          <MockedCreatePositionProvider>
            <Story />
          </MockedCreatePositionProvider>
        </CreatePositionModalProvider>
      </MockedDeletePositionsProvider>
    </MockedSelectedItemsProvider>
  );
};
