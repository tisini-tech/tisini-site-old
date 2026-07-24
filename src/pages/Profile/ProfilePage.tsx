import { privateAxios } from "@/lib/api";
import { type UserProfileType } from "@/lib/types/profile";
import React from "react";
import { FluentEmojiHighContrastTelephone } from "@/components/icons";
import { LucideChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Transaction {
  id: string;
  date_created: string;
  description: string;
  debit_amount: string;
  credit_amount: string;
  payment_date: string;
  name: string;
}

function ProfilePage() {
  const navigate = useNavigate();
  const joinNonNull = (...args: any[]) => args.filter((str) => !!str).join(" ");
  // const { auth } = useAppSelector((state) => state.persist);
  const [profile, setProfile] = React.useState<UserProfileType>(
    {} as UserProfileType
  );

  const hidden = (str: string, from: number, to: number) => {
    return (str || "")
      .split("")
      .map((it, idx) => (idx <= from || idx >= to ? it : "*"))
      .join("");
  };

  const fetchUserProfile = React.useCallback(async () => {
    const u_profile = await privateAxios.get(`/users/me`);
    setProfile((prev) => ({
      ...prev,
      ...(u_profile.data as unknown as UserProfileType[])[0],
    }));
  }, []);

  React.useEffect(() => {
    fetchUserProfile();
  }, []);
  const image =
    "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="grid gap-4 p-4 max-w-7xl mx-auto">
      <div>
        <button
          className="flex items-center hover:underline"
          onClick={() => navigate(-1)}
        >
          <LucideChevronLeft /> Go back
        </button>
      </div>
      <div className="border shadow-sm">
        <div
          className="h-32 bg-cover relative bg-slate-600 bg-blend-overlay bg-center mb-8"
          style={{ backgroundImage: `url(${image})` }}
        >
          {" "}
          <img
            src="https://avatar.iran.liara.run/public"
            className="border-4 border-white w-20 h-20 rounded-full absolute -bottom-10 left-5"
            alt=""
          />
        </div>

        <div className="p-4">
          <h1 className="text-blue-500 hover:underline cursor-pointer">
            @{profile.nickname}
          </h1>
          <div>{joinNonNull(profile.first_name, profile.last_name)}</div>
          <div className="flex items-center gap-2">
            <FluentEmojiHighContrastTelephone scale={3} />
            <span>{hidden(profile.phone_number, 3, 8)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
