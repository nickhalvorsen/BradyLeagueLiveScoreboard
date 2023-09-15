import { PayloadAction } from "@reduxjs/toolkit";
import { CustomPlayerSliceState } from "./customPlayersSlice";

const justinJeffersonEspnPlayerId = 4262921;
const derekCarrEspnPlayerId = 16757;

const getCustomPlayersRequestHandler = (state: CustomPlayerSliceState, action: PayloadAction<any,string>) => {
    const leagueDetails = action.payload;
    console.log('leagueDetails', leagueDetails)

    const allPlayers = leagueDetails.teams.flatMap(t => t.roster).flatMap(r => r.entries);

    console.log('allPlayers', allPlayers);

    //state.customPlayerReferenceData.justinJeffersonTotalPoints = ;
    //state.customPlayerReferenceData.derekCarrTotalPoints = ;
};

// todo: cardinals win checker 


export { getCustomPlayersRequestHandler };