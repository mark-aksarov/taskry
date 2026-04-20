import { UpdateTaskAssigneeContext } from "../../UpdateTaskAssigneeContext";

export const MockedUpdateTaskAssigneeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskAssigneeContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskAssigneeContext.Provider>
  );
};
