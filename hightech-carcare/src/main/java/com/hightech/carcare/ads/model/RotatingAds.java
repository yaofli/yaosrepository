package com.hightech.carcare.ads.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 滚动广告路径
 * @author yaofl
 *
 */

@Entity
@Table(name="ht_rotatingads")
public class RotatingAds implements Serializable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5668785048295168899L;

	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name="id",length=20)
	private Long id;
	
	@Column(name="url",nullable=true,unique=false,length=100)
	private String url;
	
	@Column(name="alt",nullable=true,unique=false,length=40)
	private String alt;
	
	@Column(name="imageurl",nullable=true,unique=false,length=200)
	private String imageurl;
	
	private Integer type;
	
	private Integer aorder;
	
	@Column(name="enabled",nullable=false,unique=false)
	private Boolean enabled = true;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getAlt() {
		return alt;
	}

	public void setAlt(String alt) {
		this.alt = alt;
	}

	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getAorder() {
		return aorder;
	}

	public void setAorder(Integer aorder) {
		this.aorder = aorder;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	
	
}
