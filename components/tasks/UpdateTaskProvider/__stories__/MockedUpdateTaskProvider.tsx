import { UpdateTaskContext } from "../../UpdateTaskContext";

export const MockedUpdateTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskContext.Provider>
  );
};
