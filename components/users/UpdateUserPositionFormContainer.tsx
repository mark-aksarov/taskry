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
  const { data: positions } = useSWR<PositionSummaryDTO[]>(`/api/positions`);

  const {
    data: user,
    error: userError,
    isValidating,
  } = useSWR<UserFormDataDTO>(`/api/users/${userId}?view=edit`, {
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
