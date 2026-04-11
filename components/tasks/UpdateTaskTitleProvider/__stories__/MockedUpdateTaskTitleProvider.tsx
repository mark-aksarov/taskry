import { UpdateTaskTitleContext } from "../../UpdateTaskTitleContext";

export const MockedUpdateTaskTitleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskTitleContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskTitleContext.Provider>
  );
};
