import { UpdatePositionContext } from "../../UpdatePositionContext";

export const MockedUpdatePositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <UpdatePositionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </UpdatePositionContext.Provider>
  );
};
