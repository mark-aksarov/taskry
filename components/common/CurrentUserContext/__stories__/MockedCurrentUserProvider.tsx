import { CurrentUserProvider } from "../CurrentUserContext";

export const MockedCurrentUserProvider = ({
  children,
  isGuest,
}: {
  children: React.ReactNode;
  isGuest: boolean;
}) => {
  return (
    <CurrentUserProvider
      value={{
        userId: "user-1",
        isGuest,
        isOwner: true,
      }}
    >
      {children}
    </CurrentUserProvider>
  );
};
