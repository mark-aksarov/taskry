import { DeleteClientsContext } from "../../DeleteClientsContext";

export const MockedDeleteClientsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteClientsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteClientsContext.Provider>
  );
};
