package com.hightech.carcare.util;

import java.util.List;

public class Pagination<T> {
	
	/**
	 * 总页数
	 */
	private Long pages;
	
	/**
	 * 开始条数
	 */
	private int from;
	
	/**
	 * 结束条数
	 */
	private int to;
	
	/**
	 * 总条数
	 */
	private Long total;
	
	/**
	 * 当前页数
	 */
	private int page;
	
	/**
	 * 页面显示条数
	 */
	private int rows;
	
	private List<T> object;
	
	public Pagination(){}
	
	public Pagination(int page,int rows ){
		this.page = page;
		this.rows = rows;
		this.setFrom((page-1)*rows);
		this.setTo(page*rows-1);
	}
	

	public Long getPages() {
		if(total%rows==0){
			this.setPages(total/rows);
		}
		if(total%rows>0){
			this.setPages(total/rows+1);
		}
		return pages;
	}

	public void setPages(Long pages) {
		this.pages = pages;
	}

	public int getFrom() {
		return from;
	}

	public void setFrom(int from) {
		this.from = from;
	}

	public int getTo() {
		return to;
	}

	public void setTo(int to) {
		this.to = to;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public List<T> getObject() {
		return object;
	}

	public void setObject(List<T> object) {
		this.object = object;
	}
}
