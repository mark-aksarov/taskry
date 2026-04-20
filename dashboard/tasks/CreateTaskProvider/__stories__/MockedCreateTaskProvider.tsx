import { CreateTaskContext } from "../../CreateTaskContext";

export const MockedCreateTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateTaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateTaskContext.Provider>
  );
};
