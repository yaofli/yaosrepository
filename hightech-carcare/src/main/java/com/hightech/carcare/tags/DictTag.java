package com.hightech.carcare.tags;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.hightech.carcare.dict.model.Dictionary;
import com.hightech.carcare.dict.service.DictionaryManagerService;
import com.hightech.carcare.util.StringUtil;

public class DictTag extends SimpleTagSupport{
	
	@Inject
	DictionaryManagerService dictionaryManagerService;
	
	private Long id;
	
	private String parentcode;
	
	
	private String styleClass;
	
	private String missingMessage;
	
	private String validType;
	
	private String dataOptions;
	
	public void doTag() throws JspException, IOException {
		
		List<Dictionary> dicts = new ArrayList<Dictionary>();
		if(StringUtil.isNotEmpty(parentcode)){
			dicts = dictionaryManagerService.fetchDictionaryByParentCode(parentcode);
		}
		JspWriter out = this.getJspContext().getOut();
		
	}

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


	public String getMissingMessage() {
		return missingMessage;
	}


	public void setMissingMessage(String missingMessage) {
		this.missingMessage = missingMessage;
	}


	public String getValidType() {
		return validType;
	}


	public void setValidType(String validType) {
		this.validType = validType;
	}


	public String getDataOptions() {
		return dataOptions;
	}


	public void setDataOptions(String dataOptions) {
		this.dataOptions = dataOptions;
	}
}
