import robotImage from '../assets/Robot.svg';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import RobotDataHook from '../lib/hooks/RobotDataHook';

const ViewRobot = ({ selectRobotFunc, deselectRobotFunc }) => {

  const { robots, dispatchRobot } = RobotDataHook();

  const navigate = useNavigate();

  const { id } = useParams();
    
  useEffect(() => {
    dispatchRobot('ONE_ROBOT', { id:id });
  }, [dispatchRobot, id]);

  const getStyle = (color) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const clickRobot = () => {
    alert(JSON.stringify(robots[0]));
  };

  const deleteRobot = () => {
    dispatchRobot('DEACTIVATE_ROBOT', { id:id });
    deselectRobotFunc();
    navigate('/');
  };

  const selectRobot = () => {
    selectRobotFunc(id);
    navigate('/fight');
  };
    
  return (
    <div className="grid-container">
            
      <div className="grid-box">  
        <img
          style={getStyle(robots[0].color)}
          src={robotImage}
          alt={robots[0].name}
          type={id}
          height={500}
        />

        <span>
          <button onClick={ () => {
            selectRobot(); 
          }}>Select</button>
          <button onClick={ () => {
            deleteRobot(); 
          }}>Delete</button> 
          <button onClick={ () => {
            clickRobot(); 
          } }>Infos</button>
        </span>
      </div>
    </div>
  );

};

export default ViewRobot;