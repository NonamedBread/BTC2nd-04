import "./address.css";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Address() {
  const addressNum = useLocation();
  const [getButtonNum, setGetButtonNum] = useState(0);
  console.log(getButtonNum);
  const [getAddress, setGetAddress] = useState([]);
  const [getSelectAddress, setGetSelectGetAddress] = useState([]);
  var i = getButtonNum;
  
  const url = "http://3.85.67.189:20000/getAccount?address=" + addressNum.state;
  //   const url = "http://3.85.67.189:20000/getAccount?address=0x7a5e9086a8fadc97b776e89f2ec7e1787a442ee2";
  console.log(url);

  useEffect(() => {
    axios.get(url).then((response) => {
        setGetAddress(response.data.transactions[getButtonNum]);
        console.log("reponseNum",getButtonNum);
    });
  }, []);
  
  const selectPage = function (e){

}
  
  console.log("selctAddr", getSelectAddress);
  console.log("address", addressNum.state);
  console.log("getAddr",getAddress);
  console.log("BtnNum", getButtonNum);

  return (
    <div className="address-container">
      <div className="address-inside-container">
        <div className="address-header">
          Address <br /> #{addressNum.state}
        </div>
        <div className="address-info-box">
          <div>BlockNumber : {getAddress.BlockNumber}</div>
          <div>BlockHash : {getAddress.BlockHash}</div>
          <div>Nonce : {getAddress.Nonce}</div>
          <div>TransactionIndex : {getAddress.TransactionIndex}</div>
          <div>From : {getAddress.From}</div>
          <div>To : {getAddress.To}</div>
          <div>Direction : {getAddress.Direction}</div>
          <div>Gas : {getAddress.Gas}</div>
          <div>GasPrice : {getAddress.GasPrice}</div>
          <div>Value : {getAddress.Value}</div>
        </div>
        <Stack spacing={2} direction="row" justifyContent="left" margin={2}>
          <Button variant="outlined" size="large">
            <Link to="/">HOME</Link>
          </Button>
        </Stack>
        <Stack spacing={4} direction="row" justifyContent="center" margin={2}>
          <ButtonGroup
            variant="text"
            aria-label="vertical contained button group"
          >
            {/* <Button onClick={(e) => {selectPage(1)}}>1</Button> */}
            {/* <Button onClick={selectPage1}>2</Button> */}
            <Button onClick={() => setGetButtonNum(0)}>1</Button>
            <Button onClick={() => setGetButtonNum(1)}>2</Button>
            <Button onClick={() => setGetButtonNum(2)}>3</Button>
            <Button onClick={() => setGetButtonNum(3)}>4</Button>
            <Button onClick={() => setGetButtonNum(4)}>5</Button>
            <Button onClick={() => setGetButtonNum(5)}>6</Button>
            <Button onClick={() => setGetButtonNum(6)}>7</Button>
            <Button onClick={() => setGetButtonNum(7)}>8</Button>
            <Button onClick={() => setGetButtonNum(8)}>9</Button>
            <Button>...</Button>
          </ButtonGroup>
        </Stack>
      </div>
    </div>
  );
}

export default Address;
