import { UpdateTaskDeadlineContext } from "../../UpdateTaskDeadlineContext";

export const MockedUpdateTaskDeadlineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskDeadlineContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateTaskDeadlineContext.Provider>
  );
};
