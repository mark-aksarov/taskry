export function getPageParams({
  page,
  pageSize,
  defaultPage = 1,
  defaultPageSize = 20,
}: {
  page?: string | number;
  pageSize?: string | number;
  defaultPage?: number;
  defaultPageSize?: number;
}) {
  return {
    page: Number(page) || defaultPage,
    pageSize: Number(pageSize) || defaultPageSize,
  };
}
