import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface UserFormBaseBirthdateDatePickerProps {
  defaultValue?: DateValue;
}

export function UserFormBaseBirthdateDatePicker({
  defaultValue,
}: UserFormBaseBirthdateDatePickerProps) {
  const t = useTranslations("users.UserFormBaseBirthdateDatePicker");

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
