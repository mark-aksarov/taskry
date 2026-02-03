"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { CalendarDate } from "@internationalized/date";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UserFormDataDTO } from "@/lib/data/user/user.dto";
import { UserFormBasePositionSelect } from "./UserFormBase";
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

  const { data: user } = useSWR<UserFormDataDTO>(
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
      fullNameDefaultValue={user.fullName}
      bioDefaultValue={user.bio}
      birthdateDefaultValue={dateValue}
      phoneNumberDefaultValue={user.phoneNumber}
      publicLinkDefaultValue={user.publicLink}
      addressDefaultValue={user.address}
      positionSelect={
        <UserFormBasePositionSelect
          defaultSelectedKey={user.positionId?.toString()}
          positions={positions}
        />
      }
      formAction={updateUser}
    />
  );
}
