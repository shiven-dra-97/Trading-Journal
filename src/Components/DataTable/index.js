import {AiTwotoneDelete} from "react-icons/ai"

import "./index.css"
const DataTable=(props)=>{
 const {tradeData,deleteTrade}=props
 const {stockName,buy,sell,quantity,date,profitAndLoss,id,longOrShort}=tradeData
 const type=longOrShort==="long"?"L":"S"
 const onDelete=()=>{
   if(window.confirm('Are you sure to delete this trade?')){
      deleteTrade(id)
   }
   
 }
 const plStyle=sell-buy>0?"green":(sell-buy<0?"red":"")
    return(
         <>
        <td>{stockName}</td>
        <td style={type==="L"?{color:"green"}:{color:"red"}}>{type}</td>
        <td>{buy}</td>
        <td>{sell}</td>
        <td>{quantity}</td>
        <td>{date}</td>         
        <td className={plStyle}>{profitAndLoss}</td>
        <td><button className="button" type="button" onClick={onDelete}><AiTwotoneDelete className="icon"  /></button></td>
        
    </>
    )
}

export default DataTable