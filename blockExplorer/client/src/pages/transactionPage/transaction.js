import "./transaction.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { appBarClasses } from "@mui/material";

const qs = require("qs");

function Transaction() {
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://218.147.82.106:20000/getLastestTransactions?count=7")
      .then((response) => {
        setLatestTransactions(response.data);
      });
  }, []);

  console.log(latestTransactions);

  return (
    <div className="transaction-inside-container">
      <div className="transaction-text-box">Latest Transactions</div>
      <div className="category-box">
        <div className="transactionHash-box">Transaction Hash</div>
        <div className="from-box">From</div>
        <div className="to-box">To</div>
        <div className="value-box">Nonce</div>
      </div>
      {latestTransactions.map((e) => (
        <div className="transaction-category">
          <div className="transactionHash">
            <Link to="/getTransaction" state={e.Hash}>
              {e.Hash.slice(0,13)+"..."}
            </Link>
          </div>
          <div className="from">
            {e.From.slice(0,8)+"..."}
          </div>
          <div className="to">{e.To.slice(0,8)+"..."}</div>
          <div className="nonce">{e.Nonce}</div>
        </div>
      ))}
      <div className="transaction-refresh-btn">...</div>
    </div>
  );
}

export default Transaction;
