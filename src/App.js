import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StoriesList from './components/stories/StoriesList';
import Fullstory from './components/stories/Fullstory';
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<StoriesList />} />
        <Route path="/:id" element={<Fullstory/>}/>
      </Routes>
    </div>
  );
}

export default App;