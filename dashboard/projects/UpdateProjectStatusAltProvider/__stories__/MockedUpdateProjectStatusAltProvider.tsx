import { UpdateProjectStatusAltContext } from "../../UpdateProjectStatusAltContext";

export const MockedUpdateProjectStatusAltProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectStatusAltContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectStatusAltContext.Provider>
  );
};
