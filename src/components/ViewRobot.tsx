import robotImage from '../assets/Robot.svg';

import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import RobotDataHook from '../lib/hooks/RobotDataHook';

import IViewRobotFunctions from '../interface/function/IViewRobotFunctions';

const ViewRobot: React.FC<IViewRobotFunctions> = 
({ selectRobotFunc, deselectRobotFunc }) => {

  const { robots, dispatchRobot } = RobotDataHook();

  const navigate = useNavigate();

  const { id } = useParams();
    
  useEffect(() => {
    dispatchRobot('ONE_ROBOT', { id:Number(id) });
  }, [dispatchRobot, id]);

  const getStyle = (color:any) => {
    return {
      cursor:'pointer',
      backgroundColor: color,
    };
  };

  const clickRobot = () => {
    alert(JSON.stringify(robots[0]));
  };

  const deleteRobot = () => {
    dispatchRobot('DEACTIVATE_ROBOT', { id:Number(id) });
    deselectRobotFunc();
    navigate('/');
  };

  const selectRobot = () => {
    selectRobotFunc(Number(id));
    navigate('/fight');
  };
    
  return (
    <div className="grid-container">
            
      <div className="grid-box">  
        <img
          style={getStyle(robots[0].color)}
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