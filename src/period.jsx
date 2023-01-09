import React from "react";

const Period = ((props) => {

  const sec = 1000;
  const min = 60 * sec;
  const hour = min * 60;
  const day = hour * 24;

  function periodHandler(interval) {
    props.onHandler(interval);
  }


  return (
    <div>
      <button onClick={() => {periodHandler(15 * min)}}>15 minutes</button>
      <button onClick={() => {periodHandler(hour)}}>1 hour</button>
      <button onClick={() => {periodHandler(day)}}>1 day</button>
      <button onClick={() => {periodHandler(3 * day)}}>3 days</button>
    </div>
  )
})

export default Period;