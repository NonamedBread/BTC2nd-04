import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/headerPage/header';
import Searchbar from './pages/serachbarPage/searchbar';
import Block from './pages/blockPage/block';
import Front from './pages/frontPage/front';
import Transaction from './pages/transactionPage/transaction';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes >
        <Route path="/" element={<Searchbar/>} />
      </Routes>
      <Front/>
    </BrowserRouter>
  );
}

export default App;
