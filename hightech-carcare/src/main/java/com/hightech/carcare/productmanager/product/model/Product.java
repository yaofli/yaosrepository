package com.hightech.carcare.productmanager.product.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ht_products")
public class Product implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6530403843309838193L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;

	/**
	 * 产品编号
	 */
	@Column(nullable = false, unique = true, length = 20)
	private String productno;

	/**
	 * 产品描述
	 */
	private String description;

	/**
	 * 产品名称
	 */
	@Column(nullable = false, length = 100)
	private String productname;

	/**
	 * 产品单价
	 */
	private double unitprice;
	
	/**
	 * 产品真实价格
	 */
	private double realprice;

	/**
	 * 缩略图url
	 */
	@Column(nullable = true, length = 200)
	private String thumbnail;

	/**
	 * 产品大图
	 */
	@Column(nullable = true, length = 200)
	private String productimage;

	/**
	 * 特殊信息描述
	 */
	private String specialdesc;

	/**
	 * 所属分类
	 */
	@Column(nullable = false)
	private String incategory;
	
	/**
	 * 所属品牌分类
	 */
	@Column(nullable = false)
	private Long brandId;
	
	/**
	 * 备注
	 */
	private String remark;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductno() {
		return productno;
	}

	public void setProductno(String productno) {
		this.productno = productno;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public double getUnitprice() {
		return unitprice;
	}

	public void setUnitprice(double unitprice) {
		this.unitprice = unitprice;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getProductimage() {
		return productimage;
	}

	public void setProductimage(String productimage) {
		this.productimage = productimage;
	}

	public String getSpecialdesc() {
		return specialdesc;
	}

	public void setSpecialdesc(String specialdesc) {
		this.specialdesc = specialdesc;
	}

	public String getIncategory() {
		return incategory;
	}

	public void setIncategory(String incategory) {
		this.incategory = incategory;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getBrandId() {
		return brandId;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public double getRealprice() {
		return realprice;
	}

	public void setRealprice(double realprice) {
		this.realprice = realprice;
	}

}
