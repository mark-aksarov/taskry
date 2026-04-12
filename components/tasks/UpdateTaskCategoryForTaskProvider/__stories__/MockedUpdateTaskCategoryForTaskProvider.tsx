import { UpdateTaskCategoryForTaskContext } from "../../UpdateTaskCategoryForTaskContext";

export const MockedUpdateTaskCategoryForTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskCategoryForTaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskCategoryForTaskContext.Provider>
  );
};
