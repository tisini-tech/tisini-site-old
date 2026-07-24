import { navigation } from "@/lib/constants/tournaments";

import { Link as ScrollLink } from "react-scroll";

const NavMobile = () => {
  return (
    <nav className="bg-white w-full h-full shadow-2xl z-50">
      <ul className="text-center h-full flex flex-col justify-center items-center gap-y-6">
        {navigation.map((item) => (
          <li key={item.name}>
            <ScrollLink
              className="text-xl font-medium capitalize"
              offset={item.offset}
              to={item.target}
              smooth
              spy
              activeClass="active"
            >
              {item.name}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMobile;
