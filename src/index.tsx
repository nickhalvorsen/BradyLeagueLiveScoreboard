import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BradyScoreboards } from './scoreboard/bradyScoreboards';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BradyScoreboards />
    </Provider>
  </React.StrictMode>
);
