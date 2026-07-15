import {
  UpdateUserInputDTO,
  CreateUserInputDTO,
  ChangePasswordInputDTO,
  UpdateUserImageUrlInputDTO,
  ResetPasswordInputDTO,
} from "./user.dto";

import crypto from "crypto";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { requireSession } from "../utils/requireSession";
import { AccessDeniedError, NotFoundError } from "../utils/error";

export const createUser = async (input: CreateUserInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to create user.");
  }

  // Create user
  const { user } = await auth.api.createUser({
    body: {
      email: input.email,
      password: crypto.randomBytes(12).toString("base64"),
      name: input.fullName,
      role: "user",

      data: {
        workspaceId,
        emailVerified: true,
      },
    },
  });

  await auth.api.requestPasswordReset({
    body: {
      email: input.email,
      redirectTo: `/accept-invite?email=${input.email}`,
    },
  });

  return user;
};

export const updateUser = async (input: UpdateUserInputDTO) => {
  // Authorization
  const {
    user: { id: userId, role, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["update"],
      },
    },
  });

  if (!permission.success || (role === "user" && userId !== input.id)) {
    throw new AccessDeniedError("You do not have permission to update user.");
  }

  // Validate updated user. Since we use the better-auth API, we must check workspace here.
  await validateUser(workspaceId, input.id);

  // Validate position
  if (input.positionId) {
    await validatePosition(workspaceId, input.positionId);
  }

  // Use better auth admin api to update user
  const updatedUser = await auth.api.adminUpdateUser({
    body: {
      userId: input.id,
      data: {
        positionId: input.positionId,
        name: input.fullName,
        bio: input.bio,
        address: input.address,
        phoneNumber: input.phoneNumber,
        birthdate: input.birthdate ? new Date(input.birthdate) : null,
        publicLink: input.publicLink,
      },
    },
    headers: await headers(),
  });

  return updatedUser;
};

export const updateUserImageUrl = async (input: UpdateUserImageUrlInputDTO) => {
  // Authorization
  const {
    user: { id: userId, role, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["update"],
      },
    },
  });

  if (!permission.success || (role === "user" && userId !== input.id)) {
    throw new AccessDeniedError("You do not have permission to update user.");
  }

  // Validate updated user. Since we use the better-auth API, we must check workspace here.
  await validateUser(workspaceId, input.id);

  // Use better auth admin api to update user
  const updatedUser = await auth.api.adminUpdateUser({
    body: {
      userId: input.id,
      data: {
        imageUrl: input.imageUrl,
      },
    },
    headers: await headers(),
  });

  return updatedUser;
};

export const resetPassword = async (input: ResetPasswordInputDTO) => {
  // Authorization
  const {
    user: { id: userId, role, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["reset-password"],
      },
    },
  });

  if (!permission.success || (role === "user" && userId !== input.id)) {
    throw new AccessDeniedError(
      "You do not have permission to change password.",
    );
  }

  // Validate updated user. Since we use the better-auth API, we need to check users in the database directly.
  await validateUser(workspaceId, input.id);

  // Use better auth admin api to update user
  const updatedUser = await auth.api.setUserPassword({
    body: {
      userId: input.id,
      newPassword: input.newPassword,
    },
    headers: await headers(),
  });

  return updatedUser;
};

export const changePassword = async (input: ChangePasswordInputDTO) => {
  // Authorization
  const {
    user: { id: userId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["change-password"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to change password.",
    );
  }

  // Use better auth admin api to update user
  const updatedUser = await auth.api.changePassword({
    body: {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    },
    headers: await headers(),
  });

  return updatedUser;
};

export const deleteUser = async (deletedUserId: string) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to delete user.");
  }

  // Validate deleted user. Since we use the better-auth API, we need to check users in the database directly.
  await validateUser(workspaceId, deletedUserId);

  // Use better auth admin api to delete user
  const deletedUser = await auth.api.removeUser({
    body: {
      userId: deletedUserId,
    },
    headers: await headers(),
  });

  return deletedUser;
};

/**
 * HELPERS
 */

// Validate that position exists and belongs to the workspace
async function validatePosition(workspaceId: number, positionId: number) {
  const position = await prisma.position.findUnique({
    where: { id: positionId },
    select: { workspaceId: true },
  });

  if (!position) {
    throw new NotFoundError("Position not found", "positionNotFound");
  }

  if (position.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Position access denied");
  }
}

// Validate that user exists and belongs to the workspace
async function validateUser(workspaceId: number, userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      workspaceId: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found", "userNotFound");
  }

  if (user.workspaceId !== workspaceId) {
    throw new AccessDeniedError("User access denied");
  }
}
