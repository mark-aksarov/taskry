"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Contact } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { CreateNewMenuTrigger } from "@/dashboard/common/CreateNewMenuTrigger";

interface CreateClientMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateClientMenuTrigger({
  renderButton,
}: CreateClientMenuTriggerProps) {
  const t = useTranslations("dashboard.clients.CreateClientMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create company modal state
  const { onOpenChange: onCreateCompanyModalOpenChange } =
    useModal("createCompany");

  // Create client modal state
  const { onOpenChange: onCreateClientModalOpenChange } =
    useModal("createClient");

  /**
   * Handles menu actions for creating a client or company
   * - If user is a guest, show guest modal
   * - Otherwise, open create company modal or create client modal
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "client") {
        onCreateClientModalOpenChange(true);
      } else if (key === "company") {
        onCreateCompanyModalOpenChange(true);
      }
    });
  }

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={renderButton}
      >
        <Item textValue={t("items.client")} key="client">
          <Contact    />
          {t("items.client")}
        </Item>
        <Item textValue={t("items.company")} key="company">
          <Building2    />
          {t("items.company")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
