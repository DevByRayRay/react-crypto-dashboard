import React, { useState } from 'react';
import CoinItem from './coin-item';
import './coin-list.css';

const trackedCoins = ['bitcoin', 'ethereum', 'monero', 'litecoin', 'basic-attention-token', 'chainlink', 'verge', 'cardano']
// console.log("🚀 ~ file: coin-list.js ~ line 8 ~ client", client)

function CoinsList({ coins }) {

    const [realtime, setRealtime] = useState(true)
    const [load, setLoad] = useState(false)

    function toggleRealtime() {
        let status = !realtime
        setRealtime(status)
    }
    return (
        <>
            {/* <button onClick={toggleRealtime}>Toggle Realtime <span>{realtime ? 'true' : 'false'}</span></button> */}
            <div className="list">
                {coins && coins.map((coin, index) => <CoinItem coin={coin} key={index} />)}
            </div>
        </>
    )
}

export default CoinsList;