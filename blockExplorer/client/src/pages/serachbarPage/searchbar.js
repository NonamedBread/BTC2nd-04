import "./searchbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { DropdownButton, Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Searchbar() {
  const [searchText, setSearchText] = useState(true);
  const [linkUrl, setLinkUrl] = useState("");
  const textChange = (e) => {
    setSearchText(e.target.value);
  };
  // if(searchText.length>41){
  //   setLinkUrl("address");
  // }
  console.log(searchText.length);
  console.log(linkUrl);
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
            label="Enter data and select the type to search"
            variant="standard"
            style={{ width: 1150 }}
            onChange={textChange}
            InputProps={{
              endAdornment: (
                <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                  <InputLabel id="demo-simple-select-label">
                    Search Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem>
                      <Link to="/address" state={searchText}>
                        Address
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <Link to="/blockHash" state={searchText}>
                        Block Hash
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/transactionHash" state={searchText}>
                        Tx Hash
                      </Link>
                    </MenuItem>
                  </Select>
                </FormControl>
              ),
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Searchbar;
