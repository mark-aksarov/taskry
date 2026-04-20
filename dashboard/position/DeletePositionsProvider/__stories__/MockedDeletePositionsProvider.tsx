import { DeletePositionsContext } from "../../DeletePositionsContext";

export const MockedDeletePositionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeletePositionsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeletePositionsContext.Provider>
  );
};
