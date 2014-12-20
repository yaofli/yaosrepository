package com.hightech.carcare.productmanager.product.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.productmanager.product.dao.ProductManagerDao;
import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.productmanager.product.service.ProductManagerService;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Service("productManagerService")
public class ProductManagerServiceImpl implements ProductManagerService {
	@Autowired(required=true)
	@Qualifier("productManagerDao") 
	ProductManagerDao productManagerDao;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void save(Product product) {
		productManagerDao.save(product);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void update(Product product) {
		productManagerDao.update(product);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Long id) {
		Product product = this.productManagerDao.findProductById(id);
		if(product!=null&&StringUtil.isNotEmpty(product.getThumbnail())){
			File file = new File(product.getThumbnail());
			if(file.exists()){
				file.delete();
			}
		}
		productManagerDao.delete(id);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(String productno) {
		Product product = this.productManagerDao.findProductByProductno(productno);
		if(product!=null&&StringUtil.isNotEmpty(product.getThumbnail())){
			File file = new File(product.getThumbnail());
			if(file.exists()){
				file.delete();
			}
		}
		productManagerDao.delete(productno);
	}

	@Override
	public Product findProductById(Long id) {
		return productManagerDao.findProductById(id);
	}

	@Override
	public List<Product> findProductsByCategory(String incategory) {
		return productManagerDao.findProductsByCategory(incategory);
	}

	@Override
	public Product findProductByProductno(String productno) {
		return productManagerDao.findProductByProductno(productno);
	}

	@Override
	public Pagination<Product> findOnePageProducts(Product product,
			Pagination<Product> pagination) {
		return productManagerDao.findOnePageProducts(product, pagination);
	}

	@Override
	public List<List<Product>> findProductsByCategories(String[] categories) {
		List<List<Product>> categoryProducts = new ArrayList<List<Product>>();
		if(categories!=null&&categories.length>0){
			for(String incategory:categories){
				List<Product> products = this.findProductsByCategory(incategory);
				if(products!=null){
					categoryProducts.add(products);
				}
			}
		}
		return categoryProducts;
	}

	@Override
	public List<List<Product>> findPagedProductsByCategories(String[] categories,int startRow,int maxRow){
		List<List<Product>> categoryProducts = new ArrayList<List<Product>>();
		if(categories!=null&&categories.length>0){
			for(String incategory:categories){
				List<Product> products = this.productManagerDao.findPagedProductsByCategory(incategory, startRow, maxRow);
				if(products!=null){
					categoryProducts.add(products);
				}
			}
		}
		return categoryProducts;
	}
}
