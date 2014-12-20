package com.hightech.carcare.ads.service;

import java.util.List;

import com.hightech.carcare.ads.model.RotatingAds;
import com.hightech.carcare.util.Pagination;

public interface RotatingAdsManagerService {

	/**
	 * 保存广告
	 * @param rotatingAds
	 * @return
	 */
	RotatingAds save(RotatingAds rotatingAds);
	
	/**
	 * 更新广告
	 * @param rotatingAds
	 * @return
	 */
	RotatingAds update(RotatingAds rotatingAds);
	
	/**
	 * 删除广告
	 * @param id
	 */
	void delete(Long id);
	
	/**
	 * 删除广告
	 * @param rotatingAds
	 */
	void delete(RotatingAds rotatingAds);
	
	/**
	 * 根据id获取广告
	 * @param id
	 * @return
	 */
	RotatingAds findRotatingAdsById(Long id);
	
	/**
	 * 根据广告类型获取广告列表
	 * @param type
	 * @return
	 */
	List<RotatingAds> findRotatingAdsesByType(Integer type);
	
	/**
	 * 获取分页广告地址
	 * @param rotatingAds
	 * @param pagination
	 * @return
	 */
	Pagination<RotatingAds> findOnePageRotatingAds(RotatingAds rotatingAds,
			Pagination<RotatingAds> pagination);
	
	/**
	 * 广告总数量
	 * @param rotatingAds
	 * @param rotatingAds
	 * @return
	 */
	Long findRotatingAdsTotalSize(RotatingAds rotatingAds);
	
	/**
	 * 获取所有广告图片
	 * @return
	 */
	List<RotatingAds> findAllRotatingAdses();
}
