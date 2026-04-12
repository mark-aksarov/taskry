import { UpdateProjectDeadlineContext } from "../../UpdateProjectDeadlineContext";

export const MockedUpdateProjectDeadlineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectDeadlineContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectDeadlineContext.Provider>
  );
};
