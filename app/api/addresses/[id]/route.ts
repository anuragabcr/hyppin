import { adminAuth, db } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token!);

  const body = await req.json();

  await db
    .collection("users")
    .doc(decoded.uid)
    .collection("addresses")
    .doc(params.id)
    .update(body);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token!);

  await db
    .collection("users")
    .doc(decoded.uid)
    .collection("addresses")
    .doc(params.id)
    .delete();

  return NextResponse.json({ success: true });
}
