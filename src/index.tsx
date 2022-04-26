import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import LogRocket from 'logrocket';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

LogRocket.init('bxwv0m/robot-fight-club');

const wsURI = 'ws://localhost:3001';
let ws = new WebSocket(wsURI); // save it for later...

ws.onopen = () => {
  console.log(`ws connected @${wsURI}`);
};
  
ws.onmessage = evt => {
  const message = JSON.parse(evt.data);
  console.log(message);
};
  
ws.onclose = () => {
  console.log('disconnected');
  ws = new WebSocket(wsURI);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);