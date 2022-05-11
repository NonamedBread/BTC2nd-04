import './front.css'
import Block from '../blockPage/block'
import Transaction from '../transactionPage/transaction';
import Searchbar from '../serachbarPage/searchbar';
import {BrowserRouter,Route, Switch } from "react-router-dom";

function Front(){

    return(
      <>
      <Searchbar/>
        <div className='front-container'>
            <div className='container'>
              <Block />
            </div>
            <div className='container'>
              <Transaction/>
            </div>
        </div>
      </>
    )
}

export default Front;