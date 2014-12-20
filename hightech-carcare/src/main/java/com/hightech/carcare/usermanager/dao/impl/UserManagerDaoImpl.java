package com.hightech.carcare.usermanager.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.hightech.carcare.register.model.User;
import com.hightech.carcare.usermanager.dao.UserManagerDao;

@Repository("userManagerDao")  
public class UserManagerDaoImpl implements UserManagerDao {

	@PersistenceContext
	EntityManager em;
	
	@Override
	public List<User> findOnePageUsers(User user, int currentSize, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findOneUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findOneUserById(Long id) {
		return em.find(User.class, id);
	}

	@Override
	public User findOneUserByUsername(String username) {
		String qlString = " from User u where u.username = ?" ;
		TypedQuery<User> query = em.createQuery(qlString, User.class);
		query.setParameter("username", username);
		return query.getSingleResult();
	}

	@Override
	public User findOneUserByEmail(String email) {
		String qlString = " from User u where u.email = ?" ;
		TypedQuery<User> query = em.createQuery(qlString, User.class);
		query.setParameter("email", email);
		return query.getSingleResult();
	}

	@Override
	public void deleteOneUser(Long id) {
		User user = findOneUserById(id);
		em.remove(user);
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}

}
