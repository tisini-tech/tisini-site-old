import React from "react";
import Loginpage from "../Login/Loginpage";
import RegisterPage from "../Register/RegisterPage";
import { useSearchParams } from "react-router-dom";
type Tabs = "login" | "register";
const AppAuth = () => {
  const [tabs, setTabs] = React.useState<Tabs>("login");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const [_, setActiveTab] = React.useState<Tabs>("login");
  //   const params = Object.fromEntries(useSearchParams().entries)//("tab") as Tabs;
  const [SearchParams,setSearchParams] = useSearchParams();
  const tab = SearchParams.get("tab") as Tabs;

  React.useEffect(() => {
    if (tab) {
      setTabs(tab);
      setActiveTab(tab);
      setSearchParams({tab});
    }
  }, [tab]);

  return (
    // tailwindcss

    tabs === "login" ? (
      <Loginpage setTabs={setTabs} />
    ) : (
      <RegisterPage setTabs={setTabs} />
    )
  );
};

export default AppAuth;
