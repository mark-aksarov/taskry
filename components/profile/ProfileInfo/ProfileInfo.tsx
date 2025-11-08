"use client";

import { useMemo } from "react";
import {
  DetailInfo,
  DetailText,
  DetailTitle,
  DetailRow,
  DetailInfoSkeleton,
} from "@/components/common/Detail";

export interface ProfileInfoData {
  id: string;
  fullName?: string | null;
  bio?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  publicLink?: string | null;
  birthdate?: string | Date | null;
  position?: {
    name?: string | null;
  } | null;
}

export interface ProfileInfoProps {
  user?: ProfileInfoData;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const formattedBirthdate = useMemo(() => {
    if (!user?.birthdate) return null;
    try {
      const date = new Date(user.birthdate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, [user?.birthdate]);

  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      {/* Bio */}
      <DetailRow className={rowStyles}>
        {!user ? (
          <DetailInfoSkeleton />
        ) : (
          <DetailInfo>
            <DetailTitle>Bio</DetailTitle>
            <DetailText>
              {user.bio || "This user hasn’t written a bio yet."}
            </DetailText>
          </DetailInfo>
        )}
      </DetailRow>

      {/* Full name & Position */}
      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Full name</DetailTitle>
              <DetailText>{user.fullName || "No name provided"}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Position</DetailTitle>
              <DetailText>
                {user.position?.name || "Position not specified"}
              </DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      {/* Email & Phone */}
      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Email address</DetailTitle>
              <DetailText>{user.email || "No email provided"}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Phone number</DetailTitle>
              <DetailText>
                {user.phoneNumber || "No phone number provided"}
              </DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      {/* Address & Public link */}
      <DetailRow className={rowStyles}>
        {!user ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Address</DetailTitle>
              <DetailText>
                {user.address || "No address information available"}
              </DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Public link</DetailTitle>
              <DetailText>
                {user.publicLink ||
                  "This user doesn’t have a public profile link"}
              </DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      {/* Birthdate */}
      <DetailRow className={rowStyles}>
        {!user ? (
          <DetailInfoSkeleton className="border-none" />
        ) : (
          <DetailInfo className="border-none">
            <DetailTitle>Date of birth</DetailTitle>
            <DetailText>
              {formattedBirthdate || "Birthdate not specified"}
            </DetailText>
          </DetailInfo>
        )}
      </DetailRow>
    </div>
  );
}
