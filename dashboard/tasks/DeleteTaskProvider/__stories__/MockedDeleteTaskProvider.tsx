import { DeleteTaskContext } from "../../DeleteTaskContext";

export const MockedDeleteTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteTaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteTaskContext.Provider>
  );
};
