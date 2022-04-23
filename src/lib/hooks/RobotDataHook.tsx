import { useState, useCallback } from 'react';

import Robots from '../../data/robots.json';

import IRobot from '../../interface/IRobot';

const RobotDataHook = () => {

  const [robots, setRobots] = useState(Robots);
  const [randomRobot, setRandomRobot] = useState<IRobot>();

  const dispatchRobot = useCallback((action: any, payload: { id: number; }) => {
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
      const notWithMySelectedRobot = activeRandom.filter(
        r => Number(r.type) !== Number(payload.id));

      const r = Math.floor(Math.random() * (activeRandom.length));
      const rand:IRobot = notWithMySelectedRobot[r];
      console.log(rand); /* my todo list: start testing */
      setRandomRobot(rand);
      return;
    default:
      return;
    }
  }, []);

  return { robots, randomRobot, dispatchRobot };
};

export default RobotDataHook;