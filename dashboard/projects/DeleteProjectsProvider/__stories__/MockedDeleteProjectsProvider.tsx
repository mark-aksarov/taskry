import { DeleteProjectsContext } from "../../DeleteProjectsContext";

export const MockedDeleteProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteProjectsContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        ids: [],
        setIds: () => {},
      }}
    >
      {children}
    </DeleteProjectsContext.Provider>
  );
};
