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
 
 <LINK href="<%=request.getContextPath() %>/resources/css/AG-styles-3-18-14.css" rel="stylesheet" type="text/css"> 
 
<SCRIPT language="Javascript" src="<%=request.getContextPath() %>/resources/scripts/autogeek-scripts-2007.js" type="text/javascript"></SCRIPT>
 
<SCRIPT src="<%=request.getContextPath() %>/resources/scripts/7424xp.js" type="text/javascript"></SCRIPT>
 <!-- stylesheet for print media --> 
 <LINK href="<%=request.getContextPath() %>/resources/css/print.css" rel="stylesheet" type="text/css" media="print"/>
 <SCRIPT src="<%=request.getContextPath() %>/resources/scripts/scFrameWork.js" type="text/javascript"></SCRIPT>

 <SCRIPT src="<%=request.getContextPath() %>/resources/scripts/scMCstore.js" type="text/javascript"></SCRIPT>
 <link href="<%=request.getContextPath() %>/resources/css/layout.css" rel="stylesheet" type="text/css" />

<BODY topmargin="0"  onload="MM_preloadImages('<%=request.getContextPath() %>/resources/images/ag-static.jpg','<%=request.getContextPath() %>/resources/images/ag-dn-02.jpg','<%=request.getContextPath() %>/resources/images/ag-hover--1.jpg','<%=request.getContextPath() %>/resources/images/ag-selected.jpg','<%=request.getContextPath() %>/resources/images/ag-shadow-bg-wide.jpg','<%=request.getContextPath() %>/resources/images/nav-ovr.jpg')">
	<DIV align="center">
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
													   <div id="nav" class="box"><m:showMenus style="curr" root="<%=request.getContextPath()%>"/></div>
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
																alt="你好"
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
									<TD background="<%=request.getContextPath()%>/resources/images/bg-fade-wide.jpg" valign="top">
										<TABLE width="780" border="0" cellspacing="0" cellpadding="0">
											<!-- Begin Rotating Ads -->
											<TBODY>
												<TR>
													<TD width="780" height="340" align="center" valign="bottom"
														bgcolor="#ffffff">
