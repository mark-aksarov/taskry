import { CreateClientContext } from "../../CreateClientContext";

export const MockedCreateClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateClientContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateClientContext.Provider>
  );
};
