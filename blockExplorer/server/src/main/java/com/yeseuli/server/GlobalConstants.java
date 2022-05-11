package com.yeseuli.server;

import java.sql.Connection;
import java.sql.DriverManager;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

public class GlobalConstants {
	
	public static final String RPC_URL = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
	public static final Web3j Provider = Web3j.build(new HttpService(RPC_URL));
	public static Connection DBConnector = null;
	
	static {
		try {
			DBConnector = DriverManager.getConnection("jdbc:sqlite:Chain.db");
			DBConnector.setAutoCommit(true);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
	}
	
}
