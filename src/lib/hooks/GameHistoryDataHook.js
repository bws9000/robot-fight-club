import { useState, useCallback } from 'react';

import History from '../../data/history.json';

const GameHistoryDataHook = () => {

    const [ history, setHistory] = useState();

    const dispatchHistory = useCallback((action, payload) => {
          switch (action) {
              case 'HISTORY':
                  setHistory(History);
                  return;
              case 'ADD_ENTRY':
                  History.push(payload.item);
                  return;
              default:
                  return;
          }
      },[]);

      return { history, dispatchHistory}
}

export default GameHistoryDataHook;