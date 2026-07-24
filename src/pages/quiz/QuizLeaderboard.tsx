import React from "react";
import { useQuery } from "@tanstack/react-query";

import { privateAxios } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import type { QuizLeaderboard } from "@/lib/types";

const QuizLeaderboard = () => {
  const path = window.location.pathname;
  const organizationId = path.split("/")[2];

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<QuizLeaderboard[]>({
    queryKey: ["quizLeaderboard"],
    queryFn: async () => {
      const response = await privateAxios(
        `/quiz/organizations/${organizationId}/cumulative_leaderboard/`
      );
      return response.data;
    },
  });

  if (isLoading) return <Loader isLoading={isLoading} />;
  if (error) return <div>Error loading leaderboard</div>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAverageTime = (time: number) => {
    return time.toFixed(2);
  };

  const renderRankChange = (change: number) => {
    if (change > 0) {
      return <span style={{ color: "red" }}>▲ {change}</span>;
    } else if (change < 0) {
      return <span style={{ color: "green" }}>▼ {Math.abs(change)}</span>;
    } else {
      return <span style={{ color: "gray" }}>→ {change}</span>;
    }
  };

  return (
    <main className=" max-w-7xl mx-auto">
      <header className="flex flex-row justify-between items-center h-fit p-2 my-1">
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white rounded-md px-4 text-center"
          >
            Back
          </button>
        </div>
      </header>

      <section className="p-4">
        <div className="block md:hidden text-sm text-gray-500 mb-2 text-center">
          Scroll horizontally to view all columns →
        </div>

        <div className="w-full overflow-x-auto">
          <table
            className="w-full min-w-[600px] border-collapse font-sans"
            style={{
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr className="bg-gray-50">
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700 sticky left-0  z-10"
                  style={{
                    minWidth: "80px",
                  }}
                >
                  Rank
                </th>
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700"
                  style={{
                    minWidth: "120px",
                  }}
                >
                  Nickname
                </th>
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700"
                  style={{
                    minWidth: "200px",
                  }}
                >
                  Period
                </th>
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700"
                  style={{
                    minWidth: "100px",
                  }}
                >
                  Total Points
                </th>
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700"
                  style={{
                    minWidth: "100px",
                  }}
                >
                  Avg Time
                </th>
                <th
                  className="px-3 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700"
                  style={{
                    minWidth: "100px",
                  }}
                >
                  Rank Change
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((player) => (
                <tr
                  key={player.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td
                    className="px-3 py-3 font-semibold text-gray-900 sticky left-0 bg-white z-10"
                    style={{
                      minWidth: "80px",
                    }}
                  >
                    #{player.rank}
                  </td>
                  <td
                    className="px-3 py-3 text-gray-700"
                    style={{
                      minWidth: "120px",
                    }}
                  >
                    {player.nickname}
                  </td>
                  <td
                    className="px-3 py-3 text-gray-700"
                    style={{
                      minWidth: "200px",
                    }}
                  >
                    {formatDate(player.period_start)} -{" "}
                    {formatDate(player.period_end)}
                  </td>
                  <td
                    className="px-3 py-3 text-gray-700"
                    style={{
                      minWidth: "100px",
                    }}
                  >
                    {player.total_points}
                  </td>
                  <td
                    className="px-3 py-3 text-gray-700"
                    style={{
                      minWidth: "100px",
                    }}
                  >
                    {formatAverageTime(player.average_time)}
                  </td>
                  <td
                    className="px-3 py-3 text-gray-700"
                    style={{
                      minWidth: "100px",
                    }}
                  >
                    {renderRankChange(player.rank_change)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        )}
      </section>
    </main>
  );
};

export default QuizLeaderboard;
