import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const TempChart = (props) => {
  const [temperature, setTemperature] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`${props.host}:${props.port}/temperature?time1=${props.endDate}&time2=${props.endDate}`);
    // fetchTemperature();
  }, )

  const fetchTemperature = async () => {
    const response = await fetch(`${props.host}:${props.port}/temperature?time1=${props.endDate}&time2=${props.endDate}`)
    response.json().then(res => {
      let arr = [];
      for (let key in res) {
        const temp = new Object();
        const num = Number(key);
        const currentDate = new Date(num);
        temp['key'] = key;
        const txtDate = ("0" + currentDate.getDate()).slice(-2);
        const txtMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        temp['time'] = currentDate.getHours() + ":" + currentDate.getMinutes() + " / " + 
              txtDate + "." + txtMonth;
        temp['value'] = res[key];
        arr.push(temp);
      }
      console.log(arr);
      setTemperature(arr);
    });
  }

  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart width='80%' height={300} data={temperature}
      margin={{top: 5, right: 30, left: 20, bottom: 5, }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="time" style={{transform:"rotate(90deg)"}}/> */}
        <XAxis dataKey="time" angle={-90} height={90} textAnchor="end" />
        <YAxis dataKey="value"  domain={[0, 50]}/>
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TempChart;