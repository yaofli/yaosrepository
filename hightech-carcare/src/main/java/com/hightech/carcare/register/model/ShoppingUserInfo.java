package com.hightech.carcare.register.model;

import java.io.Serializable;
import java.util.Date;

public class ShoppingUserInfo implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6104736857431245021L;
	/**
	 * 主键
	 */
	private String id;
	/**
	 * 用户名
	 */
	private String username;
	
	/**
	 * 真实姓名
	 */
	private String realname;
	
	/**
	 * 街道
	 */
	private String street;
	
	/**
	 * 街道详细
	 */
	private String streetDetals;
	
	/**
	 * 所在城市
	 */
	private String incity;
	
	/**
	 * 所属地区
	 */
	private String state;
	
	/**
	 * 邮编
	 */
	private String postcode;
	
	/**
	 * 所属国家
	 */
	private String incountry;
	
	/**
	 * 联系电话
	 */
	private String phone;
	
	/**
	 * 创建人
	 */
	private Date createtime;
	
	/**
	 * 最后更新时间
	 */
	private Date lastupdatetime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getStreetDetals() {
		return streetDetals;
	}

	public void setStreetDetals(String streetDetals) {
		this.streetDetals = streetDetals;
	}

	public String getIncity() {
		return incity;
	}

	public void setIncity(String incity) {
		this.incity = incity;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getIncountry() {
		return incountry;
	}

	public void setIncountry(String incountry) {
		this.incountry = incountry;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Date getLastupdatetime() {
		return lastupdatetime;
	}

	public void setLastupdatetime(Date lastupdatetime) {
		this.lastupdatetime = lastupdatetime;
	}

}
