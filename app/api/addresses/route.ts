import { adminAuth, db } from "../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const decoded = await adminAuth.verifyIdToken(token!);

  const snap = await db
    .collection("users")
    .doc(decoded.uid)
    .collection("addresses")
    .orderBy("createdAt", "desc")
    .get();

  return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token!);

  const body = await req.json();

  const ref = db.collection("users").doc(decoded.uid).collection("addresses");

  const doc = await ref.add({
    ...body,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ id: doc.id });
}
