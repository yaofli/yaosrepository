package com.hightech.carcare.productmanager.brand.model;

import java.io.Serializable;

public class BrandDict implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4172291501203391182L;
	
	private Long id;
	
	private String brandname;
	
	public BrandDict(){}
	
	public BrandDict(Long id,String brandname){
		this.id=id;
		this.brandname=brandname;
	}
	
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
}
