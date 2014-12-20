package com.hightech.carcare.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ApplicationObjectSupport;

/** @Class: ApplicationContextTool @TODO:Spring mvc 获取applicationcontext */
public class ApplicationContextTool extends ApplicationObjectSupport {

	private static ApplicationContext applicationContext = null;

	@Override
	protected void initApplicationContext(ApplicationContext context)
			throws BeansException {
		super.initApplicationContext(context);
		if (ApplicationContextTool.applicationContext == null) {
			ApplicationContextTool.applicationContext = context;
		}
	}

	public static ApplicationContext getAppContext() {
		return applicationContext;
	}

	public static Object getBean(String name) {
		return getAppContext().getBean(name);
	}

}