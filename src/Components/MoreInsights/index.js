const MoreInsights=(props)=>{
    const{data}=props
    const allProfits=data.filter(e=>e.tradeResult === 'profit')
    const allLoss=data.filter(e=>e.tradeResult === 'loss')
    const quantity=(data.map(e=>parseFloat(e.quantity))).reduce((i,f)=>i+f,0)
    const avgProfit=((allProfits.map(e=>parseFloat(e.profitAndLoss))).reduce((initial,final)=>initial+final,0)/data.length).toFixed(2)
    const avgLoss=((allLoss.map(e=>parseFloat(e.profitAndLoss))).reduce((initial,final)=>initial+final,0)/data.length).toFixed(2)
    const maxProfit=((allProfits.map(e=>parseFloat(e.profitAndLoss))).sort((a,b)=>a-b))[allProfits.length-1]
    const maxLoss=((allLoss.map(e=>parseFloat(e.profitAndLoss))).sort((a,b)=>a-b))[0]
    
    return(
           <>
           <p className="border m-1 p-1">Average Profit: ₹ {avgProfit === "NaN" ? "0" : avgProfit}</p>
           <p className="border m-1 p-1">Average Loss: ₹ {avgLoss === "NaN" ? "0" : avgLoss}</p>
           <p className="border m-1 p-1"> Max Profit on Single Trade: ₹ {maxProfit===undefined?"0":maxProfit}</p>
           <p className="border m-1 p-1"> Max Loss on Single Trade: ₹ {maxLoss===undefined?"0":maxLoss}</p>
           <p className="border m-1 p-1">Total Quantities Traded in all Trades: {quantity}</p>
           </>
    )
}
export default MoreInsights