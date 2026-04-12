import { UpdateProjectCustomerContext } from "../../UpdateProjectCustomerContext";

export const MockedUpdateProjectCustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateProjectCustomerContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateProjectCustomerContext.Provider>
  );
};
