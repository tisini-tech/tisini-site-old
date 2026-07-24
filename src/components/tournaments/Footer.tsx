import { TFooter } from "@/lib/types/scores";
import { tournaData } from "@/lib/constants/tournaments";

import { Link, useParams } from "react-router-dom";

export const Footer = () => {
  const { tournament } = useParams<{ tournament: string }>();
  const tourna = tournament?.replace(/-/g, " ");
  const { contacts, socials, logo } =
    tourna && tournaData[tourna] ? tournaData[tourna].footer : ({} as TFooter);

  const date = new Date().getFullYear();

  return (
    <footer id="contacts" className="py-4 mt-4 bg-black text-white">
      <div className="max-w-[1100px] flex gap-4 flex-col md:flex-row items-center justify-between mx-auto py-4 border-b-2 border-gray-400">
        <div className="">
          <Link className="" to={"/"}>
            <img src={logo} alt="logo" className="w-62 h-[150px]" />
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            {socials.map((soc) => {
              const IconComponent = soc.icon;

              return (
                <a
                  key={soc.name}
                  href={soc.link}
                  target="_blank"
                  className="py-[5px] px-[10px] text-xl text-primary bg-[#232220] transition duration-300 hover:text-[#ffffff] hover:bg-[#ff581f]"
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>

        <address className="md:pr-8 lg:pr-0 md:px-0 md:text-right">
          <h4 className="mb-4 text-xl font-semibold">Contact Us</h4>

          {contacts.map((contact, index) => {
            const IconComponent = contact.icon;

            return (
              <div
                key={index}
                className="flex md:justify-end gap-4 m-2 text-[#a3a3a3]"
              >
                <div className="py-1 text-xl text-primary">
                  <IconComponent />
                </div>
                <h5 className="">{contact.contact}</h5>
              </div>
            );
          })}
        </address>
      </div>

      <div className="px-4 pt-4 pb-2 text-sm text-center text-[#a3a3a3]">
        Copyright @{date} Nairobi International Cup. All rights reserved.
      </div>
    </footer>
  );
};
