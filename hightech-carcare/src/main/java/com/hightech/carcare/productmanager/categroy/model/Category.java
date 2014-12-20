package com.hightech.carcare.productmanager.categroy.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ht_categry_tree")
public class Category implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 5142272799867862595L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name="id",length=20)
	private Long id;
	
	/**
	 * 分类树名称
	 */
	@Column(name="treename",nullable=false,unique=true,length=50)
	private String treename;
	
	/**
	 * 树节点编号
	 */
	@Column(name="code",nullable=false,unique=true,length=20)
	private String code;
	
	/**
	 * 父节点树编号
	 */
	@Column(name="parentcode",nullable=false,length=20)
	private String parentcode="0";
	
	/**
	 * 路径
	 */
	@Column(name="uri",length=200)
	private String uri;
	
	/**
	 * 重要节点标识
	 */
	private boolean importentflag;
	
	/**
	 * 是否可用
	 */
	private boolean enabled;
	
	/**
	 * 顺序号
	 */
	private int categoryorder;
	
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

	public String getTreename() {
		return treename;
	}

	public void setTreename(String treename) {
		this.treename = treename;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getParentcode() {
		return parentcode;
	}

	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public boolean getImportentflag() {
		return importentflag;
	}

	public void setImportentflag(boolean importentflag) {
		this.importentflag = importentflag;
	}

	public boolean getEnabled() {
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

	public int getCategoryorder() {
		return categoryorder;
	}

	public void setCategoryorder(int categoryorder) {
		this.categoryorder = categoryorder;
	}

}
