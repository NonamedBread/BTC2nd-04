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
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const url = "http://3.85.67.189:20000/getAccount?address=" + addressNum.state;
  useEffect(() => {
    axios.get(url).then((response) => {
      setGetAddress(response.data.transactions);
    });
  }, []);
  console.log(getAddress);

  const currentPosts = getAddress.slice(page-1, page)

  return (
    <div className="address-container">
      <div className="address-inside-container">
        <div className="address-header">
          Address <br /> #{addressNum.state}
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
            totalItemsCount={getAddress.length}
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
