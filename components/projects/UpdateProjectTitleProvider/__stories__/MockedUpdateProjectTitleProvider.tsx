import { UpdateProjectTitleContext } from "../../UpdateProjectTitleContext";

export const MockedUpdateProjectTitleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectTitleContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectTitleContext.Provider>
  );
};
