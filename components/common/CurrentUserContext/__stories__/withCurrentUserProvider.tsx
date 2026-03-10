import { type Decorator } from "@storybook/react";
import { CurrentUserProvider } from "../../CurrentUserContext";

export const withCurrentUserProvider: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <CurrentUserProvider
      value={{
        userId: "user-1",
        isGuest,
        isOwner: true,
      }}
    >
      <Story />
    </CurrentUserProvider>
  );
};
