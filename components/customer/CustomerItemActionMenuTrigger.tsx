import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditCustomerModal } from "./EditCustomerModal";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";

export type CustomerItemActionMenuTriggerProps = {
  customerId: number;
  className?: string;
};

export function CustomerItemActionMenuTrigger({
  customerId,
  className,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);

  function handleAction(key: Key) {
    if (key === "edit") {
      setIsEditCustomerModalOpen(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger className={className} onAction={handleAction}>
        <Item textValue={t("edit")} key="edit">
          <Trash size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditCustomerModal
        isOpen={isEditCustomerModalOpen}
        onOpenChange={setIsEditCustomerModalOpen}
        customerId={customerId}
      />
    </>
  );
}
