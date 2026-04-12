import { UpdateTaskProjectContext } from "../../UpdateTaskProjectContext";

export const MockedUpdateTaskProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskProjectContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskProjectContext.Provider>
  );
};
