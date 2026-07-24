import { cn } from "@/lib/cn";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function MaxWidthWrapper({ children, className }: Props) {
  return (
    <div className={cn("container mx-auto w-full", className)}>{children}</div>
  );
}
