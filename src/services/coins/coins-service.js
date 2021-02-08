import { formatRFC3339, subHours } from 'date-fns';
import { Coin } from '../../models/coin'

const NOMICS_KEY = 'd6c849797ba7a5fd4377623267725ad4'

export async function getCoinInfo() {
    // const assets = await fetch('https://api.coincap.io/v2/assets')
    const assets = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1"`)
    const json = assets.json()
    return json
}

export async function getCoinHistory(coins) {
    const coinNames = Array.isArray(coins) ? coins.toString() : coins
    const date = new Date()
    const startToday = encodeURIComponent(formatRFC3339(subHours(date, 23)))
    const plus24 = encodeURIComponent(formatRFC3339(date))
    const history = await fetch(`https://api.nomics.com/v1/currencies/sparkline?key=demo-b5d84e505a11969a7184f899fbb40ae1&ids=${coinNames}&start=${startToday}&end=${plus24}`)
    const json = history.json()
    return json
}

export function coinNames(coins) {
    return coins.map((coin) => coin.symbol)
}

export function mergeCoinHistory(coins, history) {
    return coins.map((item) => {
        const coinHistory = history.find(it => it.currency === item.currency)
        const newCoin = new Coin({ ...item, history: coinHistory })
        if (newCoin.name === 'Aave') {
            console.log('Aave: ', newCoin)
        }
        return newCoin
    })
}