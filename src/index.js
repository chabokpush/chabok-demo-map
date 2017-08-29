import React from 'react';
import ReactDOM from 'react-dom';
import './app/assets/css/App.css';
import App from './app/containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
