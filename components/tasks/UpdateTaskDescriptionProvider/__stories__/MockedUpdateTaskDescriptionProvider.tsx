import { UpdateTaskDescriptionContext } from "../../UpdateTaskDescriptionContext";

export const MockedUpdateTaskDescriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskDescriptionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskDescriptionContext.Provider>
  );
};
