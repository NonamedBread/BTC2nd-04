package com.yeseuli.explorer.server.controller;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.protocol.core.DefaultBlockParameterName;

import com.yeseuli.explorer.server.GlobalConstants;
import com.yeseuli.explorer.server.utils.DataConvert;
import com.yeseuli.explorer.server.vo.request.AccountRequestVo;
import com.yeseuli.explorer.server.vo.request.BlockRequestVo;
import com.yeseuli.explorer.server.vo.request.LastestPageRequestVo;
import com.yeseuli.explorer.server.vo.request.LastestRequestVo;
import com.yeseuli.explorer.server.vo.request.TransactionRequestVo;

@RestController
public class UserController {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@PostMapping("/getLastestBlocks")
	public List<HashMap<String, Object>> getLastestBlocks(LastestRequestVo vo) {
		try {
			var selectSql = "SELECT * FROM Blocks ORDER BY Number DESC LIMIT ?";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			
			statement.setLong(1, vo.getCount());
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}

	@PostMapping("/getLastestBlocksPage")
	public List<HashMap<String, Object>> getLastestBlocksPage(LastestPageRequestVo vo) {
		try {
			var selectSql = "SELECT * FROM Blocks ORDER BY Number DESC LIMIT ?, ?";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			
			statement.setLong(1, vo.getCountPerPage() * (vo.getPagenum() - 1));
			statement.setLong(2, vo.getCountPerPage());
			
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}
	
	@PostMapping("/getLastestTransactions")
	public List<HashMap<String, Object>> getLastestTransactions(LastestRequestVo vo) {
		try {
			var selectSql = "SELECT * FROM Transactions ORDER BY BlockNumber DESC, TransactionIndex ASC LIMIT ?";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			
			statement.setLong(1, vo.getCount());
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}
	
	@PostMapping("/getLastestTransactionsPage")
	public List<HashMap<String, Object>> getLastestTransactionsPage(LastestPageRequestVo vo) {
		try {
			var selectSql = "SELECT * FROM Transactions ORDER BY BlockNumber DESC, TransactionIndex ASC LIMIT ?, ?";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			
			statement.setLong(1, vo.getCountPerPage() * (vo.getPagenum() - 1));
			statement.setLong(2, vo.getCountPerPage());
			
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}
	
	@PostMapping("/getBlock")
	public List<HashMap<String, Object>> getBlock(BlockRequestVo vo) {
		try {
			var selectSql = "";
			PreparedStatement statement;
			
			if (Strings.isNotEmpty(vo.getHash())) {
				selectSql = "SELECT * FROM Blocks WHERE Hash=?";
				statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
				statement.setString(1, vo.getHash());
			} else {
				selectSql = "SELECT * FROM Blocks WHERE Number=?";
				statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
				statement.setLong(1, vo.getNumber());
			}
			
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}
	
	@PostMapping("/getTransaction")
	public List<HashMap<String, Object>> getTransaction(TransactionRequestVo vo) {
		try {
			var selectSql = "";
			PreparedStatement statement;
			
			if (Strings.isNotEmpty(vo.getHash())) {
				selectSql = "SELECT * FROM Transactions WHERE Hash=?";
				statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
				statement.setString(1, vo.getHash());
			} else if (Strings.isNotEmpty(vo.getBlockHash())) {
				selectSql = "SELECT * FROM Transactions WHERE BlockHash=?";
				statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
				statement.setString(1, vo.getBlockHash());
			} else {
				selectSql = "SELECT CASE `From` WHEN ? THEN 'OUT' ELSE 'IN' END AS 'Direction', * FROM Transactions WHERE `From`=? OR `To`=?";
				statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
				statement.setString(1, vo.getFromOrTo());
				statement.setString(2, vo.getFromOrTo());
				statement.setString(3, vo.getFromOrTo());
			}
			
			return DataConvert.resultSetToArrayList(statement.executeQuery());
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new ArrayList<>();
	}
	
	@PostMapping("/getAccount")
	public HashMap<String, Object> getAccount(AccountRequestVo vo) {
		try {
			var returnValue = new HashMap<String, Object>();
			var ethBalance = GlobalConstants.Provider.ethGetBalance(vo.getAddress(), DefaultBlockParameterName.LATEST).send();
			var transactionVo = new TransactionRequestVo();
			
			transactionVo.setFromOrTo(vo.getAddress());
			
			returnValue.put("balance", ethBalance.getBalance().toString());
			returnValue.put("transactions", getTransaction(transactionVo));
			
			return returnValue;
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return new HashMap<>();
	}
}
