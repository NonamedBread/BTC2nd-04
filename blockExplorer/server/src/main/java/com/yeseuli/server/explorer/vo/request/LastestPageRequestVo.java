package com.yeseuli.server.explorer.vo.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LastestPageRequestVo {
	
	@ApiModelProperty(example = "25")
	private long countPerPage;
	
	@ApiModelProperty(example = "2")
	private long pageNum;
	
}
