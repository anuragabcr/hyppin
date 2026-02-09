import { FirebaseError } from "firebase-admin";
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

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    const decoded = await adminAuth.verifyIdToken(token);

    const items: CartItem[] = await req.json();
    const cartRef = db.collection("users").doc(decoded.uid).collection("cart");

    const batch = db.batch();

    const existingSnap = await cartRef.get();
    existingSnap.docs.forEach((doc) => batch.delete(doc.ref));

    items.forEach((item) => {
      const docRef = cartRef.doc(item.id);
      batch.set(docRef, { ...item, updatedAt: new Date().toISOString() });
    });

    await batch.commit();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Cart API Error:", error);

    if (error && typeof error === "object" && "code" in error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code === "auth/id-token-expired") {
        return NextResponse.json(
          { error: "Token expired", code: "TOKEN_EXPIRED" },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
