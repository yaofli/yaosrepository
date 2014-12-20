package com.hightech.carcare.ads.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.ads.dao.RotatingAdsManagerDao;
import com.hightech.carcare.ads.model.RotatingAds;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Repository("rotatingAdsManagerDao")
public class RotatingAdsManagerDaoImpl implements RotatingAdsManagerDao {

	@PersistenceContext
	EntityManager em;
	
	public void setEm(EntityManager em) {
		this.em = em;
	}
	
	@Override
	public RotatingAds save(RotatingAds rotatingAds) {
		em.persist(rotatingAds);
		return rotatingAds;
	}

	@Override
	public RotatingAds update(RotatingAds rotatingAds) {
		em.merge(rotatingAds);
		return rotatingAds;
	}

	@Override
	public void delete(Long id) {
		RotatingAds rotatingAds = this.findRotatingAdsById(id);
		this.delete(rotatingAds);
	}

	@Override
	public void delete(RotatingAds rotatingAds) {
		if(rotatingAds !=null){
			em.remove(rotatingAds);
		}
	}

	@Override
	public RotatingAds findRotatingAdsById(Long id) {
		return em.find(RotatingAds.class, id);
	}

	@Override
	public List<RotatingAds> findRotatingAdsesByType(Integer type) {
		String qlString = " from RotatingAds r where r.type=:type order by aoder ";
		TypedQuery<RotatingAds> query = em.createQuery(qlString,RotatingAds.class).setParameter("type", type);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Pagination<RotatingAds> findOnePageRotatingAds(RotatingAds rotatingAds,
			Pagination<RotatingAds> pagination) {
		Map<String,Object> result =  buildFindRotatingAdsSQL(rotatingAds,false);
		TypedQuery<RotatingAds> query = em.createQuery(result.get("qlString").toString(), RotatingAds.class);
		query.setFirstResult(pagination.getFrom());
		query.setMaxResults(pagination.getRows());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String param:params.keySet()){
			query.setParameter(param, params.get(param));
		}
		List<RotatingAds> list = query.getResultList();
		pagination.setObject(list);
		Long total = findRotatingAdsTotalSize(rotatingAds);
		pagination.setTotal(total);
		return pagination;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Long findRotatingAdsTotalSize(RotatingAds rotatingAds){
		Map<String,Object> result =  buildFindRotatingAdsSQL(rotatingAds,true);
		Query query = em.createQuery(result.get("qlString").toString());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String key:params.keySet()){
			query.setParameter(key, params.get(key));
		}
		return (Long) query.getSingleResult();
	}

	public Map<String, Object> buildFindRotatingAdsSQL(RotatingAds rotatingAds,boolean isCount){
		StringBuilder qlString = new StringBuilder(32);
		Map<String,Object> params = new HashMap<String,Object>();
		if(isCount){
			qlString.append("select count(r) from RotatingAds r where 1=1 ");
		}else{
			qlString.append("select r from RotatingAds r where 1=1 ");
		}
		
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getAlt())){
			qlString.append(" and r.alt like :alt ");
			params.put("alt", rotatingAds.getAlt());
		}
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getId())){
			qlString.append(" and r.id = :id ");
			params.put("id", rotatingAds.getId());
		}
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getEnabled())){
			qlString.append(" and r.enabled = :enabled ");
			params.put("enabled", rotatingAds.getEnabled());
		}
		
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getImageurl())){
			qlString.append(" and r.imageurl = :imageurl ");
			params.put("imageurl", rotatingAds.getImageurl());
		}
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getUrl())){
			qlString.append(" and r.url = :url ");
			params.put("url", rotatingAds.getUrl());
		}
		
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getType())){
			qlString.append(" and r.type = :type ");
			params.put("type", rotatingAds.getType());
		}
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		result.put("qlString", qlString.toString());
		result.put("params", params);
		return result;
	}
	
	
	@Override
	public List<RotatingAds> findAllRotatingAdses() {
		String qlString = " from RotatingAds order by aorder ";
		TypedQuery<RotatingAds> query = em.createQuery(qlString,RotatingAds.class);
		return query.getResultList();
	}

}
