import React from 'react'
import { Bar } from "react-chartjs-2";
function Bargraph(props) {
    return (
        <div>
             <div style={{ maxWidth: "650px" ,margin:'auto'}}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: props.xdata,
            datasets: [
              {
                // Label for bars
                label: props.labels,
                // Data or value of your each variable
                data: props.ydata,
                // Color of each bar
                backgroundColor:  "red",
                // Border color of each bar
                borderColor: "#02375B",
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
        </div>
    )
}

export default Bargraph
