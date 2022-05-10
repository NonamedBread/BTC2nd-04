package com.yeseuli.explorer.server.deamon;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.concurrent.Executors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthBlock.Block;
import org.web3j.protocol.core.methods.response.EthBlock.TransactionObject;
import org.web3j.protocol.core.methods.response.EthBlock.TransactionResult;

import com.yeseuli.explorer.server.GlobalConstants;

public class QueryNode {
	private static final Logger logger = LoggerFactory.getLogger(QueryNode.class);
	
	private static BigInteger storedOldestBlockNumber;
	private static BigInteger storedNewestBlockNumber;
	
	public static void start() {
		syncInitBlock();
		storedOldestBlockNumber = getOldestBlockNumber();
		storedNewestBlockNumber = getNewestBlockNumber();
		Executors.newSingleThreadExecutor().submit(() -> syncOldBlock());
		Executors.newSingleThreadExecutor().submit(() -> syncNewBlock());
	}
	
	private static BigInteger getOldestBlockNumber() {
		try {
			var selectSql = "SELECT MIN(Number) FROM Blocks";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			var lastRow = statement.executeQuery().getString(1);
			
			if (lastRow == null) {
				return GlobalConstants.Provider.ethBlockNumber().send().getBlockNumber();
			} else {
				return new BigInteger(lastRow);
			}
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return BigInteger.ZERO;
	}
	
	private static BigInteger getNewestBlockNumber() {
		try {
			var selectSql = "SELECT MAX(Number) FROM Blocks";
			var statement = GlobalConstants.DBConnector.prepareStatement(selectSql);
			var lastRow = statement.executeQuery().getString(1);
			
			if (lastRow == null) {
				return BigInteger.ZERO;
			} else {
				return new BigInteger(lastRow);
			}
		} catch (Exception ex) {
			logger.error("", ex);
		}
		
		return BigInteger.ZERO;
	}
	
	private synchronized static boolean saveDB(Block block) {
		if (block == null) {
			return false;
		}
		
		System.out.println("INSERT BLOCK : " + block.getNumber().toString());
		var blockSql = "INSERT INTO Blocks VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		var transSql = "INSERT INTO Transactions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		
		try {
			for (var transactionResult : block.getTransactions().toArray(new TransactionResult[0])) {
				var wrappedObject = (TransactionObject) transactionResult.get();
				
				var transStatement = GlobalConstants.DBConnector.prepareStatement(transSql);
				
				transStatement.setString(1, wrappedObject.getHash());
				transStatement.setString(2, wrappedObject.getNonce().toString());
				transStatement.setString(3, wrappedObject.getBlockHash());
				transStatement.setBigDecimal(4, new BigDecimal(wrappedObject.getBlockNumber()));
				transStatement.setBigDecimal(5, new BigDecimal(wrappedObject.getTransactionIndex()));
				transStatement.setString(6, wrappedObject.getFrom());
				transStatement.setString(7, wrappedObject.getTo());
				transStatement.setString(8, wrappedObject.getValue().toString());
				transStatement.setString(9, wrappedObject.getGas().toString());
				transStatement.setString(10, wrappedObject.getGasPrice().toString());
				transStatement.setString(11, wrappedObject.getInput());
				transStatement.setString(12, wrappedObject.getCreates());
				transStatement.setString(13, wrappedObject.getPublicKey());
				transStatement.setString(14, wrappedObject.getRaw());
				transStatement.setString(15, wrappedObject.getR());
				transStatement.setString(16, wrappedObject.getS());
				transStatement.setString(17, String.valueOf(wrappedObject.getV()));
				
				try {
					transStatement.execute();
				} catch (Exception e) {}
			}
			
			var blockStatement = GlobalConstants.DBConnector.prepareStatement(blockSql);
			
			blockStatement.setBigDecimal(1, new BigDecimal(block.getNumber()));
			blockStatement.setString(2, block.getHash());
			blockStatement.setString(3, block.getParentHash());
			blockStatement.setString(4, block.getNonce().toString());
			blockStatement.setString(5, block.getSha3Uncles());
			blockStatement.setString(6, block.getLogsBloom());
			blockStatement.setString(7, block.getTransactionsRoot());
			blockStatement.setString(8, block.getStateRoot());
			blockStatement.setString(9, block.getReceiptsRoot());
			blockStatement.setString(10, block.getAuthor());
			blockStatement.setString(11, block.getMiner());
			blockStatement.setString(12, block.getMixHash());
			blockStatement.setString(13, block.getDifficulty().toString());
			blockStatement.setString(14, block.getTotalDifficulty().toString());
			blockStatement.setString(15, block.getExtraData());
			blockStatement.setString(16, block.getSize().toString());
			blockStatement.setString(17, block.getGasLimit().toString());
			blockStatement.setString(18, block.getGasUsed().toString());
			blockStatement.setString(19, block.getTimestamp().toString());
			blockStatement.execute();
		} catch (Exception ex) {
			logger.error("", ex);
			
			return false;
		}
		
		return true;
	}
	
	private static void syncInitBlock() {
		try {
			var initSql = "SELECT * FROM Blocks LIMIT 1";
			
			if (GlobalConstants.DBConnector.prepareStatement(initSql).executeQuery().next() == true) {
				return;
			}
			
			var chainNewBlock = GlobalConstants.Provider.ethBlockNumber().send().getBlockNumber();
			var ethBlock = GlobalConstants.Provider.ethGetBlockByNumber(DefaultBlockParameter.valueOf(chainNewBlock), true).send();
			
			if (saveDB(ethBlock.getBlock()) == false) {
				logger.error("Can't create initBlock");
				System.exit(0);
			}
		} catch (Exception ex) {
			logger.error("", ex);
		}
	}
	
	private static void syncOldBlock() {
		while (true) {
			try {
				var previousBlockNumber = storedOldestBlockNumber.subtract(BigInteger.ONE);
				var ethBlock = GlobalConstants.Provider.ethGetBlockByNumber(DefaultBlockParameter.valueOf(previousBlockNumber), true).send();
				
				if (saveDB(ethBlock.getBlock()) == true) {
					storedOldestBlockNumber = previousBlockNumber;
				}
			} catch (Exception ex) {
				logger.error("", ex);
			}
		}
	}
	
	private static void syncNewBlock() {
		while (true) {
			try {
				var nextBlockNumber = storedNewestBlockNumber.add(BigInteger.ONE);
				var ethBlock = GlobalConstants.Provider.ethGetBlockByNumber(DefaultBlockParameter.valueOf(nextBlockNumber), true).send();
				
				if (saveDB(ethBlock.getBlock()) == true) {
					storedNewestBlockNumber = nextBlockNumber;
				}
			} catch (Exception ex) {
				logger.error("", ex);
			}
		}
	}
}
