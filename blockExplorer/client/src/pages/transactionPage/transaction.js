import "./transaction.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { DropdownButton, Dropdown } from "react-bootstrap";

function Transaction() {

  const [lastTransactions, setLastTransactions] = useState([]);
  const [lastTransactions_Loading, setlastTransactions_Loading] = useState(false);

  async function load_LastTransaction() {
    setlastTransactions_Loading(true);
    await axios.get("http://218.147.82.106:20000/getLastestTransactions?count=5").then((result) => {
      setLastTransactions(result.data);
      setlastTransactions_Loading(false);
    });
  }

  console.log(lastTransactions)

  return (
    <div className="transaction-inside-container">
      <div className="transaction-text-box">Latest Transactions</div>
      <div className="transaction_category">
        <div className="TransactionHash">Transaction Hash</div>
        <div className="From">From</div>
        <div className="To">To</div>
        <div className="TimeStamp">Time Stamp</div>
      </div>
      <div className="shard"></div>
    </div>
  );
}

export default Transaction;
