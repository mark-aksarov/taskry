import { cache } from "react";

export const getStorageUsage = cache(async () => {
  const storageLimit = 1024 * 1024 * 1024; // 1 GB
  return { used: 125, limit: storageLimit };
});
