var EmphasisColor = "#FF0000"; //FOR DISCOUNT
var EmphasisFontFamily = "Verdana"; //FOR DISCOUNT
var EmphasisFontSize = "13px"; //FOR DISCOUNT
var EmphasisFontWeight = "bold"; //FOR DISCOUNT

function getStoreTags(id, name, img, price, saleprice, orderable, ref, savedoptions, optionschanged, options, priceinput, wsdisc){
	this.id = id;
	this.name = name;
	this.img = img;
	this.price = price;
	this.saleprice = saleprice;
	this.orderable = orderable;
	this.ref = ref;
	this.savedoptions = savedoptions;
	this.optionschanged = optionschanged;
	this.options = options;
	this.priceinput = priceinput;
	this.wsdisc = wsdisc;
	if(!window.wistlistArrCnt){
		wistlistArrCnt = new Array();
	}
	wistlistArrCnt[wistlistArrCnt.length] = this;
}

function switchAction(form, val){
	form['scl_action'].value = val;
}

function showSavedCartText(x){
	if(x.previousSibling.style.display == 'block' && x.previousSibling.style.visibility == 'visible'){
		x.previousSibling.style.display = 'none';
		x.previousSibling.style.visibility = 'hidden';
	}else{
		x.previousSibling.style.display = 'block';
		x.previousSibling.style.visibility = 'visible';
	}
	return false;
}

function closeSavedCartText(x){
	if(x.parentNode.style.display == 'block' && x.parentNode.style.visibility == 'visible'){
		x.parentNode.style.display = 'none';
		x.parentNode.style.visibility = 'hidden';
	}else{
		x.parentNode.style.display = 'block';
		x.parentNode.style.visibility = 'visible';
	}
	return false;
}

function MultiAddElement(thisel, x){
var thechkbox = document.getElementById(x);
var thetextbox = document.getElementById(x);
	if(thisel.type == 'checkbox'){
		if(thisel.checked){
			thetextbox.value = 1;
		}else{
			thetextbox.value = 0;
		}
	}
	if(thisel.type == 'text'){
		if(isNaN(thisel.value)){
			alert('The quantity must be numeric');
			thisel.value = 0;
			thechkbox.checked = false;
		}else{
			if(thisel.value != '' && thisel.value != 0){
				thechkbox.checked = true;
			}else{
				if(thisel.value == ''){
					thisel.value = 0;
				}
				thechkbox.checked = false;
			}
		}
	}
}

function F(x) {
	return document.getElementById(x);
};

function C(x) {
	return document.createElement(x);
};

function A(p,x) {
	return p.appendChild(x);
};

function CTxt(x){
	return document.createTextNode(x);
};

function swapShippingVals(){
	var regForm = document.forms['register'];
	if(regForm){
		if(regForm.shipBillSameFlag){
			if(regForm.shipBillSameFlag.checked){
				if(regForm.shipFirstName){
					regForm.billFirstName.value = regForm.shipFirstName.value;
					regForm.billFirstName.disabled = true;
					regForm.billFirstName.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipLastName){
					regForm.billLastName.value = regForm.shipLastName.value;
					regForm.billLastName.disabled = true;
					regForm.billLastName.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipAddress1){
					regForm.billAddress1.value = regForm.shipAddress1.value;
					regForm.billAddress1.disabled = true;
					regForm.billAddress1.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipAddress2){
					regForm.billAddress2.value = regForm.shipAddress2.value;
					regForm.billAddress2.disabled = true;
					regForm.billAddress2.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipCity){
					regForm.billCity.value = regForm.shipCity.value;
					regForm.billCity.disabled = true;
					regForm.billCity.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipState){
					regForm.billState.value = regForm.shipState.value;
					regForm.billState.disabled = true;
					regForm.billState.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipZip){
					regForm.billZip.value = regForm.shipZip.value;
					regForm.billZip.disabled = true;
					regForm.billZip.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipPhone){
					regForm.billPhone.value = regForm.shipPhone.value;
					regForm.billPhone.disabled = true;
					regForm.billPhone.style.backgroundColor = "#FEFEFE";
				}
				if(regForm.shipCountry){
					regForm.billCountry.selectedIndex = regForm.shipCountry.selectedIndex;
					regForm.billCountry.disabled = true;
					regForm.billCountry.style.backgroundColor = "#FEFEFE";
				}
			}else{
				regForm.billFirstName.disabled = false;
				regForm.billFirstName.style.backgroundColor = "#FFFFFF";
				
				regForm.billLastName.disabled = false;
				regForm.billLastName.style.backgroundColor = "#FFFFFF";
				
				regForm.billAddress1.disabled = false;
				regForm.billAddress1.style.backgroundColor = "#FFFFFF";
				
				regForm.billAddress2.disabled = false;
				regForm.billAddress2.style.backgroundColor = "#FFFFFF";
				
				regForm.billCity.disabled = false;
				regForm.billCity.style.backgroundColor = "#FFFFFF";
				
				regForm.billState.disabled = false;
				regForm.billState.style.backgroundColor = "#FFFFFF";
				
				regForm.billZip.disabled = false;
				regForm.billZip.style.backgroundColor = "#FFFFFF";
				
				regForm.billPhone.disabled = false;
				regForm.billPhone.style.backgroundColor = "#FFFFFF";
				
				regForm.billCountry.disabled = false;
				regForm.billCountry.style.backgroundColor = "#FFFFFF";
				
			}
		}
	}
	/*var editForm = document.forms['editAcctForm'];
	if(editForm){
		if(editForm.shipBillSameFlag.checked){
			editForm.billFirstName.value = editForm.shipFirstName.value;
			editForm.billLastName.value = editForm.shipLastName.value;
			editForm.billAddress1.value = editForm.shipAddress1.value;
			editForm.billAddress2.value = editForm.shipAddress2.value;
			editForm.billCity.value = editForm.shipCity.value;
			editForm.billState.value = editForm.shipState.value;
			editForm.billZip.value = editForm.shipZip.value;
			editForm.billPhone.value = editForm.shipPhone.value;
			editForm.billCountry.selectedIndex = editForm.shipCountry.selectedIndex;
		}
	}*/
}

