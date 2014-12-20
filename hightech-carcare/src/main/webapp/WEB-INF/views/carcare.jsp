<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib uri="/brandbar-tags" prefix="b" %>
<%@ page session="false" %>
 
<tags:template >
<jsp:body>
<div id="search">
   <span>站内查询:</span><input type="text" id="txt_search"><button value="查询" id="btn_search">查询</button>
</div>
<div id="brands">
    <span>品牌分类:</span><b:showBrands showType="select" showEmpty="true" jsMethod="selectOne" style="styleBrand"/>
</div>
<div id="left">
    <div id="siderbar">
       <ul>
        <c:forEach items="${categories }" var="category" varStatus="status">
		 <li><a href="#" onclick="javascript:Showmenua(this,${status.index})">${category.treename}</a></li>
	  </c:forEach>
	  </ul>
    </div>
</div>
<div id="right">
    <div id="ag">
	    <c:forEach items="${rotatingAdses }" var="rotatingAds" varStatus="status">
			<DIV>
					<a href="javascript:void(0)"><img alt="${ rotatingAds.alt}" src="${ rotatingAds.imageurl}" onclick="ads('${rotatingAds.type}')"></a>
				</DIV>
		</c:forEach>
    </div>
    <div id="categories">
      <c:forEach items="${ categories}" var="category" varStatus="status">
			<c:if test="${status.index == 0}">
				<LI  class="TabbedPanelsTab">
			</c:if>
			<c:if test="${status.index != 0}">
				<LI  class="TabbedPanelsTab2">
			</c:if>
			
					<TABLE width="150" align="left" border="0"
					cellspacing="0" cellpadding="0">
						<TBODY>
							<TR>
								<TD width="30"></TD>
								<TD width="120" height="18" class="TabTitles">${category.treename }</TD>
							</TR>
						</TBODY>
					</TABLE>
		</c:forEach>
    </div>
</div>
</jsp:body>
</tags:template>