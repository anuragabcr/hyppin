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
import { toast } from "sonner";

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

            const additionalInfo = getAdditionalUserInfo(result);
            toast.success("Authentication successful!");

            if (additionalInfo?.isNewUser) {
              await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
              });
            }

            const profileRes = await fetch("/api/auth/me", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });

            const profile = await profileRes.json();

            const userData = {
              token,
              ...profile,
            };

            localStorage.setItem("hyppin_user", JSON.stringify(userData));

            if (additionalInfo?.isNewUser || !profile.profileCompleted) {
              router.push("/?onboarding=true");
            } else {
              router.push("/");
            }
          })
          .catch((error) => {
            console.error("Verification Error:", error);
            toast.error("Authentication failed. Please try again.");
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
