import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


// document.addEventListener("keydown", event => {
//   [
//     [37, 38, 39, 40, 32, 27],
//     [65, 87, 68, 83, 13, 27],
//   ].forEach((key, index) => {


//     let btn = event.keyCode
//     if (event.type === "keydown") {
//       if (btn === key[0]) {
//         move(-1)
//       }
//       if (btn === key[1]) {
//         jump(3)
//       }
//       if (btn === key[2]) {
//         move(1);
//       }
//       if (btn === key[3]) {
//         jump(-1)
//       }
//       if (btn === key[4]) {
//         attack()
//       }
//       if (btn === key[5]) {
//         menu()
//     }

//   })

// })


export default App;
