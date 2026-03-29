import { DeleteTasksContext } from "../../DeleteTasksContext";

export const MockedDeleteTasksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteTasksContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteTasksContext.Provider>
  );
};
