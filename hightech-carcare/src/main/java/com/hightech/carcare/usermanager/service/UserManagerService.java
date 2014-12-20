package com.hightech.carcare.usermanager.service;

import java.util.List;

import com.hightech.carcare.register.model.User;

public interface UserManagerService {

	/**
	 * 根据用户信息获取一页用户
	 * @param user
	 * @param currentSize
	 * @param pageSize
	 * @return
	 */
	List<User> findOnePageUsers(User user,int currentSize,int pageSize);
	
	/**
	 * 根据用户信息获取一个用户
	 * @param user
	 * @return
	 */
	User findOneUser(User user);
	
	/**
	 * 根据用户信息ID获取用户信息
	 * @param id
	 * @return
	 */
	User findOneUserById(Long id);
	
	/**
	 * 根据用户名称获取用户信息
	 * @param username
	 * @return
	 */
	User findOneUserByUsername(String username);
	
	/**
	 * 根据用户邮箱获取用户信息
	 * @param email
	 * @return
	 */
	User findOneUserByEmail(String email);
	
	/**
	 * 删除一个用户
	 * @param id
	 * @return
	 */
	void deleteOneUser(Long id);
}
