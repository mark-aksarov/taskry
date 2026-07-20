import { ImportTaskCategoriesContext } from "../../ImportTaskCategoriesContext";

export const MockedImportTaskCategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportTaskCategoriesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportTaskCategoriesContext.Provider>
  );
};
