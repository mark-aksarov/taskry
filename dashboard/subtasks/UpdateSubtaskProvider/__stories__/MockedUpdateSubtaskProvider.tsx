import { UpdateSubtaskContext } from "../../UpdateSubtaskContext";

export const MockedUpdateSubtaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateSubtaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateSubtaskContext.Provider>
  );
};
