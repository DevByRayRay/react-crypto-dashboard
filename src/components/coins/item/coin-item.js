import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { Img } from 'react-image'
import { format, formatRFC3339, subHours } from 'date-fns';
import Chart from 'chart.js';

import './coin-item.css'


function valuta(number) {
    const parsedNr = isNaN(number) ? 0 : parseFloat(number)
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency', currency: 'EUR',
    }).format(parsedNr)
}

function CoinImage({ alt, source, fallback }) {
    return <Img
        src={[source, fallback]}
        loader={'Loading...'}
        width={40} loading={'lazy'} alt={alt}
    />
}

function CoinItem({ coin }) {
    const [price, setPrice] = useState(0)
    const [mainValuta, setMainValuta] = useState(0)
    const [edit, setEdit] = useState(false)
    const historyGraph = useRef(null)

    const ctx = document.getElementById('myChart');

    // console.log('coin: ', coin)

    function toggleEdit() {
        const editMode = !edit
        console.log("🚀 ~ file: coin-item.js ~ line 23 ~ toggleEdit ~ editMode", editMode)

        setEdit(editMode)
    }

    useEffect(() => {
        if (coin.hasOwnProperty('history')) {

            getPriceHistory(coin.history)
        }
    }, [coin])

    function getPriceHistory(historyData) {
        if (!historyData?.prices || !historyData?.timestamps || !historyData?.currency) {
            return
        }

        const { prices, timestamps, currency } = historyData
        const labels = timestamps.map((stamp) => format(new Date(stamp), 'HH'))

        const dataConf = {
            labels: labels,
            datasets: [
                {
                    label: currency,
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(255, 255,255)',
                }
            ]
        }

        const chart = new Chart(historyGraph.current, {
            type: 'line',
            data: dataConf,
            responsive: false,
            maintainAspectRatio: false,
            options: {
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Hour'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        });

        chart.canvas.parentNode.style.height = '300px'
        chart.canvas.parentNode.style.width = '496px'
        // chart.canvas.parentNode.style.maxHeight = '100%'
    }

    return (
        <div className="item" id={`coin-${coin.name}`}>
            <div className="image">
                <Suspense>
                    <CoinImage source={`/icons/${coin.symbol.toLowerCase()}.svg`} fallback={`/icons/NOTFOUND.svg`} alt={coin.name} />
                </Suspense>
            </div>
            <div className="first_col">
                <strong className="name">{coin.name}</strong>
                <em className="symbol">{coin.symbol}</em><br />
            </div>
            <div className="content">
                <strong>{valuta(coin.price)}</strong>
            </div>
            <div className='graph'>
                {historyGraph && <div className="graph-wrapper"><canvas ref={historyGraph}></canvas></div>}
            </div>
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