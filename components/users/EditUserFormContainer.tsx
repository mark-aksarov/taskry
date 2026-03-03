"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { CalendarDate } from "@internationalized/date";
import { UserFormDataDTO } from "@/lib/data/user/user.dto";
import { EditUserForm, EditUserFormSkeleton } from "./EditUserForm";
import { PositionSummaryDTO } from "@/lib/data/position/position.dto";

interface EditUserFormContainerProps {
  userId: string;
}

export function EditUserFormContainer(props: EditUserFormContainerProps) {
  return (
    <Suspense fallback={<EditUserFormSkeleton />}>
      <EditUserFormContainerInner {...props} />
    </Suspense>
  );
}

function EditUserFormContainerInner({ userId }: EditUserFormContainerProps) {
  const { data: positions } = useSWR<PositionSummaryDTO[]>(`/api/positions`, {
    suspense: true,
  });

  const { data: user, mutate } = useSWR<UserFormDataDTO>(
    `/api/users/${userId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!positions || !user) {
    throw new Error("User not found");
  }

  let dateValue;
  if (user.birthdate) {
    const d = new Date(user.birthdate);
    dateValue = new CalendarDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
    );
  }

  return (
    <EditUserForm
      userId={userId}
      userFullNameDefaultValue={user.fullName}
      userBioDefaultValue={user.bio}
      userBirthdateDefaultValue={dateValue}
      userPhoneNumberDefaultValue={user.phoneNumber}
      userPublicLinkDefaultValue={user.publicLink}
      userAddressDefaultValue={user.address}
      userPositionSelectDefaultValue={user.positionId?.toString()}
      userPositionSelectItems={positions}
    />
  );
}
