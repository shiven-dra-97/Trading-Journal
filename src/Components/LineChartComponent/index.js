import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class LineChartComponent extends PureComponent {
  render() {
    


  let dateCheckerProfit=new Date("1971-01-01")
  let dynamyicProfit=0
  let profitArr=[]
  const {data}=this.props

  const a=data.filter(each=>each.tradeResult==="profit")
  for(let i=0;i < a.length; i++){
    let d1=new Date(a[i].date);
    
    if(d1.getTime()===dateCheckerProfit.getTime()){
      profitArr.splice(profitArr.length-1,1,{profit:parseFloat(a[i].profitAndLoss)+dynamyicProfit,date:a[i].date})
      dynamyicProfit=parseFloat(a[i].profitAndLoss)+dynamyicProfit
      }
    else{
      profitArr.push({profit:parseFloat(a[i].profitAndLoss),date:a[i].date})
      dateCheckerProfit=new Date(a[i].date)
      dynamyicProfit=parseFloat(a[i].profitAndLoss)
    }
  } 
  let dateCheckerLoss=new Date("1971-01-01")
  let dynamyicLoss=0
  let lossArr=[]
  const b=data.filter(each=>each.tradeResult==="loss")
 
  for(let i=0;i < b.length; i++){
    let d2=new Date(b[i].date);

    if(d2.getTime()===dateCheckerLoss.getTime()){
      lossArr.splice(lossArr.length-1,1,{loss:parseFloat(b[i].profitAndLoss)+dynamyicLoss,date:b[i].date})
      dynamyicLoss=parseFloat(b[i].profitAndLoss)+dynamyicLoss

    }
    else{
      lossArr.push({loss:parseFloat(b[i].profitAndLoss),date:b[i].date})
      dateCheckerLoss=new Date(b[i].date)
      dynamyicLoss=parseFloat(b[i].profitAndLoss)
    }
  } 

  let biggerArr=[]
  let smallArr=[]

  if(profitArr.length>smallArr.length){
   biggerArr=profitArr
   smallArr=lossArr
  }else if(lossArr.length>profitArr.length){
   biggerArr=lossArr
   smallArr=profitArr
  }else{
   biggerArr=profitArr
   smallArr=lossArr
  }

  const finalProfit=biggerArr.map(eachData=>{
    let temp
    if(smallArr.find(eachItem=>{
      if(eachItem.date===eachData.date){
        return temp=eachItem
      }
    }))
    return {...eachData,...temp}
    else{
      return {...eachData}
    }
  })

  const finalLoss=smallArr.map(eachData=>{
    let temp
    if(biggerArr.find(eachItem=>{
      if(eachItem.date===eachData.date){
        return temp=eachItem
      }
    }))
    return {...temp,...eachData}
    else{
      return {...eachData}
    }
  })

  const finalArr=finalProfit.concat(finalLoss)
 
  const jsonObject = finalArr.map(JSON.stringify);
            
          const uniqueSet = new Set(jsonObject);
          
          const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        
          uniqueArray.sort(function compare(a, b) {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA - dateB;
          });
          
          let sum=[]
          

          const dateArray=uniqueArray.map(eachDate=>{
            return eachDate.date
          })

          const tempSum=uniqueArray.map(eachdataSet=>{
            let add=0
             if(Object.keys(eachdataSet).length===2){
                        if(Object.keys(eachdataSet).includes("profit")){
                          add=add+eachdataSet.profit
                        sum.push(add)
                        }else{
                          add=add+eachdataSet.loss
                          sum.push(add)
                        }
                        
            }else{
              add=add+eachdataSet.profit+eachdataSet.loss
              sum.push(add)
            }
          })

          //console.log(tempSum)

const finalSumArray=[]
for (let i=0;i<sum.length;i++){
    const temp = sum.slice(0, i+1);
    finalSumArray.push(temp.reduce((a,b)=>a+b,0))
}

const finalLineChartData=finalSumArray.map((item,index)=>{
    return {date:dateArray[index],total:item}
})



const gradientOffset = () => {
    const dataMax = Math.max(...finalLineChartData.map((i) => i.total));
    const dataMin = Math.min(...finalLineChartData.map((i) => i.total));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();


    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={finalLineChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#198754" stopOpacity={1} />
              <stop offset={off} stopColor="#bf2a2a" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="total" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
