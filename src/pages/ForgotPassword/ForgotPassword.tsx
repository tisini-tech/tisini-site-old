/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React from "react";
import { GetOtp } from "./GetOtp";
import SubmitPassword from "./SubmitPassword";


// type Props = {
//   setTabs: React.Dispatch<React.SetStateAction<"login" | "register">>;
// };
export default function ForgotPassword() {
  const [currentTab, setCurrentTab] = React.useState<"OTP" | "PASSWORD">("OTP");
  return (
      currentTab === "OTP" ? (
          <GetOtp setCurrentTab={setCurrentTab} />
      ) : (
          <SubmitPassword setCurrentTab={setCurrentTab} />
      )
  );
}
