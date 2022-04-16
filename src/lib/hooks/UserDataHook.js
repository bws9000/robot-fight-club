import { useState, useCallback } from 'react';

import Users from '../../data/users.json';

const UserDataHook = () => {

  const [selectedRobotId, setSelectedRobotId] = useState();

  // note-to-self: fix this mkay...
  const dispatchUser = useCallback((action, payload) => {
    switch (action) {
    case 'SELECT_ROBOT':
      // eslint-disable-next-line no-multi-assign
      const idValue = Users[0].robotSelected = Number(payload.id);
      setSelectedRobotId(idValue);
      return;
    case 'DESELECT_ROBOT':
      // eslint-disable-next-line no-multi-assign
      const idValueNull = Users[0].robotSelected = -1;
      setSelectedRobotId(idValueNull);
      return;
    default:
      return;
    }
  }, []);

  return { selectedRobotId, dispatchUser };
};

export default UserDataHook;