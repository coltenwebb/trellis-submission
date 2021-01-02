import React, { useState } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

type GatewayData = {
  name: string;
  sensorDatas: SensorData[];
}

type SensorError = {
  level: "error" | "warning";
  msg: string;
}

type SensorData = {
  name: string;
  lastMessage: SensorMessage;
  moisture: number[][];
  temp: number[][];
  errors: SensorError[];
  lastReceived: number;
}

type SensorMessage = {
  time_received: number;
}

type SensorCardProps = {
  data: SensorData;
}

function SensorCard({data}: SensorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (<ExpandedCard data={data} toggleExpanded={() => setIsExpanded(false)}/>);
  } else {
    return (<CollapsedCard data={data} toggleExpanded={() => setIsExpanded(true)}/>);
  }
}

type CollapsedCardProps = {
  data: SensorData;
  toggleExpanded: Function;
}

function CollapsedCard({data, toggleExpanded}: CollapsedCardProps) {
  return (
    <div className="sensor-card" onClick={toggleExpanded}>
      <img alt="location" src={data.locationImage} height="200" />
      <div className="info">
        <div className="card-title">
        <h1>{data.name}</h1>
        {
          data.errors.map((err) => {
            if (err.level === "warning") {
              return <span key={err.msg} className="tooltip warning">&#9888;<span className="tooltiptext">{err.msg}</span></span>
            } else {
              return <span key={err.msg} className="tooltip error">&#9888;<span className="tooltiptext">{err.msg}</span></span>
            }
          })
        }</div>
        <p>Last Update: {moment(data.lastReceived).fromNow()}</p>
        <p className="hint">Click to expand</p>
      </div>
    </div>
  );
}

type ExpandedCardProps = {
  data: SensorData;
  toggleExpanded: Function;
}

function ExpandedCard({data, toggleExpanded}: ExpandedCardProps) {
  return (
    <div className="sensor-card expanded" onClick={toggleExpanded}>
      <img alt="location" src={data.locationImage} height="200" />
      <div className="info">
        <div className="card-title">
        <h1>{data.name}</h1>
        {
          data.errors.map((err) => {
            if (err.level === "warning") {
              return <span key={err.msg} className="tooltip warning">&#9888;<span className="tooltiptext">{err.msg}</span></span>
            } else {
              return <span key={err.msg} className="tooltip error">&#9888;<span className="tooltiptext">{err.msg}</span></span>
            }
          })
        }</div>
        <p>Last Update: {moment(data.lastReceived).fromNow()}</p>
        <h2>Temperature</h2>
        <div className="datavis">
          <Line data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Depth 1',
                borderColor: 'rgb(255, 99, 132)',
                data: data.temp[0]
            }, 
            {
                label: 'Depth 2',
                borderColor: 'rgb(210, 99, 132)',
                data: data.temp[1]
            },
            {
                label: 'Depth 3',
                borderColor: 'rgb(190, 99, 132)',
                data: data.temp[2]
            }]
          }} options={{aspectRatio: 4}} width={null} height={null}/>
        </div>
        <h2>Moisture</h2>
        <div className="datavis">
          <Line data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Depth 1',
                borderColor: 'rgb(99, 255, 132)',
                data: data.moisture[0]
            }, 
            {
                label: 'Depth 2',
                borderColor: 'rgb(99, 230, 132)',
                data: data.moisture[1]
            },
            {
                label: 'Depth 3',
                borderColor: 'rgb(99, 210, 132)',
                data: data.moisture[2]
            }]
          }} options={{aspectRatio: 4}} width={null} height={null}/>
        </div>
      </div>
    </div>
  );
}

type GatewayProps = {
  data: GatewayData;
}

function Gateway({data}: GatewayProps) {
  return ( 
      <div className="gateway">
        <h2 className="gateway-title">{data.name}</h2>
        <div className="card-box">
          {data.sensorDatas.map((sensorData) => {
            return <SensorCard key={sensorData.name} data={sensorData} />
          })}
        </div>
      </div>
  );
}

const sampleGatewayDatas: GatewayData[] = [{
  name: "West Field",
  sensorDatas: [
    {
      name: "Sensor 1",
      locationImage: "location1.png",
      errors: [],
      moisture: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      temp: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      lastReceived: 1609629848432
    },
    {
      name: "Sensor 2",
      locationImage: "location2.png",
      errors: [],
      moisture: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      temp: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      lastReceived: 1609629848432
    }
  ]
}, 
{
  name: "East Field",
  sensorDatas: [
    {
      name: "Sensor 1",
      locationImage: "location3.png",
      errors: [{
        level: "warning",
        msg: "No data was received between 2am and 6am today."
      }],
      moisture: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      temp: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      lastReceived: 1609629848432
    },
    {
      name: "Sensor 2",
      locationImage: "location4.png",
      errors: [],
      moisture: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      temp: [[23,24,32,23,24,32,23],[18,22,25,18,22,25,18],[14,19,20,14,19,20,14]],
      lastReceived: 1609629848432
    }
  ]
}]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trellis Dashboard</h1>
      </header>
      {sampleGatewayDatas.map((gatewayData) => 
        <Gateway key={gatewayData.name} data={gatewayData}/>)}
      
    </div>
  );
}

export default App;
