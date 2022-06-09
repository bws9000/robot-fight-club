import { useState } from 'react';

import History from '../../../data/history.json';

import IHistoryDetails from '../../../interface/IHistoryDetails';

const GameHistoryDataHook = () => {

  const [history] = useState<IHistoryDetails[]>(History);

  const dispatchHistory = ((action: string, 
    payload:{item:IHistoryDetails}) => {
    switch (action) {
    case 'ADD_ENTRY':
      const item:IHistoryDetails = payload.item;
      history.push(item);
      return;
    default:
      return;
    }
  });

  return { history, dispatchHistory };
};

export default GameHistoryDataHook;