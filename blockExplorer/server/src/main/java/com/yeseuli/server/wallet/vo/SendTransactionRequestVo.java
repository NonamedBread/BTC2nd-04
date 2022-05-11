package com.yeseuli.server.wallet.vo;

import lombok.Data;

@Data
public class SendTransactionRequestVo {
	
	private String from;
	private String signedRaw;
	
}
