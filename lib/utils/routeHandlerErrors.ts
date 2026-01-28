import { NextResponse } from "next/server";

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export const internalServerError = () =>
  NextResponse.json({ error: "Internal server error" }, { status: 500 });

export const badRequest = (error: string) =>
  NextResponse.json({ error }, { status: 400 });
