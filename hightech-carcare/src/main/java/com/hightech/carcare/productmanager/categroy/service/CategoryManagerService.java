package com.hightech.carcare.productmanager.categroy.service;

import java.util.List;

import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.util.Pagination;

public interface CategoryManagerService {
	/**
	 * 保存产品分类
	 * @param category
	 */
	void save(Category category);
	
	/**
	 * 更新产品分类
	 * @param category
	 */
	void update(Category category);
	
	/**
	 * 根据ID删除产品分类
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 根据产品分类节点code删除该节点下所有子节点
	 * @param parentcode
	 */
	void deleteSubCategory(String parentcode);
	
	/**
	 * 根据分类条件及分页信息获取分类列表
	 * @param category
	 * @param pagination
	 * @return
	 */
	Pagination<Category> findOnePageCategories(Category category,Pagination<Category> pagination);
	
	/**
	 * 查询所有分类
	 * @return
	 */
	List<Category> findAllCategories();
	
	/**
	 * 根据父节点code获取所有子节点分类
	 * @param parentcode
	 * @return
	 */
	List<Category> findCategoriesByParentcode(String parentcode);
	
	/**
	 * 根据分类ID获取分类
	 * @param id
	 * @return
	 */
	Category findCategoryById(Long id);
	
}