function resetInputs(){
var regForm = document.forms['register'];
	regForm.billFirstName.disabled = false;
	regForm.billFirstName.style.backgroundColor = "#FFFFFF";
	
	regForm.billLastName.disabled = false;
	regForm.billLastName.style.backgroundColor = "#FFFFFF";
	
	regForm.billAddress1.disabled = false;
	regForm.billAddress1.style.backgroundColor = "#FFFFFF";
	
	regForm.billAddress2.disabled = false;
	regForm.billAddress2.style.backgroundColor = "#FFFFFF";
	
	regForm.billCity.disabled = false;
	regForm.billCity.style.backgroundColor = "#FFFFFF";
	
	regForm.billState.disabled = false;
	regForm.billState.style.backgroundColor = "#FFFFFF";
	
	regForm.billZip.disabled = false;
	regForm.billZip.style.backgroundColor = "#FFFFFF";
	
	regForm.billPhone.disabled = false;
	regForm.billPhone.style.backgroundColor = "#FFFFFF";
	
	regForm.billCountry.disabled = false;
	regForm.billCountry.style.backgroundColor = "#FFFFFF";
	
	regForm.reset();
	
	if(window.loginCountry){
		loginCountry();
	}
}

function getLoginCookie (name) {
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen) {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg) {
	 var end = document.cookie.indexOf (";", j);
	 if (end == -1)
	    end = document.cookie.length;
	 return unescape(document.cookie.substring(j, end));
      }
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
   }
   return null;
}

function isEmail(str) {
var supported = 0;
	if (window.RegExp) {
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		if (tempReg.test(tempStr))
			supported = 1;
	}
	if (!supported){
		return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
	}
var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
return (!r1.test(str) && r2.test(str));
}

function isPhoneNumber(str){
	var regexp = new RegExp("((\\()+\\d{3}(\\))+\\d{3}-\\d{4})|(\\d{3}-\\d{3}-\\d{4})");
	return(regexp.test(str))
}

