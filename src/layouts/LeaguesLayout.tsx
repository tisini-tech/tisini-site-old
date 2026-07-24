import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import quizImage from "@/assets/img/quiz.jpeg";

const LeaguesLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Main container - removed overflow control from here */}
      <div className="mx-auto flex max-w-[1920px]">
        {/* Left Ad (sticky) */}
        <aside className="sticky top-0 hidden h-screen w-[160px] flex-shrink-0 lg:block">
          <div className="h-full py-2 px-2">
            <div className="h-full w-full rounded-lg border bg-card shadow-sm overflow-hidden">
              <div className="relative h-full w-full">
                <img
                  src="/rotated-tanobora.jpg"
                  alt="tanobora"
                  className="object-cover hidden"
                  sizes="160px"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Content container - now handles scrolling */}
        <div className="flex-1">
          {/* Top Ad (now properly sticky) */}
          <div className="sticky top-0 z-10 w-full bg-background py-2 shadow-sm">
            <div className="mx-auto w-full px-4">
              <div
                className="rounded-lg border bg-card text-center cursor-pointer"
                onClick={() => navigate("/quiz/GN88FDHhWw7n")}
              >
                {/* <div>Top Ad Banner (728x90 or similar)</div> */}
                {/* <img src="https://i.postimg.cc/GhzxYdYq/tanobora.jpg" alt="" /> */}
                <img
                  src={quizImage}
                  alt="tanobora"
                  height={100}
                  width={500}
                  className="object-cover w-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Scrollable content area */}
          <main className="overflow-y-auto">
            <div className="mx-auto w-full px-4">
              {/* <Navbar /> */}
              {children}
            </div>
          </main>
        </div>

        {/* Right Ad (sticky) */}
        <aside className="sticky top-0 hidden h-screen w-[160px] flex-shrink-0 lg:block">
          <div className="h-full py-2 px-2">
            <div className="h-full w-full rounded-lg border bg-card p-4 shadow-sm">
              {/* <div className="h-full w-full">Right Ad Space</div> */}
              <img
                src="/rotated-tanobora.jpg"
                alt="tanobora"
                className="object-cover hidden"
                sizes="160px"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LeaguesLayout;
