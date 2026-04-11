import { UpdateUserPositionContext } from "../../UpdateUserPositionContext";

export const MockedUpdateUserPositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdateUserPositionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdateUserPositionContext.Provider>
  );
};
