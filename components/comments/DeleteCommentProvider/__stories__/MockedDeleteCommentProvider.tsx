import { DeleteCommentContext } from "../../DeleteCommentContext";

export function MockedDeleteCommentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DeleteCommentContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeleteCommentContext.Provider>
  );
}
