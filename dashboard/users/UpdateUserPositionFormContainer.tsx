"use client";

import {
  UpdateUserPositionForm,
  UpdateUserPositionFormSkeleton,
} from "./UpdateUserPositionForm";

import useSWR from "swr";
import { PositionDTO } from "@/lib/data/position/position.dto";

interface UpdateUserPositionFormContainerProps {
  userId: string;
  positionId?: number;
}

export function UpdateUserPositionFormContainer({
  userId,
  positionId,
}: UpdateUserPositionFormContainerProps) {
  const { data: positions } = useSWR<PositionDTO[]>(`/api/positions`);

  // Show skeleton while loading
  if (!positions) {
    return <UpdateUserPositionFormSkeleton />;
  }

  return (
    <UpdateUserPositionForm
      userId={userId}
      positionId={positionId}
      positionSelectItems={positions}
    />
  );
}
