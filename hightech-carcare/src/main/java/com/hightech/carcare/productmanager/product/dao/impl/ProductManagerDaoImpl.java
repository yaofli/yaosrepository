package com.hightech.carcare.productmanager.product.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.productmanager.product.dao.ProductManagerDao;
import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Repository("productManagerDao")
public class ProductManagerDaoImpl implements ProductManagerDao {
	@PersistenceContext
	EntityManager em;
	
	public void setEm(EntityManager em) {
		this.em = em;
	}

	@Override
	public void save(Product product) {
		em.persist(product);
	}

	@Override
	public void update(Product product) {
		em.merge(product);
	}

	@Override
	public void delete(Long id) {
		Product product =  findProductById(id);
		em.remove(product);
	}

	@Override
	public void delete(String productno) {
		Product product =  findProductByProductno(productno);
		em.remove(product);
	}

	@Override
	public Product findProductById(Long id) {
		return em.find(Product.class,id);
	}

	@Override
	public List<Product> findProductsByCategory(String incategory) {
		String qlString = " from Product p where p.incategory=:incategory";
		TypedQuery<Product> query = em.createQuery(qlString, Product.class);
		query.setParameter("incategory", incategory);
		return query.getResultList();
	}

	@Override
	public List<Product> findPagedProductsByCategory(String incategory,int startRow,int maxRow){
		String qlString = " from Product p where p.incategory=:incategory";
		TypedQuery<Product> query = em.createQuery(qlString, Product.class);
		query.setParameter("incategory", incategory);
		query.setFirstResult(startRow);
		query.setMaxResults(maxRow);
		return query.getResultList();
	}
	
	@Override
	public Product findProductByProductno(String productno) {
		String qlString = " from Product p where p.productno=:productno";
		TypedQuery<Product> query = em.createQuery(qlString, Product.class);
		query.setParameter("productno", productno);
		return query.getSingleResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Pagination<Product> findOnePageProducts(Product product,
			Pagination<Product> pagination) {
		Map<String,Object> result =  buildFindProductsQL(product,false);
		TypedQuery<Product> query = em.createQuery(result.get("qlString").toString(), Product.class);
		query.setFirstResult(pagination.getFrom());
		query.setMaxResults(pagination.getRows());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String param:params.keySet()){
			query.setParameter(param, params.get(param));
		}
		List<Product> list = query.getResultList();
		pagination.setObject(list);
		Long total = findProductsTotalSize(product,pagination);
		pagination.setTotal(total);
		return pagination;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Long findProductsTotalSize(Product product,Pagination<Product> pagination){
		Map<String,Object> result =  buildFindProductsQL(product,true);
		Query query = em.createQuery(result.get("qlString").toString());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String key:params.keySet()){
			query.setParameter(key, params.get(key));
		}
		return (Long) query.getSingleResult();
	}

	public Map<String, Object> buildFindProductsQL(Product product,boolean isCount){
		StringBuilder qlString = new StringBuilder(32);
		Map<String,Object> params = new HashMap<String,Object>();
		if(isCount){
			qlString.append("select count(p) from Product p where 1=1 ");
		}else{
			qlString.append("select p from Product p where 1=1 ");
		}
		
		if(product!=null&&StringUtil.isNotEmpty(product.getProductname())){
			qlString.append(" and p.productname like :productname ");
			params.put("productname", product.getProductname());
		}
		if(product!=null&&StringUtil.isNotEmpty(product.getProductno())){
			qlString.append(" and p.productno = :productno ");
			params.put("productno", product.getProductno());
		}
		if(product!=null&&StringUtil.isNotEmpty(product.getId())){
			qlString.append(" and p.id = :id ");
			params.put("id", product.getId());
		}
		
		if(product!=null&&StringUtil.isNotEmpty(product.getIncategory())){
			qlString.append(" and p.incategory() = :incategory ");
			params.put("incategory", product.getIncategory());
		}
		
		if(product!=null&&StringUtil.isNotEmpty(product.getBrandId())){
			qlString.append(" and p.brandId() = :brandId ");
			params.put("brandId", product.getBrandId());
		}
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		result.put("qlString", qlString.toString());
		result.put("params", params);
		return result;
	}
}
