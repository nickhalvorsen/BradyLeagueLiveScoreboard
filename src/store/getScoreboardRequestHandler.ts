import { PayloadAction } from "@reduxjs/toolkit";
import { EspnSliceState } from './espnSlice';

const getScoreboardRequestHandler = (state: EspnSliceState, action: PayloadAction<any,string>) => {
    const leagueDetails = action.payload;
    const { teams, scoringPeriodId } = leagueDetails;

    const thisWeeksScores = getMatchupsFromSchedule(leagueDetails.schedule, x => x.matchupPeriodId === leagueDetails.status.currentMatchupPeriod);
    const bufferPeriodScores = getMatchupsFromSchedule(leagueDetails.schedule, x => [1,2,3].includes(x.matchupPeriodId));

    state.teams = teams.map(t => ({
      ...t,
      isImmune: t.name.includes('🛡️'),
      isEliminated: t.name.includes('🪦'),
    }))

    const scoreboardRows = thisWeeksScores.map(x => ({
      totalPoints: x.totalPointsLive,
      projectedPoints: x.totalProjectedPointsLive,
      adjustment: x.adjustment,
      team: state.teams.find(t => t.id === x.teamId)
    }));

    state.teams = state.teams.map(t => ({
      ...t,
      //bufferPeriodTotalPoints: ,
      //bufferPeriodTotalProjection: ,
      bufferPeriodTotalPoints: bufferPeriodScores.filter(x => x.teamId === t.id).reduce((accum,item) => accum + (item.totalPoints ?? 0) + (item.totalPointsLive ?? 0), 0),
    }))

    state.week = scoringPeriodId;
    state.scoreboardRows = scoreboardRows;
}

const getMatchupsFromSchedule = (schedule, scheduleFilter)  => {
    const matchups = schedule.filter(scheduleFilter);
    const scores = (matchups.map(x => x.away))
      .concat(matchups.map(x => x.home))
      // filter out "bye week" null teams when there are an uneven amount of managers in league
      .filter(x => !!x);

      return scores;
}

const getBufferPeriodScores = () => {

}

export { getScoreboardRequestHandler }