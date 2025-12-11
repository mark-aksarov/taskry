import { Button, ButtonProps } from "@/components/ui";
import { ElementType } from "@/components/ui/Button/Button";

export function PaginationButton<T extends ElementType = "button">(
  props: Omit<ButtonProps<T>, "size">,
) {
  return (
    <Button
      className="justify-center rounded-full max-md:h-8 max-md:w-8 md:h-9 md:w-9"
      size="small"
      {...props}
    />
  );
}
