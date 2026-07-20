import { ImportProjectsContext } from "../../ImportProjectsContext";

export const MockedImportProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportProjectsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportProjectsContext.Provider>
  );
};
