import { ExportTasksContext } from "../../ExportTasksContext";

export const MockedExportTasksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ExportTasksContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ExportTasksContext.Provider>
  );
};
