
import { Key, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import robotImage from '../assets/Robot.svg';

import IRobot from '../interface/IRobot';

import RobotDataHook from '../lib/hooks/data/RobotDataHook';

const ViewAllRobots: React.FC = () => {

  const navigate = useNavigate();
  const { robots, dispatchRobot } = RobotDataHook();
    
  useEffect(() => {
    dispatchRobot('ALL_ACTIVE_ROBOTS', { robotId:0, selectedRobotIndex: 0 });
  }, [dispatchRobot]);
    
  const getStyle = (color:any) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const clickRobot = (id:any) => {
    navigate('/robot/' + id);
  };
    
  return (
        
    <div className="grid-container">
      {
        robots.map((robot: IRobot, 
          index: Key | null | undefined) => (
          <div onClick={ () => {
            clickRobot(robot.id); 
          } }
          key={index} className="grid-box">
            <img
              style={getStyle(robot.color)}
              src={robotImage}
              alt={robot.name}
              height={100}
            />
          </div>
        ))
      }
            
    </div>
  );
    
};

export default ViewAllRobots;