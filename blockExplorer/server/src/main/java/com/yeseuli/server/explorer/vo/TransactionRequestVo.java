package com.yeseuli.server.explorer.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class TransactionRequestVo {
	
	@ApiModelProperty(example = "0xee5d0de6ef8fafaee10ea36db7781fd40833960c374614fa6a3079e95d2a44c2")
	private String hash;
	
	@ApiModelProperty(example = "0x6a15d9bee6246c1c51dddb9063905d478dc0daa8b9ce9eec123d81d9ba777ca8")
	private String blockHash;
	
	@ApiModelProperty(example = "0x7a5e9086a8fadc97b776e89f2ec7e1787a442ee2")
	private String fromOrTo;
	
}
