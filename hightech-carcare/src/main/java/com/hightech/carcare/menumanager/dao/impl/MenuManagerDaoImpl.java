package com.hightech.carcare.menumanager.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.menumanager.dao.MenuManagerDao;
import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Repository("menuManagerDao")
public class MenuManagerDaoImpl implements MenuManagerDao {

	@PersistenceContext
	EntityManager em;
	
	public void setEm(EntityManager em) {
		this.em = em;
	}
	
	@Override
	public void save(Menu menu) {
		if(menu.getId()!=null){
			update(menu);
		}else{
			em.persist(menu);
		}
	}

	@Override
	public void delete(Long id) {
		Menu menu = findMenuById(id);
		if(menu!=null){
			em.remove(menu);
		}
	}

	@Override
	public void update(Menu menu) {
		em.merge(menu);
	}

	@Override
	public List<Menu> findAllMenus() {
		String qlString = " from Menu m order by menuorder ";
		TypedQuery<Menu> query = em.createQuery(qlString, Menu.class);
		return query.getResultList();
	}

	@Override
	public List<Menu> findMenusByMenuName(String menuname) {
		String qlString = " select m from Menu m where m.menuname like (:menuname) ";
		TypedQuery<Menu> query = em.createQuery(qlString, Menu.class);
		query.setParameter("menuname", "%"+menuname+"%");
		return query.getResultList();
	}

	@Override
	public Menu findMenuById(Long id) {
		return em.find(Menu.class, id);
	}

	@Override
	public int findMaxMenuOrder() {
		String qlString = "select max(m.menuorder) from Menu m  order by menuorder ";
		Query query = em.createQuery(qlString);
		return (Integer) query.getSingleResult();
	}

	@Override
	public List<Menu> findAllEnabledMenus(boolean enabled) {
		String qlString = " from Menu m where m.enabled=:enabled order by menuorder ";
		TypedQuery<Menu> query = em.createQuery(qlString, Menu.class);
		query.setParameter("enabled", enabled);
		return query.getResultList();
	}
	

	@Override
	public List<Menu> findMenusByParentcode(String parentcode) {
		String qlString = " from Menu m where m.parentcode=:parentcode and m.enabled=true order by menuorder ";
		TypedQuery<Menu> query = em.createQuery(qlString, Menu.class);
		query.setParameter("parentcode", parentcode);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Pagination<Menu> findOnePageMenus(Menu menu,
			Pagination<Menu> pagination) {
		Map<String,Object> result =  buildFindMenusQL(menu,false);
		TypedQuery<Menu> query = em.createQuery(result.get("qlString").toString(), Menu.class);
		query.setFirstResult(pagination.getFrom());
		query.setMaxResults(pagination.getRows());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String param:params.keySet()){
			query.setParameter(param, params.get(param));
		}
		List<Menu> list = query.getResultList();
		pagination.setObject(list);
		Long total = findMenusTotalSize(menu,pagination);
		pagination.setTotal(total);
		return pagination;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Long findMenusTotalSize(Menu menu,Pagination<Menu> pagination) {
		Map<String,Object> result =  buildFindMenusQL(menu,true);
		Query query = em.createQuery(result.get("qlString").toString());
		Map<String,Object> params = (Map<String, Object>) result.get("params");
		for(String key:params.keySet()){
			query.setParameter(key, params.get(key));
		}
		return (Long) query.getSingleResult();
	}
	
	public Map<String, Object> buildFindMenusQL(Menu menu,boolean isCount){
		StringBuilder qlString = new StringBuilder(32);
		Map<String,Object> params = new HashMap<String,Object>();
		if(isCount){
			qlString.append("select count(m) from Menu m where 1=1 ");
		}else{
			qlString.append("select m from Menu m where 1=1 ");
		}
		
		if(menu!=null&&StringUtil.isNotEmpty(menu.getMenuname())){
			qlString.append(" and m.menuname like :menuname ");
			params.put("menuname", menu.getMenuname());
		}
		if(menu!=null&&StringUtil.isNotEmpty(menu.getParentcode())){
			qlString.append(" and m.parentcode = :parentcode ");
			params.put("parentcode", menu.getParentcode());
		}
		if(menu!=null&&StringUtil.isNotEmpty(menu.getMenucode())){
			qlString.append(" and m.menucode = :menucode ");
			params.put("menucode", menu.getMenucode());
		}
		
		if(menu!=null&&StringUtil.isNotEmpty(menu.getUri())){
			qlString.append(" and m.uri = :uri ");
			params.put("uri", menu.getUri());
		}
		
		if(menu!=null&&StringUtil.isNotEmpty(menu.isEnabled())){
			qlString.append(" and m.enabled = :enabled ");
			params.put("enabled", menu.isEnabled());
		}
		qlString.append("order by menuorder ");
		Map<String,Object> result = new HashMap<String,Object>(2);
		result.put("qlString", qlString.toString());
		result.put("params", params);
		return result;
	}
}
