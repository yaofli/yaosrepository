package com.hightech.carcare.menumanager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.menumanager.dao.MenuManagerDao;
import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.menumanager.service.MenuManagerService;
import com.hightech.carcare.util.Pagination;

@Service("menuManagerService")
public class MenuManagerServiceImpl implements MenuManagerService {

	@Autowired(required=true)
	@Qualifier("menuManagerDao")
	MenuManagerDao menuManagerDao;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void save(Menu menu) {
		menuManagerDao.save(menu);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Long id) {
		menuManagerDao.delete(id);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void update(Menu menu) {
		menuManagerDao.update(menu);
	}

	@Override
	public List<Menu> findAllMenus() {
		return menuManagerDao.findAllMenus();
	}

	@Override
	public List<Menu> findMenusByMenuName(String menuname) {
		return menuManagerDao.findMenusByMenuName(menuname);
	}

	

	@Override
	public Menu findMenuById(Long id) {
		return menuManagerDao.findMenuById(id);
	}

	@Override
	public int findMaxMenuOrder() {
		return this.menuManagerDao.findMaxMenuOrder();
	}
	
	@Override
	public List<Menu> findAllEnabledMenus(boolean enabled) {
		return this.menuManagerDao.findAllEnabledMenus(enabled);
	}

	@Override
	public List<Menu> findMenusByParentcode(String parentcode) {
		return this.menuManagerDao.findMenusByParentcode(parentcode);
	}

	@Override
	public Pagination<Menu> findOnePageMenus(Menu menu,
			Pagination<Menu> pagination) {
		return this.menuManagerDao.findOnePageMenus(menu, pagination);
	}

	
}
