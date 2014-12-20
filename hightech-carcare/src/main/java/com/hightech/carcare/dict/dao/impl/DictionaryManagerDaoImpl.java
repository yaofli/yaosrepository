package com.hightech.carcare.dict.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.dict.dao.DictionaryManagerDao;
import com.hightech.carcare.dict.model.Dictionary;

@Repository("dictionaryManagerDao")
public class DictionaryManagerDaoImpl implements DictionaryManagerDao {
	
	@PersistenceContext
	EntityManager em;
	
	@Override
	public void save(Dictionary dictionary) {
		em.persist(dictionary);
	}

	@Override
	public void update(Dictionary dictionary) {
		em.merge(dictionary);
	}

	@Override
	public void delete(Dictionary dictionary) {
		this.em.remove(dictionary);
	}

	@Override
	public void delete(Long id) {
		Dictionary dictionary = this.fetchDictionaryById(id);
		if(dictionary!=null){
			this.delete(dictionary);
		}
	}

	@Override
	public Dictionary fetchDictionaryById(Long id) {
		return this.em.find(Dictionary.class, id);
	}

	@Override
	public List<Dictionary> fetchDictionaryByParentCode(String parentcode) {
		String qlString = " from Dictionary d where d.parentcode=:parentcode";
		TypedQuery<Dictionary> query = em.createQuery(qlString, Dictionary.class);
		query.setParameter("parentcode", parentcode);
		return query.getResultList();
	}

	@Override
	public Dictionary fetchDictionaryByParentcodeAndCode(String parentcode,String code) {
		String qlString = " from Dictionary d where d.parentcode=:parentcode and d.code=:code";
		TypedQuery<Dictionary> query = em.createQuery(qlString, Dictionary.class);
		query.setParameter("parentcode", parentcode);
		query.setParameter("code", code);
		return query.getSingleResult();
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}

}
