import { CreateTaskCategoryContext } from "../../CreateTaskCategoryContext";

export const MockedCreateTaskCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateTaskCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateTaskCategoryContext.Provider>
  );
};
