import robotImage from '../assets/Robot.svg';

import { useEffect } from 'react';

import RobotDataHook from '../lib/hooks/data/RobotDataHook';
import GameHistoryDataHook from '../lib/hooks/data/GameHistoryDataHook';

import { useNavigate } from 'react-router-dom';

import IFight from '../interface/IFight';

import ToasterHook from '../lib/hooks/util/Toaster';

const Fight: React.FC<IFight> = ({ selectedRobotId }) => {

  const { 
    selectedRobot,
    selectedRobotIndex,
    randomRobot,
    randomRobotMessage,
    randomRobotStatus,
    fightResults,
    dispatchRobot } = RobotDataHook();

  const { dispatchHistory } = GameHistoryDataHook();

  const { toasty } = ToasterHook();

  const navigate = useNavigate();
  
  const getStyle = (color:string | undefined) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const fightRobots = () => {
    
    // fight results recorded
    dispatchHistory('ADD_ENTRY', { item: fightResults });
    
    navigate('/results/' + fightResults.you);
  };

  useEffect(() => {
    
    // fight predetermined
    dispatchRobot('FIGHT', { robotId: selectedRobotId, selectedRobotIndex: 0 });
    
    dispatchRobot('ONE_ROBOT', { robotId: selectedRobotId, 
      selectedRobotIndex: selectedRobotIndex });

    dispatchRobot('RANDOM_OPPONENT', { robotId: selectedRobotId, 
      selectedRobotIndex: selectedRobotIndex });

  }, [dispatchRobot]);

  useEffect(() => {
    if (randomRobotMessage.length > 0) toasty(randomRobotMessage);
  }, [randomRobotMessage]);

  return (
        
    <div className="grid-container">
      
      <div className="grid-box">
        <h1>Welcome to Robot Fight Club</h1>
        <img
          style={getStyle(selectedRobot?.color)}
          src={robotImage}
          alt={selectedRobot?.name}
          height={100}
        />
        <h3>{`My Robot: ${selectedRobot?.name}`} </h3>

        <img
          style={getStyle(randomRobot?.color)}
          src={robotImage}
          alt={randomRobot?.name}
          height={100}
        />

        { randomRobotStatus &&
        <><h3>{`My Opponent: ${randomRobot?.name}`}</h3><span>
          <button onClick={() => {
            fightRobots();
          } }>Fight!</button>
        </span></>
        }
      </div>   
    </div>
  );
};

export default Fight;