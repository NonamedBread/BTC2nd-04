const Web3 = require("web3");
const express = require("express");
const bip39 = require("bip39");
const fs = require("fs");
const HDKey = require("hdkey");
const axios = require("axios");
const { download } = require("express/lib/response");

const PORT = "20001";
const DEFUALT_FILE = "web3j_wallet";
const API_SERVER = "http://3.85.67.189:20000";

const app = express();
const Eth = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161").eth
const Wallet = Eth.accounts.wallet;

//const _LoadedWallet;
const _LoadedWallet = loadWallet("1234");
var _nonceBaseInt = 0;

app.get("/", (req, res) => {
    res.send("Test");
});

app.get("/startApp", (req, res) => {
    let password = req.query.password;
    let loadedWallet = loadWallet(password);

    if (loadedWallet == undefined) {
        res.send({
            address: undefined
        });
    } else {
        _LoadedWallet = loadedWallet;

        res.send({
            address: _LoadedWallet[0].address
        });
    }
});

app.get("/getNewMnemonic", async (req, res) => {
    let randomMnemonic = bip39.generateMnemonic();

    res.send({
        Mnemonic: randomMnemonic
    })
});

app.get("/getNewWalletFromMnemoic", async (req, res) => {
    let password = req.query.password;
    let mnemonic = Buffer.from(req.query.mnemonic, "base64").toString("utf8");
    
    let seed = await bip39.mnemonicToSeed(mnemonic);
    let hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
    let derive = hdkey.derive("m/44'/60'/0'/0");
    let newWallet = Wallet.create();

    newWallet.add(derive.privateKey.toString("HEX"));
    
    fs.writeFileSync(DEFUALT_FILE, JSON.stringify(newWallet.encrypt(password)));

    res.send("success");
});

app.get("/getAccountList", async (req, res) => {
    let addressArray = [];

    for (i = 0; i < _LoadedWallet.length; i++) {
        addressArray.push({ index: i, address: _LoadedWallet[i].address });
    }

    res.send(addressArray);
});

app.get("/getAccountInfo", async (req, res) => {
    let address = req.query.address;

    await axios.get(API_SERVER + "/getAccountInfo?address=" + address)
        .then(response => {
            res.send(response.data);
        });
});

app.get("/downloadWallet", async (req, res) => {
    let password = req.query.password;

    res.setHeader('Content-disposition', 'attachment; filename=eth_wallet.json');
    res.send(JSON.stringify(_LoadedWallet.encrypt(password)));
});

app.get("/uploadWallet", async (req, res) => {
    
});

app.get("/getEstimateGas", async (req, res) => {

    let decodedTransaction = JSON.parse(Buffer.from(req.query.encodedTransaction, "base64").toString("utf8"));
    
    res.send({ gas: await Eth.estimateGas(decodedTransaction) });
});

app.get("/getNewTransaction", async (req, res) => {
    let from = req.query.from;
    let to = req.query.to;
    let value = req.query.value;

    let foundWallet = getWalletByAddress(from);
    

    if (foundWallet == undefined) {
        res.send("Invalid address");
        return;
    }

    let nonceBaseInt = 0;
    
    if (_nonceBaseInt == 0) {
        nonceBaseInt = await Eth.getTransactionCount(from) + 2;
    } else {
        nonceBaseInt = _nonceBaseInt + 2;
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

    console.info(_nonceBaseInt);
});

app.get("/sendTransaction", async (req, res) => {
    let decodedTransaction = JSON.parse(Buffer.from(req.query.encodedTransaction, "base64").toString("utf8"));
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

process.on('uncaughtException', function (exception) {
    console.error(exception);
});

app.listen(PORT, () => {
    console.info("Listening..");
});
