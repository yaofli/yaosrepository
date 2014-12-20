package com.hightech.carcare.productmanager.product.controller;

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
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.hightech.carcare.controller.BaseController;
import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.productmanager.product.service.ProductManagerService;
import com.hightech.carcare.util.ConfigFile;
import com.hightech.carcare.util.HttpUtil;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.PictureZoom;
import com.hightech.carcare.util.StringUtil;

@Controller
@Component
public class ProductManagerController extends BaseController<Product>{
	private static final Logger logger = LoggerFactory
			.getLogger(ProductManagerController.class);
	@Inject
	private ProductManagerService productManagerService;
	
	
	@RequestMapping(value = "/admin/productmanager", method = RequestMethod.GET)
	public ModelAndView toList(){
		logger.info("进入产品管理列表页面");
		ModelAndView mnv = new ModelAndView();
		mnv.setViewName("productmanager/list");
		return mnv;
	}
	
	
	@RequestMapping(value = "/admin/productmanager/", method = RequestMethod.POST)
	public void list(HttpServletRequest req, HttpServletResponse resp){
		logger.info("进入商品管理页面");
		int page = HttpUtil.getRequestInt(req, "page", 1);
		int rows = HttpUtil.getCookieInteger(req, "rows", 10);
		Pagination<Product> pagination = productManagerService.findOnePageProducts(null, new Pagination<Product>(page,rows));
		super.write(pagination.getTotal(), pagination.getObject(), resp);
	}
	
	
	@RequestMapping(value = "/admin/productmanager/add/", method = RequestMethod.GET)
	public ModelAndView toAdd(){
		ModelAndView mv = new ModelAndView();
		logger.info("进入产品新增页面");
		mv.setViewName("productmanager/add");
		return mv;
	}
	
	@RequestMapping(value = "/admin/productmanager/add/", method = RequestMethod.POST)
	@ResponseBody
	public void add(HttpServletRequest req,HttpServletResponse resp){
		logger.info("产品信息新增开始");
		Product product =  new Product();
		
		MultipartHttpServletRequest  mpr = (MultipartHttpServletRequest)req;
		MultipartFile  file= mpr.getFile("productimage");
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		try {
			product.setThumbnail(buildThumbnail(file.getBytes(),file.getOriginalFilename()));
		} catch (IOException e) {
			logger.error("生成缩略图出错！",e);
		}
		product.setBrandId(Long.parseLong(req.getParameter("brandId")));
		product.setDescription(req.getParameter("description"));
		product.setIncategory (req.getParameter("incategory"));
		product.setProductname(req.getParameter("productname"));
		product.setProductimage (req.getParameter("productimage"));
		product.setProductno(req.getParameter("productno"));
		product.setUnitprice(Double.parseDouble(req.getParameter("unitprice")));
		product.setRemark(req.getParameter("remark"));
		product.setSpecialdesc(req.getParameter("specialdesc"));
		productManagerService.save(product);
		logger.info(product.getDescription());
		result.put("success",true);
		result.put("result","新增商品成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/productmanager/edit/{id}", method = RequestMethod.GET)
	public ModelAndView toEdit(@PathVariable Long id){
		ModelAndView mv = new ModelAndView();
		logger.info("进入产品编辑页面");
		Product product = productManagerService.findProductById(id);
		mv.addObject("product", product);
		mv.setViewName("productmanager/edit");
		return mv;
	}
	
	@RequestMapping(value = "/admin/productmanager/edit/{id}", method = RequestMethod.POST)
	@ResponseBody
	public void edit(HttpServletRequest req,HttpServletResponse resp) {
		logger.info("产品信息编辑开始");
		String id = req.getParameter("id");
		Product product =  null;
		if(StringUtil.isNotEmpty(id)){
			product = this.productManagerService.findProductById(Long.parseLong(id));
		}
		MultipartHttpServletRequest  mpr = (MultipartHttpServletRequest)req;
		MultipartFile  file= mpr.getFile("productimage");
		
		Map<String,Object> result = new HashMap<String,Object>(2);
		try {
			product.setThumbnail(buildThumbnail(file.getBytes(),file.getOriginalFilename()));
		} catch (IOException e) {
			logger.error("生成缩略图出错！",e);
		}
		
		product.setBrandId(Long.parseLong(req.getParameter("brandId")));
		product.setDescription(req.getParameter("description"));
		product.setIncategory (req.getParameter("incategory"));
		product.setProductname(req.getParameter("productname"));
		product.setProductimage (req.getParameter("productimage"));
		product.setProductno(req.getParameter("productno"));
		product.setUnitprice(Double.parseDouble(req.getParameter("unitprice")));
		product.setRealprice(Double.parseDouble(req.getParameter("realprice")));
		product.setRemark(req.getParameter("remark"));
		product.setSpecialdesc(req.getParameter("specialdesc"));
		productManagerService.update(product);
		logger.info(product.getDescription());
		result.put("success",true);
		result.put("result","修改成功！");
		super.write(result,resp);
	}
	
	@RequestMapping(value = "/admin/productmanager/delete/{id}", method = RequestMethod.GET)
	public void delete(ModelAndView mv ,@PathVariable Long id,HttpServletResponse resp) {
		logger.info("删除开始");
		Map<String,Object> result = new HashMap<String,Object>(2);
		this.productManagerService.delete(id);
		result.put("success",true);
		result.put("msg","删除商品成功！");
		super.write(result,resp);
	}
	
	
	/**
	 * 创建缩略图
	 * @param file
	 * @return
	 */
	public String buildThumbnail(byte[] bytes,String fileName){
		String thumbnailPath  = ConfigFile.CONFIG.getValue("productImageDir");
		File file = new File(thumbnailPath);
		if(!file.exists()){
			file.mkdir();
		}
		String path = thumbnailPath +"thumbnail_"+fileName;
		file = new File(path);
		BufferedImage thumbnail =  PictureZoom.zoom(bytes,true);
		PictureZoom.writeImageFile(file,thumbnail,80,null);
		return path;
	}
}
