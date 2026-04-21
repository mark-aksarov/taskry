import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "@/dashboard/common/ResponsiveMenuTrigger";

export function ItemBaseActionMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom right"
      {...props}
    />
  );
}
