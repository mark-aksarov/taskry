import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/dashboard/common/ResponsiveDatePicker";

interface UserBirthdateDatePickerProps {
  defaultValue?: DateValue;
  matchTriggerWidth?: boolean;
}

export function UserBirthdateDatePicker({
  defaultValue,
  matchTriggerWidth = true,
}: UserBirthdateDatePickerProps) {
  const t = useTranslations("dashboard.users.UserBirthdateDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="user-birthdate-date-picker"
      name="birthdate"
      label={t("label")}
      overlayClassName={matchTriggerWidth ? "w-[var(--trigger-width)]" : ""}
      defaultValue={defaultValue}
    />
  );
}
