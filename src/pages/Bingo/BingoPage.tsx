import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Info,
  RefreshCw,
  Share2,
  Trophy,
  Loader2,
} from "lucide-react";

import { BingoModal } from "./BingoModal";
import { CompletedBingo } from "./CompletedBingo";
import { footballBingo, rugbyBingo } from "./BingoConstants";

export type BingoItem = {
  id: number;
  text: string;
  selected: boolean;
};

const BingoPage = () => {
  const FREE_SPACE_INDEX = 12;

  const { bingoType } = useParams();

  const bingoItems = bingoType === "football" ? footballBingo : rugbyBingo;

  const [items, setItems] = useState<BingoItem[]>([]);
  const [completedLines, setCompletedLines] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] =
    useState<boolean>(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const completedBingoRef = useRef<HTMLElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fanBingoCardIds");
    let savedIds: number[] = [];
    if (saved) {
      try {
        savedIds = JSON.parse(saved) as number[];
      } catch (error) {
        savedIds = [];
      }
    }

    const hydrated = bingoItems.map((item, index) => ({
      ...item,
      selected:
        index === FREE_SPACE_INDEX
          ? true
          : savedIds.includes(item.id) || item.selected,
    }));

    hydrated[FREE_SPACE_INDEX] = {
      ...hydrated[FREE_SPACE_INDEX],
      text: `LOVES KENYAN ${bingoType === "football" ? "FOOTBALL" : "RUGBY"}`,
      selected: true,
    };

    setItems(hydrated);
  }, []);

  // Check for bingo - uses functional setState to access previous completedLines value
  const checkForBingo = useCallback((currentMarked: boolean[]) => {
    // Define all possible bingo lines (rows, columns, diagonals)
    const lines: number[][] = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    let newLines = 0;
    lines.forEach((line) => {
      if (line.every((index) => currentMarked[index])) {
        newLines++;
      }
    });

    setCompletedLines((prevCompletedLines) => {
      if (newLines > prevCompletedLines) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
      return newLines;
    });
  }, []);

  // Save to localStorage on change & check for bingo
  useEffect(() => {
    if (!items.length) return;
    const marked = items.map((item) => item.selected);
    const selectedIds = items
      .filter((item, idx) => item.selected && idx !== FREE_SPACE_INDEX)
      .map((item) => item.id);
    localStorage.setItem("fanBingoCardIds", JSON.stringify(selectedIds));
    checkForBingo(marked);
  }, [items, checkForBingo]);

  const toggleMark = (index: number) => {
    if (index === FREE_SPACE_INDEX) return;

    setItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const resetCard = (): void => {
    setItems((prev) =>
      prev.map((item, idx) => ({
        ...item,
        selected: idx === FREE_SPACE_INDEX,
      }))
    );
    setCompletedLines(0);
  };

  const downloadShareableImage = async (): Promise<void> => {
    if (!completedBingoRef.current) {
      toast.error("Unable to generate image. Please try again.");
      return;
    }

    if (isGeneratingImage) {
      return; // Prevent multiple simultaneous generations
    }

    setIsGeneratingImage(true);
    const toastId = toast.loading("Generating your bingo card image...", {
      duration: 5000,
    });

    try {
      const canvas = await html2canvas(completedBingoRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.error("Failed to create image. Please try again.", {
              id: toastId,
            });
            setIsGeneratingImage(false);
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `tisini-bingo-card-${new Date().getTime()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast.success("Image downloaded successfully! 🎉", {
            id: toastId,
          });
          setIsGeneratingImage(false);
        },
        "image/png",
        0.95
      );
    } catch (error) {
      console.error("Error generating shareable image:", error);
      toast.error("Failed to generate image. Please try again.", {
        id: toastId,
      });
      setIsGeneratingImage(false);
    }
  };

  const marked = items.map((item) => item.selected);
  const completedCount = marked.filter(Boolean).length;

  // Build achievements list
  const achievements: string[] = [];
  if (completedLines >= 1) {
    achievements.push("First Bingo Line");
  }
  if (completedCount >= 13) {
    achievements.push("Halfway There (13+ squares)");
  }
  if (completedCount === 25) {
    achievements.push("Blackout Master (All 25)");
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-2 sm:p-4 md:p-6">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="animate-bounce text-4xl sm:text-6xl">🎉</div>
          </div>
        )}

        <section className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
            <div className="flex md:flex-row flex-col items-center justify-between gap-4 sm:gap-6">
              {/* Title Section */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-500 flex-shrink-0" />
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {bingoType === "football" ? "Football" : "Rugby"} Fan Bingo
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    Mark your experiences!
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                    {completedCount}/25
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                    Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                    {completedLines}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                    Bingo Lines
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => setShowInstructionsModal(true)}
                  className="flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-200 transition-all text-xs sm:text-sm"
                  aria-label="Show instructions"
                >
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Instructions</span>
                  <span className="xs:hidden">Info</span>
                </button>
                <button
                  onClick={downloadShareableImage}
                  disabled={isGeneratingImage}
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingImage ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 animate-spin" />
                      <span className="hidden sm:inline">Generating...</span>
                      <span className="sm:hidden">Gen...</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4" />
                      Share
                    </>
                  )}
                </button>

                <button
                  onClick={resetCard}
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-200 transition-all text-xs sm:text-sm md:text-base"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Bingo Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-2 sm:p-3 md:p-4 lg:p-6 mb-4 sm:mb-6 md:mb-8 border border-gray-100">
            <div className="grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleMark(index)}
                  className={`p-1 sm:p-1.5 md:p-2 lg:p-3 border-2 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 sm:hover:scale-[1.02] cursor-pointer min-h-[60px] sm:min-h-[70px] md:min-h-[80px] relative ${
                    item.selected
                      ? "bg-gradient-to-br from-green-100 to-blue-100 border-green-400 shadow-md"
                      : "bg-white border-gray-200 active:border-blue-300"
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
                    className={`absolute top-1 right-1 sm:top-2 sm:right-2 transition-all duration-300 ${
                      marked[index]
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
                        item.selected
                          ? "text-gray-700 line-through"
                          : "text-gray-900"
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

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-gray-100 text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 mb-2">
              Challenge Your Friends!
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 md:mb-6 px-2">
              Download bingo card and share your score and see who's the
              ultimate Kenyan {bingoType === "football" ? "FOOTBALL" : "RUGBY"}{" "}
              fan!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
              <button
                onClick={downloadShareableImage}
                disabled={isGeneratingImage}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center text-sm sm:text-base"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="hidden sm:inline">
                      Generating Image...
                    </span>
                    <span className="sm:hidden">Generating...</span>
                  </>
                ) : (
                  <>📤 Share My Score</>
                )}
              </button>
              <button
                onClick={() => resetCard()}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:from-yellow-700 hover:to-orange-700 transition-all text-sm sm:text-base"
              >
                🎮 Play Again
              </button>
            </div>
          </div>
        </section>
      </main>

      {showInstructionsModal && (
        <BingoModal
          setShowInstructionsModal={setShowInstructionsModal}
          completedLines={completedLines}
          completedCount={completedCount}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "100%",
          visibility: "visible",
        }}
      >
        <CompletedBingo
          ref={completedBingoRef}
          data={items}
          completedCount={completedCount}
          bingoLines={completedLines}
          bingoType={bingoType as string}
        />
      </div>

      <Toaster position="top-center" />
    </>
  );
};

export default BingoPage;
