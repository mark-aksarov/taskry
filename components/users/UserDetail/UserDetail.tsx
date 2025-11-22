"use client";

import { useMemo } from "react";
import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import { UserDetailLayout } from "./UserDetailLayout";

interface UserDetailProps {
  id: string;
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: Date;
  position?: {
    name: string;
  };
}

export function UserDetail({
  fullName,
  bio,
  email,
  phoneNumber,
  address,
  publicLink,
  birthdate,
  position,
}: UserDetailProps) {
  const formattedBirthdate = useMemo(() => {
    if (!birthdate) return null;
    try {
      const date = new Date(birthdate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, [birthdate]);

  return (
    <UserDetailLayout
      bioSlot={
        <DetailInfo>
          <DetailTitle>Bio</DetailTitle>
          <DetailText>
            {bio || "This user hasn’t written a bio yet."}
          </DetailText>
        </DetailInfo>
      }
      fullNameSlot={
        <DetailInfo>
          <DetailTitle>Full name</DetailTitle>
          <DetailText>{fullName || "No name provided"}</DetailText>
        </DetailInfo>
      }
      positionSlot={
        <DetailInfo>
          <DetailTitle>Position</DetailTitle>
          <DetailText>{position?.name || "Position not specified"}</DetailText>
        </DetailInfo>
      }
      emailSlot={
        <DetailInfo>
          <DetailTitle>Email address</DetailTitle>
          <DetailText>{email || "No email provided"}</DetailText>
        </DetailInfo>
      }
      phoneNumberSlot={
        <DetailInfo>
          <DetailTitle>Phone number</DetailTitle>
          <DetailText>{phoneNumber || "No phone number provided"}</DetailText>
        </DetailInfo>
      }
      addressSlot={
        <DetailInfo>
          <DetailTitle>Address</DetailTitle>
          <DetailText>
            {address || "No address information available"}
          </DetailText>
        </DetailInfo>
      }
      publicLinkSlot={
        <DetailInfo>
          <DetailTitle>Public link</DetailTitle>
          <DetailText>
            {publicLink || "This user doesn’t have a public profile link"}
          </DetailText>
        </DetailInfo>
      }
      birthdateSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>Date of birth</DetailTitle>
          <DetailText>
            {formattedBirthdate || "Birthdate not specified"}
          </DetailText>
        </DetailInfo>
      }
    />
  );
}
