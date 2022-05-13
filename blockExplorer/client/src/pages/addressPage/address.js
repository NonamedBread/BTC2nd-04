import "./address.css";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Pagination from "react-js-pagination";
import AddressList from "../addressLIstPage/addressList";

function Address() {
  const addressNum = useLocation();
  const [getAddress, setGetAddress] = useState([]);
  const [getBalance, setGetBalance] = useState('');
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const url = "http://218.147.82.106:20000/getAccount?address=" + addressNum.state;
  useEffect(() => {
    axios.get(url).then((response) => {
      setGetAddress(response.data.transactions);
      setGetBalance(response.data.balance);
    });
  }, []);
  console.log(getAddress);
  console.log("balance",getBalance);

  const [postPerPage] = useState(13) //페이지당 리스트 수
  const indexOfLastPost = page * postPerPage ; // 마지막 리스트 = 현재 페이지 * 페이지당 리스트
  const indexOfFirstPost = indexOfLastPost - postPerPage ; // 첫번째 리스트 = 마지막 리스트 - 페이지당 리스트
  const currentPosts = getAddress.slice(indexOfFirstPost, indexOfLastPost) // 현재 페이지에 보여줄 리스트
  const totalcount = getAddress.length / postPerPage ; // 페이지 수 = 총 리스트 수 / 페이지당 리스트 

  console.log(indexOfLastPost);
  // ex
  // 한 페이지에 10개씩 리스트 갯수 120개 12page
  // 마지막 리스트 = 현재 페이지 * 페이지당 리스트 = 10
  // 첫번째 리스트 = 마지막리스트 - 페이지당 리스트 = 0
  // 현재 페이지 = .slice(첫번째 리스트, 마지막 리스트)

  return (
    <div className="address-container">
      <div className="address-inside-container">
        <div className="address-header">
          Address #{addressNum.state} <br/>
          Balance #{getBalance}
        </div>
        <div className="address-list-box">
          <AddressList getAddress={currentPosts} />
        </div>
        <Stack spacing={2} direction="row" justifyContent="left" margin={2}>
          <Button variant="outlined" size="large">
            <Link to="/">HOME</Link>
          </Button>
          <Pagination
            activePage={page}
            itemsCountPerPage={1}
            totalItemsCount={totalcount}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Address;
