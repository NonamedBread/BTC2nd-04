package com.yeseuli.explorer.server.vo.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LastestRequestVo {
	
	@ApiModelProperty(example = "25")
	private long count;
	
}
