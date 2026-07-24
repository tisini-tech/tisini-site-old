import { tournaData } from "@/lib/constants/tournaments";
import { TAbout } from "@/lib/types/scores";

import { useParams } from "react-router-dom";

export const AboutTournament = () => {
  const { tournament } = useParams<{ tournament: string }>();
  const tourna = tournament?.replace(/-/g, " ");
  const { theme, image, story } =
    tourna && tournaData[tourna] ? tournaData[tourna].about : ({} as TAbout);

  return (
    <section id="about" className="section py-10 px-2">
      <div className="container mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h5 className="capitalize text-blue-500 font-semibold mb-4">
            About the Tournament
          </h5>
          <h1 className="text-2xl lg:text-[40px] leading-tight font-semibold max-w-[750px] mx-auto">
            {theme}
          </h1>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <div className="flex gap-4 flex-col lg:p-4 text-base">
              {story.map((item, idx) => (
                <p key={idx} className="text-[#71717a]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-center h-full">
              <div className="">
                <img
                  className="rounded-lg shadow-lg"
                  src={image}
                  alt="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
