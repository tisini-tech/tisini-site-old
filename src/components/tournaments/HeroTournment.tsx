import { tournaData } from "@/lib/constants/tournaments";
import { THero } from "@/lib/types/scores";

import { useParams } from "react-router-dom";

export const HeroTournment = () => {
  const { tournament } = useParams<{ tournament: string }>();
  const tourna = tournament?.replace(/-/g, " ");
  const { title, subtitle, buttonText } =
    tourna && tournaData[tourna] ? tournaData[tourna].hero : ({} as THero);

  return (
    <section
      id="home"
      className="h-[90vh] w-full bg-heroS bg-center bg-cover bg-no-repeat text-white relative pt-[225px] pb-[254px] px-8"
    >
      <div className="bg-[#959eb7] bg-opacity-70 absolute inset-0"></div>

      <div className="text-center relative">
        <h1 className="text-2xl uppercase mx-auto font-semibold mb-5 lg:text-[64px] lg:leading-tight lg:max-w-[888px]">
          {title}
        </h1>

        <h2 className="mb-[30px] lg:max-w-[627px] mx-auto lg:mb-[40px] lg:text-2xl">
          {subtitle}
        </h2>

        <button className="bg-blue-500 hover:bg-green-600 px-[35px] py-[9px] mb-12 text-xl rounded-md backdrop-blur-md transition lg:px-[60px] lg:py-[12px] lg:mb-10">
          {buttonText}
        </button>

        {/* <div className="mb-8">
          <a
            href="https://portal.tisini.co.ke/auth/register/team-owner"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden hover:bg-green-600 bg-orange text-xl rounded-md backdrop-blur-md transition p-2"
          >
            Register Here
          </a>
        </div> */}
      </div>
    </section>
  );
};
