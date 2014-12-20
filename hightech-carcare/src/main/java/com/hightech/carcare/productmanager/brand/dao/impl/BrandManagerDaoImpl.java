package com.hightech.carcare.productmanager.brand.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.hightech.carcare.productmanager.brand.dao.BrandManagerDao;
import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.model.BrandDict;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Repository("brandManagerDao")
public class BrandManagerDaoImpl implements BrandManagerDao {

	@PersistenceContext
	EntityManager em;
	
	private int totalSize;
	
	@Override
	public void save(Brand brand) {
		em.persist(brand);
	}

	@Override
	public void update(Brand brand) {
		em.merge(brand);
	}

	@Override
	public void delete(Long id) {
		Brand brand = this.fetchOneBrandById(id);
		if(brand!=null){
			em.remove(brand);		
		}
	}

	@Override
	public void delete(Brand brand) {
		em.remove(brand);
	}

	@Override
	public List<Brand> fetchAllBrands() {
		String qlString = " from Brand";
		TypedQuery<Brand> query = (TypedQuery<Brand>) em.createQuery(qlString,Brand.class);
		return query.getResultList();
	}

	@Override
	public List<Brand> fetchBrandsOfOnePage(Brand brand, int pageSize,
			int currentPage) {
		StringBuffer qlString =  new StringBuffer(" from Brand b where 1=1 ");
		if(brand!=null&&StringUtils.isEmpty(brand.getBrandname())){
			qlString.append(" and b.brandname like :brandname");
		}
		
		TypedQuery<Brand> query = em.createQuery(qlString.toString(), Brand.class);
		if(brand!=null&&StringUtils.isEmpty(brand.getBrandname())){
			query.setParameter("brandname", "'%"+brand.getBrandname()+"%'");
		}
		
		query.setFirstResult(pageSize*currentPage+1);
		query.setMaxResults(pageSize);
		totalSize =  query.getMaxResults();
		return query.getResultList();
	}

	@Override
	public Brand fetchOneBrandById(Long id) {
		String qlString = " from Brand b where b.id=:id";
		TypedQuery<Brand> query = em.createQuery(qlString,Brand.class).setParameter("id", id);
		return query.getSingleResult();
	}

	@Override
	public Brand fetchOneBrandByBrandCode(Long brandcode) {
		String qlString = " from Brand b where b.brandcode=:brandcode";
		TypedQuery<Brand> query = em.createQuery(qlString,Brand.class).setParameter("brandcode", brandcode);
		return query.getSingleResult();
	}

	@Override
	public int totalBrandsSize(Brand brand) {
		return totalSize;
	}

	 

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Pagination<Brand> findOnePageBrands(Brand brand,
			Pagination<Brand> pagination) {
		Map<String,Object> result =  buildFindBrandsQL(brand,false);
		TypedQuery<Brand> query = em.createQuery(result.get("qlString").toString(), Brand.class);
		query.setFirstResult(pagination.getFrom());
		query.setMaxResults(pagination.getRows());
		Map<String,Object> params = ((Map<String, Object>) result.get("params"));
		for(String param:params.keySet()){
			query.setParameter(param, params.get(param));
		}
		List<Brand> list = query.getResultList();
		pagination.setObject(list);
		Long total = findBrandTotalSize(brand,pagination);
		pagination.setTotal(total);
		return pagination;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Long findBrandTotalSize(Brand brand,Pagination<Brand> pagination) {
		Map<String,Object> result =  buildFindBrandsQL(brand,true);
		Query query = em.createQuery(result.get("qlString").toString());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String key:params.keySet()){
			query.setParameter(key, params.get(key));
		}
		return (Long) query.getSingleResult();
	}
	
	public Map<String, Object> buildFindBrandsQL(Brand brand,boolean isCount){
		StringBuilder qlString = new StringBuilder(32);
		Map<String,Object> params = new HashMap<String,Object>();
		if(isCount){
			qlString.append("select count(b) from Brand b where 1=1 ");
		}else{
			qlString.append("select b from Brand b where 1=1 ");
		}
		
		if(brand!=null&&StringUtil.isNotEmpty(brand.getBrandname())){
			qlString.append(" and b.brandname like :brandname ");
			params.put("brandname", brand.getBrandname());
		}
		if(brand!=null&&StringUtil.isNotEmpty(brand.getBrandurl())){
			qlString.append(" and b.brandurl = :brandurl ");
			params.put("brandurl", brand.getBrandurl());
		}
		Map<String,Object> result = new HashMap<String,Object>(2);
		result.put("qlString", qlString.toString());
		result.put("params", params);
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BrandDict> findAllBrandDicts() {
		List<BrandDict> dicts = new ArrayList<BrandDict>(1);
		String qlString = "select id,brandname from Brand b";
		Query query = em.createQuery(qlString);
		List<Object> objs = query.getResultList();
		if(objs!=null){
			for(Object o:objs){
				Object[] arr = (Object[]) o;
				BrandDict dict = new BrandDict((Long)arr[0],(String)arr[1]);
				dicts.add(dict);
			}
		}
		return dicts;
	}
}
