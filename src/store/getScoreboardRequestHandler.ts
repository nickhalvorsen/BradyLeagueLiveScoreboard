import { PayloadAction } from "@reduxjs/toolkit";
import { EspnSliceState } from './espnSlice';

const config = require('../config.json');

const getScoreboardRequestHandler = (state: EspnSliceState, action: PayloadAction<any,string>) => {
    const leagueDetails = action.payload;
    const { teams, scoringPeriodId } = leagueDetails;
    state.week = scoringPeriodId;

    const thisWeeksScores = getMatchupsFromSchedule(leagueDetails.schedule, x => x.matchupPeriodId === leagueDetails.status.currentMatchupPeriod);
    const earlierBufferPeriodScores = getMatchupsFromSchedule(leagueDetails.schedule, x => x.matchupPeriodId <= config.bufferPeriodWeeks && x.matchupPeriodId < state.week);

    state.teams = teams.map(t => ({
      ...t,
      isImmune: t.name.includes('🛡️'),
      isEliminated: t.name.includes('💀'),
    }))

    const scoreboardRows = thisWeeksScores.map(s => ({
      totalPoints: s.totalPointsLive + s.adjustment,
      projectedPoints: s.totalProjectedPointsLive + s.adjustment,
      team: state.teams.find(t => t.id === s.teamId),
    }));

    const bufferPeriodScoreboardRows = thisWeeksScores.map(s => ({
      team: state.teams.find(t => t.id === s.teamId),
      totalPoints: earlierBufferPeriodScores.filter(x => x.teamId === s.teamId).reduce((accum,item) => accum + (item.totalPoints ?? 0), 0) + s.totalPointsLive + s.adjustment, // todo: adjustment for first 2 weeks? 
      projectedPoints: earlierBufferPeriodScores.filter(x => x.teamId === s.teamId).reduce((accum,item) => accum + (item.totalPoints ?? 0), 0) + s.totalProjectedPointsLive + s.adjustment
    }));

    state.scoreboardRows = scoreboardRows;
    state.bufferPeriodScoreboardRows = bufferPeriodScoreboardRows;
    state.lastUpdated = new Date().toISOString();
}

const getMatchupsFromSchedule = (schedule, scheduleFilter)  => {
    const matchups = schedule.filter(scheduleFilter);
    const scores = (matchups.map(x => x.away))
      .concat(matchups.map(x => x.home))
      // filter out "bye week" null teams when there are an uneven amount of managers in league
      .filter(x => !!x);

      return scores;
}

export { getScoreboardRequestHandler }