const Web3 = require("web3");
const express = require("express");
const bip39 = require("bip39");
const fs = require("fs");
const HDKey = require("hdkey");
const axios = require("axios");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

const PORT = "20001";
const DEFUALT_FILE = "web3j_wallet";
const API_SERVER = "http://3.85.67.189:20000";
const PROVIDER = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const app = express();
const Eth = new Web3(PROVIDER).eth;
const Wallet = Eth.accounts.wallet;

var _LoadedWallet;
var _nonceBaseInt = 0;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
    res.send("");
});

app.get("/startApp", (req, res) => {
    try {
        let password = assert("password", req.query.password);
        
        let loadedWallet = loadWallet(password);

        if (!loadedWallet) {
            res.send({ error: "not have" });
            return;
        }
        _LoadedWallet = loadedWallet;

        res.send({
            address: _LoadedWallet[0].address
        });
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getNewMnemonic", async (req, res) => {
    try {
        let randomMnemonic = bip39.generateMnemonic();

        res.send({
            Mnemonic: randomMnemonic
        });
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getNewWalletFromMnemoic", async (req, res) => {
    try {
        let password = assert("password", req.query.password);
        let encodedMnemonic = assert("encodedMnemonic", req.query.mnemonic);
    
        let mnemonic = Buffer.from(encodedMnemonic, "base64").toString("utf8");
        let seed = await bip39.mnemonicToSeed(mnemonic);
        let hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
        let derive = hdkey.derive("m/44'/60'/0'/0");
        let newWallet = Wallet.create();
    
        newWallet.add(derive.privateKey.toString("HEX"));
        
        fs.writeFileSync(DEFUALT_FILE, JSON.stringify(newWallet.encrypt(password)));

        setOkPage(res);
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getAccountList", async (req, res) => {
    try {
        let addressArray = [];

        for (i = 0; i < _LoadedWallet.length; i++) {
            addressArray.push({ index: i, address: _LoadedWallet[i].address });
        }

        res.send(addressArray);
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getAccountInfo", async (req, res) => {
    try {
        let address = assert("address", req.query.address);

        await axios.get(API_SERVER + "/getAccountInfo?address=" + address)
            .then(response => {
                res.send(response.data);
            });
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/downloadWallet", async (req, res) => {
    try {
        let password = assert("password", req.query.password);

        res.setHeader('Content-disposition', 'attachment; filename=eth_wallet.json');
        res.send(JSON.stringify(_LoadedWallet.encrypt(password)));
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/uploadWallet", async (req, res) => {
    try {
        let encodedKeysotre = assert("encodedKeysotre", req.query.encodedKeysotre);
        let password = assert("password", req.query.password);

        let decodedKeystore = JSON.parse(Buffer.from(encodedKeysotre, "base64").toString("utf8"));
        let walletObj = Wallet.decrypt(decodedKeystore, password);

        if (walletObj == undefined) {
            res.send({ sucess: "fail" });
            return;
        }
        
        _LoadedWallet = walletObj;
        res.send({ sucess: "ok" });
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getEstimateGas", async (req, res) => {
    try {
        let encodedTransaction = assert("encodedTransaction", req.query.encodedTransaction);

        let decodedTransaction = JSON.parse(Buffer.from(encodedTransaction, "base64").toString("utf8"));
        
        res.send({ gas: await Eth.estimateGas(decodedTransaction) });
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/getNewTransaction", async (req, res) => {
    try {
        let from = assert("from", req.query.from);
        let to = assert("to", req.query.to);
        let value = assert("value", req.query.value);

        let foundWallet = getWalletByAddress(from);
        
        if (foundWallet == undefined) {
            res.send("Invalid address");
            return;
        }

        let nonceBaseInt = 0;
        
        if (_nonceBaseInt == 0) {
            nonceBaseInt = await Eth.getTransactionCount(from) + 1;
        } else {
            nonceBaseInt = _nonceBaseInt + 1;
        }

        let nonce = "0x" + nonceBaseInt.toString(16);
        let signedTransaction = await foundWallet.signTransaction({
            from: from,
            to: to,
            value: value,
            nonce: nonce,
            gas: 2100000
        });

        res.send({ encodedTransaction: Buffer.from(JSON.stringify(signedTransaction), "utf8").toString("base64") });

        _nonceBaseInt = nonceBaseInt;
    } catch (ex) {
        setErrorPage(ex, res);
    }
});

app.get("/sendTransaction", async (req, res) => {
    let encodedTransaction = assert("encodedTransaction", req.query.encodedTransaction);

    let decodedTransaction = JSON.parse(Buffer.from(encodedTransaction, "base64").toString("utf8"));
    let rawTransaction = decodedTransaction.rawTransaction;

    await Eth.sendSignedTransaction(rawTransaction, (error, hash) => {
        res.send({
            error: error,
            hash: hash
        });
    });
});

function loadWallet(password) {
    try {
        let rawWallet = JSON.parse(fs.readFileSync(DEFUALT_FILE).toString("utf8"));

        return Wallet.decrypt(rawWallet, password);
    } catch (ex) {
        return undefined;
    }
}

function getWalletByAddress(address) {
    try {
        for (i = 0; i < _LoadedWallet.length; i++) {
            if (_LoadedWallet[i].address.toLowerCase() == address.toLowerCase()) {
                return _LoadedWallet[i];
            }
        }
    } catch (ex) {}

    return undefined;
}

function setErrorPage(ex, res) {
    try {
        res.send({
            success: "fail",
            error: {
                name: ex.name,
                message: ex.message
            }
        });
    } catch (e) {
        res.send({
            success: "fail",
            error: {
                name: "unknown",
                message: ""
            }
        })
    }
}

function setOkPage(res) {
    try {
        res.send({
            success: "ok"
        });
    } catch (e) {
        res.send({
            success: "fail",
            error: {
                name: "unknown",
                message: ""
            }
        })
    }
}

function assert(name, val) {
    if (!val) {
        throw UserException(name);
    } else {
        return val;
    }
}

const UserException = (valName) => {
    return { 
        name: "AssertionError", 
        message: "Missing parameters : " + valName 
    };
}

process.on('uncaughtException', function (exception) {
    console.error(exception);
});

app.listen(PORT, () => {
    console.info("Listening..");
});
