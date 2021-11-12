import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, } from 'react-router-dom';
import './fonts/mukta/Mukta-ExtraBold.ttf';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.scss';

// ag-grid-react
// import 'ag-grid-community/dist/styles/ag-grid.css';
import './components/agGridReact/styles/ag-grid.min.css'
import './components/agGridReact/styles/ag-theme-material.css';
import GetEmailHash from './components/gravatar/getEmailHash';

const isApi = (): boolean => {
  let host = window.location.host;
  // let protocol = window.location.protocol;
  let parts = host.split('.');
  let subdomain = '';
  // If we get more than 3 parts, then we have a subdomain
  // INFO: This could be 4, if you have a co.uk TLD or something like that.

  if (parts.length >= 3) {
    subdomain = parts[0];
    if (subdomain === 'api') {
      console.log('we have api');
      return true;
    }
  }
  return false;
}

ReactDOM.render(
  <React.StrictMode>
    {
      isApi()
      ? <img src={`https://www.gravatar.com/avatar/${GetEmailHash('joni.rinta-kahila@hotmail.com')}?s=200&r=pg&d=404`} alt='gravatar' />
      : <Router>
          <App />
        </Router>
    }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
