import "./searchbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { DropdownButton, Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
          display="flex"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="search-bar"
          style={{ width: 1800 }}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            id="standard-basic"
            label="Fill in the Address click the Search"
            variant="standard"
            style={{ width: 1150 }}
            onChange={textChange}
           
            InputProps={{
              endAdornment: (
                <Button variant="outlined" size="small">
                  <Link to="/address" state = {searchText}>Search</Link>
                </Button>
              ),
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Searchbar;
