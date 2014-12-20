<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib uri="/menubar-tags" prefix="m" %>
<%@ taglib uri="/brandbar-tags" prefix="b" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0024)<%=request.getContextPath()%>/ -->
<HTML><HEAD><META content="IE=5.0000" http-equiv="X-UA-Compatible">
<META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>汽车美容家园-专业汽车美容网站</TITLE> 
<META name="keywords" content="汽车美容 汽车保养"> 
<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/mobileredirect.js" type="text/javascript"></SCRIPT>
 
<SCRIPT language="JavaScript" src="<%=request.getContextPath() %>/resources/scripts/common.js" type="text/javascript"></SCRIPT>

 <LINK href="<%=request.getContextPath() %>/resources/css/ag-2011sm.css" rel="stylesheet" type="text/css"> 
<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/SpryTabbedPanels.js" type="text/javascript"></SCRIPT>
<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/jquery-1.6.min.js" type="text/javascript"></SCRIPT>
<script src="<%=request.getContextPath() %>/resources/scripts/easyui-lang-zh_CN.js" type="text/javascript"></script>

<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/scSequenceBanner.js" type="text/javascript"></SCRIPT>

<SCRIPT type="text/javascript">
	$(document).ready(function() {
		var scSB = $('.scSequenceBanner').scSequenceBanner({
			slideWidth : 780,
			showNumbersX : 15,
			showNumbersY : 310,
			showNumbers : true,
			slideTimer : 5,
			slideAuto : true
		});
		scSB.initialize();
	});
	
	
</SCRIPT>
<LINK href="<%=request.getContextPath() %>/resources/css/sc-SequenceBanner-styles-wide.css" rel="stylesheet" type="text/css"> 
<STYLE type="text/css">
.styleBrand {
width: 400px;
color: #000000
}
</STYLE>
 <LINK href="<%=request.getContextPath() %>/resources/css/AG-styles-3-18-14.css" rel="stylesheet" type="text/css"> 
 
<SCRIPT language="Javascript" src="<%=request.getContextPath() %>/resources/scripts/autogeek-scripts-2007.js" type="text/javascript"></SCRIPT>
 
<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/7424xp.js" type="text/javascript"></SCRIPT>
 <!-- stylesheet for print media --> 
 <LINK href="<%=request.getContextPath() %>/resources/css/print.css" rel="stylesheet" type="text/css" media="print"/>
 <SCRIPT src="<%=request.getContextPath() %>/resources/scripts/scFrameWork.js" type="text/javascript"></SCRIPT>

 <SCRIPT src="<%=request.getContextPath() %>/resources/scripts/scMCstore.js" type="text/javascript"></SCRIPT>

