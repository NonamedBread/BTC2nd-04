import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/headerPage/header';
import Front from './pages/frontPage/front';
import Getblock from './pages/getblockPage/getblock';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes >
        <Route path="/" element={<Front/>} />
        <Route path="/getBlock" element={<Getblock/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
