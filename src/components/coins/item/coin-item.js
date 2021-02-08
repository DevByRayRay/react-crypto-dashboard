import React, { useState, Suspense, useRef, useEffect } from 'react';
import FastAverageColor from 'fast-average-color';

import './coin-item.css'
import { parseValuta } from '../../../services/general/utils'
import CoinImage, { loadImage } from './coin-image'
import CoinGraph, { getPriceHistory } from './coin-graph'



function CoinItem({ coin }) {
    const [price, setPrice] = useState(0)
    const [edit, setEdit] = useState(false)
    const historyGraph = useRef(null)
    const coinImage = useRef(null)

    function toggleEdit() {
        const editMode = !edit
        console.log("🚀 ~ file: coin-item.js ~ line 23 ~ toggleEdit ~ editMode", editMode)

        setEdit(editMode)
    }

    useEffect(() => {
        if (coin.hasOwnProperty('history')) {

        }
        if (coin.hasOwnProperty('symbol') && coinImage.current) {
            loadImage(`/icons/${coin.symbol.toLowerCase()}.svg`).then(async (data) => {


                const fac = new FastAverageColor();

                try {
                    const color = await fac.getColorAsync(data)
                    getPriceHistory(coin.history, historyGraph, color)

                } catch (error) {
                    getPriceHistory(coin.history, historyGraph)
                    console.error(error);
                }


            })
        }
    }, [coin])


    return (
        <div className="item" id={`coin-${coin.name}`}>
            <div className="image">
                <div className="hidden">
                    <canvas ref={coinImage} width={40} height={40}></canvas>
                </div>
                <Suspense>
                    <CoinImage source={`/icons/${coin.symbol.toLowerCase()}.svg`} fallback={`/icons/NOTFOUND.svg`} alt={coin.name} />
                </Suspense>
            </div>
            <div className="first_col">
                <strong className="name">{coin.name}</strong>
                <em className="symbol">{coin.symbol}</em><br />
            </div>
            <div className="content">
                <strong>{parseValuta(coin.price)}</strong>
            </div>
            <CoinGraph ref={historyGraph}></CoinGraph>
            <footer className="footer">
                <button onClick={toggleEdit}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
            </footer>
            {edit === true ? <div className="edit">
                <div className="row">
                    <label htmlFor={coin.symbol + 'valuta'} className="label">
                        <strong>{coin.symbol}</strong>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </label>
                </div>

                <div className="row">
                    <label htmlFor={coin.symbol + 'valuta'} className="label">
                        <strong>&euro;</strong>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </label>
                </div>

                <div className="row">
                    <button onClick={toggleEdit()}><i className="fa fa-save"></i></button>
                </div>
            </div> : null}
        </div>
    )
}

export default CoinItem