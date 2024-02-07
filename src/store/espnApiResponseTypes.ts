interface EspnScoreboardApiResponse {
  schedule: Schedule[];
  teams: Team[];
  scoringPeriodId: number;
  settings: Settings;
  status: Status;
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

interface Settings {
  name: string;
}

interface Status {
  finalScoringPeriod: number;
  isActive: boolean;
}

export { EspnScoreboardApiResponse, Schedule, MatchupTeam };
