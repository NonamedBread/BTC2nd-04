import { Link } from "react-router-dom";

function WalletHeader () {

    return(
       <div>
        <Link to="/" className="header-log">
          <img
            className="logo"
            src={
              "https://user-images.githubusercontent.com/93482597/168216831-23fcdbfe-cac6-4107-b2da-3cf3c4663a3c.png"
            }
          />
        </Link>
        </div>
    )
}

export default WalletHeader;