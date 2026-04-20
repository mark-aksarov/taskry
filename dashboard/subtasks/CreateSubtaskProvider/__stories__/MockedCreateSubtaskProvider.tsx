import { CreateSubtaskContext } from "../../CreateSubtaskContext";

export const MockedCreateSubtaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateSubtaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateSubtaskContext.Provider>
  );
};
