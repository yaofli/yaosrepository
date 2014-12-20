<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="/menubar-tags" prefix="m" %>
<%@ attribute name="menuBar" required="false" rtexprvalue="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">
	<title>汽车美容专业网站</title>

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/demo.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/css/layout.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/scripts/jquery-1.6.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/scripts/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/scripts/Showmenua.js"></script>
		<link href="${pageContext.request.contextPath}/resources/css/layout.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/kindeditor/themes/default/default.css" />
    <script charset="utf-8" src="<%=request.getContextPath() %>/resources/kindeditor/kindeditor-min.js"></script>
    <script charset="utf-8" src="<%=request.getContextPath() %>/resources/kindeditor/kindeditor-jq.js"></script>
    <script charset="utf-8" src="<%=request.getContextPath() %>/resources/kindeditor/lang/zh_CN.js"></script>
</head>
<body>
    <div><IMG width="960" height="127" alt="" src="<%=request.getContextPath()%>/resources/images/header5.png" border="0"> </div>
	<div id="nav" class="box"><m:showMenus style="curr" root="<%=request.getContextPath() %>"/></div>
	<div id="content">
		<jsp:doBody/>
	</div>
	<div id="footer">
	    aaaaaa
	</div>
</body>
</html>
