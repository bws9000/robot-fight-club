import { useState, useCallback } from 'react';

import Robots from '../../data/robots.json';

import IRobot from '../../interface/IRobot';

import { 
  getAllActiveRobots,
  getOneRobot,
} from '../../game/actions';

const RobotDataHook = () => {
  
  const initRobots:IRobot[] = Robots;
  
  const [robots, setRobots] = useState(initRobots);
  const [randomRobot, setRandomRobot] = useState<IRobot>();

  const dispatchRobot = useCallback(async (action: any, payload: { id: number; }) => {
    switch (action) {
    case 'ALL_ACTIVE_ROBOTS':
      const allActive = await getAllActiveRobots(Robots);
      setRobots(allActive);
      return;
    case 'ONE_ROBOT':
      const oneRobot = await getOneRobot(Robots, payload.id);
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