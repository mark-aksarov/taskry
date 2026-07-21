"use client";

import useSWR from "swr";
import { UserDTO } from "@/lib/data/user/user.dto";
import { PositionDTO } from "@/lib/data/position/position.dto";
import { UpdateUserForm, UpdateUserFormSkeleton } from "./UpdateUserForm";

interface UpdateUserFormContainerProps {
  userId: string;
}

export function UpdateUserFormContainer({
  userId,
}: UpdateUserFormContainerProps) {
  const { data: positions } = useSWR<PositionDTO[]>(`/api/positions`);

  const {
    data: user,
    error: userError,
    isValidating,
  } = useSWR<UserDTO>(`/api/users/${userId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (userError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !positions || !user || isValidating;

  if (showSkeleton) {
    return <UpdateUserFormSkeleton />;
  }

  return (
    <UpdateUserForm
      userId={userId}
      fullName={user.fullName}
      bio={user.bio}
      birthdate={user.birthdate}
      phoneNumber={user.phoneNumber}
      publicLink={user.publicLink}
      address={user.address}
      positionId={user.positionId}
      positionSelectItems={positions}
    />
  );
}
