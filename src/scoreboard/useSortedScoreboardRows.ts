import { useSelector } from 'react-redux';
import { ScoreboardRow } from '../store/espnSlice';
import { RootState } from '../store/store';

const useSortedScoreboardRows = () => {
  const rows = useSelector<RootState, ScoreboardRow[]>((state) => state.espn.scoreboardRows);
  const sortedRows = rows
    .filter((x) => !x.team.isEliminated)
    .slice()
    .sort((a, b) => b.projectedPoints - a.projectedPoints);

  return sortedRows;
};

export { useSortedScoreboardRows };
