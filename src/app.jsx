import ReactDOM from 'react-dom';
import React from 'react';
import styles_ from './app.scss';
import Parent from './components/parent.jsx';

function App() {
  return (
    <div className="app">
      <Parent />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
