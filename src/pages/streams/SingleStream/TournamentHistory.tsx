import React from "react";
import tisiniLogo from "@/assets/img/tisini-logo.png";

const TournamentHistory = () => {
  return (
    <main className="p-10 relative h-screen">
      <section className="absolute left-20 mb-1 w-64">
        <div className="bg-blue-800 p-1 border border-black text-white flex gap-2 items-center ">
          <img src={tisiniLogo} alt="tisini" className="w-11 h-6" />

          <h4 className="font-bold">Christie7s Tries</h4>
        </div>

        <div className="bg-gray-100">
          <PosessionRow home={"15"} away={"3"} />
        </div>
      </section>
    </main>
  );
};

const PosessionRow = ({ home, away }: { home: string; away: string }) => {
  const total = parseInt(home) + parseInt(away);
  const homePercentage = total === 0 ? 0 : (parseInt(home) / total) * 100;
  const awayPercentage = total === 0 ? 0 : (parseInt(away) / total) * 100;

  return (
    <div className="flex flex-col p-2 ">
      <div className="flex items-center gap-1">
        <div>{home}</div>

        <div className="flex-1 rounded-full">
          <div className="relative h-5 rounded-full">
            <div className="absolute top-0 left-0 h-full w-full rounded-full"></div>
            <div
              className="absolute top-0 bottom-0 rounded-r-full bg-red-500 "
              style={{ left: `${100 - awayPercentage}%`, right: 0 }}
            ></div>
            <div
              className="absolute top-0 bottom-0 rounded-l-full bg-green-500 "
              style={{ right: `${100 - homePercentage}%`, left: 0 }}
            ></div>
          </div>
        </div>

        <div>{away}</div>
      </div>
    </div>
  );
};

export default TournamentHistory;
