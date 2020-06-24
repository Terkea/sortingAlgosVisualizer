import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import { Provider } from './context';
import Background from './containers/Background';

const App = () => {
  const [inputSize, setInputSize] = useState(20);
  const [speed, setSpeed] = useState(200); //ms

  return (
    <Provider>
      <Background style={{ position: 'absolute' }} />
      <div style={{ position: 'relative' }}>
        <NavBar />
        <Board />
      </div>
    </Provider>
  );
};

export default App;
