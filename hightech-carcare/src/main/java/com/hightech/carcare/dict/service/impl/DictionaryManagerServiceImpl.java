package com.hightech.carcare.dict.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.hightech.carcare.dict.dao.DictionaryManagerDao;
import com.hightech.carcare.dict.model.Dictionary;
import com.hightech.carcare.dict.service.DictionaryManagerService;

@Service("dictionaryManagerService")
public class DictionaryManagerServiceImpl implements DictionaryManagerService {
	
	@Autowired(required=true)
	@Qualifier("dictionaryManagerDao")
	DictionaryManagerDao dictionaryManagerDao;
	
	@Override
	public void save(Dictionary dictionary) {
		dictionaryManagerDao.save(dictionary);
	}

	@Override
	public void update(Dictionary dictionary) {
		dictionaryManagerDao.update(dictionary);
	}

	@Override
	public void delete(Dictionary dictionary) {
		dictionaryManagerDao.delete(dictionary);
	}

	@Override
	public void delete(Long id) {
		dictionaryManagerDao.delete(id);
	}

	@Override
	public Dictionary fetchDictionaryById(Long id) {
		return dictionaryManagerDao.fetchDictionaryById(id);
	}

	@Override
	public List<Dictionary> fetchDictionaryByParentCode(String parentcode) {
		return dictionaryManagerDao.fetchDictionaryByParentCode(parentcode);
	}

	@Override
	public Dictionary fetchDictionaryByParentcodeAndCode(String parentcode,
			String code) {
		return dictionaryManagerDao.fetchDictionaryByParentcodeAndCode(parentcode, code);
	}

}
