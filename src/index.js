import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const wsURI = 'ws://localhost:3001';
let ws = new WebSocket(wsURI); // save it for later...

ws.onopen = () => {
  console.log(`ws connected @${wsURI}`);
}
  
ws.onmessage = evt => {
  const message = JSON.parse(evt.data);
  console.log(message);
}
  
ws.onclose = () => {
  console.log('disconnected');
  ws = new WebSocket(wsURI);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);