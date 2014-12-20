package com.hightech.carcare.menumanager.controller;

import java.util.HashMap;
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
import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.menumanager.service.MenuManagerService;
import com.hightech.carcare.util.HttpUtil;
import com.hightech.carcare.util.Pagination;

@Controller
public class MenuManagerController extends BaseController<Menu> {
	private static final Logger logger = LoggerFactory
			.getLogger(MenuManagerController.class);
	@Inject
	public MenuManagerService menuManagerService;
	
	
	@RequestMapping(value = "/admin/menumanager", method = RequestMethod.GET)
	public ModelAndView tolist(){
		logger.info("进入菜单管理页面");
		ModelAndView mnv = new ModelAndView();
		mnv.setViewName("menumanager/list");
		return mnv;
	}
	
	@RequestMapping(value = "/admin/menumanager/", method = RequestMethod.POST)
	public void list(HttpServletRequest req, HttpServletResponse resp){
		logger.info("进入菜单管理页面");
		int page = HttpUtil.getRequestInt(req, "page", 1);
		int rows = HttpUtil.getCookieInteger(req, "rows", 10);
		Pagination<Menu> pagination = menuManagerService
				.findOnePageMenus(null, new Pagination<Menu>(page,rows));
		super.write(pagination.getTotal(), pagination.getObject(), resp);
	}
	
	 
	
	@RequestMapping(value = "/admin/menumanager/add/", method = RequestMethod.GET)
	public ModelAndView toAdd(@ModelAttribute("menu") Menu menu){
		ModelAndView mv = new ModelAndView();
		logger.info("进入菜单新增页面");
		
		mv.addObject("menu", menu);
		mv.setViewName("menumanager/add");
		return mv;
	}
	
	@RequestMapping(value = "/admin/menumanager/add/", method = RequestMethod.POST)
	@ResponseBody
	public void add(ModelAndView mv,
			@ModelAttribute("menu") Menu menu,HttpServletResponse resp){
		logger.info("进入菜单新增页面");
		Map<String,Object> result = new HashMap<String,Object>(2);
		if(menu!=null){
			menuManagerService.save(menu);
		}
		result.put("success",true);
		result.put("result","新增成功！");
		super.write(result,resp);
	}
	
	
	@RequestMapping(value = "/admin/menumanager/edit/{id}", method = RequestMethod.GET)
	public ModelAndView toEdit(@PathVariable Long id){
		ModelAndView mv = new ModelAndView();
		logger.info("进入菜单编辑页面");
		Menu menu = menuManagerService.findMenuById(id);
		mv.addObject("menu", menu);
		mv.setViewName("menumanager/edit");
		return mv;
	}
	
	@RequestMapping(value = "/admin/menumanager/edit/{id}", method = RequestMethod.POST)
	@ResponseBody
	public void edit(ModelAndView mv,
			@ModelAttribute("menu") Menu menu,HttpServletResponse resp) {
		logger.info("编辑开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		menuManagerService.save(menu);
		result.put("success",true);
		result.put("result","编辑成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/menumanager/delete/{id}", method = RequestMethod.GET)
	public void delete(@PathVariable Long id,HttpServletResponse resp) {
		logger.info("删除开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		menuManagerService.delete(id);
		result.put("success",true);
		result.put("msg","删除菜单成功！");
		super.write(result,resp);
	}
}
