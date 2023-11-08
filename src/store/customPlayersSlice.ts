import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomPlayersRequestHandler } from "./getCustomPlayersRequestHandler";
import axios from "axios";
import { getSeasonYear } from "./getSeasonYear";
import { referencePlayerIds } from "../customPlayer/customPlayer";

const config = require('../config.json');

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
  'customPlayers/getCustomPlayers',
  async(thunkAPI) => {
    const cfg = {
      headers:{
        'X-Fantasy-Filter': JSON.stringify({"players":{"filterIds":{"value":[referencePlayerIds.justinJefferson, referencePlayerIds.derekCarr]},"sortPercOwned":{"sortPriority":2,"sortAsc":false},"filterRanksForSlotIds":{"value":[0,2,4,6,17,16]},"filterStatsForTopScoringPeriodIds":{"value":2,"additionalValue":["002023","102023","002022","1120233","022023"]}}})
      }
    };

    // league needs to be public
    const response = await axios.get(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?scoringPeriodId=3&view=kona_player_info`, cfg as any);
    return response.data;
  }
)

const getNflGames = createAsyncThunk(
  'customPlayers/getNflGames',
  async (thunkAPI) => {
    const response = await axios.get('https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023?view=proTeamSchedules_wl');
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
        //builder.addCase(getNflGames.fulfilled, getNflGamesRequestHandler)
      },
});

export { getCustomPlayers, getNflGames,  CustomPlayerSliceState };

export default customPlayersSlice.reducer;
