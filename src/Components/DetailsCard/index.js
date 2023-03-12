import "./index.css"

const DetailsCard = (props) => {
    const { data } = props
    const totalTrades = data.length
    const bearishTrades = data.filter(e => e.longOrShort === 'short')
    const bullishTrades = data.filter(e => e.longOrShort === 'long')
    const bullishSuccessTrades = data.filter(e => e.tradeResult === 'profit' && e.longOrShort === 'long')
    const bearishSuccessTrades = data.filter(e => e.tradeResult === 'profit' && e.longOrShort === 'short')
    const bullishAccuracy = ((bullishSuccessTrades.length / bullishTrades.length) * 100).toFixed(2)
    const bearishAccuracy = ((bearishSuccessTrades.length / bearishTrades.length) * 100).toFixed(2)

    return (
        <div className="">
            <p className="border m-1 p-1">Total No of Trades: {totalTrades}</p>
            <p className="border m-1 p-1">Bullish Trades: {bullishTrades.length}</p>
            <p className="border m-1 p-1">Bearish Trades: {bearishTrades.length}</p>
            <p className="border m-1 p-1">Bullish Accuracy: {bullishAccuracy === "NaN" ? "0" : bullishAccuracy}%</p>
            <p className="border m-1 p-1">Bearish Accuracy: {bearishAccuracy === "NaN" ? "0" : bearishAccuracy}%</p>
        </div>
    )
}

export default DetailsCard
