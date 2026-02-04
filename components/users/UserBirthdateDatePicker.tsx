import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface UserBirthdateDatePickerProps {
  defaultValue?: DateValue;
}

export function UserBirthdateDatePicker({
  defaultValue,
}: UserBirthdateDatePickerProps) {
  const t = useTranslations("users.UserBirthdateDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="birthdate-date-picker"
      name="birthdate"
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      defaultValue={defaultValue}
    />
  );
}
