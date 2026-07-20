import { ImportProjectCategoriesContext } from "../../ImportProjectCategoriesContext";

export const MockedImportProjectCategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImportProjectCategoriesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ImportProjectCategoriesContext.Provider>
  );
};
