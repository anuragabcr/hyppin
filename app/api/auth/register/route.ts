import { adminAuth, db } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, name = "", phone = "" } = await request.json();
    console.log("Received registration request with token:", token);

    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();
    console.log("User document snapshot:", userSnap.exists);

    if (!userSnap.exists) {
      await userRef.set({
        uid,
        email,
        name: name || "",
        phone: phone || "",
        role: "BUYER",
        profileCompleted: Boolean(name || phone),
        createdAt: new Date().toISOString(),
        isActive: true,
      });

      await adminAuth.setCustomUserClaims(uid, { role: "BUYER" });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Auth API Error:", err.message);

    const status = err.message.includes("auth/") ? 401 : 500;
    return NextResponse.json(
      { error: status === 401 ? "Unauthorized" : "Internal Server Error" },
      { status },
    );
  }
}
