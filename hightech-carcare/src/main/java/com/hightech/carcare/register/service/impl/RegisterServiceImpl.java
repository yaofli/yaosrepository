package com.hightech.carcare.register.service.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.register.model.ShoppingUserInfo;
import com.hightech.carcare.register.model.User;
import com.hightech.carcare.register.service.RegisterService;

@Service
public class RegisterServiceImpl implements RegisterService {

	@PersistenceContext
	EntityManager em;

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void register(User user) {
		em.persist(user);
	}

	@Override
	public void registerShoppingUserInfo(ShoppingUserInfo shoppingUserInfo) {
		em.persist(shoppingUserInfo);
	}

}
