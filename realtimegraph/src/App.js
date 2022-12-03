import logo from './logo.svg';
import './App.css';
import { IgrCategoryChartModule } from "igniteui-react-charts";
import { IgrCategoryChart } from "igniteui-react-charts";
import {useRef, useState, useEffect} from 'react';


// npm install --save igniteui-react-charts igniteui-react-core

IgrCategoryChartModule.register(); // Register charts module. You have to put this at the top of your code whenever you use an ignite ui chart

function App() {
  const chartComponentRef = useRef(null); // Ref for chart. I don't really super know what this is really but it's important

  // This part of code will only run once at the very beginning, this is just to populate the graph with a dataset to start out with
  let data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({ Label: "0", Value: 450 + Math.random() * 100 });
  }
  //

  useEffect(() => { 
    const interval = setInterval(() => {
      let chart1 = chartComponentRef.current;
     
      data.push({ Label: "0", Value: 450 + Math.random() * 100 }) // Push a new random datapoint to the chart
      chart1.notifyInsertItem( data,  data.length-1, data[data.length-1]) // call IgniteUICharts built in method to update chart manually
      
      let oldItem = data.shift(); // Remove datapoint from the beginning of the array 
      chart1.notifyRemoveItem( data,  0,  oldItem); // call IgniteUICharts built in method to update chart manually
    }, 5)
  }, [])


  return (
    <div className="App">
      <div className="container fill">
              <div className="ChartTheme">
                <IgrCategoryChart
                    height="800px"
                    width="100%"
                    chartType="Line"
                    background="#5555"
                    brushes="rgba(159, 179, 40, 1.0)" // This one sets the color of the line right now it is green but you can do any color
                    outlines="rgba(238, 88, 121, 1)"
                    thickness="4"
                    dataSource={
                      data
                    }
                    includedProperties={["Label", "Value"]}
                    yAxisMinimumValue={0}
                    yAxisMaximumValue={900}
                    xAxisEnhancedIntervalPreferMoreCategoryLabels="false"
                    shouldAutoExpandMarginForInitialLabels="false"
                    crosshairsDisplayMode="None"
                    ref={chartComponentRef}
                    markerTypes="None"
                    isTransitionInEnabled="false"
                ></IgrCategoryChart>
            </div>
          </div>
    </div>
  );
}

export default App;
