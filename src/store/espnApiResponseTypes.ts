interface EspnScoreboardApiResponse {
  schedule: Schedule[];
  teams: Team[];
  scoringPeriodId: number;
}

interface Schedule {
  away: MatchupTeam;
  home: MatchupTeam;
  matchupPeriodId: number;
}

interface MatchupTeam {
  teamId: number;
  adjustment: number;
  totalPoints: number;
  totalPointsLive?: number;
  totalProjectedPointsLive?: number;
}

interface Team {
  id: number;
  logo: string;
  name: string;
}

export { EspnScoreboardApiResponse, Schedule, MatchupTeam };
