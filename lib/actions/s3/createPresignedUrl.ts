"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { CreatePresignedUrlState } from "../types";
import { getTranslations } from "next-intl/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function createPresignedUrl(
  _prevState: CreatePresignedUrlState,
): Promise<CreatePresignedUrlState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  if (
    !process.env.S3_ACCESS_KEY ||
    !process.env.S3_SECRET_KEY ||
    !process.env.S3_REGION ||
    !process.env.S3_ENDPOINT ||
    !process.env.S3_BUCKET
  ) {
    return {
      status: "error",
      message: t("createPresignedUrl.error.internalServerError"),
    };
  }

  try {
    //https://yandex.cloud/ru/docs/storage/operations/objects/link-for-upload
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      // URL looks like https://storage.yandexcloud.net/bucket
      // instead of https://bucket.storage.yandexcloud.net
      forcePathStyle: true,
    });

    const presignedPost = await createPresignedPost(s3Client, {
      Bucket: process.env.S3_BUCKET,
      Key: crypto.randomUUID(),
      Conditions: [
        ["content-length-range", 1, 200 * 1024],
        { "Content-Type": "image/*" },
      ],
      Fields: {
        "Content-Type": "image/*",
      },
      Expires: 60,
    });

    return {
      status: "success",
      presignedPost,
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("createPresignedUrl.error.internalServerError"),
    };
  }
}
