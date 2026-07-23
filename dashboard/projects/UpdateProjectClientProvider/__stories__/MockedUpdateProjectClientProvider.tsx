import { UpdateProjectClientContext } from "../../UpdateProjectClientContext";

export const MockedUpdateProjectClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectClientContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectClientContext.Provider>
  );
};
