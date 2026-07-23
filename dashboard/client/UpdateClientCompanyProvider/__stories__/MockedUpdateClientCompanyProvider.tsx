import { UpdateClientCompanyContext } from "../../UpdateClientCompanyContext";

export const MockedUpdateClientCompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientCompanyContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientCompanyContext.Provider>
  );
};
