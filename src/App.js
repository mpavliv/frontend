import React, { useState } from "react";
import Current from "./current"
import Period from "./period";
import TempChart from "./tempChart";
// import MyDatePicker from "./myDatePicker";
// import Delete from "./delete";
import settings from "./settings";
const HOST = settings.host;
const PORT = settings.port;

const maxTimeInterval = settings.maxTimeInterval;

function App() {

  const sec = 1000;
  const min = 60 * sec;
  const hour = min * 60;
  const day = hour * 24;
  const [endDate, setCurrentDate] = useState();
  const [startDate, setStartDate] = useState();
  const [period, setPeriod] = useState(min * 15);

  const onCurrentDateHandler = (newCurrentDate) => {
    setCurrentDate(newCurrentDate);
    setStartDate(newCurrentDate - period);
  }

  const onIntervalHandler = (interval) => {
    setPeriod(interval);
    setStartDate(endDate - interval);
  }

  const dateStr = (date) => {
    const dateObj = new Date(date);
    const str = ("00" + dateObj.getDate()).slice(-2) + "." +
    ("00" + (dateObj.getMonth() + 1)).slice(-2) + "." +
      dateObj.getFullYear() + " " +
    ("00" + dateObj.getHours()).slice(-2) + ":" +
    ("00" + dateObj.getMinutes()).slice(-2) + ":" +
    ("00" + dateObj.getSeconds()).slice(-2);
    return str;
  }

  const formatCurrentDate = () => {
    const timeInterval = Date.now() - endDate;
    const warning = (timeInterval > maxTimeInterval) ? "  dani ne actualni":""
    if (!endDate) return warning
    const date = new Date(endDate);
    const str = dateStr(date); 
    return str + warning
  }

  return (
    <div className="App">
      <Current onHandler={onCurrentDateHandler} host={HOST} port={PORT}/>
      <h2>the last date: {formatCurrentDate()}</h2>
      <h2>period from {dateStr(startDate)} to {dateStr(endDate)} </h2>
      <Period onHandler={onIntervalHandler}/>
      <TempChart host={HOST} port={PORT} startDate={startDate} endDate={endDate}/>
      {/* <Delete/>  */}
    </div>
  );
}

export default App;
