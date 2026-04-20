import { UpdateTaskStatusContext } from "../../UpdateTaskStatusContext";

export const MockedUpdateTaskStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskStatusContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskStatusContext.Provider>
  );
};
