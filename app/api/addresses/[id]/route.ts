import { adminAuth, db } from "../../../lib/firebaseAdmin";
import { NextResponse, NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);

    const body = await req.json();

    const { id: _, ...updateData } = body;

    await db
      .collection("users")
      .doc(decoded.uid)
      .collection("addresses")
      .doc(id)
      .update(updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update address! try again" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);

    await db
      .collection("users")
      .doc(decoded.uid)
      .collection("addresses")
      .doc(id)
      .delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "failed to delete address! try again" },
      { status: 500 },
    );
  }
}
