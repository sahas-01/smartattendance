import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["March", "April", "May", "June", "July"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [100, 75, 85, 75, 100]
        }
      ]
    };
  }

  render() {
    return (
      <div className="mixed-chart mx-auto">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="500"
        />
      </div>
    );
  }
}

export default BarChart;