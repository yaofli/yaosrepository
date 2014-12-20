package com.hightech.carcare.util;

import java.io.IOException;
import java.util.List;

 
public class JksonUtil {
	
	final static JKSONLib jlib = new JKSONLib(TimeUtil.YYYY_MM_DD);
	
	private JksonUtil() {
	}

	/**
	 * 
	 * <p> 将一个对象序列化为Json串</p>
	 * @param obj
	 * @return
	 * @date: Create on Apr 19, 2013 11:56:17 PM
	 */
    public static String toJson(Object obj) {
        return jlib.toJSON(obj);
    }
   
	/**
	 * 
	 * <p> 将一个数组对象序列化为Json串</p>
	 * @param obj
	 * @return
	 * @date: Create on Apr 19, 2013 11:56:17 PM
	 */
    public static String toJsonArray(Object obj) {
        return jlib.toJSONArray(obj);
    }

    public static <T> T toBean(String json, Class <T>beanclass) {
        return jlib.toBean(json, beanclass);
    }
    
    public static <T>T[] toArrayBean(String json, Class<T> beanclass) {
        return jlib.toArray(json, beanclass);
    }
    
    public static <T>List<T> toList(String xml, Class<T> beanclass) {
        return jlib.toList(xml, beanclass);
    }
    
    
	/**
	 * 将XML转化为Bean。
	 * @param <T>
	 * @param xml
	 * @param clazz
	 * @return
	 * @throws IOException
	 * @deprecated
	 */
	public static <T> T xmlToBean(String xml, Class<T> clazz)
			throws IOException {
		return JKSONLib.xmlToBean(xml, clazz);
	}
}
