
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import robotImage from '../assets/Robot.svg';

import RobotDataHook from '../lib/hooks/RobotDataHook';

const ViewAllRobots = () => {

  const navigate = useNavigate();
  const { robots, dispatchRobot } = RobotDataHook();
    
  useEffect(() => {
    return dispatchRobot('ALL_ACTIVE_ROBOTS', { id: 0 });
  }, [dispatchRobot]);
    
  const getStyle = (color:string) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const clickRobot = (id:number) => {
    navigate('/robot/' + id);
  };
    
  return (
        
    <div className="grid-container">
      {
        robots.map((robot, index) => (
          <div onClick={ () => {
            clickRobot(robot.type); 
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