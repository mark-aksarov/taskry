import { CustomerFilters } from "@/lib/types";
import { CreateUserProvider } from "@/components/users/CreateUserProvider";
import { UserFiltersProvider } from "@/components/users/UserFiltersContext";
import { CreateUserModalProvider } from "@/components/users/CreateUserModal";
import { UserFiltersModalProvider } from "@/components/users/UserFiltersModal";
import { CreatePositionProvider } from "@/components/position/CreatePositionProvider";
import { CreatePositionModalProvider } from "@/components/position/CreatePositionModal";
import { UserPositionFiltersModalProvider } from "@/components/users/UserPositionFiltersModal";

interface UsersPageProvidersProps {
  filters: CustomerFilters;
  children: React.ReactNode;
}

export function UsersPageProviders({
  filters,
  children,
}: UsersPageProvidersProps) {
  return (
    <CreateUserModalProvider>
      <CreateUserProvider>
        <CreatePositionModalProvider>
          <CreatePositionProvider>
            <UserFiltersProvider filters={filters}>
              <UserFiltersModalProvider>
                <UserPositionFiltersModalProvider>
                  {children}
                </UserPositionFiltersModalProvider>
              </UserFiltersModalProvider>
            </UserFiltersProvider>
          </CreatePositionProvider>
        </CreatePositionModalProvider>
      </CreateUserProvider>
    </CreateUserModalProvider>
  );
}