<BODY topmargin="0"  onload="MM_preloadImages('<%=request.getContextPath() %>/resources/images/ag-static.jpg','<%=request.getContextPath() %>/resources/images/ag-dn-02.jpg','<%=request.getContextPath() %>/resources/images/ag-hover--1.jpg','<%=request.getContextPath() %>/resources/images/ag-selected.jpg','<%=request.getContextPath() %>/resources/images/ag-shadow-bg-wide.jpg','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg')">
	<DIV align="center">
		<DIV id="mccontainer">
			<DIV id="scMCholster-0061">
				<DIV id="ctrlPad-0061">
					<DIV id="minCart-0061">
						<A id="emptyCook-0061" href="链接">购物车</A>
					</DIV>
				</DIV>
			</DIV>
		</DIV>
		<TABLE width="960" bgcolor="#ffffff" border="0" cellspacing="0"
			cellpadding="0">
			<TBODY>
				<TR>
					<TD>
						<TABLE width="960" border="0" cellspacing="0" cellpadding="0">
							<TBODY>
								<TR>
									<TD width="960" height="197" valign="top">
										<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">
											<TBODY>
												<TR>
													<TD><IMG width="960" height="127"
														alt="CarCare - We are car care"
														src="<%=request.getContextPath()%>/resources/images/header5.png"
														border="0"> 
														</TD>
												</TR>
												<TR>
													<TD>
													<DIV id="menubar">
														<m:showMenus/>
													</DIV>
													</TD>
												</TR>
												<TR>
													<TD height="33"
														background="<%=request.getContextPath()%>/resources/images/blue-header-2.jpg">
														<TABLE width="90%" align="left" border="0" cellspacing="0"
															cellpadding="0">
															<TBODY>
																<TR>
																	<TD width="60" align="right">
																		<DIV align="center">
																			<SPAN class="TabTitles"><IMG width="110"
																				height="20" alt="站内查询"
																				src="<%=request.getContextPath()%>/resources/images/search-new.png"
																				longdesc="<%=request.getContextPath()%>/"> </SPAN>
																		</DIV>
																	</TD>
																	<TD width="157" align="left" valign="top">
																		<TABLE align="left" border="0" cellspacing="0"
																			cellpadding="2">
																			<form action="<%=request.getContextPath() %>/search" method="get">
																			<TBODY>
																				<TR>
																					<TD width="109"><INPUT name="catalog"
																						type="hidden" value="autogeek"> <INPUT
																						name="query" class="searchQuery" type="text"
																						size="15"></TD>
																					<TD align="center"><INPUT width="69"
																						height="29" id="searchGo" type="image"
																						src="<%=request.getContextPath()%>/resources/images/search-go.jpg"></TD>
																				</TR>
																			</TBODY>
																			</form>
																		</TABLE>
																	</TD>
																	<TD align="center"><SPAN class="TabTitles"><IMG
																			width="93" height="20" alt="按品牌查询"
																			src="<%=request.getContextPath()%>/resources/images/shop-by-brand-new.png"
																			longdesc="<%=request.getContextPath()%>/"></SPAN></TD>
																	<TD width="332"><b:showBrands showType="select" showEmpty="true" jsMethod="selectOne" style="styleBrand"/></TD>
																</TR>
															</TBODY>
														</TABLE>
													</TD>
												</TR>
											</TBODY>
										</TABLE>
									</TD>
								</TR>
							</TBODY>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD valign="top">
						<TABLE width="960" bgcolor="#ffffff" border="0" cellspacing="0"
							cellpadding="0">
							<TBODY>
								<TR>
									<TD width="180" valign="top" bgcolor="#ffffff">
										<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">
											<TBODY>
												<TR>
													<TD height="2"></TD>
												</TR>
											</TBODY>
										</TABLE>
										<!-- Begin Top Left Nav -->
										<TABLE width="100%" align="center" border="0" cellspacing="7"
											cellpadding="0">
											<TBODY>
												<TR>
													<TD valign="middle">
														<DIV align="center">
															<IMG width="11" height="11" id="Image1"
																alt=""
																src="<%=request.getContextPath() %>/resources/images/nav-dn.jpg"
																border="0" longdesc="<%=request.getContextPath()%>/">
														</DIV>
													</TD>
													<TD>
														<DIV align="left">
															<A class="nav"
																onmouseover="MM_swapImage('Image1','','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg',1)"
																onmouseout="MM_swapImgRestore()"
																href="<%=request.getContextPath()%>/productlines.html">知名品牌</A>
														</DIV>
													</TD>
												</TR>
												<TR>
													<TD valign="middle">
														<DIV align="center">
															<IMG width="11" height="11" id="Image2"
																alt="AutoGeek offers Quality Car wax, Car Care Products, Detailing Supplies and Car Accessories"
																src="<%=request.getContextPath()%>/resources/images/nav-dn.jpg"
																border="0" longdesc="<%=request.getContextPath()%>/">
														</DIV>
													</TD>
													<TD>
														<DIV align="left">
															<A class="nav"
																onmouseover="MM_swapImage('Image2','','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg',1)"
																onmouseout="MM_swapImgRestore()"
																href="<%=request.getContextPath()%>/newproducts.html">最新商品</A>
														</DIV>
													</TD>
												</TR>
												<TR>
													<TD valign="middle">
														<DIV align="center">
															<IMG width="11" height="11" id="Image2"
																alt="AutoGeek offers Quality Car wax, Car Care Products, Detailing Supplies and Car Accessories"
																src="<%=request.getContextPath()%>/resources/images/nav-dn.jpg"
																border="0" longdesc="<%=request.getContextPath()%>/">
														</DIV>
													</TD>
													<TD>
														<DIV align="left">
															<A class="nav"
																onmouseover="MM_swapImage('Image2','','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg',1)"
																onmouseout="MM_swapImgRestore()"
																href="<%=request.getContextPath()%>/newproducts.html">特价商品</A>
														</DIV>
													</TD>
												</TR>
												<c:forEach items="${categories }" var="category" varStatus="status">
												<c:if test="${ status.index ge 4 }" >
												<TR>
													<TD valign="middle">
														<DIV align="center">
															<IMG width="11" height="11" id="Image2"
																alt="AutoGeek offers Quality Car wax, Car Care Products, Detailing Supplies and Car Accessories"
																src="<%=request.getContextPath()%>/resources/images/nav-dn.jpg"
																border="0" longdesc="<%=request.getContextPath()%>/">
														</DIV>
													</TD>
													<TD>
														<DIV align="left">
															<A class="nav"
																onmouseover="MM_swapImage('Image2','','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg',1)"
																onmouseout="MM_swapImgRestore()"
																href="#" onclick=''>${category.treename}</A>
														</DIV>
													</TD>
												</TR>
												</c:if>
											  </c:forEach>
											</TBODY>
										</TABLE>
									    <!-- Begin Newsletter box -->
										<DIV align="center">
											<TABLE width="99%" align="center" border="0" cellspacing="0"
												cellpadding="0">
												<TBODY>
													<TR>
														<TD>
															<TABLE width="100%" border="0" cellspacing="4"
																cellpadding="0">
																<TBODY>
																	<TR>
																		<TD width="68%" height="35" align="center"
																			valign="top"><A
																			href="javascript:void(0)" onclick="loginOrRegister()"><FONT
																				color="#ff0000"><SPAN class="style40">登录或注册<BR>一个账户
																				</SPAN></FONT></A></TD>
																		<TD width="32%" align="center" valign="top"></TD>
																	</TR>
																	<TR>
																		<TD height="20" align="center" valign="top"><A
																			class="style43"
																			href="http://myaccount.autogeek.net/mod_favorites/"><FONT
																				color="#ff0000"><SPAN class="style40">查看收藏宝贝</SPAN></FONT></A></TD>
																		<TD align="center" valign="top">&nbsp;</TD>
																	</TR>
																</TBODY>
															</TABLE>
														</TD>
													</TR>
												</TBODY>
											</TABLE>
										</DIV>
									</TD>
									<!-- 广告部分 -->
									<TD  >
										<TABLE width="780" border="0" cellspacing="0" cellpadding="0">
											<!-- Begin Rotating Ads -->
											<TBODY>
												<TR>
													<TD width="780" height="340" align="center" valign="bottom"
														bgcolor="#ffffff">
 												<TABLE width="750" border="0" cellspacing="0" cellpadding="0">
									              <TBODY>
									              <TR valign="top">
									                <TD width="750"> ${product.description }</TD>
									              </TR>
									             </TBODY>
									            </TABLE><BR>
													</TD>
												</TR>
												<!-- Begin Best Sellers Box-->
												<TR>
													<TD height="28">
														<TABLE style="width: 100%">
														 <c:forEach items="${products }" var="items" >
														 	<c:forEach items="${items }" var="product" varStatus="status">
														   		 <c:if test="${status.index%3==0 }"><tr></c:if>
														   			<td style="margin:3px ">
														   			<DIV align="center" >
																		<A href="#" onclick="showProduct('${product.id }')"><IMG width="180" height="160" alt="" src="${product.thumbnail }"  border="0"></A>
																	</DIV>
																	<DIV align="center">
																		<H1 class="style40">
																		<A href="#" onclick="showview('${product.id }')"><FONT color="#000000">${product.productname } </FONT></A>
																		</H1>
																	</DIV>
																	<DIV align="center">
																		<H1 class="style40">
																		<A href="#" onclick="showview('${product.id }')"><FONT color="#000000">零售价格：￥${product.unitprice } </FONT></A>
																		</H1>
																	</DIV>
																	<DIV align="center">
																		<H1 class="style40">
																		<A href="#" onclick="showview('${product.id }')"><FONT color="#000000">我们的价格：￥${product.realprice } </FONT></A>
																		</H1>
																	</DIV>
																   </td>
																 <c:if test="${(status.index+1)%3==0 }"></tr></c:if>
															
															</c:forEach>
																
														</c:forEach>
													    </TABLE>
													</TD>
												</TR>
												<!-- End Best Sellers Box-->
												<!-- Begin Kits - Bundles Box-->
												<TR>
													<TD>
														  
													</TD>
												</TR>
												<!-- End Kits - Bundles Box-->
												<!-- Begin Small Divider -->
												<TR>
													<TD><IMG width="780" height="11" alt="Autogeek"
														src="<%=request.getContextPath()%>/resources/images/homepage-divider-thin-red.jpg"
														longdesc="<%=request.getContextPath()%>/"></TD>
												</TR>
												<!-- End Small Divider -->
												<TR>
													<TD>
														<TABLE width="721" align="center" border="0"
															cellspacing="0" cellpadding="0">
															<TBODY>
																<TR>
																	<TD>
																		<TABLE width="100%" border="0" cellspacing="0"
																			cellpadding="8">
																			<TBODY>
																				<TR>
																					<TD valign="top">
																						感兴趣产品列表
																					</TD>
																				</TR>
																			</TBODY>
																		</TABLE>
																	</TD>
																</TR>
															</TBODY>
														</TABLE>
													</TD>
												</TR>
												<TR>
													<TD valign="bottom">
														<TABLE width="780" border="0" cellspacing="0"
															cellpadding="0">
															<TBODY>
																<TR>
																	<TD align="center" valign="bottom"><SPAN
																		class="style5"><IMG width="50" height="17"
																			alt="We are Car Care, auto detailing supplies, car wax"
																			src="<%=request.getContextPath()%>/resources/images/toprated.gif"><BR>联系电话 13800103000<BR>
																			International 1-772-286-2701</SPAN></TD>
																</TR>
															</TBODY>
														</TABLE>
													</TD>
												</TR>
											</TBODY>
										</TABLE>
									</TD>
								</TR>
							</TBODY>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD height="28"
						background="<%=request.getContextPath()%>/resources/images/newfooterbg.png"
						bgcolor="#000000">
						<TABLE width="95%" align="center" border="0" cellspacing="0"
							cellpadding="2">
							<TBODY>
								<TR>
									<TD>
										<DIV align="center" class="TabTitles style46">
											<A class="style47" href="<%=request.getContextPath()%>/index.html">首页
											</A>
										</DIV>
									</TD>
									<TD>
										<DIV align="center" class="style48">
											<A class="style47"
												onclick="window.open(this.href); return false;"
												href="http://www.autogeekonline.net/">论坛</A>
										</DIV>
									</TD>
									<TD>
										<DIV align="center" class="style48">
											<A class="style47"
												href="<%=request.getContextPath()%>/aboutus.html">关于我们</A>
										</DIV>
									</TD>
									<TD>
										<DIV align="center" class="style48">
											<A class="style47"
												href="<%=request.getContextPath()%>/shipping.html"> 购物</A>
										</DIV>
									</TD>
									<TD>
										<DIV align="center" class="style48">
											<A class="style47"
												href="<%=request.getContextPath()%>/customerservice.html">
												客户服务</A>
										</DIV>
									</TD>
									<TD>
										<DIV align="center" class="style48">
											<A class="style47"
												href="http://order.store.yahoo.net/autogeek/cgi-bin/wg-order?autogeek">
												查看购物车</A>
										</DIV>
									</TD>
								</TR>
							</TBODY>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD height="30" bgcolor="#000000">
						<DIV align="right">
							<SPAN class="copyright style1">&copy; 2014 www.carcare.com -
								汽车养护 &#8482;<IMG width="40" height="1"
								alt="汽车养护"
								src="<%=request.getContextPath()%>/resources/images/pspacer.gif"
								longdesc="<%=request.getContextPath()%>/">
							</SPAN>
						</DIV>
					</TD>
				</TR>
			</TBODY>
		</TABLE>
	</DIV>
