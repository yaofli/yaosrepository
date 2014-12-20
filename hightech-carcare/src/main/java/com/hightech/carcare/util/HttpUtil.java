package com.hightech.carcare.util;

import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HttpUtil {
	
	private HttpUtil() {
	}
	
	/**
	 * 
	 * @param request
	 * @param name
	 * @param format
	 * @param defalut
	 * @return
	 */
	public static Date getRequestDateValue(HttpServletRequest request,
			String name, String format, Date val) {
		String t = request.getParameter(name);
		if (isBlank(t)) {
			return val;
		}
		return TimeUtil.parseDate(format, request.getParameter(name));
	}

	/**
	 * 从HttpServletRequest从取出参数，如果为空时，设定为默认值。
	 * @param r
	 * @param nm
	 * @param val0
	 * @return
	 */
	public static String getRequestValue(HttpServletRequest r, String nm,
			String val0) {
		String v = r.getParameter(nm);
		if (isBlank(v)) {
			return val0;
		}
		return v;
	}

	public static byte getRequestByteValue(HttpServletRequest request,
			String name, int val) {
		String t = request.getParameter(name);
		if (isBlank(t)) {
			return (byte) val;
		}
		return (byte) StringUtil.toInt(t, val);
	}
	
	public static boolean getRequestBooleanValue(HttpServletRequest request,
			String name, boolean val) {
		String t = request.getParameter(name);
		if (isBlank(t)) {
			return val;
		}
		return StringUtil.toBoolean(t);
	}
	
	/**
	 * 从Cookie中取得指定名字对应的Cookie值。
	 * 
	 * @param request
	 *            HttpServletRequest
	 * @param name
	 *            Cookie名
	 * @param defalut
	 *            默认值
	 * @return Cookie值
	 */
	public static String getCookie(HttpServletRequest request, String name,
			String defalut) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return defalut;
		}
		for (int i = 0; i < cookies.length; i++) {
			if (cookies[i].getName().equals(name)) {
				return cookies[i].getValue();
			}
		}
		return defalut;
	}

	public static String getCookie(HttpServletRequest request, String name) {
		return getCookie(request, name, null);
	}

	public static void setCookie(HttpServletResponse response, String name,
			String value) {
		Cookie cookie = new Cookie(name, value);
		response.addCookie(cookie);
	}

	public static void setCookie(HttpServletResponse response, String name,
			String value, String path, int age) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath(path);
		cookie.setMaxAge(age);
		response.addCookie(cookie);
	}

	public static Integer getCookieInteger(HttpServletRequest request,
			String name, Integer defalut) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return defalut;
		}
		for (int i = 0; i < cookies.length; i++) {
			if (cookies[i].getName().equals(name)) {
				return StringUtil.toInt(cookies[i].getValue(), defalut);
			}
		}
		return defalut;
	}

	public static int getRequestInt(HttpServletRequest request, String name,
			int val) {
		String s = request.getParameter(name);
		if (notBlank(s)) {
			return StringUtil.toInt(request.getParameter(name), val);
		}
		return val;
	}

	public static long getRequestLong(HttpServletRequest request, String name,
			long value) {
		String s = request.getParameter(name);
		if (notBlank(s)) {
			return StringUtil.toLong(s, value);
		}
		return value;
	}

	/**
	 * 判定在Http请求是，是否是指的值，如果不是，或不存在，返回为FALSE。
	 * 
	 * @param request
	 *            HttpServletRequest
	 * @param name
	 *            HttpServletRequest请求参数名
	 * @param value
	 *            指定的值
	 * @return 是否是指定的值
	 */
	public static boolean isHttpRequestValue(HttpServletRequest request,
			String name, String value) {
		String param = request.getParameter(name);
		return (param != null) && (param.trim().equals(value));
	}

	public static boolean isBlank(String value[]) {
		if (value==null||value.length==0){
			return true;
		}
		return isBlank(value[0]);
	}

	public static boolean isEmpty(String value[]){
		return isBlank(value);
	}

	public static boolean isNotEmpty(String value[]){
		return !(isBlank(value));
	}
	
	public static boolean notBlank(String value[]) {
		return !(isBlank(value));
	}
	
	/**
	 * 判断Http请求的参数是否为空。
	 * @param value 值
	 * @return 是否为空
	 */
	public static boolean isBlank(String value) {
		return (value == null //
				|| value.length() == 0 //
				|| value.equals("null") //
		|| value.equals("undefined"));
	}
	
	public static boolean notBlank(String value) {
		return !(isBlank(value));
	}
	
	public static boolean isNotEmpty(String val) {
		return !(isBlank(val));
	}

	public static boolean isEmpty(String val) {
		return isBlank(val);
	}
}
