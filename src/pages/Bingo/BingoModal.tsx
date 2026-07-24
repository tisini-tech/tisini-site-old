import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckSquare, Trophy, X } from "lucide-react";
import React, { FC } from "react";

type BingoModalProps = {
  setShowInstructionsModal: (show: boolean) => void;
  completedLines: number;
  completedCount: number;
};

export const BingoModal: FC<BingoModalProps> = ({
  setShowInstructionsModal,
  completedLines,
  completedCount,
}) => {
  return (
    <Transition appear show as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[600000]"
        onClose={() => setShowInstructionsModal(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl p-4 md:p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
                <DialogTitle className="sr-only">
                  Kenyan Football Fan Bingo Instructions
                </DialogTitle>

                {/* Close Button */}
                <button
                  onClick={() => setShowInstructionsModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  aria-label="Close instructions"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>

                {/* Modal Content */}
                <div className="mt-2">
                  <header className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Trophy className="w-10 h-10 text-yellow-500" />
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Kenyan Football Fan Bingo
                      </h1>
                      <Trophy className="w-10 h-10 text-yellow-500" />
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-green-500" />
                        How to Play
                      </h2>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                          <span>
                            Click on any square to mark experiences you've
                            completed
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <span>
                            Aim for 5 marked squares in a row (horizontal,
                            vertical, or diagonal) for BINGO!
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                          <span>
                            The center square is automatically marked as FREE
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                          <span>
                            Try for a "Blackout" by marking all 25 squares!
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-green-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        🏆 Achievements
                      </h2>
                      <div className="space-y-4">
                        <div
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            completedLines >= 1
                              ? "bg-green-100 border border-green-300"
                              : "bg-gray-100"
                          }`}
                        >
                          <span className="font-medium">First Bingo Line</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              completedLines >= 1
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {completedLines >= 1 ? "Completed!" : "In Progress"}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            completedCount >= 13
                              ? "bg-blue-100 border border-blue-300"
                              : "bg-gray-100"
                          }`}
                        >
                          <span className="font-medium">
                            Halfway There (13+ squares)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              completedCount >= 13
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {completedCount >= 13
                              ? "Completed!"
                              : `${completedCount}/13`}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            completedCount === 25
                              ? "bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300"
                              : "bg-gray-100"
                          }`}
                        >
                          <span className="font-medium">
                            Blackout Master (All 25)
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              completedCount === 25
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {completedCount === 25
                              ? "Legendary!"
                              : `${completedCount}/25`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Start Playing Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setShowInstructionsModal(false)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
                    >
                      Let's Play! 🎮
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
