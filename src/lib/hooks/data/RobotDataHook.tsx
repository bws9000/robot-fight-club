import { useState, useCallback } from 'react';

import Robots from '../../../data/robots.json';

import IRobot from '../../../interface/IRobot';

import { 
  getAllActiveRobots,
  getOneRobot,
  getRandomOpponent,
  deactivateActiveRobot,
} from '../../../game/actions';

const RobotDataHook = () => {
  
  const initRobots:IRobot[] = Robots;
  
  const [robots, setRobots] = useState(initRobots);
  const [selectedRobot, setSelectedRobot] = useState<IRobot>();
  const [selectedRobotId, setSelectedRobotId] = useState(0);
  const [selectedRobotIndex, setSelectedRobotIndex] = useState(0);

  const [randomRobot, setRandomRobot] = useState<IRobot>();
  const [randomRobotStatus, setRandomRobotStatus] = useState(false);
  const [randomRobotMessage, setRandomRobotMessage] = useState('');

  const dispatchRobot = useCallback(async (action: any, 
    payload: { robotId:number, selectedRobotIndex:number }) => {
    
    setSelectedRobotIndex(payload.selectedRobotIndex);
    
    switch (action) {
    case 'ALL_ACTIVE_ROBOTS':
      const allActive = await getAllActiveRobots(Robots);
      setRobots(allActive);
      return;
    case 'ONE_ROBOT':
      const oneRobot = await getOneRobot(Robots, payload.robotId);
      setSelectedRobotId(payload.robotId);
      setSelectedRobot(oneRobot);
      return;
    case 'DEACTIVATE_ROBOT':
      // const withDeactivated:IRobot[] = 

      deactivateActiveRobot(payload.robotId, Robots);

      // setRobots(deactivateActiveRobot);
      return;
    case 'RANDOM_OPPONENT':
      const { status, message, robotObj } = 
        await getRandomOpponent(Robots, payload.robotId);
      initRandomRobot(status, message, robotObj);
      return;
    default:
      return;
    }
  }, []);

  const initRandomRobot = useCallback((
    status:boolean, 
    message:string, 
    robotObj:IRobot) => {
    setRandomRobotMessage(message);
    setRandomRobot(robotObj);
    setRandomRobotStatus(status);
  }, []);

  return { 
    robots,
    selectedRobot,
    selectedRobotId,
    selectedRobotIndex,
    randomRobot,
    randomRobotStatus,
    randomRobotMessage,
    dispatchRobot };
};

export default RobotDataHook;