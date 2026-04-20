import { CreateCompanyContext } from "../../CreateCompanyContext";

export const MockedCreateCompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreateCompanyContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreateCompanyContext.Provider>
  );
};