function validateRegForm(adminEdit){
if(adminEdit == null){
	adminEdit = false;
}
var theform = document.forms['register'];

var shipfname = theform['shipFirstName'];
var shiplname = theform['shipLastName'];
var shipadd1 = theform['shipAddress1'];
var shipadd2 = theform['shipAddress2'];
var shipcity = theform['shipCity'];
var shipstate = theform['shipState'];
var shipzip = theform['shipZip'];
var shipphone = theform['shipPhone'];
var shipemail = theform['email'];

var shipbillsame = theform['shipBillSameFlag'];

var billfname = theform['billFirstName'];
var billlname = theform['billLastName'];
var billadd1 = theform['billAddress1'];
var billadd2 = theform['billAddress2'];
var billcity = theform['billCity'];
var billstate = theform['billState'];
var billzip = theform['billZip'];
var billphone = theform['billPhone'];

var pw = theform['password'];
var confirmpw = theform['confirmpassword'];

	if(shipfname.value == ''){
		alert('Please Enter a Shipping Address First Name');
		shipfname.focus();
		return false;
	}
	if(shiplname.value == ''){
		alert('Please Enter a Shipping Address Last Name');
		shiplname.focus();
		return false;
	}
	if(shipadd1.value == '' && shipadd2.value == ''){
		alert('Please Enter a Shipping Address');
		shipadd1.focus();
		return false;
	}
	if(shipcity.value == ''){
		alert('Please Enter a Shipping Address City');
		shipcity.focus();
		return false;
	}
	if(shipstate.value == ''){
		alert('Please Enter a Shipping Address State');
		shipstate.focus();
		return false;
	}
	if(shipzip.value == '' || isNaN(shipzip.value) || shipzip.value.length < 5){
		alert('Please Enter a Shipping Address Zip');
		shipzip.focus();
		return false;
	}
	/*
	if(isPhoneNumber(shipphone.value) == ''){
		alert('Please Enter a Valid Shipping Address Phone Number');
		shipphone.focus();
		return false;
	}
	*/
	if(shipphone.value == ''){
		alert('Please Enter a Valid Shipping Address Phone Number');
		shipphone.focus();
		return false;
	}
	if(isEmail(shipemail.value)  == ''){
		alert('Please Enter a Valid Shipping Address Email');
		shipemail.focus();
		return false;
	}
	
	if(!shipbillsame.checked){
		if(billfname.value == ''){
			alert('Please Enter a Billing Address First Name');
			billfname.focus();
			return false;
		}
		if(billlname.value == ''){
			alert('Please Enter a Billing Address Last Name');
			billlname.focus();
			return false;
		}
		if(billadd1.value == '' && billadd2.value == ''){
			alert('Please Enter a Billing Address');
			billadd1.focus();
			return false;
		}
		if(billcity.value == ''){
			alert('Please Enter a Billing Address City');
			billcity.focus();
			return false;
		}
		if(billstate.value == ''){
			alert('Please Enter a Billing Address State');
			billstate.focus();
			return false;
		}
		if(billzip.value == '' || isNaN(billzip.value) || billzip.value.length < 5){
			alert('Please Enter a Billing Address Zip');
			billzip.focus();
			return false;
		}
		/*if(isPhoneNumber(billphone.value) == ''){
			alert('Please Enter a Valid Billing Address Phone Number');
			billphone.focus();
			return false;
		}*/
		if(billphone.value == ''){
			alert('Please Enter a Valid Billing Address Phone Number');
			billphone.focus();
			return false;
		}
	}
	
	if(!adminEdit){
		if(theform['pwcheckbox']){
			if(theform['pwcheckbox'].checked){
				if(pw.value == ''){
					alert('Please Enter a Password');
					pw.focus();
					return false;
				}
				if(confirmpw.value == ''){
					alert('Please Confirm Your Password');
					confirmpw.focus();
					return false;
				}
				if(pw.value != confirmpw.value){
					alert('Your Password\'s Do Not Match... Please Re-Enter');
					pw.focus();
					return false;
				}
			}
		}else{
			if(pw.value == ''){
				alert('Please Enter a Password');
				pw.focus();
				return false;
			}
			if(confirmpw.value == ''){
				alert('Please Confirm Your Password');
				confirmpw.focus();
				return false;
			}
			if(pw.value != confirmpw.value){
				alert('Your Password\'s Do Not Match... Please Re-Enter');
				pw.focus();
				return false;
			}
		}
	}
return true;
}

var doseconds;

function stopTime() {
	clearTimeout(doseconds);
}

function getTodaysDate(){
var date = new Date();
var day = date.getDate();
var time = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var timeofday;
var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var month = montharray[date.getMonth()];
	if(time >= 12){
		timeofday = "PM";
	}else{
		timeofday = "AM";
	}
	
	if(seconds<=9){
		seconds = "0" + seconds;
	}
	
	if(time > 12){
		 time -= 12;
	}
	
	if(time == 0){
		 time = 12;
	}
	
	if(minutes < 10){
		minutes = "0" + minutes;
	}
document.getElementById("time").innerHTML = month + " " + day + "&nbsp;&nbsp;" + time + ":" + minutes + ":" + seconds + " " + timeofday;
//document.formdate.showdate.value = month + " " + day + "   " + time + ":" + minutes + ":" + seconds + " " + timeofday;

doseconds = setTimeout("getTodaysDate()",1000);
}

function confirmAction(uname){
var showconfirm = confirm('Are you sure you want to remove \n"'+uname+'"\n from your user\'s list');
	if(showconfirm){
		return true;
	}else{
		return false;
	}
	
}

