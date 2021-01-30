import React, { useState } from 'react';
import './coin-item.css'

function valuta(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(number)
}

function coinWorth(coinNumber, coinPrice) {
    return coinPrice * coinNumber
}



function CoinItem({ coin }) {
    const [price, setPrice] = useState(0)
    const [edit, setEdit] = useState(false)

    function toggleEdit(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setEdit(value)
        console.log(" value", edit)
    }

    return (
        <div className="item">
            <div className="image">
                {coin.image ? <img src={coin.image} width={40} loading={'lazy'} alt={coin.name} /> : 'null'}
            </div>
            <div className="first_col">
                <strong className="name">{coin.name}</strong>
                <em className="symbol">{coin.symbol}</em><br />
            </div>
            <div className="content">
                <strong>{valuta(coin.value)}</strong>
            </div>
            <div className="edit">
                <label htmlFor={coin.symbol}>
                    💰
                    <input type="checkbox" id={coin.symbol} value={edit} onChange={e => toggleEdit(e)} />
                </label>
                {edit === true ? <div>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div> : null}
                <strong>{price} <small>{coin.symbol}</small></strong> = {valuta(coinWorth(price, coin.value))}
            </div>
        </div>
    )
}

export default CoinItem