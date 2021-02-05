import React, { useState, lazy, Suspense } from 'react';
import { Img } from 'react-image'
import './coin-item.css'

function valuta(number) {
    const parsedNr = isNaN(number) ? 0 : parseFloat(number)
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
    }).format(parsedNr)
}

function coinWorth(coinNumber, coinPrice) {
    return coinPrice * coinNumber
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

    // console.log('coin: ', coin)

    function toggleEdit() {
        const editMode = !edit
        console.log("🚀 ~ file: coin-item.js ~ line 23 ~ toggleEdit ~ editMode", editMode)

        setEdit(editMode)
    }

    function getImage(symbol) {
        const symbolName = symbol.toLowerCase()
        const localIcon = lazy(() => import(`../images/${symbolName}.svg`));
        console.log('localIcon: ', localIcon)
        if (localIcon) {
            return localIcon
        } else {
            return lazy(() => import(`../images/NOTFOUND.svg`));
        }
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