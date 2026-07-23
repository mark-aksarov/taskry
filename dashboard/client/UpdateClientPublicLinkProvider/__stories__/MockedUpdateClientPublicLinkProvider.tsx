import { UpdateClientPublicLinkContext } from "../../UpdateClientPublicLinkContext";

export const MockedUpdateClientPublicLinkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientPublicLinkContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientPublicLinkContext.Provider>
  );
};
