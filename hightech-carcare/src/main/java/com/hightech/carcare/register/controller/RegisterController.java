package com.hightech.carcare.register.controller;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hightech.carcare.register.service.RegisterService;


@Controller
public class RegisterController {

	private static final Logger logger = LoggerFactory
			.getLogger(RegisterController.class);
	
	@Inject
	RegisterService registerService;
	
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String register() {
		logger.info("into register page!");
		return "register";
	}
	
	

	public void setRegisterService(RegisterService registerService) {
		this.registerService = registerService;
	}
}
