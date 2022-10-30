import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import config from '../config'

let config = require('../config.json');

type Team = {
  location: string;
  nickname: string;
  logo: string;
}

type ScoreboardRow = {
  team: Team,
  projectedPoints: number,
  totalPoints: number,
}

type EspnSliceState = {
    scoreboardRows: ScoreboardRow[];
    week: number;
};

const initialState: EspnSliceState = {
    scoreboardRows: [],
    week: 0
};

const getSeasonYear = () => {
  const d = new Date();
  d.setMonth(d.getMonth()-3);
  return d.getFullYear();
}

const getAllData = createAsyncThunk(
    'espn/getAllData',
    async (thunkAPI) => {
        // league needs to be set to public for this to work.
        var response = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?view=mLiveScoring&view=mMatchupScore&view=mScoreboard`);
        return response.data;
    }
  )
  

export const espnSlice = createSlice({
    name: "espn",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllData.fulfilled, (state, action) => {

          const leagueDetails = action.payload;
          const { teams, scoringPeriodId } = leagueDetails;
          const matchupPeriodId = leagueDetails.status.currentMatchupPeriod;
      
          const thisWeeksMatchups = leagueDetails.schedule.filter(x => x.matchupPeriodId === matchupPeriodId);
          const thisWeeksScoresDisregardingAwayHome = (thisWeeksMatchups.map(x => x.away)).concat(thisWeeksMatchups.map(x => x.home));
          const thisWeeksMatchupsWithTeamData = thisWeeksScoresDisregardingAwayHome.map(x => {
              return { ...x, team: teams.find(t => t.id === x.teamId) }
          });
          const thisWeeksMatchupsWithoutEliminatedTeams = thisWeeksMatchupsWithTeamData.filter(x => !x.team.location.includes('🪦'));// headstone emoji
          const cleanedDataObject = thisWeeksMatchupsWithoutEliminatedTeams.map(x => {
            return {
              totalPoints: x.totalPointsLive,
              projectedPoints: x.totalProjectedPointsLive,
              adjustment: x.adjustment,
              team: x.team
            };
          })

          state.week = scoringPeriodId;

          state.scoreboardRows = cleanedDataObject;
        })
      },
});

// Action creators are generated for each case reducer function
//export const { getAllData } = espnSlice.actions;
export { getAllData, ScoreboardRow };

export default espnSlice.reducer;
