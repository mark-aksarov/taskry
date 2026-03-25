import { DeleteProjectContext } from "../../DeleteProjectContext";

export const MockedDeleteProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeleteProjectContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteProjectContext.Provider>
  );
};
