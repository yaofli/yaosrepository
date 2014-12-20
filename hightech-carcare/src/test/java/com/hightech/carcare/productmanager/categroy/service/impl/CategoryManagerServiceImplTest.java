package com.hightech.carcare.productmanager.categroy.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.productmanager.categroy.service.CategoryManagerService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/app-context.xml")
public class CategoryManagerServiceImplTest {

	@Inject
	private CategoryManagerService categoryManagerService;
	
	@Test
	public void testSave() {
		Category c = new Category();
		c.setCode("10000");
		c.setEnabled(true);
		c.setImportentflag(false);
		c.setParentcode("0");
		c.setTreename("中国一定强");
		c.setUri("/abc");
		categoryManagerService.save(c);
	}
	
	@Test
	public void testFindCategoryBycode(){
		testSave();
		List<Category> list = categoryManagerService.findCategoriesByParentcode("0");
		for(Category c:list){
			c.setImportentflag(false);
			categoryManagerService.update(c);
			System.out.println(c.getImportentflag());
			
		}
		
		
	}

}
