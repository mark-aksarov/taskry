import { UpdateClientFullNameContext } from "../../UpdateClientFullNameContext";

export const MockedUpdateClientFullNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientFullNameContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientFullNameContext.Provider>
  );
};
