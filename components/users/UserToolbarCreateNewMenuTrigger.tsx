"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
import { Key, useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { BriefcaseBusiness, Plus, Users } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface UserToolbarCreateNewMenuTriggerProps {
  newUserForm: React.ReactNode;
  newPositionForm: React.ReactNode;
}

export function UserToolbarCreateNewMenuTrigger({
  newUserForm,
  newPositionForm,
}: UserToolbarCreateNewMenuTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openPositionModal, setOpenPositionModal] = useState(false);

  function handleAction(key: Key) {
    if (key === "user") {
      setOpenUserModal(true);
    } else if (key === "position") {
      setOpenPositionModal(true);
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
          <Users size={16} strokeWidth={1.5} absoluteStrokeWidth /> User
        </Item>
        <Item textValue="User" key="user">
          <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Position
        </Item>
      </ResponsiveMenuTrigger>

      {/* render modals*/}
    </>
  );
}
