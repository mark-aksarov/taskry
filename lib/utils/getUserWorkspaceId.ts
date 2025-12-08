import { auth } from "../auth";
import { headers } from "next/headers";
import { getWorkspaceIdByUserId } from "../queries/workspace";

export async function getUserWorkspaceId() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session");
    }

    const workspaceId = await getWorkspaceIdByUserId(session.user.id);

    if (!workspaceId) {
      throw new Error("Workspace not found for user");
    }

    return workspaceId;
  } catch (err) {
    console.error("[getUserWorkspaceId] Error:", err);
    throw err;
  }
}
