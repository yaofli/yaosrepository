package com.hightech.carcare.dict.dao;

import java.util.List;

import com.hightech.carcare.dict.model.Dictionary;

public interface DictionaryManagerDao {

	/**
	 * 保存字典
	 * @param dictionary
	 */
	void save(Dictionary dictionary);
	
	/**
	 * 更新字典
	 * @param dictionary
	 */
	void update(Dictionary dictionary);
	
	/**
	 * 删除字典
	 * @param dictionary
	 */
	void delete(Dictionary dictionary);
	
	/**
	 * 根据ID删除字典
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 根据ID获取字典
	 * @param id
	 * @return
	 */
	Dictionary fetchDictionaryById(Long id);
	
	/**
	 * 根据父节点获取子节点列表
	 * @param parentcode
	 * @return
	 */
	List<Dictionary> fetchDictionaryByParentCode(String parentcode);
	
	/**
	 * 根据父节点及子节点获取子节点字段对象
	 * @param parentcode
	 * @param code
	 * @return
	 */
	Dictionary fetchDictionaryByParentcodeAndCode(String parentcode,String code);
}
