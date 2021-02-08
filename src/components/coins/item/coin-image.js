import { Img } from 'react-image'

export default function CoinImage({ alt, source, fallback }) {
    return <Img
        src={[source, fallback]}
        loader={'Loading...'}
        width={40} loading={'lazy'} alt={alt}
    />
}

export function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}