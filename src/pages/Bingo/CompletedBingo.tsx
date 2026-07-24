import { BingoItem } from "./BingoPage";
import React, { forwardRef } from "react";
import tisiniLogo from "@/assets/img/tisini.png";
import { CheckCircle, TrophyIcon } from "lucide-react";

type CompletedBingoProps = {
  data: BingoItem[];
  completedCount: number;
  bingoLines: number;
  bingoType: string;
};

export const CompletedBingo = forwardRef<HTMLElement, CompletedBingoProps>(
  ({ data, completedCount, bingoLines, bingoType }, ref) => {
    const FREE_SPACE_INDEX = 12;

    const achievements = {
      hasBlackout: completedCount === 25,
      hasFiveInRow: bingoLines > 0,
      hasHalfway: completedCount >= 13,
      hasFirstLine: bingoLines >= 1,
    };

    const bingoTitle = bingoType === "football" ? "Football" : "Rugby";

    return (
      <main
        ref={ref}
        className="max-w-6xl mx-auto p-2 sm:p-3 md:p-4 my-4 sm:my-6 md:my-12 rounded-lg relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6%, transparent 6%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 7%, transparent 7%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 8%, transparent 8%), linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)",
        }}
      >
        {/* subtle diagonal overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 14px)",
          }}
        />

        <header className="grid grid-cols-3 items-center justify-between gap-2 sm:gap-3 md:gap-4 px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4">
          {/* Left: Year/Football Text */}
          <div className="text-lg md:text-2xl lg:text-3xl text-left font-extrabold text-white leading-tight drop-shadow-sm">
            <h1>2025</h1>
            <h1>Kenyan</h1>
            <h1>{bingoTitle}</h1>
          </div>

          {/* Center: BINGO Title */}
          <div className="relative text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-yellow-300"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.45)",
                fontFamily: "'Impact', sans-serif",
                lineHeight: "1.1",
              }}
            >
              BINGO
            </h2>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent bottom-1 sm:bottom-2" />
          </div>

          {/* Right: Logo */}
          <div className="flex justify-end">
            <img
              src={tisiniLogo}
              alt="TISINI"
              className="h-14 sm:h-16 md:h-32 w-auto drop-shadow-lg"
            />
          </div>
        </header>

        {/* scores section */}
        <section>
          <p className="text-center text-white text-sm sm:text-base md:text-lg font-bold px-2 mb-3 sm:mb-4">
            You are a true Kenyan {bingoTitle} fan!
          </p>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-green-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                  {completedCount}/25
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Squares Marked
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                  {bingoLines}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Bingo Lines
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                  {Math.round((completedCount / 25) * 100)}%
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Completion
                </div>
              </div>
              <div className="text-center">
                <TrophyIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto text-yellow-500" />
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">
                  Level:{" "}
                  {completedCount >= 20
                    ? "Legend"
                    : completedCount >= 15
                    ? "Pro"
                    : "Fan"}
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {achievements.hasFiveInRow && (
                <span
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🎯 5 in a Row
                </span>
              )}
              {achievements.hasBlackout && (
                <span
                  className="bg-gradient-to-r from-yellow-600 to-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  ⭐ Full Blackout
                </span>
              )}
              {achievements.hasHalfway && (
                <span
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🏁 Halfway There
                </span>
              )}
              {achievements.hasFirstLine && (
                <span
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                  style={{ margin: "0 3px" }}
                >
                  🥇 First Bingo
                </span>
              )}
            </div>
          </div>
        </section>

        {/* bingo items section */}
        <div className="bg-black/30 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-2 sm:p-3 md:p-4 lg:p-6 mb-4 sm:mb-6 md:mb-8 border border-green-700/50">
          <div className="grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
            {data.map((item, index) => (
              <div
                key={index}
                className={`p-1 sm:p-1.5 md:p-2 lg:p-3 border-2 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 sm:hover:scale-[1.02] cursor-pointer min-h-[60px] sm:min-h-[70px] md:min-h-[80px] relative ${
                  item.selected
                    ? "bg-gradient-to-br from-green-200 to-blue-200 border-green-400 shadow-md"
                    : "bg-primary/10 border-gray-200 active:border-blue-300"
                } ${
                  index === FREE_SPACE_INDEX
                    ? "border-dashed border-green-400"
                    : ""
                }`}
              >
                {/* Free Space Special Styling */}
                {index === FREE_SPACE_INDEX && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-full">
                    FREE
                  </div>
                )}
                {/* Checkmark Icon */}
                <div
                  className={`absolute top-1 right-1 sm:top-2 sm:right-2 transition-all duration-300 
                    ${
                      item.selected
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                      index === FREE_SPACE_INDEX
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  />
                </div>

                {/* Bingo Text */}
                <div className="h-full flex items-center justify-center px-0.5 sm:px-1">
                  <span
                    className={`text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-medium text-center leading-tight transition-all duration-300 ${
                      item.selected ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                {/* Active/Touch Effect */}
                {!item.selected && index !== FREE_SPACE_INDEX && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 active:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* footer with social icons */}
        <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 border-t border-green-700/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-2">
            {/* Left: Branding & URL */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-200">
                Play at{" "}
                <span className="font-bold text-yellow-400">
                  tisini.co.ke/bingo/{bingoType}
                </span>
              </p>
            </div>

            {/* Center: Social Icons */}
            <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 order-1 md:order-2">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {[
                  { bg: "bg-blue-600", text: "f", label: "Facebook" },
                  {
                    bg: "bg-gradient-to-r from-purple-600 to-pink-600",
                    text: "📷",
                    label: "Instagram",
                  },
                  { bg: "bg-black", text: "𝕏", label: "X/Twitter" },
                  { bg: "bg-black", text: "♪", label: "TikTok" },
                  { bg: "bg-blue-700", text: "in", label: "LinkedIn" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group relative"
                    title={social.label}
                  >
                    <div
                      className={`
              w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${social.bg} rounded-full flex items-center justify-center 
              text-white font-bold text-xs sm:text-sm shadow-md hover:scale-110 transition-transform
            `}
                    >
                      {social.text}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mt-0.5 sm:mt-1">
                @TisiniTech
              </p>
            </div>

            {/* Right: App Download & Date */}
            <div className="text-center md:text-right order-3 flex flex-col items-center md:items-end gap-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.tisini.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 bg-white text-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 transition-all shadow-sm border border-gray-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
                  Download on Play Store
                </span>
              </a>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">
                {new Date().toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
);

CompletedBingo.displayName = "CompletedBingo";
