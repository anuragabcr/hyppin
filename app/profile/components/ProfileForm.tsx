import { ProfileField } from "./ProfileField";

export const ProfileForm = () => {
  const handleChange = (field: string) => {
    console.log(`Request to change ${field}`);
  };

  return (
    <form className="max-w-4xl space-y-8">
      {/* Row 1: Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField label="First Name" value="Jane" />
        <ProfileField label="Last Name" value="Doe" />
      </div>

      {/* Row 2: Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField
          label="Email ID"
          value="janedoe20230@gmail.com"
          onChangeAction={() => handleChange("email")}
        />
        <ProfileField
          label="Mobile Number"
          value="9191922000"
          onChangeAction={() => handleChange("mobile")}
        />
      </div>

      {/* Row 3: Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileField label="Date of birth" value="Jane Doe" />
        {/* Note: In your image DOB value says Jane Doe, adjust as needed */}
        <ProfileField label="Gender" value="Female" isSelect />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="px-10 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors"
        >
          Save Details
        </button>
      </div>
    </form>
  );
};
