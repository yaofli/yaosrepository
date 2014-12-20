package com.hightech.carcare.register.service.impl;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.hightech.carcare.register.model.User;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/app-context.xml")
public class RegisterServiceImplTest {

	@PersistenceContext
	EntityManager em;
	
	@Test
	public void testRegister() {
		User user = new User();
		user.setUsername("zhangsan");
		user.setEmail("zhangsan@126.com");
		user.setPassword("123456");
		user.setEnabled(true);
		user.setRealname("张三");
		user.setRegistertime(new Date());
		user.setDeleteflag(false);
		user.setLastupdatetime(new Date());
		em.persist(user);
	}

}
