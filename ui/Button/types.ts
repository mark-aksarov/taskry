export type ButtonVariant =
  | "accent"
  | "primary"
  | "secondary"
  | "tertiary"
  | "contrast";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonOwnProps = {
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  label?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  outlined?: boolean;
  "data-test"?: string;
};
