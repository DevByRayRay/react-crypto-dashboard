import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './coin-list.css';

const trackedCoins = ['bitcoin', 'ethereum', 'monero', 'litecoin']
const client = new W3CWebSocket(`wss://ws.coincap.io/prices?assets=${trackedCoins.toString()}`);

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const valuta = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(number)
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
            {coins.map((coin, index) => <div className="item" key={index}>
                <div className="image">
                    {coin.image ? <img src={coin.image} width={40} loading={'lazy'} /> : 'null'}
                </div>
                <div className="first_col">
                    <strong className="name">{coin.name}</strong>
                    <em className="symbol">{coin.symbol}</em><br />
                </div>
                <div className="content">
                    <strong>{valuta(coin.value)}</strong>
                </div>
            </div>)}
        </div>
    )
}

export default CoinsList;