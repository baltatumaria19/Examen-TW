
import logo from './logo.svg';
import './App.css';
import MeetingList from './components/MeetingList';
import ParticipantList from './components/ParticipantList';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeetingList/>}/>
          <Route path="/ParticipantList/:id" element={<ParticipantList/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
