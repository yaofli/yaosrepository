package com.hightech.carcare.util;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import org.springframework.test.context.ContextConfiguration;

import com.hightech.carcare.productmanager.brand.model.Brand;
import com.hightech.carcare.productmanager.brand.service.BrandManagerService;

@ContextConfiguration("/app-context.xml")
public class BrandBarTag extends SimpleTagSupport{
	
	@Inject
	public BrandManagerService brandManagerService;
	
	private String showType;
	
	private boolean showEmpty;
	
	private String jsMethod;
	
	private String style ;
	
	@Override
	public void doTag() throws JspException, IOException {
		try {
			if(brandManagerService==null){
				brandManagerService = (BrandManagerService) ApplicationContextTool.getAppContext().getBean("brandManagerService");
			}
			List<Brand> brands = brandManagerService.fetchAllBrands();
			JspWriter out = this.getJspContext().getOut();
			StringBuilder builder = new StringBuilder(32);
			if (brands == null) {
				out.println("No Menu Found...");
				return;
			}
			
			
			if(showType.equals("li")){
				for (Brand brand : brands) {
					builder.append("<li>");
					builder.append(brand.getBrandname());
					builder.append("</li>");
				}
			}
			
			if(showType.equals("select")){
				builder.append("<select id='brand' onChange='");
				builder.append("if (this.value) document.location = this.value;'");
				builder.append(" class='");
				builder.append(style);
				builder.append('\'');
				builder.append(">");
				if(showEmpty){
					builder.append("<option ");
					builder.append(" value='");
					builder.append(0);
					builder.append("'>");
					builder.append("--请选择--");
					builder.append("</option>");
				}
				
				for (Brand brand : brands) {
					builder.append("<option ");
					builder.append(" value='");
					builder.append(brand.getBrandurl());
					builder.append("'>");
					builder.append(brand.getBrandname());
					builder.append("</option>");
				}
				builder.append("</select>");
			}
			out.println(builder.toString());
		} catch (Exception e) {
			throw new JspException(e.getMessage());
		}
		super.doTag();
	}

	public String getShowType() {
		return showType;
	}



	public void setShowType(String showType) {
		this.showType = showType;
	}

	public boolean isShowEmpty() {
		return showEmpty;
	}

	public void setShowEmpty(boolean showEmpty) {
		this.showEmpty = showEmpty;
	}

	public String getJsMethod() {
		return jsMethod;
	}

	public void setJsMethod(String jsMethod) {
		this.jsMethod = jsMethod;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

}
