package com.yeseuli.server.explorer.vo.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AccountRequestVo {

	@ApiModelProperty(example = "0xc123662ecd81d39d796896ae04a337e37dd47cc7")
	private String address;
	
}
