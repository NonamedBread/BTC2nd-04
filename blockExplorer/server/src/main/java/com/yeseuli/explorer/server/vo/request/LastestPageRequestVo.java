package com.yeseuli.explorer.server.vo.request;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

@Data
public class LastestPageRequestVo {
	
	@ApiModelProperty(example = "25")
	private long countPerPage;
	
	@ApiModelProperty(example = "2")
	private long pagenum;
	
}
