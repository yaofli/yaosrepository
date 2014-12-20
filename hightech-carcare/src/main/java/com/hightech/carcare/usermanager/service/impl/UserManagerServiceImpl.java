package com.hightech.carcare.usermanager.service.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hightech.carcare.register.model.User;
import com.hightech.carcare.usermanager.dao.UserManagerDao;
import com.hightech.carcare.usermanager.service.UserManagerService;

@Service("usermanagerService")
public class UserManagerServiceImpl implements UserManagerService,UserDetailsService {

	@Autowired(required=true)
	@Qualifier("userManagerDao") 
	UserManagerDao usermanagerDao;
	
	@Override
	public List<User> findOnePageUsers(User user, int currentSize, int pageSize) {
		return usermanagerDao.findOnePageUsers(user, currentSize, pageSize);
	}

	@Override
	public User findOneUser(User user) {
		return usermanagerDao.findOneUser(user);
	}

	@Override
	public User findOneUserById(Long id) {
		return usermanagerDao.findOneUserById(id);
	}

	@Override
	public User findOneUserByUsername(String username) {
		return usermanagerDao.findOneUserByUsername(username);
	}

	@Override
	public User findOneUserByEmail(String email) {
		return usermanagerDao.findOneUserByEmail(email);
	}

	@Override
	public void deleteOneUser(Long id) {
		usermanagerDao.deleteOneUser(id);
	}

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		User user = this.findOneUserByUsername(username);
		if(user!=null){
			return new UserDetailsImpl(user);
		}else{
			return null;
		}
	}
}

class UserDetailsImpl implements UserDetails{
	
	private User user ;

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1224128760149811289L;

	public UserDetailsImpl(){}
	
	public UserDetailsImpl(User user){
		this.user = user;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
