import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import config from '../config'

let config = require('../config.json');

type Manager = {

}

type EspnSliceState = {
    managers: Manager[];
};

const initialState: EspnSliceState = {
    managers: []
};

const getAllData = createAsyncThunk(
    'espn/getAllData',
    async (thunkAPI) => {
        console.log('config', config);
        // &view=mRoster to view player info (makes the response huge)
        const url = `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${config.seasonYear}/segments/0/leagues/${config.leagueId}?view=mLiveScoring&view=mMatchupScore&view=mSettings&view=mStandings&view=mStatus&view=mTeam&view=modular&view=mNav`;
        const cookies = `espn_s2=${config.espnS2CookieValue}; SWID=${config.espnSwidCookieValue}`;

        axios.defaults.withCredentials = true;
        const instance = axios.create({
            withCredentials: true
        });            

        const response = await axios.get(url,  {
            headers: {
              Cookie: cookies,
            },
            withCredentials: true,
          })

          return response;
    }
  )
  

export const espnSlice = createSlice({
    name: "espn",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllData.fulfilled, (state, action) => {
          console.log('the request done', action.payload)
        })
      },
});

// Action creators are generated for each case reducer function
//export const { getAllData } = espnSlice.actions;
export { getAllData };

export default espnSlice.reducer;
