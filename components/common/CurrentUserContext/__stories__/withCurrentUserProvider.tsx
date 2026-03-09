import { type Decorator } from "@storybook/react";
import { CurrentUserProvider } from "../../CurrentUserContext";

export const withCurrentUserProvider: Decorator = (Story) => {
  return (
    <CurrentUserProvider
      value={{
        userId: "user-1",
        isGuest: false,
        isOwner: true,
      }}
    >
      <Story />
    </CurrentUserProvider>
  );
};
