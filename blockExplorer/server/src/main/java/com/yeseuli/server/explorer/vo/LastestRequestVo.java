package com.yeseuli.server.explorer.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LastestRequestVo {
	
	@ApiModelProperty(example = "25")
	private long count;
	
}
