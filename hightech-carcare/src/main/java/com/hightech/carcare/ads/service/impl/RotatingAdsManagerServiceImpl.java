package com.hightech.carcare.ads.service.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.ads.dao.RotatingAdsManagerDao;
import com.hightech.carcare.ads.model.RotatingAds;
import com.hightech.carcare.ads.service.RotatingAdsManagerService;
import com.hightech.carcare.util.Pagination;
import com.hightech.carcare.util.StringUtil;

@Service("rotatingAdsManagerService")
public class RotatingAdsManagerServiceImpl implements RotatingAdsManagerService {

	@Autowired
	@Qualifier("rotatingAdsManagerDao") 
	RotatingAdsManagerDao rotatingAdsManagerDao;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public RotatingAds save(RotatingAds rotatingAds) {
		return rotatingAdsManagerDao.save(rotatingAds);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public RotatingAds update(RotatingAds rotatingAds) {
		return rotatingAdsManagerDao.update(rotatingAds);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(Long id) {
		RotatingAds rotatingAds = this.rotatingAdsManagerDao.findRotatingAdsById(id);
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getImageurl())){
			File file = new File(rotatingAds.getImageurl());
			if(file.exists()){
				file.delete();
			}
		}
		rotatingAdsManagerDao.delete(rotatingAds);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void delete(RotatingAds rotatingAds) {
		if(rotatingAds!=null&&StringUtil.isNotEmpty(rotatingAds.getImageurl())){
			File file = new File(rotatingAds.getImageurl());
			if(file.exists()){
				file.delete();
			}
		}
		rotatingAdsManagerDao.delete(rotatingAds);
	}

	@Override
	public RotatingAds findRotatingAdsById(Long id) {
		return rotatingAdsManagerDao.findRotatingAdsById(id);
	}

	@Override
	public List<RotatingAds> findRotatingAdsesByType(Integer type) {
		return rotatingAdsManagerDao.findRotatingAdsesByType(type);
	}

	@Override
	public Pagination<RotatingAds> findOnePageRotatingAds(
			RotatingAds rotatingAds, Pagination<RotatingAds> pagination) {
		return rotatingAdsManagerDao.findOnePageRotatingAds(rotatingAds, pagination);
	}

	@Override
	public Long findRotatingAdsTotalSize(RotatingAds rotatingAds) {
		return rotatingAdsManagerDao.findRotatingAdsTotalSize(rotatingAds);
	}

	@Override
	public List<RotatingAds> findAllRotatingAdses() {
		return rotatingAdsManagerDao.findAllRotatingAdses();
	}
 
}
