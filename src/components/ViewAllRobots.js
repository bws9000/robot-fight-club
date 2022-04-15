
import React, {useEffect} from 'react';

import { useNavigate } from "react-router-dom";
import robotImage from '../assets/Robot.svg';

// import { AppContext } from '../context';
import RobotDataHook from "../lib/hooks/RobotDataHook";

const ViewAllRobots = () => {

    const navigate = useNavigate();
    const { robots, dispatchRobot} = RobotDataHook();
    // const { robots } = useContext(AppContext);
    
    useEffect(()=>{
        dispatchRobot('ALL_ACTIVE_ROBOTS', {});
    },[dispatchRobot]);
    
    const getStyle = (color) => {
        return {
            cursor:'pointer',
            backgroundColor: color
        }
    }

    const clickRobot = (id) => {
        navigate('/robot/' + id);
    }
    
    return (
        
        <div className="grid-container">
            {
                robots.map((robot,index) => (
                    <div onClick={()=> {clickRobot(robot.type)}}
                    key={index} className="grid-box">
                            <img
                            style={getStyle(robot.color)}
                            src={robotImage}
                            alt={robot.name}
                            type={robot.type}
                            height={100}
                            />
                    </div>
                ))
            }
            
        </div>
    )
    
}

export default ViewAllRobots;