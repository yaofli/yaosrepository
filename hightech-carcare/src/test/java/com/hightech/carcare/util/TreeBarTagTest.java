package com.hightech.carcare.util;

import java.io.PrintStream;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.service.BrandManagerService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/app-context.xml")
public class TreeBarTagTest {

	@Inject
	private BrandManagerService brandManagerService;
	
	@Test
	public void testDoStartTag() {
		List<Brand> menus = brandManagerService.fetchAllBrands();
        PrintStream out = System.out;
	}

}
