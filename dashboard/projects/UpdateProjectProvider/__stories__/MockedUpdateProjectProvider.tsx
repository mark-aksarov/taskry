import { UpdateProjectContext } from "../../UpdateProjectContext";

export const MockedUpdateProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectContext.Provider>
  );
};
