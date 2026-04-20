import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "./ResponsiveMenuTrigger";

export function ActionsMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      {...props}
    />
  );
}
