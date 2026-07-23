import { UpdateClientEmailContext } from "../../UpdateClientEmailContext";

export const MockedUpdateClientEmailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientEmailContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientEmailContext.Provider>
  );
};
