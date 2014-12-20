package com.hightech.carcare.productmanager.categroy.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.productmanager.categroy.dao.CategoryManagerDao;
import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

/**
 * 
 * @author yaofl
 *
 */
@Repository("categoryManagerDao")
public class CategoryManagerDaoImpl implements CategoryManagerDao {
	
	@PersistenceContext
	EntityManager em;
	
	@Override
	public void save(Category category) {
		if(category.getId()!=null){
			em.merge(category);
		}else{
			em.persist(category);
		}
		
	}

	@Override
	public void update(Category category) {
		em.merge(category);
	}

	@Override
	public void delete(Long id) {
		Category category = findCategoryById(id);
		if(category!=null){
			em.remove(category);
		}
	}

	@Override
	public List<Category> findAllCategories() {
		String qlString = " from Category c order by categoryorder";
		TypedQuery<Category> query = em.createQuery(qlString, Category.class);
		return query.getResultList();
	}

	@Override
	public List<Category> findCategoriesByParentcode(String parentcode) {
		String qlString = " from Category c where c.parentcode=:parentcode order by categoryorder";
		TypedQuery<Category> query = em.createQuery(qlString, Category.class);
		query.setParameter("parentcode", parentcode);
		return query.getResultList();
	}

	@Override
	public Category findCategoryById(Long id) {
		return em.find(Category.class, id);
	}

	

	@SuppressWarnings("unchecked")
	@Override
	public Pagination<Category> findOnePageCategories(Category category,
			Pagination<Category> pagination) {
		Map<String,Object> result =  buildFindCategoriesQL(category,false);
		TypedQuery<Category> query = em.createQuery(result.get("qlString").toString(), Category.class);
		query.setFirstResult(pagination.getFrom());
		query.setMaxResults(pagination.getRows());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String param:params.keySet()){
			query.setParameter(param, params.get(param));
		}
		List<Category> list = query.getResultList();
		pagination.setObject(list);
		Long total = findCategoriesTotalSize(category,pagination);
		pagination.setTotal(total);
		return pagination;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Long findCategoriesTotalSize(Category category,Pagination<Category> pagination) {
		Map<String,Object> result =  buildFindCategoriesQL(category,true);
		Query query = em.createQuery(result.get("qlString").toString());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String key:params.keySet()){
			query.setParameter(key, params.get(key));
		}
		return (Long) query.getSingleResult();
	}
	
	public Map<String, Object> buildFindCategoriesQL(Category category,boolean isCount){
		StringBuilder qlString = new StringBuilder(32);
		Map<String,Object> params = new HashMap<String,Object>();
		if(isCount){
			qlString.append("select count(c) from Category c where 1=1 ");
		}else{
			qlString.append("select c from Category c where 1=1 ");
		}
		
		if(category!=null&&StringUtil.isNotEmpty(category.getTreename())){
			qlString.append(" and c.treename like :treename ");
			params.put("treename", category.getTreename());
		}
		if(category!=null&&StringUtil.isNotEmpty(category.getCode())){
			qlString.append(" and c.code = :code ");
			params.put("code", category.getCode());
		}
		if(category!=null&&StringUtil.isNotEmpty(category.getParentcode())){
			qlString.append(" and c.parentcode = :parentcode ");
			params.put("parentcode", category.getParentcode());
		}
		
		if(category!=null&&StringUtil.isNotEmpty(category.getImportentflag())){
			qlString.append(" and c.importentflag = :importentflag ");
			params.put("importentflag", category.getImportentflag());
		}
		
		if(category!=null&&StringUtil.isNotEmpty(category.getEnabled())){
			qlString.append(" and c.enabled = :enabled ");
			params.put("enabled", category.getEnabled());
		}
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		result.put("qlString", qlString.toString());
		result.put("params", params);
		return result;
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}
}
