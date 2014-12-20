package com.hightech.carcare.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hightech.carcare.util.JksonUtil;

public class BaseController<T> {
	private static final Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	protected void write(Object obj,HttpServletResponse resp){
		try {
			PrintWriter out = resp.getWriter();
			String jsonStr = "";
			if(obj!=null&&obj instanceof Collection){
				jsonStr = JksonUtil.toJsonArray(obj);
			}else if(obj!=null&& !(obj instanceof Collection)){
				jsonStr = JksonUtil.toJson(obj);
			}
			out.write(jsonStr);
			out.flush();
		} catch (IOException e) {
			logger.error("写出json字符串出错！",e); 
		}
	}
	
	/**
	 * 写出
	 * @param total
	 * @param rows
	 * @param resp
	 */
	protected void write(Long total,List<T> rows,HttpServletResponse resp){
		try {
			PrintWriter out = resp.getWriter();
			Map<String,Object> pagination = new HashMap<String,Object>(2);
			pagination.put("total", total);
			pagination.put("rows", rows);
			String jsonStr  = JksonUtil.toJson(pagination);
			out.write(jsonStr);
			out.flush();
		} catch (IOException e) {
			logger.error("写出json字符串出错！",e); 
		}
	}
}
