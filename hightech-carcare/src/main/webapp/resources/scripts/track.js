window.fpAccount=null;
var fpQ=window.location.search;
var fpR=window.document.referrer;
var fpU=window.location.href;
var fpP="y3";
var fpTD="|";
var fpDN="tracking.feedperfect.com";
var ajaxHTML = null;

function fpRegSale(){
	if (window.fpTrackSale!=undefined){
		if (document.attachEvent) {
			window.attachEvent("onload", fpTrackSale);
		} else {
			window.addEventListener("load", function(e){fpTrackSale();}, false);
		}
	}
}

function fpTrim(s) {
	if (fpE(s)) return null;
	return s.replace(/^\s+|\s+$/g,'');
}

function fpI(a,b,c) {
	var d=new Date();
	var h="http" + c + "://" + fpDN + "/" + fpAccount + "/track.php?aid=" + fpEn(fpAccount) + "&a=" + a + "&" + b + "&cd=" + fpEn(d.toUTCString());
	var i=new Image(1,1);
	i.src=h;
	i.onload=function() {fpI2();};
}

function fpErr(s,c) {
	var h="http" + c + "://" + fpDN + "/" + fpAccount + "/track.php?aid=" + fpEn(fpAccount) + "&a=err&err=" + s;
	var i=new Image(1,1);
	i.src=h;
	i.onload=function() {fpI2();};
}

function fpI2() { return; }

function fpZ(x) {
	return (fpE(x) || x=="");
}

function fpE(x) {
	return (x==undefined || x==null);
}

function fpTrackSale() {
	if (fpZ(fpP) || fpAccount==null) {
		fpErr("fpAccount null","s");
		return false;
	}
	var q=null;
	switch (fpP) {
		case "g":		//other
		if (window.fpvT!=undefined&&!fpE(fpvT.OrderID)) {
			if (fpE(fpvT.OrderID)||fpE(fpvT.Items)||fpE(fpvT.Codes)||fpE(fpvT.Prices)||fpE(fpvT.Quantities)) return false;
			q="o=" + fpEn(fpvT.OrderID) + "&i=" + fpEn(fpvT.Items) + "&c=" + fpEn(fpvT.Codes) + "&p=" + fpEn(fpvT.Prices) + "&q=" + fpEn(fpvT.Quantities);
		}
		else {
			var vI,vC,vP,vQ,vO,vOa,vE;
			vI=vC=vP=vQ=vO="";
			vE = document.getElementById("fpvT");
			if (!fpE(vE)) {
				var vET=fpTrim(vE.value);
				var fpo=vET.split(/[\n\r]+/);
				vOa=fpo[0].split(':');
				if (fpE(vOa[0])) return false;
				vO=fpTrim(vOa[1]);
				vOa=fpo[1].split(':');
				if (fpE(vOa[0])) return false;
				vI=fpTrim(vOa[1]);
				vOa=fpo[2].split(':');
				if (fpE(vOa[0])) return false;
				vC=fpTrim(vOa[1]);
				vOa=fpo[3].split(':');
				if (fpE(vOa[0])) return false;
				vP=fpTrim(vOa[1]);
				vOa=fpo[4].split(':');
				if (fpE(vOa[0])) return false;
				vQ=fpTrim(vOa[1]);
				q="o=" + fpEn(vO) + "&i=" + fpEn(vI) + "&c=" + fpEn(vC) + "&p=" + fpEn(vP) + "&q=" + fpEn(vQ);
			}
		}
		break;
		case "m":		//google analytics
		var vI,vIa,vC,vCa,vP,vPa,vQ,vQa,vO,vOa,vE,i;
		vI=vC=vP=vQ=vO="";
		vIa=new Array();
		vCa=new Array();
		vPa=new Array();
		vQa=new Array();
		vE = document.getElementById("utmtrans");
		if (!fpE(vE)) {
			var fpo=vE.value.split("UTM:");
			var j=0;
			for (var i=1;i<fpo.length;i++) {
				vOa=fpo[i].split('|');
				if (vOa[0].charAt(0)=='I') {
					vO=fpTrim(vOa[1]);
					vIa[j]=fpTrim(vOa[2]);
					vCa[j]=fpTrim(vOa[2]);
					vPa[j]=fpTrim(vOa[5]);
					vQa[j]=fpTrim(vOa[6]);
					j++;
				}
			}
			vI=vIa.join("|");
			vC=vCa.join("|");
			vP=vPa.join("|");
			vQ=vQa.join("|");
			q="o=" + fpEn(vO) + "&i=" + fpEn(vI) + "&c=" + fpEn(vC) + "&p=" + fpEn(vP) + "&q=" + fpEn(vQ);
		}
		break;
		case "p":		//prostore
		var confNum = document.getElementById("aServiceTracking");
		if (fpE(confNum)) {
			fpErr("order info not complete","s");
			return false;
		} else {
			confNum = confNum.innerHTML;
		}
		var h="https://" + fpDN + "/prostores.php?cn=" + confNum + "&a=" + fpAccount;
		var i=new Image(1,1);
		i.src=h;
		i.onload=function() {fpI2();};
		return true;
		break;
		case "v":		//volusion
		if (fpE(Order) || fpE(OrderDetails)) {
			fpErr("order info not complete","s");
			return false;
		}
		var vI,vC,vP,vQ,vO;
		vI=vC=vP=vQ=vO="";
		vO=Order[0];		//order number
		for (var i=0,c=OrderDetails.length;i<c;i++) {
			vI+=((vI!="") ? fpTD : "")+ OrderDetails[i][2];		//product id
			vC+=((vC!="") ? fpTD : "")+ OrderDetails[i][2];		//product code
			vP+=((vP!="") ? fpTD : "")+ OrderDetails[i][5];		//product price
			vQ+=((vQ!="") ? fpTD : "")+ OrderDetails[i][6];		//product qty
		}
		q="o=" + fpEn(vO) + "&i=" + fpEn(vI) + "&c=" + fpEn(vC) + "&p=" + fpEn(vP) + "&q=" + fpEn(vQ);
		break;
		case "1sc": //1Shop
			if (window.fpvT!=undefined&&!fpE(fpvT.OrderID)){
				if (fpE(fpvT.Items)||fpE(fpvT.Codes)||fpE(fpvT.Prices)||fpE(fpvT.Quantities)) return false;
				
				q="o=" + fpEn(fpvT.OrderID) + 
				"&i=" + fpEn(fpvT.Items.join("|")) + 
				"&c=" + fpEn(fpvT.Codes.join("|")) + 
				"&p=" + fpEn(fpvT.Prices.join("|")) + 
				"&q=" + fpEn(fpvT.Quantities.join("|"));
			}
		break;
		case "a":		//amazon
		if (wba_confirmation!=undefined) {
			orderNum=wba_confirmation.order[0].orderId;
			ids=new Array();
			price=new Array();
			codes=new Array();
			qtys=new Array();
			for (var i=0;i<wba_confirmation.order[0].product.length;i++) {
				ids[i]=wba_confirmation.order[0].product[i].asin;
				codes[i]=wba_confirmation.order[0].product[i].asin;
				price[i]=wba_confirmation.order[0].product[i].price.replace(/^\$/,'');
				qtys[i]=wba_confirmation.order[0].product[i].quantity;
			}
		}
		/* fall through to y3 */
		case "y3":		//yahoo
		default:
		if (fpE(orderNum) || fpE(ids) || fpE(price) || fpE(codes) || fpE(qtys)) {
			fpErr("order info not complete","s");
			return false;
		}
		var vI,vC,vP,vQ,vO;
		vI=vC=vP=vQ=vO="";
		vO=orderNum;
		for (var i=0,c=ids.length;i<c;i++) {
			vI+=((vI!="") ? fpTD : "")+ ids[i];
			vC+=((vC!="") ? fpTD : "")+ codes[i];
			vP+=((vP!="") ? fpTD : "")+ price[i];
			vQ+=((vQ!="") ? fpTD : "")+ qtys[i];
		}
		q="o=" + fpEn(vO) + "&i=" + fpEn(vI) + "&c=" + fpEn(vC) + "&p=" + fpEn(vP) + "&q=" + fpEn(vQ);
		break;
	}
	if (fpZ(q)) {
		fpErr("no query","s");
		return false;
	}
	
	var pr1 = window.location.protocol;
	var pr2='';
	if (pr1!=undefined&&pr1.toLowerCase()=="http:")
		pr2='';
	else
		pr2='s';
	fpI("sale", q, pr2);
	return true;
}

