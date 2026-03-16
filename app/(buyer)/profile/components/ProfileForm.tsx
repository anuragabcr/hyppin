"use client";

import { useEffect, useState } from "react";
import { ProfileField } from "./ProfileField";
import { toast } from "sonner";

type Profile = {
  name: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: string;
};

export const ProfileForm = () => {
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("hyppin_user") || "{}");

    if (!localUser?.token) return;

    fetch("/api/auth/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localUser.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        const mapped: Profile = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          dob: data.dob || "",
          gender: data.gender || "",
        };

        setOriginalProfile(mapped);
        setProfile(mapped);
      });
  }, []);

  if (!profile || !originalProfile) return null;

  const isDirty = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  const updateField = (key: keyof Profile, value: string) => {
    setProfile((prev) => prev && { ...prev, [key]: value });
  };

  const handleSave = async () => {
    setLoading(true);

    const localUser = JSON.parse(localStorage.getItem("hyppin_user") || "{}");

    try {
      await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localUser.token,
          ...profile,
        }),
      });

      setOriginalProfile(profile);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setProfile(originalProfile);
  };

  return (
    <form className="max-w-4xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField
          label="Full Name"
          value={profile.name}
          onChange={(v) => updateField("name", v)}
        />

        <ProfileField label="Email ID" value={profile.email} disabled />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField
          label="Mobile Number"
          value={profile.phone}
          onChange={(v) => updateField("phone", v)}
        />

        <ProfileField
          label="Date of birth"
          value={profile.dob || ""}
          onChange={(v) => updateField("dob", v)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField
          label="Gender"
          value={profile.gender || ""}
          isSelect
          onChange={(v) => updateField("gender", v)}
        />
      </div>

      {isDirty && (
        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-10 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="px-10 py-3 border border-gray-300 rounded-xl text-sm font-semibold"
          >
            Back
          </button>
        </div>
      )}
    </form>
  );
};
