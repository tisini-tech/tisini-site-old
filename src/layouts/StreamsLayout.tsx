import { Outlet } from "react-router-dom";

export const StreamsLayout = () => {
  return (
    <main className="bg-[#39FF14] ">
      <div className="min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};
