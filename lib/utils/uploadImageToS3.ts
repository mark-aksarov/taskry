import { CreatePresignedUrlState } from "../actions/types";
import { createPresignedUrl } from "../actions/s3/createPresignedUrl";

export async function uploadImageToS3(
  blob: Blob,
): Promise<CreatePresignedUrlState> {
  /**
   * Step 1: Create presigned URL
   */
  const createUrlState = await createPresignedUrl();

  if (createUrlState.status === "error") {
    return {
      status: "error",
      message: createUrlState.message,
    };
  }

  const { url, fields } = createUrlState.presignedPost!;

  /**
   * Step 2: Upload image to S3
   */
  const formData = new FormData();

  for (const key in fields) {
    formData.append(key, fields[key]);
  }

  formData.append("file", blob);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // HTTP error (400 / 500)
    if (!response.ok) {
      return { status: "error" };
    }
  } catch {
    // network / CORS error
    return { status: "error" };
  }

  return createUrlState;
}
