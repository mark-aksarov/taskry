import React from "react";

interface ModalPaginationStatusProps {
  page: number;
  pageSize: number;
  totalCount: number;
}

export function ModalPaginationStatus({
  page,
  pageSize,
  totalCount,
}: ModalPaginationStatusProps) {
  if (totalCount === 0) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <span
      role="status"
      aria-live="polite"
      className="text-sm font-semibold text-black dark:text-white"
    >
      Notifications {start}-{end} of {totalCount}
    </span>
  );
}
