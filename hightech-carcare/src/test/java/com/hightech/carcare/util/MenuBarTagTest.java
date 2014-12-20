package com.hightech.carcare.util;

import java.io.PrintStream;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.menumanager.service.MenuManagerService;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/app-context.xml")
public class MenuBarTagTest {
	@Inject
	private MenuManagerService menuManagerService;
	
	@Test
	public void testDoStartTag() {
		List<Menu> menus = menuManagerService.findAllMenus();
        PrintStream out = System.out;
        for(Menu m : menus){
        	 out.println("<div class='abc'> <a href='"+m.getUri()+"'>");
             out.println(m.getMenuname());
             out.println("</a></div>");
        }
	}

}
