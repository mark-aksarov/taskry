import { DeleteClientContext } from "../../DeleteClientContext";

export const MockedDeleteClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteClientContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteClientContext.Provider>
  );
};
