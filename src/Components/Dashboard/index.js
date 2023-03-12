import { Component } from "react"
import DoughnutChart from "../DoughnutChart"
import DataTable from "../DataTable"
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

import "./index.css"


class Dashboard extends Component {

    state = {
        stockName: '',
        buy: '',
        sell: '',
        quantity: '',
        date: '',
        profitAndLoss: '',
        type: '',
        allFieldsEmpty: false,
        longOrShort: '',
        currentPage: 1,
        data: [],
    }

    componentDidMount() {
        let storedData = JSON.parse(localStorage.getItem("tradeData"))
        if (storedData === null) {
            localStorage.setItem("tradeData", JSON.stringify([]))
        }
        else {
            this.setState({ data: storedData })

        }
    }
    componentDidUpdate() {
        const { data } = this.state
        localStorage.setItem("tradeData", JSON.stringify(data))
    }

    deleteTrade = (id) => {
        const { data } = this.state
        const filterData = data.filter(eachTrade => eachTrade.id !== id)
        this.setState({ data: filterData })
    }

    onEnterStockName = (event) => {
        this.setState({ stockName: event.target.value })
    }

    onEnterBuy = (event) => {
        this.setState({ buy: event.target.value })
    }

    onEnterSell = (event) => {
        this.setState({ sell: event.target.value })
    }

    onEnterQuantity = (event) => {
        this.setState({ quantity: event.target.value })
    }

    onEnterDate = (event) => {
        this.setState({ date: event.target.value })
    }
    onEnterProfitAndLoss = (event) => {
        this.setState({ profitAndLoss: event.target.value })
    }

    onHandleType = (event) => {
        this.setState({ type: event.target.value })
    }
    onHandlelongOrShort = (event) => {
        this.setState({ longOrShort: event.target.value })
    }

    onSubmitData = (event) => {
        event.preventDefault()
        const { stockName, buy, sell, quantity, date, profitAndLoss, type, longOrShort } = this.state
        const tradeResult = sell - buy > 0 ? "profit" : (sell - buy < 0 ? "loss" : "breakeven")
        const realProfitAndLoss = sell - buy > 0 ? profitAndLoss : (sell - buy < 0 ? -profitAndLoss : 0)
        if (stockName !== '' && buy !== '' && sell !== '' && quantity !== '' && date !== '' && profitAndLoss !== '' && type !== '' && longOrShort !== '') {
            const newData = {
                id: uuidv4(),
                stockName,
                buy,
                sell,
                quantity,
                date,
                profitAndLoss: realProfitAndLoss,
                type,
                longOrShort,
                tradeResult,
            }
            this.setState(prevState => ({
                data: [...prevState.data, newData],
            }))

            this.setState({
                stockName: '',
                buy: '',
                sell: '',
                quantity: '',
                date: '',
                profitAndLoss: '',
                allFieldsEmpty: false,

            })
        } else {
            this.setState({ allFieldsEmpty: true })
        }
    }

