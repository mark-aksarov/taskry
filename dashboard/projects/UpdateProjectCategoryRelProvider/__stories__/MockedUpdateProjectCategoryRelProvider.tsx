import { UpdateProjectCategoryRelContext } from "../../UpdateProjectCategoryRelContext";

export const MockedUpdateProjectCategoryRelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectCategoryRelContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectCategoryRelContext.Provider>
  );
};
