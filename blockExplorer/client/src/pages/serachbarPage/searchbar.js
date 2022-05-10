import "./searchbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { DropdownButton, Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Searchbar() {
  const [searchText, setSearchText] = useState(true);
  const textChange = (e) => {
    setSearchText(e.target.value);
  };
  console.log(searchText);
  return (
    <div className="searchbar-container">
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="search-bar"
          style={{ width: 1900 }}
        >
          <TextField
            id="standard-basic"
            label="Fill in the address/transaction/hash/block values and press the Enter key"
            variant="standard"
            style={{ width: 1890 }}
            onChange={textChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log("Enter key pressed");
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Searchbar;
