import { DeleteTaskCategoriesContext } from "../../DeleteTaskCategoriesContext";

export const MockedDeleteTaskCategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteTaskCategoriesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteTaskCategoriesContext.Provider>
  );
};
