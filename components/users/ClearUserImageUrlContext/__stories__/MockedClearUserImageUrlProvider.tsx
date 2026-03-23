import { ClearUserImageUrlContext } from "../ClearUserImageUrlContext";

export function MockedClearUserImageUrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClearUserImageUrlContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}
