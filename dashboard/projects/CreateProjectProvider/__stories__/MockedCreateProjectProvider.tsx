import { CreateProjectContext } from "../../CreateProjectContext";

export const MockedCreateProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateProjectContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateProjectContext.Provider>
  );
};
