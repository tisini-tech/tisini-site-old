import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

type Props = {
  topUpOpen: boolean;
  wallet: number;
  amount: number;
  setTopUpOpen: (x: boolean) => void;
  setIsDepositOpen: (x: boolean) => void;
};

const TopUpModal = ({
  topUpOpen,
  setTopUpOpen,
  setIsDepositOpen,
  wallet,
  amount,
}: Props) => {
  return (
    <Transition appear show={topUpOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[600000]"
        onClose={() => setTopUpOpen(false)}
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
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
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
              <DialogPanel className="w-full min-h-[20rem] max-w-xl p-4 md:p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Insufficient Funds
                </DialogTitle>

                <div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      Your account balance is below the required amount to play
                      Tano Bora.
                    </p>

                    <p>
                      <span className="text-sm text-gray-600">
                        Wallet balance:{" "}
                      </span>
                      <span className="font-semibold text-gray-800">
                        KES {wallet ? wallet.toFixed(2) : 0.0}
                      </span>
                    </p>

                    <p>
                      <span className="text-sm text-gray-600">
                        Required amount:{" "}
                      </span>
                      <span className="font-semibold text-gray-800">
                        KES {amount}
                      </span>
                    </p>

                    <p className="text-sm text-gray-700">
                      You need to top up{" "}
                      <span className="font-semibold text-gray-800">
                        KES {amount - wallet}
                      </span>{" "}
                      or more in order to submit your answers and appear on the
                      Tano Bora leaderboard.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setTopUpOpen(false)}
                    >
                      Play anyway
                    </button>

                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setTopUpOpen(false);
                        setIsDepositOpen(true);
                      }}
                    >
                      Deposit KES {amount - wallet}
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

export default TopUpModal;
