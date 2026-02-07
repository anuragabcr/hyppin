import { adminAuth, db } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const decoded = await adminAuth.verifyIdToken(token);

  const snap = await db.collection("users").doc(decoded.uid).get();

  if (!snap.exists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    uid: decoded.uid,
    email: decoded.email,
    ...snap.data(),
  });
}
