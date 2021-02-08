import React from 'react';
import Chart from 'chart.js';
import { format } from 'date-fns';


export function hasHistory(history) {
    return history && (history?.prices || history?.timestamps || history?.currency)
}

export function getPriceHistory(historyData, historyGraph, coinColor = 'rgb(255, 255, 255)') {
    if (!hasHistory(historyData)) {
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
                borderColor: coinColor.rgb,
            }
        ]
    }

    const chart = new Chart(historyGraph.current, {
        type: 'line',
        data: dataConf,
        responsive: false,
        maintainAspectRatio: false,
        options: {
            legend: {
                display: false
            },
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
}

const CoinGraph = React.forwardRef((props, ref) => (
    <div className='graph'>
        {ref && <div className="graph-wrapper"><canvas ref={ref}> <p>Hello Fallback World</p></canvas></div>}
    </div>
));

export default CoinGraph