import React, { useState, useEffect } from 'react';
import './App.css';
import CoinsList from './components/coins/list/coin-list'


const coinInfo = async () => {
  const data = await fetch('https://api.coincap.io/v2/assets')
  const json = data.json()
  return json
}

function App() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!info.hasOwnProperty('timestamp')) {
      coinInfo().then(data => {
        setInfo(data)
      })
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Dashboard</h1>
      </header>

      <section>
        <CoinsList info={info}></CoinsList>
      </section>
      <div className="overlay"></div>
    </div>
  );
}

export default App;
