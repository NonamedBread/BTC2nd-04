package com.yeseuli.server.explorer.vo.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class BlockRequestVo {
	
	@ApiModelProperty(example = "0x8f236602f17ea68396466cd69ea3d7f9916524b2e35d0e475fcbddcea8af987c")
	private String hash;
	
	@ApiModelProperty(example = "12242051")
	private long number;
	
}
