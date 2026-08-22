import { ComponentType } from "react";

export type Fixture = {
  id: string;
  team1_id: string;
  team2_id: string;
  game_date: string;
  referee: string;
  team1_name: string;
  team2_name: string;
  status: string;
  game_status: string;
  game_time: string;
  minute: string;
  second: string;
  game_moment: string;
  game_minute: string;
  league: string;
  home_score: string;
  away_score: string;
  matchday: string;
  fixture_type: string;
  series: string;
};

export type NewFixture = {
  id: number;
  team1_id: number;
  team2_id: number;
  team1_name: string;
  team2_name: string;
  home_score: string;
  away_score: string;
  fixture_type: string;
  matchday: string | null;
  league: string;
  league_name: string;
  series: string;
  series_name: string;
  division: string;
  division_name: string;
  stage: string;
  stage_name: string;
  branch: string;
  branch_name: string;
  game_status: string;
  game_moment: string;
  game_date: string;
  minute: number;
  second: number;
  matchtime: string;
  location_id: number | null;
  team1_logo: string | null;
  team2_logo: string | null;
  venue: string | null;
  team1_short_name: string;
  team2_short_name: string;
  home_ht_score: string;
  away_ht_score: string;
  home_penalties: string;
  away_penalties: string;
};

export type FixtureDate = string;

export type FixtureDetails = {
  away_score: string;
  category: string;
  fixture_type: string;
  game_date: string;
  game_moment: string;
  game_status: string;
  groupid: string;
  home_score: string;
  hybrid: number;
  hybridaway: null;
  hybridhome: null;
  id: number;
  league: string;
  leagueid: number;
  lite: number;
  live: string;
  location_id: number;
  matchday: string;
  matchtime: string;
  minute: number;
  second: number;
  series: string;
  start_app: number;
  team1_id: number;
  team1_name: string;
  team2_id: number;
  team2_name: string;
  tmvplayer: number;
  teamview: string;
  winner: null;
};

export type SubEvent = {
  subeventid: number;
  subeventname: string;
  totalsubevent: number;
  team: number;
  gameidid: string;
};

export type Event = {
  event_id: number;
  name: string;
  total: number;
  team: number;
  fixtureid: string;
  "sub-event": SubEvent[];
};

export type Stats = {
  [eventName: string]: Event;
};

export type Scores = {
  Away: number;
  Home: number;
};

export type Cards = {
  Awayred: number;
  Awayyellow: number;
  Homered: number;
  Homeyellow: number;
};

export type Fouls = {
  Awaycommitted: number;
  Awaywon: number;
  Homecommitted: number;
  Homewon: number;
};

export type Lineup = {
  id: number;
  fixture_id: number;
  date_created: string;
  team_player_id: number;
  Jersey_No: number;
  player_type: string;
  player_id: number;
  teamId: string;
  pname: string;
  last_updated: string;
  lineupposition: number;
  red: number;
  GK: number;

  system_user_id: number;
  verify: number;
};

export type GameHighlights = {
  Jersey_No: string;
  event_id: number;
  event_name: string;
  game_minute: string;
  game_moment: string;
  game_second: string;
  gameid: number;
  narration: string;
  player_id: number;
  player_type: string;
  pname: string;
  subeventName: string;
  subevent_id: string;
  subplayer_id: string;
  subplayer_name: string;
  subsubevent_id: string;
  team: number;
  teamplayer_id: string;
  tss: string;
  zone_id: number;
};

export type SingleFixtureStats = {
  fixture: FixtureDetails[];
  home: Stats;
  away: Stats;
  scores: Scores;
  players: Lineup[];
  cards: Cards;
  fouls: Fouls;
  standing: [];
  gamedetails: GameHighlights[];
};

export type Live = {
  opponent: string;
  score: string;
  status: string;
};

export type Standing = {
  D: number;
  GA: number;
  GD: number;
  GF: number;
  L: number;
  P: number;
  Pts: number;
  W: number;
  live: Live | null;
  id: number;
  team_name: string;
  short_name: string;
  logo: string;
};

export type SerieStanding = {
  id: string;
  name: string;
  ranker: string;
  tournament: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  date_from: string;
  date_to: string;
  status: string;
  standings: Standing[];
};

