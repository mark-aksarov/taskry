import { UpdateTaskCategoryRelContext } from "../../UpdateTaskCategoryRelContext";

export const MockedUpdateTaskCategoryRelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskCategoryRelContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskCategoryRelContext.Provider>
  );
};
