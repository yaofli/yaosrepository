package com.hightech.carcare.productmanager.categroy.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hightech.carcare.controller.BaseController;
import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.productmanager.categroy.service.CategoryManagerService;
import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.productmanager.product.service.ProductManagerService;
import com.hightech.carcare.util.HttpUtil;
import com.hightech.carcare.util.Pagination;

@Controller
public class CategoryManagerController extends BaseController<Category> {
	private static final Logger logger = LoggerFactory
			.getLogger(CategoryManagerController.class);
	
	@Inject
	private CategoryManagerService categoryManagerService;
	
	@Inject
	private ProductManagerService productManagerService;
	
	
	@RequestMapping(value = "/admin/categorymanager", method = RequestMethod.GET)
	public ModelAndView tolist(){
		logger.info("进入菜单管理页面");
		ModelAndView mnv = new ModelAndView();
		List<Category> list = categoryManagerService.findAllCategories();
		mnv.addObject("list", list);
		mnv.setViewName("categorymanager/list");
		return mnv;
	}
	
	@RequestMapping(value = "/admin/categorymanager/", method = RequestMethod.POST)
	public void list(HttpServletRequest req, HttpServletResponse resp) {
		int page = HttpUtil.getRequestInt(req, "page", 1);
		int rows = HttpUtil.getCookieInteger(req, "rows", 10);
		Pagination<Category> pagination = categoryManagerService
				.findOnePageCategories(null, new Pagination<Category>(page,
						rows));
		super.write(pagination.getTotal(), pagination.getObject(), resp);
	}
	
	@RequestMapping(value = "/incategory/", method = RequestMethod.POST)
	public void incategory(HttpServletResponse resp){
		List<Category> list = categoryManagerService.findAllCategories();
		super.write(list, resp);
	}
	
	@RequestMapping(value = "/admin/categorymanager/add/", method = RequestMethod.GET)
	public ModelAndView toAdd(@ModelAttribute("cg") Category category){
		ModelAndView mv = new ModelAndView();
		logger.info("进入分类新增页面");
		
		mv.addObject("category", category);
		mv.setViewName("categorymanager/add");
		return mv;
	}
	
	@RequestMapping(value = "/admin/categorymanager/add/", method = RequestMethod.POST)
	@ResponseBody
	public void add(@ModelAttribute("category") Category category,HttpServletResponse resp){
		logger.info("进入分类新增页面");
		Map<String,Object> result = new HashMap<String,Object>(2);
		if(category!=null){
			categoryManagerService.save(category);
		}
		result.put("success",true);
		result.put("result","新增成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/categorymanager/edit/{id}", method = RequestMethod.GET)
	public ModelAndView toEdit(@PathVariable Long id){
		ModelAndView mv = new ModelAndView();
		logger.info("进入菜单编辑页面");
		Category category = categoryManagerService.findCategoryById(id);
		mv.addObject("category", category);
		mv.setViewName("categorymanager/edit");
		return mv;
	}
	
	@RequestMapping(value = "/admin/categorymanager/edit/{id}", method = RequestMethod.POST)
	@ResponseBody
	public void edit(@ModelAttribute("category") Category category,HttpServletResponse resp) throws IOException {
		logger.info("编辑开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		categoryManagerService.update(category);
		result.put("success",true);
		result.put("result","编辑成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/categorymanager/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public void delete(ModelAndView mv ,@PathVariable Long id,HttpServletResponse resp) {
		logger.info("删除开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		boolean hasProducts = false;
		
		Category category = categoryManagerService.findCategoryById(id);
		if(category!=null){
			List<Product> products = productManagerService.findProductsByCategory(category.getCode());
			if(products!=null&&products.size()>0){
				hasProducts = true;
			}
		}
		
		if(!hasProducts){
			categoryManagerService.delete(id);
			result.put("success",true);
			result.put("msg","删除分类成功！");
		}else{
			result.put("success",false);
			result.put("msg","请删除该分类下产品后执行该操作！");
		}
		super.write(result,resp);
	}
}
