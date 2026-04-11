"use client";

import {
  UpdateUserPositionForm,
  UpdateUserPositionFormSkeleton,
} from "./UpdateUserPositionForm";

import useSWR from "swr";
import { UserFormDataDTO } from "@/lib/data/user/user.dto";
import { PositionSummaryDTO } from "@/lib/data/position/position.dto";

interface UpdateUserPositionFormContainerProps {
  userId: string;
}

export function UpdateUserPositionFormContainer({
  userId,
}: UpdateUserPositionFormContainerProps) {
  const { data: positions } = useSWR<PositionSummaryDTO[]>(`/api/positions`, {
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
    throw new Error();
  }

  // Show skeleton while loading or revalidating
  const showSkeleton = !positions || !user || isValidatingUser;

  if (showSkeleton) {
    return <UpdateUserPositionFormSkeleton />;
  }

  return (
    <UpdateUserPositionForm
      userId={userId}
      positionId={user.positionId}
      positionSelectItems={positions}
    />
  );
}
