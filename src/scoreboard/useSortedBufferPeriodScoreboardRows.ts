import { useEspnStore } from '../store/espnStore';

const useSortedBufferPeriodScoreboardRows = () => {
  const rows = useEspnStore((state) => state.bufferPeriodScoreboardRows);
  const sortedRows = rows
    .filter((x) => !x.team.isEliminated)
    .slice()
    .sort((a, b) => b.projectedPoints - a.projectedPoints);

  return sortedRows;
};

export { useSortedBufferPeriodScoreboardRows };
