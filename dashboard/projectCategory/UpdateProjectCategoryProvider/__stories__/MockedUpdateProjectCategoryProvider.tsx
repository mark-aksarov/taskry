import { UpdateProjectCategoryContext } from "../../UpdateProjectCategoryContext";

export const MockedUpdateProjectCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
};
