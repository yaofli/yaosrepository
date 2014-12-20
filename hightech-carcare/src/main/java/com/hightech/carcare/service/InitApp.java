package com.hightech.carcare.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InitApp extends HttpServlet {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6749039194378974575L;

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("执行初始化开始...");
		super.service(req, resp);
	}
	
}
