import { useState, useCallback } from 'react';

import Users from '../../data/users.json';

const UserDataHook = () => {

    const [ selectedRobotId, setSelectedRobotId] = useState();

    const dispatchUser = useCallback((action, payload) => {
          switch (action) {
              case 'SELECT_ROBOT':
                  const idValue = Users[0].robotSelected = Number(payload.id);
                  setSelectedRobotId(idValue);
                  return;
              case 'DESELECT_ROBOT':
                  const idValueNull = Users[0].robotSelected = -1;
                  setSelectedRobotId(idValueNull);
                  return;
              default:
                  return;
          }
      },[]);

      return { selectedRobotId, dispatchUser}
}

export default UserDataHook;