export type Tourn = {
  id: string;
  name: string;
  date_created: string;
  fixture_type: string;
  created_by: string;
  date_updated: string;
  date_from: string | null;
  date_to: string | null;
  status: string;
  is_competitive: string;
  leaguelogo: string | null;
};

export type Stage = {
  id: number;
  name: string;
  standings: Standing[];
};

export type TournamentStanding = {
  competition: number;
  season: number;
  division: number;
  type: string;
  matches_played: number;
  standings: Standing[];
  stages: Stage[];
  division_standings: [
    {
      position: number;
      team_id: number;
      team_name: string;
      team_short_name: string;
      team_logo: string;
      points: number;
    },
  ];
  overall_standings: [
    {
      position: number;
      team_id: number;
      team_name: string;
      team_short_name: string;
      team_logo: string;
      total_points: number;
      division_points: [
        {
          division_id: number;
          division_name: string;
          points: number;
        },
      ];
    },
  ];
};

export type GroupByDate = {
  [date: string]: Fixture[];
};

export type GroupedFixtures = {
  [date: string]: {
    [league: string]: Fixture[];
  };
};

export type FixturesArray = [string, Fixture[]];

export type Question = {
  id: number;
  question: string;
  answer: string;
};

export type Social = {
  name: string;
  icon: ComponentType;
  link: string;
};

// export type Links = { name: string; link: string };

export type contacts = { icon: ComponentType; contact: string };

export type TFooter = {
  logo: string;
  socials: Social[];
  contacts: contacts[];
};

export type THero = {
  title: string;
  subtitle: string;
  buttonText: string;
};

export type TAbout = {
  theme: string;
  image: string;
  story: string[];
};

export type Tournament = {
  logo: string;
  hero: THero;
  about: TAbout;
  questions: Question[];
  footer: TFooter;

  // other tournament details
};

export type TournamentData = {
  [key: string]: Tournament;
};

export type H2HFixture = {
  id: number;
  team1_name: string;
  team2_name: string;
  team1_id: number;
  team2_id: number;
  home_score: string;
  away_score: string;
  fixture_type: string;
  game_date: string;
  game_status: string;
  league: string;
  series: string;
};

export type H2H = {
  home: H2HFixture[];
  h2h: H2HFixture[];
  away: H2HFixture[];
  logos: { logo: string; team_id: number }[];
};

export type Match = {
  id: number;
  team1_id: number;
  team2_id: number;
  team1_name: string;
  team2_name: string;
  home_score: string;
  away_score: string;
  fixture_type: string;
  matchday: string | null;
  league: string;
  series: string;
  game_status: string;
  game_moment: string;
  game_date: string;
  minute: number;
  second: number;
  matchtime: string;
  location_id: string | null;
  team1_logo: string | null;
  team2_logo: string | null;
  venue: string | null;
};

export type Highlights = {
  id: number;
  subplayer_name: string;
  event_name: string;
  event_id: number;
  time: string;
  team: number;
  gameid: number;
  narration: string;
  player_id: number;
  subevent_id: string;
  subplayer_id: null;
  game_minute: string;
  game_second: string;
  game_moment: string;
  teamplayer_id: number | null;
  player_type: string | null;
  pname: string;
  jersey_no: string;
  subsubevent_id: number | null;
  subevent_name: string;
  quarter: string;
};

export type SubEventStat = {
  sub_event_id: string;
  sub_event_name: string;
  total: number;
};

export type EventStats = {
  event_id: number;
  event_name: string;
  total: number;
  sub_events: SubEventStat[];
};

export type MatchStats = {
  home: EventStats[];
  away: EventStats[];
};

export type MatchDetails = {
  fixture: Match;
  highlights: Highlights[];
  stats: MatchStats;
};

export type Squad = {
  id: number;
  fixture_id: number;
  date_created: string;
  team_player_id: number;
  jersey_no: number;
  player_type: string;
  player: number;
  teamid: string;
  pname: string;
  last_updated: string;
  lineupposition: number;
  red: number;
  gk: number;
  passportphoto: string;
  game_strength: number;
};

export type MatchSquads = {
  home: Squad[];
  away: Squad[];
};
