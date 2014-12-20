package com.hightech.carcare.productmanager.product.service;

import java.util.List;

import com.hightech.carcare.productmanager.product.model.Product;
import com.hightech.carcare.util.Pagination;

public interface ProductManagerService {
	/**
	 * 新增产品
	 * @param product
	 */
	void save(Product product);
	
	/**
	 * 更新产品
	 * @param product
	 */
	void update(Product product);
	
	/**
	 * 根据产品ID删除产品
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 根据产品编号删除产品
	 * @param productno
	 */
	void delete(String productno);
	
	/**
	 * 根据ID获取产品信息
	 * @param id
	 * @return
	 */
	Product findProductById(Long id);
	
	/**
	 * 根据产品分类获取产品信息
	 * @param incategory
	 * @return
	 */
	List<Product> findProductsByCategory(String incategory);
	
	/**
	 * 根据分类获取分类下产品
	 * @param categories
	 * @return
	 */
	List<List<Product>> findProductsByCategories(String[] categories);
	
	/**
	 * 根据分类获取分类下产品
	 * @param categories
	 * @return
	 */
	List<List<Product>> findPagedProductsByCategories(String[] categories,int startRow,int maxRow);
	
	/**
	 * 根据产品编号获取产品信息
	 * @param productno
	 * @return
	 */
	Product findProductByProductno(String productno);
	
	/**
	 * 查询分页商品
	 * @param product
	 * @param pagination
	 * @return
	 */
	Pagination<Product> findOnePageProducts(Product product,Pagination<Product> pagination);

}
