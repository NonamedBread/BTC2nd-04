import "./addressList.css";
import React from "react";

const AddressList = ({ getAddress }) => {
  return (
    <div>
          <div className="addressList-header">
            <div className="txnHash-box">Txn Hash</div>
            <div className="block-box">Block</div>
            <div className="addressList-from-box">From</div>
            <div className="addressList-to-box">To</div>
            <div className="addressList-value-box">Value</div>
          </div>
      {getAddress.map((e) => (
      <div className="addrress-box">
          <div className="address-inline-box">
            {/* <div className="address-info-box">BlockNumber : {e.BlockNumber}</div>
            <div className="address-info-box">Gas : {e.Gas}</div>
            <div className="address-info-box">BlockHash : {e.BlockHash}</div>
            <div className="address-info-box">Nonce : {e.Nonce}</div>
            <div className="address-info-box">TransactionIndex : {e.TransactionIndex}</div>
            <div className="address-info-box">From : {e.From}</div>
            <div className="address-info-box">To : {e.To}</div>
            <div className="address-info-box">Direction : {e.Direction}</div>
            <div className="address-info-box">GasPrice : {e.GasPrice}</div>
            <div className="address-info-box">Value : {e.Value}</div> */}

            <div className="txnHash-map-box">{e.Hash.slice(0,15)+"..."+e.Hash.slice(-4)}</div>
            <div className="blocklock-map-box">{e.BlockNumber}</div>
            <div className="addressList-from-map-box">{e.From.slice(0,15)+"..."+e.From.slice(-4)}</div>
            <div className="addressList-to-map-box">{e.To.slice(0,15)+"..."+e.To.slice(-4)}</div>
            <div className="addressList-value-map-box">{e.Value}</div>

            {/* <div className="txnHash-map-box">Txn Hash</div>
            <div className="blocklock-map-box">Block</div>
            <div className="addressList-from-map-box">From</div>
            <div className="addressList-to-map-box">To</div>
            <div className="addressList-value-map-box">Value</div> */}

          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
