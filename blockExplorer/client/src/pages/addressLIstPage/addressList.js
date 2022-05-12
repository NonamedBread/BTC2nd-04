import "./addressList.css"
import React from "react";

const AddressList = ({ getAddress }) => {
  return (
    <div>
      {getAddress.map((e) => (
        <div className="adrress-box">
          <div className="address-info-box">BlockNumber : {e.BlockNumber}</div>
          <div className="address-info-box">Gas : {e.Gas}</div>
          <div className="address-info-box">BlockHash : {e.BlockHash}</div>
          <div className="address-info-box">Nonce : {e.Nonce}</div>
          <div className="address-info-box">TransactionIndex : {e.TransactionIndex}</div>
          <div className="address-info-box">From : {e.From}</div>
          <div className="address-info-box">To : {e.To}</div>
          <div className="address-info-box">Direction : {e.Direction}</div>
          <div className="address-info-box">GasPrice : {e.GasPrice}</div>
          <div className="address-info-box">Value : {e.Value}</div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
