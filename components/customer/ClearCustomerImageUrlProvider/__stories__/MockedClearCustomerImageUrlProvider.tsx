import { ClearCustomerImageUrlContext } from "../../ClearCustomerImageUrlContext";

export function MockedClearCustomerImageUrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClearCustomerImageUrlContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
