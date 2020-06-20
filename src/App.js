import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import { Provider } from './context';

const App = () => {
  const [inputSize, setInputSize] = useState(20);
  const [speed, setSpeed] = useState(200); //ms
  const values = [5, 120, 69];

  return (
    <Provider>
      <div className="App">
        <NavBar />
        <Board values={values} />
      </div>
    </Provider>
  );
};

export default App;
