
import { useParams } from 'react-router-dom';

import GameHistoryDataHook from '../lib/hooks/GameHistoryDataHook';

import { useEffect } from 'react';

const FightResults = () => {

  const { result } = useParams();

  const { history, dispatchHistory } = GameHistoryDataHook();

  useEffect(() => {
    dispatchHistory('HISTORY', {});
  }, [dispatchHistory]);

  return (
    <div>
      <h1>{(Number(result) === 0) ? 'You Won!' : 'You Lost!'}</h1>
      <h3>History:</h3>
      <span>{JSON.stringify(history)}</span>
    </div>
  );
};

export default FightResults;