import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";

export function SearchModalDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("search.SearchModal");

  return <DialogHeader className="max-md:hidden">{children}</DialogHeader>;
}
