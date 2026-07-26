import { SessionProvider } from "../SessionContext";

export const MockedSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider
      value={
        {
          user: {},
          session: {},
        } as any
      }
    >
      {children}
    </SessionProvider>
  );
};
