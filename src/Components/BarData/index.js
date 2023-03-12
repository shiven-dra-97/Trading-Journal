

import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export default class BarData extends Component {
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

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={uniqueArray}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="profit" fill="#82ca9d" />
          <Bar dataKey="loss" fill="#bf2a2a" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
