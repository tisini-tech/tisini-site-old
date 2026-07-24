import { NavLink, useLocation } from "react-router-dom";
import { OrganizationInterface } from "@/lib/types";

type OrganizationCardProps = {
  organization: Pick<
    OrganizationInterface,
    "org_logo" | "organization_name" | "uid"
  >;
};

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  let location = useLocation();

  return (
    <div className="border">
      <div>
        <img
          src={organization.org_logo!}
          alt={organization.uid}
          width={500}
          height={500}
          className="object-cover h-44 w-full"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{organization.organization_name}</h1>
        <p>Organization description</p>
        <div className="flex w-full flex-col">
          {location.pathname === "/tanobora" ? (
            <NavLink
              to={`/tanobora/${organization.uid}`}
              className="bg-primary text-white p-2 rounded-md px-4 text-center capitalize"
            >
              View active Tano Bora
            </NavLink>
          ) : (
            <NavLink
              to={`/quiz/${organization.uid}`}
              className="bg-primary text-white p-2 rounded-md px-4 text-center capitalize"
            >
              View active Quizzes
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
