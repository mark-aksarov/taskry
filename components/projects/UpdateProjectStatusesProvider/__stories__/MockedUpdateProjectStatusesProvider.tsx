import { UpdateProjectStatusesContext } from "../../UpdateProjectStatusesContext";

export const MockedUpdateProjectStatusesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectStatusesContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
};
