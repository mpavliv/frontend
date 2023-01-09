import React, { useState, useEffect } from "react";



const Current = ((props) => {
  const [currentTemperature, setCurrentTemperature] = useState(null);
 

  const fetchTemperature = async () => {
    const response = await fetch(`${props.host}:${props.port}/temperature/current`);
    const { temperature, time } = await response.json();
    setCurrentTemperature(temperature); 
    props.onHandler(time);   //set current date in app.js
  }

  useEffect(() => {
    fetchTemperature();
  })

  useEffect(() => {
      const interval = setInterval(() => {
        fetchTemperature();
    }, 50000);
    return () => clearInterval(interval);
  }, )

  return (
    <div>
      <h1>current temperature is: {currentTemperature}</h1>
    </div>
  )
})

export default Current;