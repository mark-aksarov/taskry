import { UpdateUserImageContext } from "../UpdateUserImageContext";

export function MockedUpdateUserImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateUserImageContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserImageContext.Provider>
  );
}
