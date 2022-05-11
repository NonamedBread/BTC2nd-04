import "./getblock.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Getblock() {
  const blockNum = useLocation();

  const [getBlocks, setGetBlocks] = useState([]);
  const [getDifficulty, setGetDifficulty] =useState("");

  const url = "http://218.147.82.106:20000/getBlock?number=" + blockNum.state;
  
  useEffect(() => {
      axios.get(url).then((response) => {
          setGetBlocks(response.data);
        });
    }, []);

  

console.log(blockNum.state);
console.log(getBlocks);
  return (
    <div className="getBlock-container">
      <div className="getBlock-inside-container">
        <div className="block-header">Block #{blockNum.state}</div>
       
        {/* <div>Difficulty : {getBlocks[0].Difficulty}</div> */}
        {/* <div>ExtraData : {getBlocks[0].ExtraData}</div> */}
        {/* <div>GasLimit : {getBlocks[0].GasLimit}</div> */}
        {/* <div>GasUsed : {getBlocks[0].GasUsed}</div> */}
        {/* <div>Miner : {getBlocks[0].Miner}</div> */}
        {/* <div>Nonce : {getBlocks[0].Nonce}</div> */}
        {/* <div>Size : {getBlocks[0].Size}</div> */}
        {/* <div>TimeStamp : {getBlocks[0].TimeStamp}</div> */}
        {/* <div>TotalDifficulty : {getBlocks[0].TotalDifficulty}</div> */}
        {/* <div>TransactionsRoot : {getBlocks[0].TransactionsRoot}</div> */}

      </div>
    </div>
  );
}

export default Getblock;
