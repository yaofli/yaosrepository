package com.hightech.carcare.productmanager.brand.controller;

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
import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.model.BrandDict;
import com.hightech.carcare.productmanager.brand.service.BrandManagerService;
import com.hightech.carcare.util.HttpUtil;
import com.hightech.carcare.util.Pagination;

@Controller
public class BrandManagerController extends BaseController<Brand>{
	private static final Logger logger = LoggerFactory
			.getLogger(BrandManagerController.class);
	
	@Inject
	private BrandManagerService brandManagerService;
	
	@RequestMapping(value = "/brands/", method = RequestMethod.POST)
	public void brands( HttpServletResponse resp){
		List<BrandDict> brands = brandManagerService.findAllBrandDicts();
		super.write(brands, resp);
	}
	
	@RequestMapping(value = "/admin/brandmanager", method = RequestMethod.GET)
	public ModelAndView tolist(){
		logger.info("进入品牌管理页面");
		ModelAndView mnv = new ModelAndView();
		mnv.setViewName("brandmanager/list");
		return mnv;
	}
	
	
	
	@RequestMapping(value = "/admin/brandmanager/", method = RequestMethod.POST)
	public void list(HttpServletRequest req, HttpServletResponse resp){
		logger.info("进入品牌管理页面");
		int page = HttpUtil.getRequestInt(req, "page", 1);
		int rows = HttpUtil.getCookieInteger(req, "rows", 10);
		Pagination<Brand> pagination = brandManagerService.findOnePageBrands(null, new Pagination<Brand>(page,rows));
		super.write(pagination.getTotal(), pagination.getObject(), resp);
	}
	
	@RequestMapping(value = "/admin/categorymanager/add", method = RequestMethod.GET)
	public ModelAndView toAdd(HttpServletRequest request){
		ModelAndView mv = new ModelAndView();
		logger.info("进入品牌新增页面");
		mv.setViewName("brandmanager/add");
		return mv;
	}
	
	@RequestMapping(value = "/admin/brandmanager/add/", method = RequestMethod.POST)
	@ResponseBody
	public void add(@ModelAttribute("brand") Brand brand,HttpServletResponse resp){
		logger.info("执行品牌新增");
		Map<String,Object> result = new HashMap<String,Object>(2);
		if(brand!=null){
			brandManagerService.save(brand);
		}
		result.put("success",true);
		result.put("result","新增成功！");
		this.write(result, resp);
	}
	
	@RequestMapping(value = "/admin/brandmanager/edit/{id}", method = RequestMethod.GET)
	public ModelAndView toEdit(@PathVariable Long id){
		ModelAndView mv = new ModelAndView();
		logger.info("进入品牌编辑页面");
		Brand brand = brandManagerService.fetchOneBrandById(id);
		mv.addObject("brand", brand);
		mv.setViewName("brandmanager/edit");
		return mv;
	}
	
	@RequestMapping(value = "/admin/brandmanager/edit/{id}", method = RequestMethod.POST)
	@ResponseBody
	public void edit(@ModelAttribute("brand") Brand brand,HttpServletResponse resp) {
		logger.info("编辑开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		brandManagerService.update(brand);
		result.put("success",true);
		result.put("result","编辑成功！");
		this.write(result, resp);
	}
	
	@RequestMapping(value = "/admin/brandmanager/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public void delete(ModelAndView mv ,@PathVariable Long id,HttpServletResponse resp) {
		logger.info("删除开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		brandManagerService.delete(id);
		result.put("success",true);
		result.put("msg","删除分类成功！");
		this.write(result, resp);
	}
}
