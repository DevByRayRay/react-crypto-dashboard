import React, { useState, useEffect } from 'react';

import './App.css';
import CoinItem from './components/coins/item/coin-item'
import { getCoinInfo, getCoinHistory, coinNames, mergeCoinHistory } from './services/coins/coins-service'

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log('App')
    async function initialRequests() {
      const coins = await getCoinInfo()
      const history = await getCoinHistory(coinNames(coins))
      const mappedCoins = mergeCoinHistory(coins, history)

      setCoins(mappedCoins)
    }
    initialRequests()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Dashboard</h1>
      </header>

      <section>
        <div className="list">
          {coins && coins.map((coin, index) => coin.hasHistory ? <CoinItem coin={coin} key={index} /> : null)}
        </div>
      </section>
      <div className="overlay"></div>
    </div>
  );
}

export default App;
