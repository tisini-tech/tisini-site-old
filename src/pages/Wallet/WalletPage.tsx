import { cn } from "@/lib/cn";
import React, { useState } from "react";
import { privateAxios } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import { ToastContainer } from "react-toastify";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import { Transaction } from "../Profile/ProfilePage";

import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";

type CreditScoreType = {
  id: number;
  quiz_player: number;
  credit_rating_weighted_sum: number;
  credit_amount_weighted_sum: string;
  recommendations: string[];
  last_updated: string;
};

export default function WalletPage() {
  const walletOpts = [
    "Account",
    // "Deposit",
    // "Withdraw",
    "Transactions",
  ] as const;
  const [selectedTab, setActiveTab] =
    useState<(typeof walletOpts)[number]>("Account");
  const auth = useAppSelector((state) => state.persist.auth);
  const [balance, setBalance] = useState(0);

  const [isWithDrawOpen, setIsWithdrawOpen] = useState(false);
  const [creditRate, setCreditRate] = useState<CreditScoreType>(
    {} as CreditScoreType
  );
  const [quizCreditRate, setQuizCreditRate] = useState<CreditScoreType>(
    {} as CreditScoreType
  );
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const fetchBalance = React.useCallback(async () => {
    const feedback = await privateAxios.get<{
      accountbalance: number | string;
    }>("/users/account_balance/");
    setBalance(Number(feedback.data?.accountbalance || 0));
  }, []);

  const fetchCredit = React.useCallback(async () => {
    const feedback = await privateAxios.get<{ results: CreditScoreType[] }>(
      "/users/credit_rate/"
    );
    setCreditRate(feedback.data.results?.[0] || ({} as CreditScoreType));
  }, []);

  const fetchQuizCredit = React.useCallback(async () => {
    const feedback = await privateAxios.get<{ results: CreditScoreType[] }>(
      "/users/quiz_credit_rate/"
    );
    setQuizCreditRate(feedback.data.results?.[0] || ({} as CreditScoreType));
  }, []);

  const [userTransactions, setUserTransactions] = React.useState<Transaction[]>(
    []
  );
  const fetchTransactions = React.useCallback(async () => {
    const trans = await privateAxios.get(`/users/payment_history/`);
    setUserTransactions(trans.data as Transaction[]);
  }, []);

  // const flatten =
  React.useEffect(() => {
    fetchBalance();
    fetchTransactions();
    fetchCredit();
    fetchQuizCredit();
  }, []);

  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat w-screen bg-primary bg-blend-lighten flex flex-col"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-smooth-background_23-2148973716.jpg?w=1380&t=st=1722530631~exp=1722531231~hmac=a0202518144745c48c77ff5f51730842143f9e4a461b16d36caca01486816dff')`,
      }}
    >
      <MainHeader />
      <ToastContainer />
      <div className="w-full max-w-7xl mx-auto my-4 p-4">
        <div className="py-5 text-xl px-4 font-catamaran">
          <h1>
            Hi,{" "}
            <span className="text-3xl text-primary">{auth.user?.nickname}</span>{" "}
            welcome back!
          </h1>
        </div>
        <div className="grid gap-2">
          <div>
            <div className="flex gap-4 p-4">
              {walletOpts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveTab(opt)}
                  className={cn(
                    "border-b border-primary p-4 rounded-xl transition-all ease-linear duration-300",
                    {
                      "bg-lue-600 text-blue-600 border": selectedTab === opt,
                    }
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div>
              {selectedTab === "Account" && (
                <div className="min-h-[60vh] bg-white py-10 px-4 flex flex-col gap-8 shadow-sm rounded bg-opacity-50">
                  <h2 className="text-4xl">
                    KSh.{" "}
                    <span className="text-7xl mt-4">{balance.toFixed(2)}</span>
                  </h2>

                  <div className="py-4 space-x-4">
                    <button
                      onClick={() => setIsDepositOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => setIsWithdrawOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Withdraw
                    </button>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {Object.keys(creditRate).length > 0 && (
                      <CreditRateCard
                        title="Tano bora"
                        creditRate={creditRate}
                      />
                    )}

                    {Object.keys(quizCreditRate).length > 0 && (
                      <CreditRateCard
                        title="Quiz"
                        creditRate={quizCreditRate}
                      />
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Transactions" && (
                <div className="border shadow-sm p-4">
                  <div className="">
                    <h1>Transaction history</h1>
                  </div>
                  <div className="my-2">
                    <div className="overflow-x-auto">
                      <table className=" bg-white border border-gray-200">
                        <thead className="whitespace-nowrap">
                          <tr>
                            {/* <th className="px-4 py-2 border-b">Business Short Code</th> */}
                            <th className="px-4 py-2 border-b">Trans ID</th>
                            <th className="px-4 py-2 border-b">Date Created</th>
                            <th className="px-4 py-2 border-b">Description</th>
                            <th className="px-4 py-2 border-b">Debit Amount</th>
                            <th className="px-4 py-2 border-b">
                              Credit Amount
                            </th>
                            <th className="px-4 py-2 border-b">Payment Date</th>
                            <th className="px-4 py-2 border-b">
                              Transaction Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userTransactions.map((transaction) => (
                            <tr
                              key={transaction.id}
                              className="hover:bg-gray-100 "
                            >
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.id}
                              </td>
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.date_created}
                              </td>
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.description}
                              </td>
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.debit_amount}
                              </td>
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.credit_amount}
                              </td>
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.payment_date}
                              </td>
                              {/* <td className="px-4 py-2 border-b whitespace-nowrap">{transaction.TransactionType}</td> */}
                              <td className="px-4 py-2 border-b whitespace-nowrap">
                                {transaction.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <WithdrawDialog
            isWithDrawOpen={isWithDrawOpen}
            setIsWithdrawOpen={setIsWithdrawOpen}
          />

          <DepositDialog
            isDepositOpen={isDepositOpen}
            setIsDepositOpen={setIsDepositOpen}
            amnt={0}
          />
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

const CreditRateCard = ({
  title,
  creditRate,
}: {
  title: string;
  creditRate: CreditScoreType;
}) => {
  return (
    <div className="bg-white shadow-md border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 mb-6">
        <h1 className="text-2xl font-semibold uppercase tracking-wide text-center">
          {title} Credit Rating
        </h1>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 bg-gray-50 rounded-xl text-center border hover:bg-indigo-50 transition-colors">
          <h2 className="text-sm font-medium text-gray-600 uppercase">
            Credit Rate
          </h2>
          <p className="text-3xl font-bold text-indigo-600 mt-1">
            {creditRate.credit_rating_weighted_sum}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl text-center border hover:bg-indigo-50 transition-colors">
          <h2 className="text-sm font-medium text-gray-600 uppercase">
            Credit Amount
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {creditRate.credit_amount_weighted_sum}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {Array.isArray(creditRate.recommendations) &&
        creditRate.recommendations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold uppercase text-gray-700 mb-2">
              Recommendations
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {creditRate.recommendations.map((recom) => (
                <li key={recom} className="leading-relaxed">
                  {recom}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
