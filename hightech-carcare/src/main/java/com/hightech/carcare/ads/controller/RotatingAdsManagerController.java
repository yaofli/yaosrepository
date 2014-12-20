package com.hightech.carcare.ads.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.hightech.carcare.ads.model.RotatingAds;
import com.hightech.carcare.ads.service.RotatingAdsManagerService;
import com.hightech.carcare.controller.BaseController;
import com.hightech.carcare.util.ConfigFile;
import com.hightech.carcare.util.HttpUtil;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.PictureZoom;
import com.hightech.carcare.util.StringUtil;

@Controller
public class RotatingAdsManagerController extends BaseController<RotatingAds>{
	private static final Logger logger = LoggerFactory
			.getLogger(RotatingAdsManagerController.class);
	@Inject
	private RotatingAdsManagerService rotatingAdsManagerService;
	
	
	@RequestMapping(value = "/admin/rotatingadsmanager", method = RequestMethod.GET)
	public ModelAndView toList(){
		logger.info("进入滚动广告管理列表页面");
		ModelAndView mnv = new ModelAndView();
		mnv.setViewName("rotatingadsmanager/list");
		return mnv;
	}
	
	
	@RequestMapping(value = "/admin/rotatingadsmanager/", method = RequestMethod.POST)
	public void list(HttpServletRequest req, HttpServletResponse resp){
		logger.info("进入广告图片管理页面");
		int page = HttpUtil.getRequestInt(req, "page", 1);
		int rows = HttpUtil.getCookieInteger(req, "rows", 10);
		Pagination<RotatingAds> pagination = rotatingAdsManagerService.findOnePageRotatingAds(null, new Pagination<RotatingAds>(page,rows));
		super.write(pagination.getTotal(), pagination.getObject(), resp);
	}
	
	
	@RequestMapping(value = "/admin/rotatingadsmanager/add/", method = RequestMethod.GET)
	public ModelAndView toAdd(){
		ModelAndView mv = new ModelAndView();
		logger.info("进入广告图片新增页面");
		mv.setViewName("rotatingadsmanager/add");
		return mv;
	}
	
	@RequestMapping(value = "/admin/rotatingadsmanager/add/", method = RequestMethod.POST)
	@ResponseBody
	public void add(HttpServletRequest req,HttpServletResponse resp){
		logger.info("广告图片信息新增开始");
		RotatingAds rotatingAds =  new RotatingAds();
		
		MultipartHttpServletRequest  mpr = (MultipartHttpServletRequest)req;
		MultipartFile  file= mpr.getFile("imageurl");
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		rotatingAds.setAlt(req.getParameter("alt"));
		rotatingAds.setAorder(Integer.parseInt(req.getParameter("aorder")));
		rotatingAds.setEnabled(Boolean.parseBoolean(req.getParameter("enabled")));
		rotatingAds.setType(Integer.parseInt(req.getParameter("type")));
		rotatingAds.setUrl(null);
		try {
			rotatingAds.setImageurl(buildAds(file.getBytes(),file.getOriginalFilename()));
		} catch (IOException e) {
			logger.error("生成广告图出错！",e);
		}
		this.rotatingAdsManagerService.save(rotatingAds);
		result.put("success",true);
		result.put("result","新增广告图片成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/rotatingadsmanager/edit/{id}", method = RequestMethod.GET)
	public ModelAndView toEdit(@PathVariable Long id){
		ModelAndView mv = new ModelAndView();
		logger.info("进入广告图片编辑页面");
		RotatingAds rotatingAds = rotatingAdsManagerService.findRotatingAdsById(id);
		mv.addObject("product", rotatingAds);
		mv.setViewName("rotatingadsmanager/edit");
		return mv;
	}
	
	@RequestMapping(value = "/admin/rotatingadsmanager/edit/{id}", method = RequestMethod.POST)
	@ResponseBody
	public void edit(HttpServletRequest req,HttpServletResponse resp) {
		logger.info("广告图片信息编辑开始");
		String id = req.getParameter("id");
		RotatingAds rotatingAds =  null;
		if(StringUtil.isNotEmpty(id)){
			rotatingAds = rotatingAdsManagerService.findRotatingAdsById(Long.parseLong(id));
		}
		MultipartHttpServletRequest  mpr = (MultipartHttpServletRequest)req;
		MultipartFile  file= mpr.getFile("productimage");
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		 
		rotatingAds.setAlt(req.getParameter("alt"));
		rotatingAds.setAorder(Integer.parseInt(req.getParameter("aorder")));
		rotatingAds.setEnabled(Boolean.parseBoolean(req.getParameter("enabled")));
		rotatingAds.setType(Integer.parseInt(req.getParameter("type")));
		rotatingAds.setUrl(null);
		try {
			if(file!=null){
				rotatingAds.setImageurl(buildAds(file.getBytes(),file.getOriginalFilename()));
			}
		} catch (IOException e) {
			logger.error("生成广告图出错！",e);
		}
		rotatingAdsManagerService.update(rotatingAds);
		result.put("success",true);
		result.put("result","修改广告图片成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/rotatingadsmanager/delete/{id}", method = RequestMethod.GET)
	public void delete(ModelAndView mv ,@PathVariable Long id,HttpServletResponse resp) {
		logger.info("删除开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		this.rotatingAdsManagerService.delete(id);
		result.put("success",true);
		result.put("msg","删除广告图片成功！");
		super.write(result,resp);
	}
	
	
	/**
	 * 创建缩略图
	 * @param file
	 * @return
	 */
	public String buildAds(byte[] bytes,String fileName){
		String adsPath  = ConfigFile.CONFIG.getValue("AdsImageDir");
		File file = new File(adsPath);
		if(!file.exists()){
			file.mkdir();
		}
		String path = adsPath+fileName;
		file = new File(path);
		BufferedImage image =  PictureZoom.zoom(bytes,false);
		PictureZoom.writeImageFile(file,image,80,null);
		return path;
	}
}
