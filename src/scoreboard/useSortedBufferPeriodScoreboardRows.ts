import { useSelector } from 'react-redux';
import { ScoreboardRow } from '../store/espnSlice';
import { RootState } from '../store/store';

const useSortedBufferPeriodScoreboardRows = () => {
  const rows = useSelector<RootState, ScoreboardRow[]>((state) => state.espn.bufferPeriodScoreboardRows);
  const sortedRows = rows
    .filter((x) => !x.team.isEliminated)
    .slice()
    .sort((a, b) => b.projectedPoints - a.projectedPoints);
  return sortedRows;
};

export { useSortedBufferPeriodScoreboardRows };
