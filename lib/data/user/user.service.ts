import {
  UpdateUserInputDTO,
  CreateUserInputDTO,
  ResetPasswordInputDTO,
  ChangePasswordInputDTO,
  UpdateUserImageUrlInputDTO,
} from "./user.dto";

import crypto from "crypto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { validatePositions, validateUsers } from "../utils/validation";

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
  await validateUsers(workspaceId, [input.id]);

  // Validate position
  if (input.positionId) {
    await validatePositions(workspaceId, [input.positionId]);
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
  await validateUsers(workspaceId, [input.id]);

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
    user: { id: userId, workspaceId },
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

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to reset password.",
    );
  }

  // Validate updated user. Since we use the better-auth API, we need to check users in the database directly.
  await validateUsers(workspaceId, [input.id]);

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
  await validateUsers(workspaceId, [deletedUserId]);

  // Use better auth admin api to delete user
  const deletedUser = await auth.api.removeUser({
    body: {
      userId: deletedUserId,
    },
    headers: await headers(),
  });

  return deletedUser;
};
