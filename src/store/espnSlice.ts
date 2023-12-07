import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { parseEspnResponse } from './parseEspnResponse';
import axios from 'axios';
import { getSeasonYear } from './getSeasonYear';
import config from '../config.json';
import { EspnScoreboardApiResponse } from './espnApiResponseTypes';

type Team = {
  id: number;
  name: string;
  logo: string;
  isEliminated: boolean;
  isImmune: boolean;
};

type ScoreboardRow = {
  team: Team;
  projectedPoints: number;
  totalPoints: number;
};

type EspnSliceState = {
  scoreboardRows: ScoreboardRow[];
  bufferPeriodScoreboardRows: ScoreboardRow[];
  week: number;
  teams: Team[];
  leagueName: string;
  lastUpdated?: string; // ISO string
  loaded: boolean;
};

const initialState: EspnSliceState = {
  scoreboardRows: [],
  bufferPeriodScoreboardRows: [],
  week: 0,
  teams: [],
  leagueName: '',
  lastUpdated: undefined,
  loaded: false,
};

const getScoreboard = createAsyncThunk('espn/getScoreboard', async () => {
  // league needs to be public
  const response = await axios.get<EspnScoreboardApiResponse>(
    `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?view=mLiveScoring&view=mMatchupScore&view=mScoreboard`
  );
  return response.data;
});

const getScoreboardReducer = (state: EspnSliceState, action: PayloadAction<EspnScoreboardApiResponse, string>) => parseEspnResponse(action.payload);

export const espnSlice = createSlice({
  name: 'espn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScoreboard.fulfilled, getScoreboardReducer);
  },
});

export { getScoreboard, initialState, EspnSliceState, ScoreboardRow, Team };
