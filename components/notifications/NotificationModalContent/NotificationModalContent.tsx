import { NotificationFilter } from "../types";
import { DialogBody, DialogFooter } from "@/components/ui";
import { Pagination } from "@/components/common/Pagination";
import { NotificationModalContentStatus } from "./NotificationModalContentStatus";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

interface NotificationModalContentProps {
  notificationList: React.ReactNode;
  totalCount: number;
  unreadCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filter: NotificationFilter;
  setFilter: React.Dispatch<React.SetStateAction<NotificationFilter>>;
}

export function NotificationModalContent({
  notificationList,
  totalCount,
  unreadCount,
  page,
  pageSize,
  totalPages,
  setPage,
  filter,
  setFilter,
}: NotificationModalContentProps) {
  return (
    <>
      <DialogBody className="p-0!">
        <NotificationFilterToggleButtonGroup
          notificationsCount={totalCount}
          unreadCount={unreadCount}
          selectedKeys={[filter]}
          onSelectionChange={(keys) => {
            setPage(1);
            setFilter([...keys][0] as NotificationFilter);
          }}
        />

        {notificationList}
      </DialogBody>

      {totalPages > 1 && (
        <DialogFooter className="justify-between">
          <NotificationModalContentStatus
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
            showPageItems={false}
          />
        </DialogFooter>
      )}
    </>
  );
}