</BODY></HTML>
<script type="text/javascript">
function MM_swapImage() { //v3.0
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;
	for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;
			if (!x.oSrc)
				x.oSrc = x.src;
			x.src = a[i + 2];
		}
}

function MM_findObj(n, d) { //v4.01
	var p, i, x;
		if (!d)
			d = document;
		if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
			d = parent.frames[n.substring(p + 1)].document;
			n = n.substring(0, p);
		}
		if (!(x = d[n]) && d.all)
			x = d.all[n];
		for (i = 0; !x && i < d.forms.length; i++)
			x = d.forms[i][n];
		for (i = 0; !x && d.layers && i < d.layers.length; i++)
			x = MM_findObj(n, d.layers[i].document);
		if (!x && d.getElementById)
			x = d.getElementById(n);

		return x;
}

	function MM_preloadImages() { //v3.0
		var d = document;
		if (d.images) {
			if (!d.MM_p)
				d.MM_p = new Array();
			var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
			for (i = 0; i < a.length; i++)
				if (a[i].indexOf("#") != 0) {
					d.MM_p[j] = new Image;
					d.MM_p[j++].src = a[i];
				}
		}
	}

	function MM_swapImgRestore() { //v3.0
		var i, x, a = document.MM_sr;
		for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
			x.src = x.oSrc;
	}

	function ads(type){
	   
	}
	
	function showview(productid){
		location.href= "<%=request.getContextPath() %>/view/"+productid;
	}
	
	function loginOrRegister(){
		alert("aaa");
		location.href="";
	}
</script>

<SCRIPT type="text/javascript">
	<!--
		var TabbedPanels = new Spry.Widget.TabbedPanels("TabbedPanels");
		var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels2");
	//-->
</SCRIPT>
