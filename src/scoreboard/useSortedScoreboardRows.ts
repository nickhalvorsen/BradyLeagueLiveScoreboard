import { useEspnStore } from '../store/espnStore';

const useSortedScoreboardRows = () => {
  const rows = useEspnStore((state) => state.scoreboardRows);
  const sortedRows = rows
    .filter((x) => !x.team.isEliminated)
    .slice()
    .sort((a, b) => b.projectedPoints - a.projectedPoints);

  return sortedRows;
};

export { useSortedScoreboardRows };
