import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "../ResponsiveMenuTrigger";

export function ItemBaseActionMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom right"
      {...props}
    />
  );
}
