import { SelectProps } from "@/components/ui";
import { ResponsiveSelect } from "../ResponsiveSelect";

export function DetailFormSelect<T extends object = any>(
  props: SelectProps<T>,
) {
  return (
    <ResponsiveSelect
      overlayClassName="w-[var(--trigger-width)]"
      className="flex-row items-center"
      buttonClassName="py-3"
      {...props}
    />
  );
}
