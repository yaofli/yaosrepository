package com.hightech.carcare.productmanager.brand.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ht_brand")
public class Brand implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -7804899578882391720L;
	
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name="id",length=20)
	private Long id;
	
	/**
	 * 品牌名称
	 */
	@Column(name="brandname",nullable=false,unique=false,length=50)
	private String brandname;
	
	/**
	 * 品牌分类编码
	 */
	@Column(name="brandurl",nullable=true,length=100)
	private String brandurl;
	
	/**
	 * 品牌信息说明
	 */
	@Column(name="brandDesc",nullable=true,length=2000)
	private String brandDesc;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrandname() {
		return brandname;
	}

	public void setBrandname(String brandname) {
		this.brandname = brandname;
	}

	public String getBrandurl() {
		return brandurl;
	}

	public void setBrandurl(String brandurl) {
		this.brandurl = brandurl;
	}

	public String getBrandDesc() {
		return brandDesc;
	}

	public void setBrandDesc(String brandDesc) {
		this.brandDesc = brandDesc;
	}
}
