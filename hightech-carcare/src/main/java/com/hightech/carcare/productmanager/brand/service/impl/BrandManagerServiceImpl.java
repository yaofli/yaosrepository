package com.hightech.carcare.productmanager.brand.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.productmanager.brand.dao.BrandManagerDao;
import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.model.BrandDict;
import com.hightech.carcare.productmanager.brand.service.BrandManagerService;
import com.hightech.carcare.util.Pagination;

@Service("brandManagerService")
public class BrandManagerServiceImpl implements BrandManagerService {
	@Autowired(required=true)
	@Qualifier("brandManagerDao") 
	BrandManagerDao brandManagerDao;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void save(Brand brand) {
		brandManagerDao.save(brand);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void update(Brand brand) {
		brandManagerDao.update(brand);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Long id) {
		brandManagerDao.delete(id);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Brand brand) {
		brandManagerDao.delete(brand);
	}

	@Override
	public Brand fetchOneBrandById(Long id) {
		return brandManagerDao.fetchOneBrandById(id);
	}

	@Override
	public Brand fetchOneBrandByBrandCode(Long brandcode) {
		return brandManagerDao.fetchOneBrandByBrandCode(brandcode);
	}

	@Override
	public List<Brand> fetchAllBrands() {
		return brandManagerDao.fetchAllBrands();
	}

	@Override
	public List<Brand> fetchBrandsOfOnePage(Brand brand, int pageSize,
			int currentPage) {
		return brandManagerDao.fetchBrandsOfOnePage(brand, pageSize, currentPage);
	}

	@Override
	public int totalBrandsSize(Brand brand) {
		return brandManagerDao.totalBrandsSize(brand);
	}

	@Override
	public Pagination<Brand> findOnePageBrands(Brand brand, Pagination<Brand> pagination) {
		return this.brandManagerDao.findOnePageBrands(brand, pagination);
	}

	@Override
	public List<BrandDict> findAllBrandDicts() {
		return this.brandManagerDao.findAllBrandDicts();
	}
	
}
