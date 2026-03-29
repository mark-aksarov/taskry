import { UpdateTaskStatusesContext } from "../../UpdateTaskStatusesContext";

export const MockedUpdateTaskStatusesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateTaskStatusesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
};
