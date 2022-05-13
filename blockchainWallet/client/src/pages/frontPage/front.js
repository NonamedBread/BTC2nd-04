import "./front.css"
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Front() {
  return (
    <div className="front-container">
      <div className="front-inside-container">
      <div className="front-intro-box">
        <h1>Ye Seuli`s Wallet에 오신 것을 환영합니다.</h1>
        <h3>Ye Seuli`s Wallet은 이더리움을 위한 신분 저장소 입니다.</h3>
      </div>

        <h2>시작하기</h2>
      <div className="front-btn-box">
        <div className="front-btn">
          <Button variant="outlined" size="Large">
            지갑 가져오기
          </Button>
        </div>
        <div className="front-btn">
          <Button variant="outlined" size="Large">
            <Link to = "/createWallet">
            지갑 생성
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Front;
