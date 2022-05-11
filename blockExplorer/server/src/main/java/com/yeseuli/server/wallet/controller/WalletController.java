package com.yeseuli.server.wallet.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.crypto.TransactionDecoder;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;

import com.yeseuli.server.GlobalConstants;
import com.yeseuli.server.utils.DataConvert;
import com.yeseuli.server.wallet.vo.AccountRequestVo;
import com.yeseuli.server.wallet.vo.SendTransactionRequestVo;

@RestController
@RequestMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class WalletController {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping(value = "/getAccountInfo")
	public HashMap<String, Object> getAccountInfo(AccountRequestVo vo) {
		try {
			var returnValue = new HashMap<String, Object>();
			var selectSql = "SELECT CASE `From` WHEN ? THEN 'OUT' ELSE 'IN' END AS 'Direction', * FROM Transactions WHERE `From`=? OR `To`=?";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			var ethBalance = GlobalConstants.Provider.ethGetBalance(vo.getAddress(), DefaultBlockParameterName.LATEST).send();
			
			statement.setString(1, vo.getAddress());
			statement.setString(2, vo.getAddress());
			statement.setString(3, vo.getAddress());
			
			returnValue.put("balance", ethBalance.getBalance().toString());
			returnValue.put("transactions", DataConvert.resultSetToArrayList(statement.executeQuery()));
			
			return returnValue;
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new HashMap<>();
	}
	
	
	@PostMapping("/sendTransaction")
	public HashMap<String, Object> sendTransaction(SendTransactionRequestVo vo) {
		try {
			var returnValue = new HashMap<String, Object>(Map.of("success", false));
			
			boolean isValid = false;
			try {
				var validTransaction = TransactionDecoder.decode(vo.getSignedRaw());
				if (validTransaction != null) {
					isValid = true;
				}
			} catch (Exception ex) {}
			
			if (isValid == true) {
				GlobalConstants.Provider.ethSendRawTransaction(vo.getSignedRaw());
			}
			
			returnValue.put("success", isValid);
			
			return returnValue;
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new HashMap<>();
	}
	
	@PostMapping("/getEstimateGas")
	public HashMap<String, Object> getEstimateGas(SendTransactionRequestVo vo) {
		try {
			var returnValue = new HashMap<String, Object>();
			try {
				var validTransaction = TransactionDecoder.decode(vo.getSignedRaw());
				var inf = validTransaction.getTransaction();
				var commonTransaction = Transaction.createEtherTransaction(
						vo.getFrom(), 
						inf.getNonce(), 
						inf.getGasPrice(), 
						inf.getGasLimit(), 
						inf.getTo(), 
						inf.getValue());
				var ethEstimateGas = GlobalConstants.Provider.ethEstimateGas(commonTransaction).send().getResult();
				var ethGasPrice = GlobalConstants.Provider.ethGasPrice().send().getResult();
				
				returnValue.put("estGas", ethEstimateGas);
				returnValue.put("gasPrice", ethGasPrice);
				
				return returnValue;
			} catch (Exception ex) {}
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new HashMap<>();
	}

}
