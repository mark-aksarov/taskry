"use client";

import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import { CustomerDetailLayout } from "./CustomerDetailLayout";

interface CustomerDetailProps {
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  company?: {
    name: string;
  };
}

export function CustomerDetail({
  bio,
  fullName,
  email,
  phoneNumber,
  publicLink,
  company,
}: CustomerDetailProps) {
  return (
    <CustomerDetailLayout
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
      publicLinkSlot={
        <DetailInfo className="md:border-none md:pb-0">
          <DetailTitle>Public link</DetailTitle>
          <DetailText>
            {publicLink || "This user doesn’t have a public profile link"}
          </DetailText>
        </DetailInfo>
      }
      companySlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>Position</DetailTitle>
          <DetailText>{company?.name || "Company not specified"}</DetailText>
        </DetailInfo>
      }
    />
  );
}
