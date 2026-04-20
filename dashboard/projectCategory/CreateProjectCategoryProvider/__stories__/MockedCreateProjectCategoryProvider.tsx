import { CreateProjectCategoryContext } from "../../CreateProjectCategoryContext";

export const MockedCreateProjectCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateProjectCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateProjectCategoryContext.Provider>
  );
};
