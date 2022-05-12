import "./getTransaction.css";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function GetTransaction() {
  const transactionHash = useLocation();

  const [getTransaction, setGetTransaction] = useState([]);
  const [getDifficulty, setGetDifficulty] = useState("");

  const url =
    "http://3.85.67.189:20000/getTransaction?hash=" + transactionHash.state;

  useEffect(() => {
    axios.get(url).then((response) => {
      setGetTransaction(response.data[0]);
    });
  }, []);

  console.log(transactionHash.state);
  console.log(getTransaction);
  return (
    <div className="getTransaction-container">
      <div className="getTransaction-inside-container">
        <div className="transaction-header">
          Transaction Hash <br />#{transactionHash.state}
        </div>
        <div className="transaction-info-box">
          <div>BlockHash : <br/> {getTransaction.BlockHash}</div>
          <div>From : {getTransaction.From}</div>
          <div>To : {getTransaction.To}</div>
          <div>Gas : {getTransaction.Gas}</div>
          <div>GasPrice : {getTransaction.GasPrice}</div>
          <div>Nonce : {getTransaction.Nonce}</div>
          <div>TransactionIndex : {getTransaction.TransactionIndex}</div>
          <div>Value : {getTransaction.Value}</div>
        </div>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="outlined" size="large">
            <Link to = "/">
            HOME
            </Link>
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default GetTransaction;
