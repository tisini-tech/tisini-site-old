import { NavLink } from "react-router-dom";

function BackHome() {

  return (
    <div className="flex items-center py-2">
      <div>
        <NavLink
          className="bg-primary text-white font-bold px-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
          type="button"
          to={"/"}
        >
          Go Back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default BackHome;
