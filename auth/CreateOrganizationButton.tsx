"use client";

import { Button } from "@/ui/Button";
import { useTransition } from "react";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";
import { createOrganization } from "@/lib/actions/auth/createOrganization";

export function CreateOrganizationButton() {
  const t = useTranslations("auth.CreateOrganizationButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();

  const handlePress = () => {
    startTransition(async () => {
      const result = await createOrganization();

      if (result.status === "error") {
        addErrorToast(result.message!);
        return;
      }
    });
  };

  return (
    <Button
      outlined
      variant="primary"
      isPending={isPending}
      className="justify-center py-4"
      onPress={handlePress}
      iconLeft={<PlusCircle size={18} />}
      label={t("label")}
      size="medium"
    />
  );
}
