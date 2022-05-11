import "./header.css";
import { Link } from "react-router-dom";
// import { DropdownButton, Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Header() {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <Link to="/" className="header-log">
          <img
            className="logo"
            src={
              "https://user-images.githubusercontent.com/93482597/167644083-98b7a368-d8b5-4775-94fc-9a3d4cb8e190.png"
            }
          />
        </Link>
      

      <div className="btn-container">
        <Box sx={{ minWidth: 120 }} className="header-drp-btn">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tokens</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={10}>
                <Link to="/" className="tokens">
                  ERC-20 tokens
                </Link>
              </MenuItem>
              <MenuItem value={20}>
                {" "}
                <Link to="/" className="tokens">
                  ERC-721 tokens
                </Link>
              </MenuItem>
              <MenuItem value={30}>
                <Link to="/" className="tokens">
                  ERC-1155 tokens
                </Link>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <DropdownButton className="header-drp-btn" id="dropdown-basic-button" title="Tokens">
          <Dropdown.Item>
            <Link to="/" className="tokens">
              ERC-20 tokens
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/" className="tokens">
              ERC-721 tokens
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link to="/" className="tokens">
              ERC-1155 tokens
            </Link>
          </Dropdown.Item>
        </DropdownButton> */}
      </div>
      </div>
    </div>
  );
}
export default Header;
