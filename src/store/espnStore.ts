import { create } from 'zustand';
import { EspnScoreboardApiResponse } from './espnApiResponseTypes';
import { getSeasonYear } from './getSeasonYear';
import axios from 'axios';
import config from '../config.json';
import { parseEspnResponse } from './parseEspnResponse';

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

type EspnState = {
  scoreboardRows: ScoreboardRow[];
  bufferPeriodScoreboardRows: ScoreboardRow[];
  week: number;
  teams: Team[];
  leagueName: string;
  lastUpdated?: string; // ISO string
  loaded: boolean;
  getScoreboard: () => Promise<void>;
};

const useEspnStore = create<EspnState>((set) => ({
  scoreboardRows: [],
  bufferPeriodScoreboardRows: [],
  week: 0,
  teams: [],
  leagueName: '',
  lastUpdated: undefined,
  loaded: false,
  getScoreboard: async () => {
    const response = await axios.get<EspnScoreboardApiResponse>(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${getSeasonYear()}/segments/0/leagues/${config.leagueId}?view=mLiveScoring&view=mMatchupScore&view=mScoreboard`
    );
    const parsed = parseEspnResponse(response.data);
    set({ loaded: true, ...parsed });
  },
}));

export { useEspnStore, ScoreboardRow, Team };
