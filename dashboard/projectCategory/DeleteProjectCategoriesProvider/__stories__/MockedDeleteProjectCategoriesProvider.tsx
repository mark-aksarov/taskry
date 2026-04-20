import { DeleteProjectCategoriesContext } from "../../DeleteProjectCategoriesContext";

export const MockedDeleteProjectCategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteProjectCategoriesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteProjectCategoriesContext.Provider>
  );
};
