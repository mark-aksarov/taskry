import { DeleteCustomersContext } from "../../DeleteCustomersContext";

export const MockedDeleteCustomersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteCustomersContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteCustomersContext.Provider>
  );
};
