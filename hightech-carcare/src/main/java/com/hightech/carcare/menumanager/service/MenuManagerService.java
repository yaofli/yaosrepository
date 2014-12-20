package com.hightech.carcare.menumanager.service;

import java.util.List;

import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.util.Pagination;

public interface MenuManagerService {
	/**
	 * 保存菜单
	 * @param menu
	 */
	void save(Menu menu);
	
	/**
	 * 删除菜单
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 更新菜单
	 * @param menu
	 */
	void update(Menu menu);
	
	/**
	 * 获取所有菜单
	 * @return
	 */
	List<Menu> findAllMenus();
	
	/**
	 * 根据菜单名称获取菜单列表
	 * @param menuname
	 * @return
	 */
	List<Menu> findMenusByMenuName(String menuname);
	
	/**
	 * 获取所有可用主菜单
	 * @return
	 */
	List<Menu> findAllEnabledMenus(boolean enabled);
	
	/**
	 * 根据Id获取菜单对象
	 * @param id
	 * @return
	 */
	Menu findMenuById(Long id);
	
	/**
	 * 获取菜单最大编号
	 * @return
	 */
	int findMaxMenuOrder();
	
	/**
	 * 根据父节点编号获取菜单
	 * @return
	 */
	List<Menu> findMenusByParentcode(String parentcode);
	
	/**
	 * 根据菜单查询条件获取菜单分页列表
	 * @param menu
	 * @param pagination
	 * @return
	 */
	Pagination<Menu> findOnePageMenus(Menu menu,Pagination<Menu> pagination);
}
