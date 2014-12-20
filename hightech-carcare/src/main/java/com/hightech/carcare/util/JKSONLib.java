package com.hightech.carcare.util;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class JKSONLib {
	private static final Logger log = LoggerFactory.getLogger(JKSONLib.class);
	
	final static String DS_VALUE = "value";
	/** 空的Object对象 */
	public static final String emptyBeanJson = "{}";
	/** 空的对象数组 */
	public static final String emptyArrayJson = "[]";

	/** 注册对象的JKSONLib */
	private final static Map<String, ObjectMapper> OMS = new ConcurrentHashMap<String, ObjectMapper>();
	/** 默认的 ObjectMapper */
	private final static ObjectMapper defltOM = new ObjectMapper();
	
	static  {
		defaultFeature(defltOM);
	}

	private ObjectMapper omap;
	
	public JKSONLib() {
		omap = defltOM;
	}

	/** 指定日期格式的 JSONLib */
	public JKSONLib(String datefmt) {
		omap = OMS.get(datefmt);
		if (omap == null) {
			omap = new ObjectMapper();
			defaultFeature(omap);
			omap.setDateFormat(new SimpleDateFormat(datefmt));
			OMS.put(datefmt, omap);
		}
	}

	public JKSONLib(ObjectMapper m) {
		omap = m;
		defaultFeature(omap);
	}
	
	public ObjectMapper getObjectMapper(){
		return omap;
	}
	
	private static void defaultFeature(ObjectMapper mapper) {
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		mapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, true);
	}

	/**
	 * 使用输出流OutputStream， 从JKSONLib中取得JsonGenerator对象。
	 * 
	 * @param out 输出流
	 * @return JsonGenerator对象
	 * @throws IOException
	 */
	public JsonGenerator getJsonGenerator(OutputStream out) throws IOException {
		return omap.getFactory().createGenerator(out);
	}
	 
	/**
	 * 将一个串转化为JSON序列。
	 * @param obj 待转JSON的对象
	 * @return JSON序列
	 */
	public String toJSON(Object obj) {
		if (obj == null //
				|| obj.toString().length()==0) {
			return emptyBeanJson;
		}
		try {
			return omap.writeValueAsString(obj);
		} catch (Exception e) {
			log.error("将一个串转化为JSON序列出错！",e);
		}
		// 转换失败的情况，如果是数组对象
		if (obj.getClass().isArray() || obj instanceof Collection) {
			return emptyArrayJson;
		}
		// 其它对象
		return emptyBeanJson;
	}

	public String toJSONArray(Object o) {
		if (o == null || StringUtil.isEmpty(o)) {
			return emptyArrayJson;
		}
		try {
			// 如果是数组或集合类，输出串
			if (o.getClass().isArray() || o instanceof Collection) {
				return omap.writeValueAsString(o);
			}
			// 如果不是集合类，构造一个数组类输出
			Object arr[] = new Object[1];
			arr[0] = o;
			return omap.writeValueAsString(arr);
		} catch (Exception e) {
			log.error("JSON003", e);
		}
		// 出现异常时，输出空数组
		return emptyArrayJson;
	}

	public <T> T toBean(String json, Class<T> bc) {
		try {
			return omap.readValue(json, bc);
		} catch (Exception e) {
			log.warn("json转化对象失败！",e);
		}
		return null;
	}

	/**
	 * 
	 * @param json
	 * @param c
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> T[] toArray(String json, Class<T> c) {
		List<T> list = toList(json, c);
		int len = list.size();
		T[] t = (T[]) new Object[len];
		return list.toArray(t);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> toList(String json, Class<T> c) {
		List<T> list = new ArrayList<T>();
		if (StringUtil.isEmpty(json) 
				|| json.equals(emptyBeanJson)
				|| json.equals(emptyArrayJson)) {
			return list;
		}

		if (json.charAt(0) == '{') {
			T o = toBean(json, c);
			if (o != null) {
				list.add(o);
			}
			return list;
		}

		try {
			List<T> o = omap.readValue(json, List.class);
			list.addAll(o);
		} catch (Exception e) {
			log.error("json转化为list对象出错！",e);
		}
		return list;
	}

	  
	/**
	 * 
	 * @param <T>
	 * @param xml
	 * @param clazz
	 * @return
	 * @throws IOException
	 * @deprecated
	 */
	public static <T> T xmlToBean(String xml, Class<T> clazz)
			throws IOException {
		if (StringUtil.isEmpty(xml)) {
			log.error("XML to BEAN, xml串为空。 class = "+clazz.toString());
			return null;
		}
		XmlMapper xmlMapper = new XmlMapper();
		try {
			return xmlMapper.readValue(xml, clazz);
		} catch (Exception e) {
			throw new IOException(e);
		}
	}
}
