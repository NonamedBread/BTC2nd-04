package com.yeseuli.server.utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.web3j.utils.Convert;

public class DataConvert {

	public static List<HashMap<String, Object>> resultSetToArrayList(ResultSet rs) throws SQLException{
		var md = rs.getMetaData();
		var columns = md.getColumnCount();
		var list = new ArrayList<HashMap<String, Object>>();
		
		while (rs.next()) {
			var row = new HashMap<String, Object>(columns);
			
			for(int i = 1; i <= columns; ++i){
				if ("Input".equals(md.getColumnName(i)) == true) {
					continue;
				}
				
				if (rs.getObject(i) == null) {
					row.put(md.getColumnName(i), "");
					continue;
				}
				
				if ("Value".equals(md.getColumnName(i)) == true) {
					row.put("Value", org.web3j.utils.Convert.fromWei(rs.getString(i), Convert.Unit.ETHER).toString());
				} else {
					row.put(md.getColumnName(i), rs.getObject(i));
				}
			}
			
			list.add(row);
		}
		
		return list;
	}
	
}
