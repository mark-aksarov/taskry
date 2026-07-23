import { UpdateClientContext } from "../../UpdateClientContext";

export const MockedUpdateClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientContext.Provider>
  );
};
