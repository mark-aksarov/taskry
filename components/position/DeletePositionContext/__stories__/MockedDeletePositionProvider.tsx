import { DeletePositionContext } from "../DeletePositionContext";

export const MockedDeletePositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DeletePositionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </DeletePositionContext.Provider>
  );
};
