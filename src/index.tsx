import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Basename } from './appProperties';
import './fonts/mukta/Mukta-ExtraBold.ttf';
import 'reactjs-popup/dist/index.css';
import "react-activity/dist/Dots.css";
import 'react-tabs/style/react-tabs.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router basename={Basename}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
