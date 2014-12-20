package com.hightech.carcare.menumanager.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ht_menu")
public class Menu implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6423227384951603552L;

	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name="id",length=32)
	private Long id;
	
	@Column(name="menuname",length=45,nullable=false)
	private String menuname;
	
	@Column(name="uri",length=100)
	private String uri;
	
	@Column(name="parentcode",length=10,nullable=false)
	private String parentcode="0";
	
	@Column(name="menucode",length=10,nullable=false)
	private String menucode; 
	
	private Integer menuorder=1;
	
	@Column(nullable=false)
	private boolean enabled=true;
	
	private String remark;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMenuname() {
		return menuname;
	}

	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getMenucode() {
		return menucode;
	}

	public void setMenucode(String menucode) {
		this.menucode = menucode;
	}

	public Integer getMenuorder() {
		return menuorder;
	}

	public void setMenuorder(Integer menuorder) {
		this.menuorder = menuorder;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getParentcode() {
		return parentcode;
	}

	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}
}
