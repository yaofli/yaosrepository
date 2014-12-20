package com.hightech.carcare.menumanager.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.menumanager.service.MenuManagerService;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/app-context.xml")
public class MenuManagerServiceImplTest {

	@Inject
	private MenuManagerService menuManagerService;
	
	@Test
	public void testSave() {
		Menu menu = new Menu();
		menuManagerService.save(menu);
	}

	

	@Test
	public void testUpdate() {
		Menu menu = menuManagerService.findMenuById(1l);
		if(menu==null){
			menu = new Menu();
		}
		menu.setMenuname("首页");
		menu.setMenuorder(1);
		menu.setMenucode("1");
		menu.setRemark("备注");
		menuManagerService.save(menu);
		
		
		menu.setRemark("备注22");
		menuManagerService.update(menu);
		
		System.out.println(menu.getRemark());
	}

	@Test
	public void testFindAllMenus() {
		List<Menu> menus = menuManagerService.findAllMenus();
		for(Menu m:menus){
			Assert.assertNotNull(m.getMenuname());
			System.out.println(m.getMenuname());
		}
	}

	@Test
	public void testFindMenusByMenuName() {
		List<Menu> menus = menuManagerService.findMenusByMenuName("首");
		for(Menu m:menus){
			Assert.assertNotNull(m.getMenuname());
			System.out.println(m.getMenuname());
		}
	}
	
	@Test
	public void testDelete() {
		menuManagerService.delete(1l);
	}
	@Test
	public void testFindMaxMenuOrder(){
		int a =  menuManagerService.findMaxMenuOrder();
		System.out.println(a);
	}

}
