import robotImage from '../assets/Robot.svg';

import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import RobotDataHook from '../lib/hooks/data/RobotDataHook';

import IViewRobotFunctions from '../interface/function/IViewRobotFunctions';

const ViewRobot: React.FC<IViewRobotFunctions> = 
({ selectRobotFunc, deselectRobotFunc }) => {

  const { robots, oneRobot, dispatchRobot } = RobotDataHook();

  const navigate = useNavigate();

  const { id } = useParams();
    
  useEffect(() => {
    dispatchRobot('ONE_ROBOT', { robotId: Number(id), 
      selectedRobotIndex: Number(id) });
  }, [dispatchRobot, id]);

  const getStyle = (color:any) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const clickRobot = () => {
    alert(JSON.stringify(robots[Number(id)]));
  };

  const deleteRobot = () => {
    dispatchRobot('DEACTIVATE_ROBOT', { robotId: Number(id), 
      selectedRobotIndex:Number(id) });
    deselectRobotFunc(Number(id), Number(id));
    navigate('/');
  };

  const selectRobot = () => {
    selectRobotFunc(Number(id), Number(id));
    navigate('/fight');
  };
    
  return (
    <div className="grid-container">
            
      <div className="grid-box">  
        <img
          style={getStyle(oneRobot?.color)}
          src={robotImage}
          alt={robots[0].name}
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