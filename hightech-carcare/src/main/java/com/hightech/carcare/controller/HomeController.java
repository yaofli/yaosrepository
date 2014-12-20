package com.hightech.carcare.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hightech.carcare.ads.model.RotatingAds;
import com.hightech.carcare.ads.service.RotatingAdsManagerService;
import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.productmanager.categroy.service.CategoryManagerService;
import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.productmanager.product.service.ProductManagerService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);

 
	private static final int START_PRODUCTS=0;
	
	private static final int MAX_PRODUCTS=4;
	
	@Inject
	CategoryManagerService categoryManagerService;
	
	@Inject
	ProductManagerService productManagerService;
	
	@Inject
	RotatingAdsManagerService rotatingAdsManagerService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(HttpServletRequest req) {
		logger.info("requesting home");
		
		initRotatingAdses(req);
		
		String[] categories_ = initCategories(req);
		 
		initCategoryProducts(req,categories_);
		
		 
		return "carcare";
	}

	/**
	 * 查询滚动广告
	 * @param req
	 */
	void initRotatingAdses(HttpServletRequest req){
		List<RotatingAds> rotatingAdses = rotatingAdsManagerService.findAllRotatingAdses();
		req.setAttribute("rotatingAdses", rotatingAdses);
	}
	
	/**
	 * 获取商品分类
	 * @param req
	 * @return
	 */
	String [] initCategories(HttpServletRequest req){
		List<Category> categories = categoryManagerService.findAllCategories();
		String[] categories_ = null;
		if(categories!=null){
			categories_ = new String[categories.size()];
			for(int i=0;i< categories.size();i++){
				categories_[i]=categories.get(i).getCode();
			}
		}
		req.setAttribute("categories", categories);
		return categories_;
	}
	
	/**
	 * 初始化商品信息
	 * @param req
	 * @param categories_
	 */
	void initCategoryProducts(HttpServletRequest req,String[] categories_){
		List<List<Product>> categoryProducts =  productManagerService.findPagedProductsByCategories(categories_,START_PRODUCTS,MAX_PRODUCTS);
		req.setAttribute("categoryProducts", categoryProducts);
	}
	
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/view/{productid}", method = RequestMethod.GET)
	public String view(@PathVariable Long productid,HttpServletRequest req) {
		Product product = productManagerService.findProductById(productid);
		req.setAttribute("product", product);
		
		String[] categories_ = initCategories(req);
		 
		initCategoryProducts(req,categories_);
		
		
		String [] categories = {product.getIncategory()};
		 
		List<List<Product>> products = this.productManagerService.findProductsByCategories(categories);
		
		req.setAttribute("products", products);
		
		return "/productmanager/view";
	}
}
