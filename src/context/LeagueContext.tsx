import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type League = {
  id: string;
  name: string;
  series: boolean;
  seasons: { id: string; season: string; series: string[] }[];
};

interface LeagueContextType {
  league: League;
  setLeague: Dispatch<SetStateAction<League>>;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [league, setLeague] = useState<League>({
    id: "",
    name: "",
    series: false,
    seasons: [],
  });

  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeague = () => {
  const context = useContext(LeagueContext);
  if (!context) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }
  return context;
};
