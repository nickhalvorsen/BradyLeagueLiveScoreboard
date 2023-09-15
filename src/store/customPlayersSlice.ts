import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomPlayersRequestHandler } from "./getCustomPlayersRequestHandler";
import axios from "axios";
import { getSeasonYear } from "./getSeasonYear";

let config = require('../config.json');

type CustomPlayer = {
  name: string;
  teamId: number;
  pictureUrl: string;
  description: string;
  points: number;
}

type CustomPlayerReferenceData = {
    justinJeffersonTotalPoints: number;
    derekCarrTotalPoints: number;
    didCardinalsWin: boolean;
}

type CustomPlayerSliceState = {
    customPlayerReferenceData: CustomPlayerReferenceData;
    customPlayers?: CustomPlayer[];
};

const initialState: CustomPlayerSliceState = {
    customPlayerReferenceData: {
        justinJeffersonTotalPoints: 0,
        derekCarrTotalPoints: 0,
        didCardinalsWin: false
    }
};

const getCustomPlayers = createAsyncThunk(
  'espn/getCustomPlayers',
  async(thunkAPI) => {
    // league needs to public
    var response = await axios.get(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?view=mRoster&view=mTeam`);
    return response.data;
  }
)
  
export const customPlayersSlice = createSlice({
    name: "customPlayers",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomPlayers.fulfilled, getCustomPlayersRequestHandler)
      },
});

export { getCustomPlayers, CustomPlayerSliceState };

export default customPlayersSlice.reducer;
