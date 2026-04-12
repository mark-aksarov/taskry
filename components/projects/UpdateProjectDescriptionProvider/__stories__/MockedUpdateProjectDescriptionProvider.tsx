import { UpdateProjectDescriptionContext } from "../../UpdateProjectDescriptionContext";

export const MockedUpdateProjectDescriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectDescriptionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectDescriptionContext.Provider>
  );
};
