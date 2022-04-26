import robotImage from '../assets/Robot.svg';

import { useEffect } from 'react';

import RobotDataHook from '../lib/hooks/data/RobotDataHook';
import GameHistoryDataHook from '../lib/hooks/data/GameHistoryDataHook';

import { useNavigate } from 'react-router-dom';

import IFight from '../interface/IFight';

import ToasterHook from '../lib/hooks/util/Toaster';

const Fight: React.FC<IFight> = ({ oneRobot }) => {
    
  const { 
    selectedRobotIndex, 
    randomRobot,
    randomRobotMessage,
    randomRobotStatus,
    dispatchRobot } = RobotDataHook();
  
  const randomRobotColor: string = randomRobot?.color ?? '';

  const { dispatchHistory } = GameHistoryDataHook();

  const { toasty } = ToasterHook();

  const navigate = useNavigate();
  
  useEffect(() => {

    if (randomRobotStatus === false) {
      toasty(randomRobotMessage);
    }

    return (() => {
      navigate('/');
    });
    
  }, [randomRobotMessage]);
  
  const getStyle = (color:string | undefined) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const fightRobots = () => {
    const result = fightResults();
    const opponentResult = (result > 0) ? 0 : 1;
    dispatchHistory('ADD_ENTRY', { item:{ you:result, opponent:opponentResult } });
    navigate('/results/' + result);
  };

  const fightResults = () => {
    // 0 me, 1 opponent
    const fightResults = Math.random();
    return (fightResults < 0.5) ? 0 : 1;
  };

  useEffect(() => {

    dispatchRobot('ALL_ACTIVE_ROBOTS', { robotId: 0, selectedRobotIndex: 0 });
    dispatchRobot('RANDOM_OPPONENT', 
      { robotId: 0, selectedRobotIndex: selectedRobotIndex });

  }, [dispatchRobot, navigate, selectedRobotIndex]);

  return (
        
    <div className="grid-container">
            
      <div className="grid-box">
        <h1>Welcome to Robot Fight Club</h1>
        <img
          style={getStyle(oneRobot?.color)}
          src={robotImage}
          alt={oneRobot?.name}
          height={100}
        />
        <h3>{`My Robot: ${oneRobot?.name}`} </h3>

        <img
          style={getStyle(randomRobotColor)}
          src={robotImage}
          alt={randomRobot?.name}
          height={100}
        />
        <h3>{`My Opponent: ${randomRobot?.name}`}</h3>
        <span>
          <button onClick={ () => {
            fightRobots(); 
          }}>Fight!</button>
        </span>
      </div>
                
    </div>
  );
};

export default Fight;