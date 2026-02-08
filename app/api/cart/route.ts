import { adminAuth, db } from "../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: unknown;
}

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token!);

  const snap = await db
    .collection("users")
    .doc(decoded.uid)
    .collection("cart")
    .get();

  return NextResponse.json(snap.docs.map((d) => d.data()));
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token!);

  const items: CartItem[] = await req.json();

  const ref = db.collection("users").doc(decoded.uid).collection("cart");

  const existing = await ref.get();
  await Promise.all(existing.docs.map((d) => d.ref.delete()));

  await Promise.all(items.map((item: CartItem) => ref.doc(item.id).set(item)));

  return NextResponse.json({ success: true });
}
