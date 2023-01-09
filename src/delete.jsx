import React from "react";
import settings from "./settings";
const HOST = settings.host;
const PORT = settings.port;

const Delete = (() => {


  const delet = async () => {
    console.log("delete");
    const response = await fetch(`${HOST}:${PORT}/temperature/delete`, {method: 'POST'});
    console.log(response);
  }

  return (
    <button onClick={delet}>Clear history</button>
  )
})

export default Delete;