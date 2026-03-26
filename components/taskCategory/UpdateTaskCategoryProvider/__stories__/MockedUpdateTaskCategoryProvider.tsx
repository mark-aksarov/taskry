import { UpdateTaskCategoryContext } from "../../UpdateTaskCategoryContext";

export const MockedUpdateTaskCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
};
