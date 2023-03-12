import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart=(props)=>{
  const{profit,loss}=props
      const data = {
            labels: [
              'Profit',
              'Loss',
            ],
            datasets: [{
              label: 'Trades',
              data: [profit, loss],
              backgroundColor: [
                '#82ca9d',
                '#bf2a2a',
              ],
              hoverOffset: 4
            }]
          };
      return(
             <div>
              < Doughnut data={data} />
             </div>
      )
}
export default DoughnutChart