    pageIncrement = () => {
        const { currentPage } = this.state
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }))
    }

    pageDecrement = () => {
        const { currentPage } = this.state
        this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }))
    }



    render() {
        const { stockName, buy, sell, quantity, date, data, profitAndLoss, allFieldsEmpty, type, longOrShort, currentPage } = this.state
        const profit = data.filter(each => each.tradeResult === "profit")
        const noOfPofits = profit.length
        const loss = data.filter(each => each.tradeResult === "loss")
        const totalPandL = (data.map(each => parseFloat(each.profitAndLoss))).reduce((i, f) => i + f, 0)
        const noOfLoss = loss.length
        const equityTrades = data.filter(each => each.type === "equity")
        const fAndoTrades = data.filter(each => each.type === "f&o")
        //pagination
        const itemsPerPage = 10
        const lastIndex = currentPage * itemsPerPage
        const firstIndex = lastIndex - itemsPerPage
        const totalPages = Math.ceil(data.length / itemsPerPage)
        const filteredData = data.slice(firstIndex, lastIndex)
        //
        const accuracy=((noOfPofits / data.length) * 100).toFixed(2)



        return (
            <>
                <div className="container main p-2">
                    <div className="row">
                        <div className="col-12 col-md-4 border ">
                            <form className="form" onSubmit={this.onSubmitData}>
                                <h1>Trade Details</h1>
                                <div className="label">
                                    <p className="type">Equity</p><input onChange={this.onHandleType} value="equity" className="radio" type="radio" name="tradeType" />
                                    <p className="type">F&O</p><input onChange={this.onHandleType} value="f&o" className="radio" type="radio" name="tradeType" />
                                    <p className="type">Long</p><input onChange={this.onHandlelongOrShort} value="long" className="radio" type="radio" name="longOrShort" />
                                    <p className="type">Short</p><input onChange={this.onHandlelongOrShort} value="short" className="radio" type="radio" name="longOrShort" />
                                </div>
                                <label>
                                    Stock Name<br />
                                    <input value={stockName} onChange={this.onEnterStockName} id="FO" className="input " type="text" placeholder="Stock Name" />
                                </label>
                                <label>
                                    Buy<br />
                                    <input value={buy} onChange={this.onEnterBuy} className="input " type="number" placeholder="Buy" />
                                </label>
                                <label>
                                    Sell<br />
                                    <input value={sell} onChange={this.onEnterSell} className="input " type="number" placeholder="Sell" />
                                </label>
                                <label>
                                    Quantity<br />
                                    <input value={quantity} onChange={this.onEnterQuantity} className="input " type="number" placeholder="Quantity" />
                                </label>
                                <br />
                                <label>
                                    Date<br />
                                    <input value={date} onChange={this.onEnterDate} className="input " type="date" placeholder="date" />
                                </label>
                                <br />

                                <label>
                                    Profit or Loss<br />
                                    <input value={profitAndLoss} onChange={this.onEnterProfitAndLoss} className="input " type="number" placeholder=" profitAndLoss" />
                                </label>
                                <br />
                                {allFieldsEmpty && <p style={{ color: "red" }}>*Fields cannot be empty!</p>}
                                <button className="btn btn-success">Submit</button>

                            </form>
                        </div>
                        <div className="  col-12 col-md-4 doughnut border">
                            <h1 className="text-center">Overall Performance</h1>
                            <DoughnutChart loss={noOfLoss} profit={noOfPofits} />
                        </div>
                        <div className="col-12 col-md-4 growth-p border">
                            <h1 className="text-center pb-2 ">Growth</h1>
                            <div className="d-flex flex-column justify-content-center growth">
                                <div className="card  text-center">
                                    <h4>Equity Profit And Loss</h4>
                                    <p>₹ {((equityTrades.map(each => parseFloat(each.profitAndLoss))).reduce((i, f) => i + f, 0)).toFixed(2)}</p>
                                </div>
                                <div className="card  text-center">
                                    <h4>F&O Profit And Loss</h4>
                                    <p>₹ {((fAndoTrades.map(each => parseFloat(each.profitAndLoss))).reduce((i, f) => i + f, 0)).toFixed(2)}</p>
                                </div>
                                <div className="card text-center">
                                    <h4>Total P&L</h4>
                                    <p>₹ {(totalPandL).toFixed(2)}</p>
                                </div>
                                <div className="card  text-center">
                                    <h4>Accuracy </h4>
                                    <p>{accuracy==="NaN"?"0":accuracy}%</p>
                                </div>
                                <div className="card  text-center">
                                    <h4>Total No of Trades </h4>
                                    <p>{data.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 table-responsive ">
                            <table className="table ">
                                <tr>
                                    <th>Stock Name</th>
                                    <th>Type</th>
                                    <th>Buy</th>
                                    <th>Sell</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>PandL</th>
                                </tr>

                                {filteredData.map(eachData => (
                                    <tr>
                                        <DataTable key={eachData.id} deleteTrade={this.deleteTrade} tradeData={eachData} />
                                    </tr>
                                ))}

                            </table>

                        </div>
                    </div>
                    <div className="text-center m-3">
                        <div className="d-inline-flex">
                            <button disabled={currentPage === 1} onClick={this.pageDecrement} className="btn btn-success nav-button m-1 ">Prev</button>
                            <p className="align-self-center border mt-2 ">  Page {currentPage}</p>
                            <button disabled={currentPage === totalPages||totalPages === 0} onClick={this.pageIncrement} className="btn btn-success nav-button m-1">Next</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard