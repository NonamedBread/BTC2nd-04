package com.yeseuli.server;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {
	private static final String API_NAME = "Yeseuli's Explorer & Wallet";
    private static final String API_VERSION = "1.0";
    private static final String API_DESCRIPTION = "Yeseuli's Swagger";
    private static final Set<String> DEFAULT_PRODUCTS_AND_CONSUMES =  new HashSet<>(Arrays.asList("application/json","application/xml"));
    
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
        		.apiInfo(apiInfo())
        		.consumes(DEFAULT_PRODUCTS_AND_CONSUMES)
        		.produces(DEFAULT_PRODUCTS_AND_CONSUMES);
    }

    public ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title(API_NAME)
			.version(API_VERSION)
			.description(API_DESCRIPTION)
			.build();
    }
}
