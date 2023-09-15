import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getScoreboardRequestHandler } from "./getScoreboardRequestHandler";
import axios from "axios";
import { getSeasonYear } from "./getSeasonYear";

let config = require('../config.json');

type Team = {
  id: number;
  name: string;
  logo: string;
  isEliminated: boolean;
  isImmune: boolean;
  bufferPeriodTotalPoints: number;
}

type ScoreboardRow = {
  team: Team,
  projectedPoints: number,
  totalPoints: number,
}

type EspnSliceState = {
    scoreboardRows: ScoreboardRow[];
    week: number;
    teams: Team[];
};

const initialState: EspnSliceState = {
    scoreboardRows: [],
    week: 0,
    teams: [],
};

const getScoreboard = createAsyncThunk(
    'espn/getScoreboard',
    async (thunkAPI) => {
        // league needs to public
        var response = await axios.get(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?view=mLiveScoring&view=mMatchupScore&view=mScoreboard`);
        return response.data;
    }
  );

export const espnSlice = createSlice({
    name: "espn",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getScoreboard.fulfilled, getScoreboardRequestHandler)
      },
});

export { getScoreboard, EspnSliceState, ScoreboardRow, Team };

export default espnSlice.reducer;
