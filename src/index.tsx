import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BradyScoreboards } from './scoreboard/bradyScoreboards';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BradyScoreboards />
  </React.StrictMode>
);
