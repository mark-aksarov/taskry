import { UpdateTaskStatusAltContext } from "../../UpdateTaskStatusAltContext";

export const MockedUpdateTaskStatusAltProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskStatusAltContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskStatusAltContext.Provider>
  );
};
