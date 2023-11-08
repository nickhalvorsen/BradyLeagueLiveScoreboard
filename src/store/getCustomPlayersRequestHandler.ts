import { PayloadAction } from "@reduxjs/toolkit";
import { CustomPlayerSliceState } from "./customPlayersSlice";
import { referencePlayerIds } from "../customPlayer/customPlayer";

const getCustomPlayersRequestHandler = (state: CustomPlayerSliceState, action: PayloadAction<any,string>) => {
    const playersQuery = action.payload.players;

    console.log('playersQuery', playersQuery)
    const justinJefferson = playersQuery.find(p => p.id === referencePlayerIds.justinJefferson);
    const derekCarr = playersQuery.find(p => p.id === referencePlayerIds.derekCarr);
    console.log('jefferso', justinJefferson);

    // TODO: get their current points for this week

    //state.customPlayerReferenceData.jermarJeffersonPoints = ;
    //state.customPlayerReferenceData.derekCarrierPoints = ;
    //state.customPlayerReferenceData.kylerMurrayPoints = ;
};

const getPlayerProjection = (player) => player.player.stats.find(s => s.externalId = 20233);

// todo: cardinals win checker 


export { getCustomPlayersRequestHandler };