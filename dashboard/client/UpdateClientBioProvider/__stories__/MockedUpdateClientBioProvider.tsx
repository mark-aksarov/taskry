import { UpdateClientBioContext } from "../../UpdateClientBioContext";

export const MockedUpdateClientBioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateClientBioContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientBioContext.Provider>
  );
};
