import { Outlet } from "react-router-dom";
import MainFooter from "@/components/MainFooter";
import ScoresHeader from "@/components/scores/ScoresHeader";
import LeaguesMenu from "@/components/scores/LeaguesMenu";
// import { Standings } from "@/pages/scores/standings/Standings";

// const ScoresLayout = () => {
//   return (
//     <main className="bg-white ">
//       <div className="max-w-7xl mx-auto">
//         <ScoresHeader />

//         <div className="m-3 grid md:grid-cols-12 grid-cols-1 gap-3 md:px-4">
//           <div className="md:col-span-8 col-span-12 bg-slate-100 rounded-lg">
//             <Outlet />
//           </div>
//           <div className="md:col-span-4 col-span-12 bg-slate-100 rounded-lg">
//             <Standings />
//           </div>
//         </div>

//         <MainFooter />
//       </div>
//     </main>
//   );
// };

const ScoresLayout = () => {
  return (
    <main className="bg-white ">
      <div className="container m-auto">
        <ScoresHeader />
        <div className="min-h-screen m-3  rounded-lg grid grid-cols-12 gap-3">
          <aside className="hidden md:block md:col-span-3 bg-slate-100">
            <LeaguesMenu />
          </aside>

          <div className="col-span-12 md:col-span-9 bg-slate-100">
            <Outlet />
          </div>
        </div>
        <MainFooter />
      </div>
    </main>
  );
};

export default ScoresLayout;
