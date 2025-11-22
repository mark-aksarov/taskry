import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "@/lib/queries/user";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const task = await getUserDetails(id);
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
