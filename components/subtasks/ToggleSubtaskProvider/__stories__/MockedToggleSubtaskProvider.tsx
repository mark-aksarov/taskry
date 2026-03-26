import { ToggleSubtaskContext } from "../../ToggleSubtaskContext";

export const MockedToggleSubtaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ToggleSubtaskContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      {children}
    </ToggleSubtaskContext.Provider>
  );
};
