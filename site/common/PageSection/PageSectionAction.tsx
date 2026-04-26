import { Button, ButtonProps, ElementType } from "@/ui/Button";

export function PageSectionAction<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  return (
    <Button
      size="large"
      className="justify-center rounded-xl py-3 max-sm:w-full"
      {...props}
    />
  );
}
