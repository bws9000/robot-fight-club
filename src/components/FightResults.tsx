
import { useParams } from 'react-router-dom';

import GameHistoryDataHook from '../lib/hooks/data/GameHistoryDataHook';

import { useEffect } from 'react';

import IHistoryDetails from '../interface/IHistoryDetails';

const FightResults: React.FC = () => {

  const { result } = useParams();

  const { history, dispatchHistory } = GameHistoryDataHook();

  useEffect(() => {
    const details:IHistoryDetails = { you:0, opponent:0 };
    return dispatchHistory('HISTORY', { item: details });
  }, [dispatchHistory]);

  return (
    <div>
      <h1>{(Number(result) === 1) ? 'You Won!' : 'You Lost!'}</h1>
      <h3>History:</h3>
      <span>{JSON.stringify(history)}</span>
    </div>
  );
};

export default FightResults;