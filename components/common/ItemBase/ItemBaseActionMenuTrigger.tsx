import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "../ResponsiveMenuTrigger";

export function ItemBaseActionMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return <ResponsiveMenuTrigger {...props} placement="bottom right" />;
}
