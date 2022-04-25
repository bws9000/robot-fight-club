import { 
  BrowserRouter as Router, 
  Routes, Route, Link } from 'react-router-dom';

import './App.css';

import About from '../pageComponents/About';

import Fight from '../components/Fight';
import ViewAllRobots from '../components/ViewAllRobots';
import ViewRobot from '../components/ViewRobot';
import FightResults from '../components/FightResults';

import UserDataHook from '../lib/hooks/UserDataHook';

function App() {

  const { selectedRobotId = -1, dispatchUser } = UserDataHook();

  const selectRobotFunc = (id:number):void => {
    dispatchUser('SELECT_ROBOT', { id : id });
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
            <li><Link to="/">Start</Link></li>
            <li><Link to="/about">About</Link></li>
            {((selectedRobotId < 0) || (selectedRobotId === undefined))
              ? 'No Robot Selected' : `Robot Selected: ${selectedRobotId}`}
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
                    <Fight selectedRobotId={ selectedRobotId }/> } />
                  <Route path='/results/:result' element={<FightResults />} />
                </Routes>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
