import { useState, useCallback } from 'react';

import History from '../../data/history.json';

import IHistoryDetails from '../../interface/IHistoryDetails';

const GameHistoryDataHook = () => {

  const [history, setHistory] = useState<IHistoryDetails[]>([]);

  const dispatchHistory = useCallback((action: string, 
    payload:{item:IHistoryDetails}) => {
    switch (action) {
    case 'HISTORY':
      setHistory(History);
      return;
    case 'ADD_ENTRY':
      history.push(payload.item);
      return;
    default:
      return;
    }
  }, []);

  return { history, dispatchHistory };
};

export default GameHistoryDataHook;