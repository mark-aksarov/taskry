"use client";

import { NotificationFilter } from "../types";
import { MarkAllAsReadButton } from "../MarkAllAsReadButton";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { NotificationModalActions } from "./NotificationModalActions";
import { ModalPagination } from "@/components/common/ModalPagination";
import { ActionFn, ActionState, MarkAsReadPayload } from "@/lib/actions/types";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

interface NotificationModalContentProps {
  guestMode?: boolean;
  notificationList: React.ReactNode;
  totalCount: number;
  unreadCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filter: NotificationFilter;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<NotificationFilter>>;
  markAsReadAction: ActionFn<ActionState, MarkAsReadPayload>;
  mutate: () => void;
}

export function NotificationModalContent({
  guestMode,
  notificationList,
  totalCount,
  unreadCount,
  page,
  pageSize,
  totalPages,
  filter,
  setPage,
  setFilter,
  markAsReadAction,
  mutate,
}: NotificationModalContentProps) {
  return (
    <>
      <DialogBody className="p-0!">
        <NotificationModalActions>
          <NotificationFilterToggleButtonGroup
            notificationsCount={totalCount}
            unreadCount={unreadCount}
            selectedKeys={[filter]}
            onSelectionChange={(keys) => {
              setPage(1);
              setFilter([...keys][0] as NotificationFilter);
            }}
          />
          <MarkAllAsReadButton
            guestMode={guestMode}
            markAsReadAction={markAsReadAction}
            mutate={mutate}
          />
        </NotificationModalActions>

        {notificationList}
      </DialogBody>

      {totalPages > 1 && (
        <DialogFooter>
          <ModalPagination
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            totalPages={totalPages}
            setPage={setPage}
          />
        </DialogFooter>
      )}
    </>
  );
}
