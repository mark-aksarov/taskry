"use client";

import { Pagination } from "../Pagination";
import { NotificationModalContentStatus } from "@/components/notifications/NotificationModalContent";

export interface ModalPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  setPage: (page: number) => void;
}

export function ModalPagination({
  page,
  pageSize,
  totalPages,
  totalCount,
  setPage,
}: ModalPaginationProps) {
  return (
    <div className="flex w-full items-center justify-between">
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
    </div>
  );
}
