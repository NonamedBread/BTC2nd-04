import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/headerPage/header";
import WalletHeader from "./pages/headerPage/header";
import Front from "./pages/frontPage/front";
import CreateWallet from "./pages/createWalletPage/createWallet";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WalletHeader />
        <div className="app-box">
        
        <Routes>
          <Route path="/" element={<Front />}/>
          <Route path="/createWallet" element={<CreateWallet/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
