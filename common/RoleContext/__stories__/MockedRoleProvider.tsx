import { RoleProvider } from "../RoleContext";

export const MockedRoleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RoleProvider value="owner">{children}</RoleProvider>;
};
