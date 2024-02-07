import config from '../config.json';
import { EspnScoreboardApiResponse, Schedule, MatchupTeam } from './espnApiResponseTypes';

const parseEspnResponse = (payload: EspnScoreboardApiResponse) => {
  const { teams: teamsData, scoringPeriodId, schedule, settings, status } = payload;
  let week = scoringPeriodId;

  // For Tuesday league maintenance, I need a screenshot of the previous week's scoreboard
  if (config.displayPreviousWeekScores) week--;

  const matchupTeams = getMatchupsFromSchedule(schedule, (x) => x.matchupPeriodId === week);
  const bufferPeriodMatchupTeams = getMatchupsFromSchedule(schedule, (x) => x.matchupPeriodId <= config.bufferPeriodWeeks && x.matchupPeriodId <= week);

  const teams = teamsData.map((t) => ({
    ...t,
    isImmune: t.name.includes('🛡️'),
    isEliminated: t.name.includes('💀'),
  }));

  const scoreboardRows = matchupTeams.map((t) => ({
    team: teams.find((tt) => tt.id === t.teamId)!,
    totalPoints: getTotalPoints(t),
    projectedPoints: getProjectedPoints(t),
  }));

  const bufferPeriodScoreboardRows = matchupTeams.map((s) => ({
    team: teams.find((t) => t.id === s.teamId)!,
    totalPoints: bufferPeriodMatchupTeams.filter((x) => x.teamId === s.teamId).reduce((accum, matchup) => accum + getTotalPoints(matchup), 0),
    projectedPoints: bufferPeriodMatchupTeams.filter((x) => x.teamId === s.teamId).reduce((accum, matchup) => accum + getProjectedPoints(matchup), 0),
  }));

  return {
    week: scoringPeriodId,
    teams: teams,
    scoreboardRows: scoreboardRows,
    bufferPeriodScoreboardRows: bufferPeriodScoreboardRows,
    lastUpdated: new Date().toISOString(),
    leagueName: settings.name,
  };
};

const getMatchupsFromSchedule = (schedule: Schedule[], scheduleFilter: (x: Schedule) => boolean) => {
  const matchups = schedule.filter(scheduleFilter);
  const scores = matchups
    .flatMap((x) => [x.away, x.home])
    // filter out null teams due to "bye week" matchups
    // "bye week" matchups occur when there are an uneven amount of managers in league
    .filter((x) => !!x);

  return scores;
};

const getTotalPoints = (team: MatchupTeam) => (team.totalPointsLive ?? team.totalPoints) + team.adjustment;
const getProjectedPoints = (team: MatchupTeam) => (team.totalProjectedPointsLive ?? team.totalPoints) + team.adjustment;

export { parseEspnResponse };
