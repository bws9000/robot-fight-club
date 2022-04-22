import { useState, useCallback } from 'react';

// import Users from '../../data/users.json';

const UserDataHook = () => {

  const [selectedRobotId, setSelectedRobotId] = useState();

  const dispatchUser = useCallback((action, payload) => {
    switch (action) {
    case 'SELECT_ROBOT':
      setSelectedRobotId(Number(payload.id));
      return;
    case 'DESELECT_ROBOT':
      setSelectedRobotId(-1);
      return;
    default:
      return;
    }
  }, []);

  return { selectedRobotId, dispatchUser };
};

export default UserDataHook;