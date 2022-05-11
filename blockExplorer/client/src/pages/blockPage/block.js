import "./block.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Block() {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    axios
      .get("http://218.147.82.106:20000/getLastestBlocks?count=7")
      .then((response) => {
        setLatestBlocks(response.data);
      });
  }, []);

 
  return (
    <div className="block-inside-container">
      <div className="block-text-box">Latest Block</div>
      <div className="block-category-box">
        <div className="blocknumber-box">Block Number</div>
        <div className="miner-box">Miner</div>
        <div className="blockhash-box">Transaction Hash</div>
      </div>

      {latestBlocks.map((e) => (
        
        <div className="block-category">
          <div className="blockNumber">{e.Number}</div>
          <div className="blockMiner">{e.Miner.slice(0,7)+"..."+e.Miner.slice(-3)}</div>
          <div className="blockHash">{e.Hash.slice(0,7)+"..."+e.Hash.slice(-3)}</div>
        </div>
      ))}
      <div className="block-refresh-btn">...</div>
    </div>
  );
}

export default Block;