function fpEn(x) {
	if (fpE(decodeURIComponent)) {
		return encodeURIComponent(x);
	} else {
		return escape(x);
	}
}

function fpDe(x) {
	if (fpE(decodeURIComponent)) {
		return decodeURIComponent(x);
	} else {
		return unescape(x);
	}
}

function fpTrackLanding() {
	if (fpZ(fpQ) || fpAccount==null) {
		if(fpU.indexOf("#") > 0 && !fpZ(fpU.substring(fpU.indexOf("#")+1))){
			var q=fpU.substring(fpU.indexOf("#")+1);
		}else{
			return false;
		}
	}else{
		var q=fpQ.substring(fpQ.indexOf("?")+1);
	}
	if (fpZ(q)) return false;
	var pid, fid;
	pid=fid=null;
	var a=q.split("&");
	var prIDName = (window.fpTrPrID==undefined) ? "productid" : fpTrPrID;
	var chIDName = (window.fpTrChID==undefined) ? "channelid" : fpTrChID;
	for (var i=0,c=a.length;i<c;i++) {
		if (a[i].indexOf(prIDName + "=")==0) {
			pid=fpDe(a[i].substring(a[i].indexOf("=")+1));
		} else {
			if (a[i].indexOf(chIDName + "=")==0) {
				fid=fpDe(a[i].substring(a[i].indexOf("=")+1));
			}
		}
	}
	if (fpZ(pid) || fpZ(fid)) return false;
	var pr1 = window.location.protocol;
	var pr2='';
	if (pr1!=undefined&&pr1.toLowerCase()=="http:")
		pr2='';
	else
		pr2='s';

	fpI("landing", "pid=" + fpEn(pid) + "&fid=" + fpEn(fid) + "&u=" + fpEn(fpU) + "&r=" + fpEn(fpR), pr2);
	return true;
}