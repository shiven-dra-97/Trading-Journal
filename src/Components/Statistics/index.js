import { Component } from "react"
import BarData from "../BarData"
import LineChartComponent from "../LineChartComponent";
import DetailsCard from "../DetailsCard"
import MoreInsights from "../MoreInsights"

import "./index.css"

class Statistics extends Component {
    state = {
        localData: []
    }

    componentDidMount() {
        let fetchedData = JSON.parse(localStorage.getItem("tradeData"))
        this.setState({ localData: fetchedData })
    }

    render() {
        const { localData } = this.state
        return (

            <>
                <div className="container main p-2">
                    <div className="row">
                        <div className="col-12 col-md-6  p-1 pt-2 border ">
                        <h2 className="text-muted text-center">Daily Count</h2>
                            <BarData data={localData} />
                        </div>
                        <div className="col-12 col-md-6 p-1 border ">
                        <h2 className="text-muted text-center">Growth Curve</h2>
                            <LineChartComponent data={localData} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6  p-1 text-center ">
                            <h2 className="text-muted">Bullish vs Bearish</h2>
                            <DetailsCard data={localData} />
                        </div>
                        <div className="col-12 col-md-6  p-1 text-center ">
                            <h2 className="text-muted">More Insights</h2>
                            <MoreInsights data={localData} />
                        </div>
                    </div>

                    
                </div>
            </>


        )
    }

}

export default Statistics