import { UpdateUserPublicLinkContext } from "../../UpdateUserPublicLinkContext";

export const MockedUpdateUserPublicLinkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserPublicLinkContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserPublicLinkContext.Provider>
  );
};
