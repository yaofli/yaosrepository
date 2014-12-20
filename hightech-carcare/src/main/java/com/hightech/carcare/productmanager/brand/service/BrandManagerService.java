package com.hightech.carcare.productmanager.brand.service;

import java.util.List;

import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.model.BrandDict;
import com.hightech.carcare.util.Pagination;

public interface BrandManagerService {

	/**
	 * 保存品牌
	 * @param brand
	 */
	void save(Brand brand);
	
	/**
	 * 更新品牌
	 * @param brand
	 */
	void update(Brand brand);
	
	/**
	 * 根据id删除品牌
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 根据品牌对象删除品牌
	 * @param brand
	 */
	void delete(Brand brand);
	
	/**
	 * 根据品牌id获取品牌对象
	 * @param id
	 * @return
	 */
	Brand fetchOneBrandById(Long id);
	
	/**
	 * 根据品牌编号获取品牌对象
	 * @param brandcode
	 * @return
	 */
	Brand fetchOneBrandByBrandCode(Long brandcode);
	
	/**
	 * 获取所有品牌对象
	 * @return
	 */
	List<Brand> fetchAllBrands();
	
	/**
	 * 根据品牌对象获取分页列表
	 * @param brand
	 * 		品牌对象查询条件
	 * @param pageSize
	 * 		页面大小
	 * @param currentPage
	 * 		当前页面
	 * @return
	 */
	List<Brand> fetchBrandsOfOnePage(Brand brand,int pageSize,int currentPage);
	
	/**
	 * 根据品牌对象获返回总数
	 * @param brand
	 * @return
	 */
	int totalBrandsSize(Brand brand);
	
	
	/**
	 * 根据品牌查询条件获取品牌分页列表
	 * @param menu
	 * @param pagination
	 * @return
	 */
	Pagination<Brand> findOnePageBrands(Brand brand,Pagination<Brand> pagination);
	
	/**
	 * 
	 * @return
	 */
	List<BrandDict> findAllBrandDicts();
	
}
