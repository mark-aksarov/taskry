"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
import { Key, useOverlayTrigger } from "react-aria";
import { Building2, Contact, Plus } from "lucide-react";
import { Item, useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface CustomerToolbarCreateNewMenuTriggerProps {
  newCustomerForm: React.ReactNode;
  newCompanyForm: React.ReactNode;
}

export function CustomerToolbarCreateNewMenuTrigger({
  newCustomerForm,
  newCompanyForm,
}: CustomerToolbarCreateNewMenuTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openCompanyModal, setOpenCompanyModal] = useState(false);

  function handleAction(key: Key) {
    if (key === "customer") {
      setOpenCustomerModal(true);
    } else if (key === "company") {
      setOpenCompanyModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>
            <DialogHeading>Create New</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        overlayClassName="md:min-w-[200px]"
        renderButton={() => (
          <Button
            {...triggerProps}
            label="Create New"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        )}
        placement="bottom right"
      >
        <Item textValue="Customer" key="customer">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth /> Customer
        </Item>
        <Item textValue="User" key="user">
          <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth /> Company
        </Item>
      </ResponsiveMenuTrigger>

      {/* render modals*/}
    </>
  );
}
