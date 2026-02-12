import { fn } from "storybook/test";
import { type Decorator } from "@storybook/react";
import { OverlayTriggerStateContext } from "react-aria-components";

export const withOverlayTriggerStateProvider: Decorator = (Story) => {
  return (
    <OverlayTriggerStateContext.Provider
      value={{
        isOpen: true,
        open: fn(),
        setOpen: fn(),
        toggle: fn(),
        close: fn(),
      }}
    >
      <Story />
    </OverlayTriggerStateContext.Provider>
  );
};
