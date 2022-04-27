import { 
  BrowserRouter as Router, 
  Routes, Route, Link } from 'react-router-dom';

import './App.css';

import About from '../componentsPage/About';

import Fight from '../components/Fight';
import ViewAllRobots from '../components/ViewAllRobots';
import ViewRobot from '../components/ViewRobot';
import FightResults from '../components/FightResults';

import UserDataHook from '../lib/hooks/data/UserDataHook';
import RobotDataHook from '../lib/hooks/data/RobotDataHook';
import { useState } from 'react';

function App() {

  const { dispatchUser } = UserDataHook();
  const { dispatchRobot } = RobotDataHook();

  const [robotId, setRobotId] = useState(0);

  const selectRobotFunc = (robotId:number, index:number):void => {
    setRobotId(robotId);
    dispatchRobot('ONE_ROBOT', { robotId: Number(robotId), 
      selectedRobotIndex: Number(index) });
    return;
  };

  const deselectRobotFunc = ():void => {
    dispatchUser('DESELECT_ROBOT', { id: undefined });
    return;
  };

  return (

    <Router>
      <div className="main">
        <div className="sidebar">
          <ul>
            <li><a href="/" onClick={() => window.location.reload}>Start Over</a></li>
            <li><Link to="/">Select Robot</Link></li>
            <li><Link to="/about">About</Link></li>
            {((robotId < 0) || (robotId === undefined))
              ? 'No Robot Selected' : `Robot Selected: ${robotId}`}
          </ul>
        </div>
        <div className="content">
          <div className="main">
            <section>
              <div className="stage">
                <Routes>
                  <Route path='/' element={<ViewAllRobots />} />
                  <Route path='/robot/:id' element={<ViewRobot 
                    selectRobotFunc={selectRobotFunc} 
                    deselectRobotFunc={deselectRobotFunc}/>} />
                  <Route path='/about' element={ <About/> } />
                  <Route path='/fight' element={ 
                    <Fight selectedRobotId={ robotId }/> } />
                  <Route path='/results/:result' element={<FightResults />} />
                </Routes>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div>
      </div>
    </Router>

  );
}

export default App;
