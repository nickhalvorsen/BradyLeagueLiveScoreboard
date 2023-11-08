import { useSelector } from "react-redux";
import { ScoreboardRow } from "../store/espnSlice";
import { RootState } from "../store/store";

const useSortedBufferPeriodScoreboardRows = () => {
    const rows: ScoreboardRow[] = useSelector<RootState>(state => state.espn.bufferPeriodScoreboardRows) as ScoreboardRow[];
    const sortedRows = rows.slice().sort((a,b) => b.projectedPoints - a.projectedPoints);
    return sortedRows;
}

export { useSortedBufferPeriodScoreboardRows };