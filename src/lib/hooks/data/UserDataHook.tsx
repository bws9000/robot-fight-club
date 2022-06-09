import { useState } from 'react';

const UserDataHook = () => {

  const [selectedRobotId, setSelectedRobotId] = useState();

  const dispatchUser = ((action: any, payload: { id: any; }) => {
    switch (action) {
    case 'SELECT_ROBOT':
      setSelectedRobotId(payload.id);
      return;
    case 'DESELECT_ROBOT':
      setSelectedRobotId(undefined);
      return;
    default:
      return;
    }
  });

  return { selectedRobotId, dispatchUser };
};

export default UserDataHook;