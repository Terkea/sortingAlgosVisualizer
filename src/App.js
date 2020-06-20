import React from 'react';
import './App.css';
import Board from './components/Board'

function App() {
  const values = [5, 120, 69]

  return (
    <div className="App" >
      <Board values={values} />
    </div>
  );
}



export default App;
