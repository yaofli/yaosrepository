package com.hightech.carcare.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Hashtable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigFile {
	
	private static final Logger logger = LoggerFactory
			.getLogger(ConfigFile.class);
	
	private Hashtable<String, String> config = new Hashtable<String, String>();
	
	public static ConfigFile CONFIG = new ConfigFile();
	
	private ConfigFile() {
		try {
			String classesRoot = getClass().getResource("/").getPath();
			String confURL = classesRoot.concat("props.properties");
			interceptConfigInformation(new FileReader(new File(confURL)));
		} catch (FileNotFoundException e) {
			System.out.println("Config File is not Found");
			logger.error("Config File is not Found", e);
		} catch (Exception e) {
			logger.error("读取配置文档失败！", e);
		}
	}

	private void interceptConfigInformation(FileReader fileReader) {
		try {
			BufferedReader bufferedFileReader = new BufferedReader(fileReader);
			String line = null;
			while ((line = bufferedFileReader.readLine()) != null) {
				if (!line.startsWith("#")) {
					if (!line.equals("")) {
						String key = line.substring(0, line.indexOf("="))
								.trim();
						String value = line.substring(line.indexOf("=") + 1)
								.trim();
						config.put(key, value);
					}
				}
			}
			bufferedFileReader.close();
			fileReader.close();
		} catch (IOException e) {
			 System.out.println(e);
		}
	}

	public String getValue(String key) {
		return (String) config.get(key);
	}
	
	 
//	public static void main(String[] args) {
//		System.out.println(ConfigFile.CONFIG.getValue("productImageDir"));
//	}
}
