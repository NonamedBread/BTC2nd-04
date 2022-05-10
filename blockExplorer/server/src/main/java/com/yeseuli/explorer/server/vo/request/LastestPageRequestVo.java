package com.yeseuli.explorer.server.vo.request;

import lombok.Data;

@Data
public class LastestPageRequestVo {
	private long countPerPage;
	private long pagenum;
}
