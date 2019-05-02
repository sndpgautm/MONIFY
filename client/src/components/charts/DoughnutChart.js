import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom'
  };

  // Update chart and render upon new data
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chartData !== prevState.chartData) {
      return {
        chartData: nextProps.chartData
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <div className="chart">
        <Doughnut
          data={this.state.chartData}
          options={{
            plugins: {
              labels: [
                {
                  render: 'label',
                  arc: true,
                  fontColor: '#000',
                  position: 'outside'
                },
                {
                  render: 'percentage',
                  fontColor: '#000'
                }
              ]
            },
            title: {
              display: this.props.displayTitle,
              text: 'Total Expenses',
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            cutoutPercentage: 60 //from 0-100
            // animation: {
            //   animateScale: true
            // }
          }}
        />
      </div>
    );
  }
}
export default DoughnutChart;