<!-- 														<A -->
<%-- 														href="<%=request.getContextPath()%>/price-match-policy.html"><IMG --%>
<!-- 															width="780" height="83" alt="" -->
<%-- 															src="<%=request.getContextPath()%>/resources/images/img-3593958.gif" --%>
<!-- 															border="0" vspace="0" hspace="0"></A> -->
														<DIV class="scSequenceBanner">
															<c:forEach items="${rotatingAdses }" var="rotatingAds" varStatus="status">
																<DIV class="scSequenceBannerMain">
																	<DIV>
																		<A
																			href="javascript:void(0)"><IMG
																			alt="${ rotatingAds.alt}"
																			src="${ rotatingAds.imageurl}" onclick="ads('${rotatingAds.type}')"></A>
																	</DIV>
																</DIV>
															</c:forEach>
														</DIV>
													</TD>
												</TR>
												<!-- End Rotating Ads -->
												<!-- Begin Best Sellers Box-->
												<TR>
													<TD height="28">
														<TABLE width="780" border="0" cellspacing="0"
															cellpadding="0">
															<TBODY>
																<TR>
																	<TD width="780" bgcolor="#000000"><IMG width="780"
																		height="27" alt="产品列表"
																		src="<%=request.getContextPath()%>/resources/images/car-care-wide.jpg"></TD>
																</TR>
															</TBODY>
														</TABLE>
														<TABLE width="100%" background="" border="0"
															cellspacing="0" cellpadding="0">
															<TBODY>
																<TR>
																	<TD valign="middle">
																		<DIV class="TabbedPanels" id="TabbedPanels">
																			<UL class="TabbedPanelsTabGroup">
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
																						</LI>
																				</c:forEach>
																			</UL>
																			<DIV class="TabbedPanelsContentGroup">
																			  <c:forEach items="${categoryProducts }" var="products">
																				<DIV class="TabbedPanelsContent">
																					<TABLE width="100%" border="0" cellspacing="2"
																						cellpadding="4">
																						<TBODY>
																							<TR>
																								<c:forEach items="${products }" var="product" >
																									<TD width="20%">
																										<DIV align="center">
																											<A
																												href="#" onclick="showProduct('${product.id }')"><IMG
																												width="120" height="100"
																												alt=""
																												src="${product.thumbnail }"  
																												border="0"></A>
																										</DIV>
																									</TD>
																								</c:forEach>
																							</TR>
																							<TR>
																							<c:forEach items="${products }" var="product" >
																								<TD valign="top">
																									<DIV align="center">
																										<H1 class="style40">
																											<A
																												href="#" onclick="showview('${product.id }')"><FONT
																												color="#000000">${product.productname } </FONT></A>
																										</H1>
																									</DIV>
																								</TD>
																							</c:forEach>
																							</TR>
																						</TBODY>
																					</TABLE>
																				</DIV>
																				</c:forEach>
																				
																			</DIV>
																		</DIV>
																	</TD>
																</TR>
															</TBODY>
														</TABLE>
													</TD>
												</TR>
												<!-- End Best Sellers Box-->
												<!-- Begin Kits - Bundles Box-->
												<TR>
													<TD>
														<TABLE width="780" border="0" cellspacing="0"
															cellpadding="0">
															<TBODY>
																<TR>
																	<TD width="780" bgcolor="#000000"><IMG width="780"
																		height="27" alt="汽车护养其他商品分类"
																		src="<%=request.getContextPath()%>/resources/images/kits-and-bundles-wide.jpg"></TD>
																</TR>
															</TBODY>
														</TABLE>
														<TABLE width="100%" background="" border="0"
															cellspacing="0" cellpadding="0">
															<TBODY>
																<TR>
																	<TD valign="middle">
																		<DIV class="TabbedPanels" id="TabbedPanels2">
																			<UL class="TabbedPanelsTabGroup">
																				<c:forEach items="${ categories}" var="category" varStatus="status">
																					<c:if test="${status.index == 4}">
																						<LI  class="TabbedPanelsTab">
																					</c:if>
																					<c:if test="${status.index > 4}">
																						<LI  class="TabbedPanelsTab2">
																					</c:if>
																					<c:if test="${status.index >= 4}">
																							<TABLE width="150" align="left" border="0"
																							cellspacing="0" cellpadding="0">
																								<TBODY>
																									<TR>
																										<TD width="30"></TD>
																										<TD width="120" height="18" class="TabTitles">${category.treename }</TD>
																									</TR>
																								</TBODY>
																							</TABLE>
																						</LI>
																					</c:if>
																				</c:forEach>
																			</UL>
																			<DIV class="TabbedPanelsContentGroup">
																			
																			<c:forEach items="${categoryProducts }" var="products" varStatus="status1">
																			<c:if test="${status1.index >=4 }">
																				<DIV class="TabbedPanelsContent">
																					<TABLE width="100%" border="0" cellspacing="2"
																						cellpadding="4">
																						<TBODY>
																							<TR>
																									<c:forEach items="${products }" var="product" >
																										<TD width="20%">
																											<DIV align="center">
																												<A
																													href="#" onclick="showProduct('${product.id }')"><IMG
																													width="120" height="100"
																													alt=""
																													src="${product.thumbnail }"  
																													border="0"></A>
																											</DIV>
																										</TD>
																									</c:forEach>
																								
																							</TR>
																							<TR>
																								<c:forEach items="${products }" var="product" >
																									<TD valign="top">
																										<DIV align="center">
																											<H1 class="style40">
																												<A href="#" onclick="showview('${product.id }')"><FONT
																													color="#000000">${product.productname } </FONT></A>
																											</H1>
																										</DIV>
																									</TD>
																								</c:forEach>
																							 
																							</TR>
																						</TBODY>
																					</TABLE>
																				</DIV>
																				</c:if>
																				</c:forEach>
																			</DIV>
																		</DIV>
																	</TD>
																</TR>
															</TBODY>
														</TABLE>
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
																						信息描述部分

																						<CENTER></CENTER>
																						<P></P>
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
											<A class="style47" href="<%=request.getContextPath()%>/">首页
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
												href="<%=request.getContextPath()%>/shipping.html">购物</A>
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
