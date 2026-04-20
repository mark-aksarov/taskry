import { DeleteSubtaskContext } from "../../DeleteSubtaskContext";

export const MockedDeleteSubtaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteSubtaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteSubtaskContext.Provider>
  );
};
