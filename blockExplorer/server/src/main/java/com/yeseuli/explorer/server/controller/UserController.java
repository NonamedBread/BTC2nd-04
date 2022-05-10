package com.yeseuli.explorer.server.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yeseuli.explorer.server.GlobalConstants;
import com.yeseuli.explorer.server.utils.DataConvert;
import com.yeseuli.explorer.server.vo.request.LastestPageRequestVo;
import com.yeseuli.explorer.server.vo.request.LastestRequestVo;

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
			var selectSql = "SELECT * FROM Transactions ORDER BY Number DESC LIMIT ?";
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
	
}
