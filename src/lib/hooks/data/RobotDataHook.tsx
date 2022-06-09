import { useState, useCallback } from 'react';

import Robots from '../../../data/robots.json';

import IRobot from '../../../interface/IRobot';

import { 
  getAllActiveRobots,
  getOneRobot,
  getRandomOpponent,
  deactivateActiveRobot,
  fight,
} from '../../../game/actions';
import IHistoryDetails from '../../../interface/IHistoryDetails';

const RobotDataHook = () => {
  
  const initRobots:IRobot[] = Robots;
  
  const [robots, setRobots] = useState(initRobots);
  const [selectedRobot, setSelectedRobot] = useState<IRobot>();
  const [selectedRobotId, setSelectedRobotId] = useState(0);
  const [selectedRobotIndex, setSelectedRobotIndex] = useState(0);

  const [randomRobot, setRandomRobot] = useState<IRobot>();
  const [randomRobotStatus, setRandomRobotStatus] = useState(false);
  const [randomRobotMessage, setRandomRobotMessage] = useState('');

  const [fightResults, setFightResults] = useState<IHistoryDetails>(Object);

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
      deactivateActiveRobot(payload.robotId, Robots);
      return;
    case 'RANDOM_OPPONENT':
      const { status, message, robotObj } = 
        await getRandomOpponent(Robots, payload.robotId);
      initRandomRobot(status, message, robotObj);
      return;
    case 'FIGHT':
      const result = fight();
      setFightResults(result);
      return;
    default:
      return;
    }
  }, []);

  const initRandomRobot = ((
    status:boolean, 
    message:string, 
    robotObj:IRobot) => {
    setRandomRobotMessage(message);
    setRandomRobot(robotObj);
    setRandomRobotStatus(status);
  });

  return { 
    robots,
    selectedRobot,
    selectedRobotId,
    selectedRobotIndex,
    randomRobot,
    randomRobotStatus,
    randomRobotMessage,
    fightResults,
    dispatchRobot };
};

export default RobotDataHook;