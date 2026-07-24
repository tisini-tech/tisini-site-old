export type Fixture = {
  fixture: string;
  team1_id: string;
  team1_logo: string | null;
  team2_id: string;
  team2_logo: string | null;
  game_date: string;
  team1_name: string;
  team2_name: string;
  status: string;
  game_status: string;
  minute: string;
  second: string;
  game_moment: string;
  league: string;
  matchday: string;
  fixture_type: string;
  series: string;
  matchtime: string;
  away_score: string;
  home_score: string;
  matchplay_status: string;
  tisiniscores: Scores;
  refdata: RefData[];
};

type Scores = {
  Home: string;
  Away: string;
};

export type RefData = {
  id: string;
  fixture_id: string;
  event_id: string;
  event_name: string;
  sub_event_id: string;
  sub_event_name: string;
  team_id: string;
  team_name: string;
  player_id: string;
  player_name: string;
  sub_player_id: string;
  sub_player_name: string;
  minute: string;
  date_created: string;
  date_updated: string;
  status: string;
  created_by: string;
};

export type TopScorer = {
  playerid: string;
  seasonid: string;
  eventid: string;
  subeventid: string;
  teamid: string;
  trys: string;
  conversion: number;
  penalty: number;
  dropgoal: number;
  totalpoints: string;
  playername: string;
  teamname: string;
};

export type BallScorer = {
  playerid: string;
  seasonid: string;
  eventid: string;
  subeventid: string;
  teamid: string;
  teamname: string;
  assist: null | string;
  goal: string;
  playername: string;
};
