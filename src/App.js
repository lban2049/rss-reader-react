import './App.css';
import LeftArea from './view/LeftArea';

function App() {
  return (
    <div className="App bg-ws-950 flex flex-row">
      <div className='left-block h-full border border-solid border-ws-700'>
        <LeftArea />
      </div>
      <div className="flex-1">

      </div>
    </div>
  );
}

export default App;
