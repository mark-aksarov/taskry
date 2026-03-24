import { UpdateCompanyContext } from "../UpdateCompanyContext";

export const MockedUpdateCompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateCompanyContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        isModalOpen: false,
        onModalOpenChange: () => {},
      }}
    >
      {children}
    </UpdateCompanyContext.Provider>
  );
};
