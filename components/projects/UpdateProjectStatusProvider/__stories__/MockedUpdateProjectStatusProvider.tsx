import { UpdateProjectStatusContext } from "../../UpdateProjectStatusContext";

export const MockedUpdateProjectStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectStatusContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectStatusContext.Provider>
  );
};
