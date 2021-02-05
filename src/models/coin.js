export class Coin {
    constructor(coin) {
        this.id = coin.id
        this.currency = coin.currency
        this.symbol = coin.symbol
        this.name = coin.name
        this.logo_url = coin.logo_url
        this.status = coin.status
        this.price = coin.price
        this.price_date = coin.price_date
        this.price_timestamp = coin.price_timestamp
        this.circulating_supply = coin.circulating_supply
        this.max_supply = coin.max_supply
        this.market_cap = coin.market_cap
        this.num_exchanges = coin.num_exchanges
        this.num_pairs = coin.num_pairs
        this.num_pairs_unmapped = coin.num_pairs_unmapped
        this.first_candle = coin.first_candle
        this.first_trade = coin.first_trade
        this.first_order_book = coin.first_order_book
        this.rank = coin.rank
        this.rank_delta = coin.rank_delta
        this.high = coin.high
        this.high_timestamp = coin.high_timestamp
        this['1d'] = new CoinVolume({ ...coin.['1d'] })
        this['30d'] = new CoinVolume({ ...coin.['30d'] })
    }
}

export class CoinVolume {
    constructor(volume) {
        this.volume = volume.volume
        this.price_change = volume.price_change
        this.price_change_pct = volume.price_change_pct
        this.volume_change = volume.volume_change
        this.volume_change_pct = volume.volume_change_pct
        this.market_cap_change = volume.market_cap_change
        this.market_cap_change_pct = volume.market_cap_change_pct
    }
}
