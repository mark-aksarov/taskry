import { DeleteProjectCategoryContext } from "../../DeleteProjectCategoryContext";

export const MockedDeleteProjectCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteProjectCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
};
