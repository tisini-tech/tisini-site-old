import type { Fixture, NewFixture } from "@/lib/types/scores";

export function mapNewFixtureToFixture(fixture: NewFixture): Fixture {
  return {
    id: String(fixture.id),
    team1_id: String(fixture.team1_id),
    team2_id: String(fixture.team2_id),
    game_date: fixture.game_date,
    referee: "",
    team1_name: fixture.team1_name,
    team2_name: fixture.team2_name,
    status: fixture.game_status,
    game_status: fixture.game_status,
    game_time: fixture.matchtime,
    minute: String(fixture.minute),
    second: String(fixture.second),
    game_moment: fixture.game_moment,
    game_minute: String(fixture.minute),
    league: fixture.league,
    home_score: fixture.home_score,
    away_score: fixture.away_score,
    matchday: fixture.matchday ?? "",
    fixture_type: fixture.fixture_type,
    series: fixture.series,
  };
}
