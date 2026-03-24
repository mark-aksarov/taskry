import { UpdateCustomerImageContext } from "../UpdateCustomerImageContext";

export function MockedUpdateCustomerImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateCustomerImageContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateCustomerImageContext.Provider>
  );
}
