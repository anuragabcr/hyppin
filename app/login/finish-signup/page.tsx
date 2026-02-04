"use client";
import { useEffect } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";
import { app } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function FinishSignUp() {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem("emailForSignIn");

            const token = await result.user.getIdToken();
            const userData = {
              uid: result.user.uid,
              email: result.user.email,
              token: token,
            };

            const additionalInfo = getAdditionalUserInfo(result);
            console.log("Additional User Info:", additionalInfo);
            console.log("User Data:", userData);
            console.log("Result:", result);

            if (additionalInfo?.isNewUser) {
              localStorage.setItem("hyppin_user", JSON.stringify(userData));
              router.push("/?onboarding=true");
            } else {
              localStorage.setItem("hyppin_user", JSON.stringify(userData));
              router.push("/");
            }
          })
          .catch((error) => {
            console.error("Verification Error:", error);
            router.push("/login");
          });
      }
    }
  }, [auth, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-[#f0bd49]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mr-3"></div>
      <span className="font-bold text-gray-900">Authenticating...</span>
    </div>
  );
}
