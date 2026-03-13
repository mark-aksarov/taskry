"use client";

import useSWR from "swr";
import { usePathname } from "@/i18n/navigation";
import { notFound, useParams } from "next/navigation";
import { UserFormDataDTO } from "@/lib/data/user/user.dto";
import { EditUserForm, EditUserFormSkeleton } from "./EditUserForm";
import { PositionSummaryDTO } from "@/lib/data/position/position.dto";

interface EditUserFormContainerProps {
  userId: string;
}

export function EditUserFormContainer({ userId }: EditUserFormContainerProps) {
  const pathname = usePathname();
  const params = useParams();

  const { data: positions } = useSWR<PositionSummaryDTO[]>(`/api/positions`, {
    revalidateIfStale: false, // don't revalidate on each mount
    revalidateOnFocus: false,
  });

  // Current user data for editing (loaded each modal open)
  const {
    data: user,
    isValidating: isValidatingUser,
    error: userError,
  } = useSWR<UserFormDataDTO>(`/api/users/${userId}?view=edit`, {
    revalidateOnFocus: false,
  });

  if (userError) {
    if (userError.status === 404) {
      if (
        (pathname.startsWith("/team") && params.id) ||
        pathname === "/profile"
      ) {
        notFound();
      }

      throw new Error(undefined, { cause: "userNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading or revalidating
  const showSkeleton = !positions || !user || isValidatingUser;

  if (showSkeleton) {
    return <EditUserFormSkeleton />;
  }

  return (
    <EditUserForm
      userId={userId}
      fullName={user.fullName}
      bio={user.bio}
      birthdate={user.birthdate}
      phoneNumber={user.phoneNumber}
      publicLink={user.publicLink}
      address={user.address}
      positionId={user.positionId}
      userPositionSelectItems={positions}
    />
  );
}
