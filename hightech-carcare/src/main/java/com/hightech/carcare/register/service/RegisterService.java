package com.hightech.carcare.register.service;

import com.hightech.carcare.register.model.ShoppingUserInfo;
import com.hightech.carcare.register.model.User;

public interface RegisterService {
	/**
	 * 注册登录用户信息
	 * @param user
	 * @return
	 */
	void register(User user);
	
	
	/**
	 * 注册购物用户信息
	 * @param shoppingUserInfo
	 * @return
	 */
	void registerShoppingUserInfo(ShoppingUserInfo shoppingUserInfo);

}
