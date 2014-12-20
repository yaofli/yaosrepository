package com.hightech.carcare.dict.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="ht_dictionary")
public class Dictionary implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1514739879316787962L;
	

	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name="id",length=20)
	private Long id;
	
	/**
	 * 父编码
	 */
	@Column(name="parentcode",nullable=false,unique=false,length=10)
	private String parentcode;
	
	/**
	 * 字典编码
	 */
	@Column(name="code",nullable=false,unique=false,length=10)
	private String code;
	
	/**
	 * 字典名称
	 */
	@Column(name="dictname",nullable=false,unique=false,length=32)
	private String dictname;
	
	/**
	 * 字典值
	 */
	@Column(name="dictvalue",nullable=false,unique=false,length=32)
	private String dictvalue;
	
	/**
	 * 是否可用
	 */
	@Column(name="enabled",nullable=false,unique=false)
	private boolean enabled=true;
	
	/**
	 * 层次
	 */
	@Column(name="level",nullable=false,unique=false)
	private int level=0;
	
	@Column(name="dorder",nullable=false,unique=false)
	private int dorder=0;
	
	@Column(name="remark",nullable=true,unique=false,length=100)
	private String remark;
	
	@Transient
	private List<Dictionary> children;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getParentcode() {
		return parentcode;
	}

	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDictname() {
		return dictname;
	}

	public void setDictname(String dictname) {
		this.dictname = dictname;
	}

	public String getDictvalue() {
		return dictvalue;
	}

	public void setDictvalue(String dictvalue) {
		this.dictvalue = dictvalue;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getDorder() {
		return dorder;
	}

	public void setDorder(int dorder) {
		this.dorder = dorder;
	}

	public List<Dictionary> getChildren() {
		return children;
	}

	public void setChildren(List<Dictionary> children) {
		this.children = children;
	}

}
