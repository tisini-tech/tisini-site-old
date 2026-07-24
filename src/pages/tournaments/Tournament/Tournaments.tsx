import { tournaments } from "@/lib/constants/tournaments";
import { useNavigate } from "react-router-dom";

const Tournaments = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto w-full space-y-8 mb-8">
      <section className="bg-heroT h-[50vh] md:h-[20vh] w-full bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full md:text-2xl text-lg text-center text-white font-bold">
          <h1>Effortlessly Manage, Track, and Analyze Every Tournament.</h1>

          <h1>Elevate Your Game with Comprehensive Stats and Insights!</h1>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="relative h-[300px] max-w-[320px] mx-auto flex flex-col justify-center items-center rounded-md"
          >
            <div className="bg-black/60 absolute w-full h-full top-0 z-10 rounded-md"></div>
            <div className="w-[300px]">
              <img
                src={tournament.img}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="z-30 max-w-[380px] text-center flex flex-col items-center justify-center gap-4">
              <p className="max-w-[380px] uppercase text-white font-semibold text-[12px] tracking-[3px] mb-1">
                {tournament.dates}
              </p>
              <h3 className="h3 text-accent-green text-primary text-2xl font-bold">
                {tournament.title}
              </h3>

              <button
                className="text-md px-4 text-center bg-primary hover:bg-primary/50 text-light py-2 rounded-md w-3/4"
                onClick={() =>
                  navigate(
                    `/tournaments/${tournament.title.replace(/\s+/g, "-")}`
                  )
                }
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Tournaments;
