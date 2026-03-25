import { CreatePositionContext } from "../../CreatePositionContext";

export const MockedCreatePositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CreatePositionContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </CreatePositionContext.Provider>
  );
};
