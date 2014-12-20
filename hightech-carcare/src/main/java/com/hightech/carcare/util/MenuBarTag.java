package com.hightech.carcare.util;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import org.springframework.test.context.ContextConfiguration;

import com.hightech.carcare.menumanager.model.Menu;
import com.hightech.carcare.menumanager.service.MenuManagerService;

@ContextConfiguration("/app-context.xml")
public class MenuBarTag extends SimpleTagSupport {


	@Inject
	public MenuManagerService menuManagerService;
	
	private String style;
	
	private String root;
	
	@Override
	public void doTag() throws JspException, IOException {
		try {
			if(menuManagerService==null){
				menuManagerService = (MenuManagerService) ApplicationContextTool.getAppContext().getBean("menuManagerService");
			}
			List<Menu> menus = menuManagerService.findMenusByParentcode("0");
			JspWriter out = this.getJspContext().getOut();
			if (menus == null) {
				out.println("No Menu Found...");
				return;
			}
			
			out.println("<ul>");
			for (int i=0;i<menus.size();i++ ) {
				Menu m = menus.get(i);
				if(StringUtil.isNotEmpty(m.getUri())){
					StringBuffer sb = new StringBuffer(32);
					sb.append("<li ");
					if(i==0){
						sb.append(" class='" ).append(this.getStyle()+"'");
					}
					sb.append("><a href='"+this.getRoot()+"/"+ StringUtil.removePrefix(m.getUri(), "/") + "'>");
					out.println(sb.toString());
				}else{
					out.println("<li><a href='#'>");
				}
				out.println(m.getMenuname()==null?"":m.getMenuname());
				out.println("</a></li>");
			}
			out.println("</ul>");
		} catch (Exception e) {
			throw new JspException(e.getMessage());
		}
		super.doTag();
	}



	public String getStyle() {
		return style;
	}



	public void setStyle(String style) {
		this.style = style;
	}
	

	public String getRoot() {
		return root;
	}



	public void setRoot(String root) {
		this.root = root;
	}


}
