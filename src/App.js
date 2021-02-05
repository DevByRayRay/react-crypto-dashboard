import React, { useState, useEffect } from 'react';
import { formatRFC3339, subHours } from 'date-fns';

import './App.css';
import CoinItem from './components/coins/item/coin-item'
import { Coin } from './models/coin'


const NOMICS_KEY = 'd6c849797ba7a5fd4377623267725ad4'

function App() {
  const [coins, setCoins] = useState([]);

  const coinInfo = async () => {
    // const assets = await fetch('https://api.coincap.io/v2/assets')
    const assets = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1"`)
    const json = assets.json()
    return json
  }

  const coinHistory = async (coins) => {
    const coinNames = Array.isArray(coins) ? coins.toString() : coins
    const date = new Date()
    const startToday = encodeURIComponent(formatRFC3339(subHours(date, 23)))
    const plus24 = encodeURIComponent(formatRFC3339(date))
    const history = await fetch(`https://api.nomics.com/v1/currencies/sparkline?key=demo-b5d84e505a11969a7184f899fbb40ae1&ids=${coinNames}&start=${startToday}&end=${plus24}`)
    // const history = await fetch(`https://api.coincap.io/v2/assets/${coinName}/history?interval=d1`)
    const json = history.json()
    return json
  }

  async function initialRequests() {
    const coins = await coinInfo()

    const coinNames = coins.map((coin) => coin.symbol)

    const history = await coinHistory(coinNames)

    const mappedCoins = coins.map((item) => {
      const coinHistory = history.find(it => it.currency === item.currency)
      return new Coin({ ...item, history: coinHistory })
    })

    setCoins(mappedCoins)
  }


  useEffect(() => {
    console.log('App')
    initialRequests()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Dashboard</h1>
      </header>

      <section>
        <div className="list">
          {coins && coins.map((coin, index) => <CoinItem coin={coin} key={index} />)}
        </div>
      </section>
      <div className="overlay"></div>
    </div>
  );
}

export default App;
