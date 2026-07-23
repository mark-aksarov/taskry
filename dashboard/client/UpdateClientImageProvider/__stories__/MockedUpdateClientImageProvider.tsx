import { UpdateClientImageContext } from "../../UpdateClientImageContext";

export function MockedUpdateClientImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateClientImageContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateClientImageContext.Provider>
  );
}