function LoginPopUp(url,h,w){
var popUpWin=0;
if(popUpWin){
    if(!popUpWin.closed) popUpWin.close();
  }
popUpWin = open(url ,'loginpopup','resizable=no, left=0, top=0, scrollbars=yes, height='+h+',width='+w);
popUpWin.focus();
}

function setLoginCookie (name, value, expires, path, domain, secure) {
   document.cookie =
      name + "="
      + escape(value)
      //+ ((expires) ? "; expires=" + expires.toGMTString() : "")
      + ((path) ? "; path=" + path : "")
      + ((domain) ? "; domain=" + domain : "")
      + ((secure) ? "; secure" : "");
}

function clearCookieValue(name){
	document.cookie = name + "=";
}

function getLoginHTTPObject() {
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}

function createLoginQueryStringFromArray(arrayObj){
	var queryString = "";
	if(arrayObj != null){
		for ( key in arrayObj ){
				if(queryString != ""){
					queryString+= "&";
				}
				queryString = queryString + escape(key) + "=" +  escape(arrayObj[key]);
		}
	}
	return queryString;
}
/*
function decRound(n) {
  var s = "" + Math.round(n * 100) / 100;
  var i = s.indexOf('.');
  if (i < 0) return s + ".00";
  var t = s.substring(0, i + 1) + s.substring(i + 1, i + 3);
  if (i + 2 == s.length) t += "0";
  return t;
};


function showWholesaleDiv(){
var wsSave = document.getElementById('login-yousave');
var wsDiv = document.getElementById('login-wsdiscount');
	if(window.showwholesalepr){
		if(isdiscount){
			wsSave.innerHTML = "Your Wholesale Price is: <br>" + showwholesalepr;
			wsDiv.innerHTML = "<input type=\"hidden\" name=\"itemOption_WholeSale_Price\" />";
		}else{
			wsSave.innerHTML = "No Wholesale Price for this item";
		};
		wsSave.style.color = '#FF0000';
		wsSave.style.fontFamily = 'Verdana';
		wsSave.style.fontSize = '13px';
		wsSave.style.fontWeight = 'bold';
	};
};

function showWholesaleDiv(swspr, contnum, price, contid, isdis, wsinp){
var wsSave = document.getElementById('login-yousave'+contnum);
var wsDiv = document.getElementById('login-wsdiscount'+contnum);
	if(isdis){
		wsSave.innerHTML = swspr;
		wsDiv.innerHTML = wsinp;
	}else{
		wsSave.innerHTML = "No Wholesale Price for this item";
	};
	wsSave.style.color = '#FF0000';
	wsSave.style.fontFamily = 'Verdana';
	wsSave.style.fontSize = '13px';
	wsSave.style.fontWeight = 'bold';
};

function changeWholesaleQty(){
var vwqty = document.getElementById('item_Qty');
var showtxt = document.getElementById('login-yousave');
	if(vwqty && window.WPrice){
		if(isdiscount){
			if(isNaN(vwqty.value)){
				alert("The Quantity Entered Must Be Numeric!");
				vwqty.value = '1';
			};
			showtxt.innerHTML = "Your Wholesale Discount is -$" + decRound(vwqty.value * WPrice);
		};
	};
};

function showLoginAlerts(){
var queryError;
var queryLostEmail;
var alertText = CTxt("");
var showLoginAlert = document.getElementById("loginalert");
var showLoginAlertDiv = C("div");
var queryAlertStr = window.location.search.substring(1).split("&");
	for(x=0;x<queryAlertStr.length;x++){
		var queryAlertSplit = queryAlertStr[x].split("=");
		if(queryAlertSplit[0].toLowerCase() == "error"){
			queryError = queryAlertSplit[1];
			switch(queryError){
				case 'invaliduser':
					alertText = CTxt("Invalid User... Please re-enter");
				break;
				case 'invalidpassword':
					alertText = CTxt("Invalid Password... Please re-enter");
				break;
				case 'invalidemail':
					alertText = CTxt("Invalid Email... Please re-enter");
				break;
				default:
					alertText = CTxt("");
				break;
			}
		}
		if(queryAlertSplit[0].toLowerCase() == "confirm"){
			queryLostEmail = queryAlertSplit[1];
			if(queryAlertSplit[1] == "lostpw"){
				alertText = CTxt("Your e-mail has been sent");
			}
		}
	}
A(showLoginAlertDiv, alertText);
A(showLoginAlert, showLoginAlertDiv);

}
*/