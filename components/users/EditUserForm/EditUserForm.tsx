"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { UserBioTextField } from "../UserBioTextField";
import { UserPositionSelect } from "../UserPositionSelect";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";
import { useUpdateUserTransition } from "../UpdateUserTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

interface EditUserFormProps {
  userId: string;
  userFullNameDefaultValue?: string;
  userBioDefaultValue?: string;
  userBirthdateDefaultValue?: DateValue;
  userPhoneNumberDefaultValue?: string;
  userPublicLinkDefaultValue?: string;
  userAddressDefaultValue?: string;
  userPositionSelectDefaultValue?: string;
  userPositionSelectItems: { id: number; name: string }[];
  updateUser: ActionFn<ActionState, FormData>;
  mutate: () => void;
}

export function EditUserForm({
  userId,
  userFullNameDefaultValue,
  userBioDefaultValue,
  userBirthdateDefaultValue,
  userPhoneNumberDefaultValue,
  userPublicLinkDefaultValue,
  userAddressDefaultValue,
  userPositionSelectDefaultValue,
  userPositionSelectItems,
  updateUser,
  mutate,
}: EditUserFormProps) {
  const t = useTranslations("users.EditUserForm");

  const { startTransition } = useUpdateUserTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updateUser,
    onSuccess: mutate,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-user-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserFullNameTextField defaultValue={userFullNameDefaultValue} />
        <UserBioTextField defaultValue={userBioDefaultValue} />
        <UserBirthdateDatePicker defaultValue={userBirthdateDefaultValue} />
        <UserPhoneNumberTextField defaultValue={userPhoneNumberDefaultValue} />
        <UserPublicLinkTextField defaultValue={userPublicLinkDefaultValue} />
        <UserAddressTextField defaultValue={userAddressDefaultValue} />
        <UserPositionSelect
          defaultSelectedKey={userPositionSelectDefaultValue}
          items={userPositionSelectItems}
        />

        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>

      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
