import Image from "next/image";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex min-h-screen bg-white">
    <div className="hidden lg:block lg:w-1/2 relative">
      <Image
        src="/images/auth-hero.svg"
        alt="Hyppin Fashion"
        fill
        className="object-cover rounded-r-4xl"
        priority
      />
    </div>

    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
      <div className="w-full max-w-md space-y-8">
        {children}

        <p className="text-[10px] text-gray-400 leading-relaxed text-center lg:text-left mt-8">
          By creating an account or logging in, you agree with <br />
          Hyppin{" "}
          <span className="text-blue-600 underline cursor-pointer">
            T&C
          </span>{" "}
          and{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  </main>
);
