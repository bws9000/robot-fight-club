import robotImage from '../assets/Robot.svg';

import { useEffect } from 'react';

import RobotDataHook from '../lib/hooks/RobotDataHook';
import GameHistoryDataHook from '../lib/hooks/GameHistoryDataHook';

import { useNavigate } from 'react-router-dom';

const Fight = ({ selectedRobotId = 0 }) => {
    
  const { robots, randomRobot, dispatchRobot } = RobotDataHook();
  
  const randomRobotColor: string = randomRobot?.color ?? '';

  const { dispatchHistory } = GameHistoryDataHook();

  const navigate = useNavigate();

  const getStyle = (color:any) => {
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

    if (selectedRobotId < 0) {
      navigate('/');
      return;
    }

    dispatchRobot('ALL_ACTIVE_ROBOTS', { id: 0 });
    dispatchRobot('RANDOM_OPPONENT', { id:selectedRobotId });

  }, [dispatchRobot, navigate, selectedRobotId]);

  return (
        
    <div className="grid-container">
            
      <div className="grid-box">
        <h1>Welcome to Robot Fight Club</h1>
        <img
          style={getStyle(robots[selectedRobotId]?.color)}
          src={robotImage}
          alt={robots[selectedRobotId]?.name}
          height={100}
        />
        <h3>{`My Robot: ${robots[selectedRobotId]?.name}`} </h3>

        <img
          style={getStyle(randomRobotColor)}
          src={robotImage}
          alt={randomRobot?.name}
          height={100}
        />
        <h3>My Opponent: {randomRobot?.name}</h3>
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