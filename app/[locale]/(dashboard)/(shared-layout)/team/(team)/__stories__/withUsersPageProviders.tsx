import { type Decorator } from "@storybook/react";
import { UserFiltersProvider } from "@/components/users/UserFiltersContext";
import { CreateUserModalProvider } from "@/components/users/CreateUserModal";
import { UserFiltersModalProvider } from "@/components/users/UserFiltersModal";
import { MockedCreateUserProvider } from "@/components/users/CreateUserProvider/__stories__";
import { UserPositionFiltersModalProvider } from "@/components/users/UserPositionFiltersModal";
import { MockedCreatePositionProvider } from "@/components/position/CreatePositionProvider/__stories__";

export const withUsersPageProviders: Decorator = (Story) => {
  return (
    <CreateUserModalProvider>
      <MockedCreateUserProvider>
        <MockedCreatePositionProvider>
          <UserFiltersProvider filters={{}}>
            <UserFiltersModalProvider>
              <UserPositionFiltersModalProvider>
                <Story />
              </UserPositionFiltersModalProvider>
            </UserFiltersModalProvider>
          </UserFiltersProvider>
        </MockedCreatePositionProvider>
      </MockedCreateUserProvider>
    </CreateUserModalProvider>
  );
};
