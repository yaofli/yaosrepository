package com.hightech.carcare.productmanager.categroy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.productmanager.categroy.dao.CategoryManagerDao;
import com.hightech.carcare.productmanager.categroy.model.Category;
import com.hightech.carcare.productmanager.categroy.service.CategoryManagerService;
import com.hightech.carcare.util.Pagination;

@Service("categoryManagerService")
public class CategoryManagerServiceImpl implements CategoryManagerService {

	@Autowired(required=true)
	@Qualifier("categoryManagerDao") 
	CategoryManagerDao categoryManagerDao;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void save(Category category) {
		categoryManagerDao.save(category);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void update(Category category) {
		categoryManagerDao.update(category);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Long id) {
		categoryManagerDao.delete(id);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void deleteSubCategory(String parentcode) {
		List<Category> categories = findCategoriesByParentcode(parentcode);
		for(Category c:categories){
			categoryManagerDao.delete(c.getId());
		}
	}

	@Override
	@Transactional(readOnly=true)
	public List<Category> findAllCategories() {
		return categoryManagerDao.findAllCategories();
	}

	@Override
	@Transactional(readOnly=true)
	public List<Category> findCategoriesByParentcode(String parentcode) {
		return categoryManagerDao.findCategoriesByParentcode(parentcode);
	}

	@Override
	@Transactional(readOnly=true)
	public Category findCategoryById(Long id) {
		return categoryManagerDao.findCategoryById(id);
	}

	
	@Override
	public Pagination<Category> findOnePageCategories(Category category,
			Pagination<Category> pagination) {
		return  categoryManagerDao.findOnePageCategories(category, pagination);
	}
}
