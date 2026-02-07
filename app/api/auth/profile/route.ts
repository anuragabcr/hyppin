import { adminAuth, db } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { token, name, phone, dob, gender } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const userRef = db.collection("users").doc(uid);

    const updatePayload = {
      name: name || "",
      phone: phone || "",
      dob: dob || "",
      gender: gender || "",
      profileCompleted: true,
      updatedAt: new Date().toISOString(),
    };

    await userRef.update(updatePayload);

    return NextResponse.json({
      success: true,
      profile: updatePayload,
    });
  } catch (err) {
    console.error("Profile API Error:", err);

    return NextResponse.json(
      { error: "Unauthorized or invalid request" },
      { status: 401 },
    );
  }
}
