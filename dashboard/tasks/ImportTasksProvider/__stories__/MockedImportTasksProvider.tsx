import { ImportTasksContext } from "../../ImportTasksContext";

export const MockedImportTasksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportTasksContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportTasksContext.Provider>
  );
};
