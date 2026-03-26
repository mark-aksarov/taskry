import { DeleteTaskCategoryContext } from "../../DeleteTaskCategoryContext";

export const MockedDeleteTaskCategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteTaskCategoryContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
};
