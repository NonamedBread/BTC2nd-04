import './front.css'
import Block from '../blockPage/block'
import Transaction from '../transactionPage/transaction';

function Front(){

    return(
        <div className='front-container'>
            <div className='block-container'>
              <Block />
            </div>
            <div className='transaction-container'>
              <Transaction/>
            </div>
        </div>
    )
}

export default Front;