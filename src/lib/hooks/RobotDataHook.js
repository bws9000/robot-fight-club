import { useState, useCallback } from 'react';

import Robots from '../../data/robots.json';

const RobotDataHook = () => {

  const [robots, setRobots] = useState(Robots);
  const [randomRobot, setRandomRobot] = useState([]);

  const dispatchRobot = useCallback((action, payload) => {
    switch (action) {
    case 'ALL_ACTIVE_ROBOTS':
      const allActive = Robots.filter(r => r.active === true);
      setRobots(allActive);
      return;
    case 'ONE_ROBOT':
      const oneRobot = Robots.filter(r => r.type === Number(payload.id));
      setRobots(oneRobot);
      return;
    case 'DEACTIVATE_ROBOT':
      Robots[Number(payload.id)].active = false;
      return;
    case 'RANDOM_OPPONENT':
      const activeRandom = Robots.filter(r => r.active === true);
      const r = Math.floor(Math.random() * (activeRandom.length));
      const notWithMySelectedRobot = activeRandom.filter(r => r.type !== payload.id);
      const rand = notWithMySelectedRobot[r];
      setRandomRobot(rand);
      return;
    default:
      return;
    }
  }, []);

  return { robots, randomRobot, dispatchRobot };
};

export default RobotDataHook;