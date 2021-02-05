import React, { useState, useEffect } from 'react';
import './App.css';
import CoinsList from './components/coins/list/coin-list'
import CoinItem from './components/coins/list/coin-item'
import { Coin } from './models/coin'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const fake = () => {
  return {
    ethereum: Math.random() * 1000,
    "bitcoin-cash": Math.random() * 1000,
    bitcoin: Math.random() * 1000
  }
}

function updateCoinValues(info, prices) {
  const parsedPrices = JSON.parse(prices) ?? {}
  const entries = Object.entries(parsedPrices)
  console.log("🚀 ~ file: coin-list.js ~ line 101 ~ useEffect ~ entries", entries)
  let coinList = info
  if (coinList?.length > 0) {

    entries.forEach((entry) => {
      const [name, value] = entry
      let index = coinList?.findIndex((coin) => coin.id === name)

      if (index !== -1 && index !== undefined) {

        const indexCoin = coinList[index]
        const tempCoin = new Coin({ ...indexCoin, value })
        coinList[index] = tempCoin
      }

    })

  }

  return coinList

}

const CLIENT_URL = 'wss://ws.coincap.io/prices?assets=bitcoin'
const NOMICS_KEY = 'd6c849797ba7a5fd4377623267725ad4'

function App() {
  const [coins, setCoins] = useState([]);

  const coinInfo = async () => {
    // const assets = await fetch('https://api.coincap.io/v2/assets')
    const assets = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1"`)
    const json = assets.json()
    // console.log("🚀 ~ file: App.js ~ line 55 ~ coinInfo ~ json", json)
    return json
  }


  useEffect(() => {
    console.log('App')
    coinInfo().then((resp) => {
      // console.log('resp: ', resp)

      const mappedCoins = resp.map((item) => new Coin({ ...item }))
      console.log("🚀 ~ file: App.js ~ line 64 ~ coinInfo ~ mappedCoins", mappedCoins)
      setCoins(mappedCoins)
    })
  }, [])

  // useEffect(() => {


    // if (Array.isArray(coins) && coins.length > 0) {
    //   console.log('Updates')
    //   console.log('coins: ', coins)
    //   console.log('info: ', info)
    //   let client = new W3CWebSocket(CLIENT_URL);

    //   client.onopen = () => {
    //     console.log('%c 🥳 WebSocket Client Connected', 'color: green');
    //   }
    //   client.onmessage = (message) => {
    //     console.log('message: ', message)
    //     const updatedCoins = updateCoinValues(coins, message.data, true)
    //     console.log('updated: ', updatedCoins)
    //     setCoins(updatedCoins)
    //   }

    // }
  // }, [coins, info]);

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
