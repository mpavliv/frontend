import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const TempChart = ({host, port, startDate, endDate}) => {

  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    console.log('charts');
    console.log(`startDate ${startDate}`);
    console.log(`endDate ${endDate}`);
    console.log(`${host}:${port}/temperature?time1=${startDate}&time2=${endDate}`);
    fetchTemperature();
  }, [startDate, endDate])

  const fetchTemperature = async () => {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      const response = 
          await fetch(`${host}:${port}/temperature?time1=${startDate}&time2=${endDate}`)
      response.json().then(res => {

        setTemperature(setArray(res));
      });
    }
  }

  function setArray(res){
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
    return arr;
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