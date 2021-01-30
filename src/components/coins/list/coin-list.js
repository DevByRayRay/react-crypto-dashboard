import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CoinItem from './coin-item';
import './coin-list.css';

const trackedCoins = ['bitcoin', 'ethereum', 'monero', 'litecoin']
const client = new W3CWebSocket(`wss://ws.coincap.io/prices?assets=${trackedCoins.toString()}`);

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function CoinsList({ info }) {
    const coinsList = trackedCoins.map((coinItem) => {
        let image = null
        const coin = {
            name: capitalize(coinItem),
            key: coinItem,
            value: 0,
        }

        return { ...coin, image }
    })
    const [coins, setCoin] = useState(coinsList);

    useEffect(() => {
        // Update the document title using the browser API
        client.onopen = () => {
            console.log('%c 🥳 WebSocket Client Connected', 'color: green');
        };
        client.onmessage = (message) => {
            const parsedData = JSON.parse(message.data)

            const entries = Object.entries(parsedData)

            entries.forEach(item => {
                const [name, value] = item
                const coinsArr = [...coins]

                const coin = coinsArr.find(it => it.key === name)
                if (coin) {
                    coin.value = value
                    if (info.hasOwnProperty('data')) {
                        // debugger;
                        const coinInfo = info.data.filter((coin) => coin.id === name)
                        const symbol = coinInfo.length > 0 && coinInfo[0].symbol ? coinInfo[0].symbol.toLowerCase() : ''
                        coin.image = `https://cryptoicons.org/api/icon/${symbol}/64`
                        coin.symbol = symbol.toUpperCase()
                    }
                }

                setCoin(coinsArr)
            })
        };
    });

    return (
        <div className="list">
            {coins.map((coin, index) => <CoinItem coin={coin} key={index} />)}
        </div>
    )
}

export default CoinsList;