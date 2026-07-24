import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import React from "react";
import { ToastContainer } from "react-toastify";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
      <ToastContainer
        position="top-center"
        theme="light"
        style={{ zIndex: 99999 }}
      />
    </div>
  );
}
