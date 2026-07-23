import { ClearClientImageUrlContext } from "../../ClearClientImageUrlContext";

export function MockedClearClientImageUrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClearClientImageUrlContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ClearClientImageUrlContext.Provider>
  );
}
