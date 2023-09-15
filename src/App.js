import './App.css';
import Scoreboard from './scoreboard/scoreboard.tsx';
import BufferPeriodScoreboard from './scoreboard/bufferPeriodScoreboard';

function App() {
  return (
    <div className="App">
      <Scoreboard/>
      <BufferPeriodScoreboard/>
    </div>
  );
}

export default App;
