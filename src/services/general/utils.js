export function parseValuta(number) {
    const parsedNr = isNaN(number) ? 0 : parseFloat(number)
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency', currency: 'EUR',
    }).format(parsedNr)
}