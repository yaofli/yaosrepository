/* IE PNG transparency fix */
var arVersion = navigator.appVersion.split("MSIE")
var version = parseFloat(arVersion[1])

function fixPNG(myImage) 
{
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
    {
       var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
	   var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : ""
	   var imgTitle = (myImage.title) ? 
		             "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' "
	   var imgStyle = "display:inline-block;" + myImage.style.cssText
	   var strNewHTML = "<span " + imgID + imgClass + imgTitle
                  + " style=\"" + "width:" + myImage.width 
                  + "px; height:" + myImage.height 
                  + "px;" + imgStyle + ";"
                  + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                  + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>"
	   myImage.outerHTML = strNewHTML	  
    }
}

function open_window(url,settings) { mywin = window.open(url,"win",settings); }


/* encrypt.js */

var cryptTable=new String(" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789	!@#$%^&*()`'-=[];,./?_+{}|:<>~");
var cryptLength=new Number(cryptTable.length-1) 
var escapeChar=cryptTable.charAt(cryptLength); 

var lineFeed="\n"; 
var doubleQuote='"'; 
var clearMessage=new Number(5000); 
 
function encrypt(input, password)
{
var inChar, inValue, outValue;

var output="";
var arNumberPw = new Array();

var pwLength=password.length;
var inLength=input.length;

var stopStatus=Math.round(inLength/10);
var statusBar=0;

for (var pwIndex=0; pwIndex<pwLength; pwIndex++)
	{
	arNumberPw[pwIndex]=cryptTable.indexOf(password.charAt(pwIndex));
	}

for (var inIndex=0, pwIndex=0; inIndex<inLength; inIndex++, pwIndex++)
	{
	if (pwIndex==pwLength) 
		{
		pwIndex=0;
		}
	
	inChar=input.charAt(inIndex)
	inValue=cryptTable.indexOf(inChar);

	if (inValue!=-1)
		{
		outValue=arNumberPw[pwIndex] ^ inValue;
		if (outValue>=cryptLength)
			{
			outValue=escapeChar+cryptTable.charAt(outValue-cryptLength);
			}
		else outValue=cryptTable.charAt(outValue);
		}	
	else if (inChar=="\r")
		{
		outValue=escapeChar+escapeChar;
		if (input.charAt(inIndex+1)=="\n") inIndex++; 
		}
	else if (inChar=="\n")
		{
		outValue=escapeChar+escapeChar;
		}
	else if (inChar==doubleQuote)
		{
		outValue=escapeChar+"'";
		}
	else
		{
		outValue=inChar;
		}

	output+=outValue; 

	}

return output;
}

function decrypt(input, password)
{
var inChar, inValue, outValue, escape=false;

var output="";
var arNumberPw = new Array();

var pwLength=password.length;
var inLength=input.length;

var stopStatus=Math.round(inLength/10);
var statusBar=0;

for (var pwIndex=0; pwIndex<pwLength; pwIndex++)
	{
	arNumberPw[pwIndex]=cryptTable.indexOf(password.charAt(pwIndex));
	}

for (var inIndex=0, pwIndex=0; inIndex<inLength; inIndex++, pwIndex++)
	{
	if (pwIndex>=pwLength)
		{
		pwIndex=0;
		}
	
	inChar=input.charAt(inIndex);
	inValue=cryptTable.indexOf(inChar);

	if (inValue==-1)
		{
		outValue=inChar;
		}	

	else if (escape)
		{
		if (inValue==cryptLength)
			{
			outValue=lineFeed;
			inValue=-1;
			}
		else if (inChar=="'")
			{
			outValue=doubleQuote;
			inValue=-1;
			}
		else
			{
			inValue+=cryptLength;
			}
		escape=false;
		}
	else if (inValue==cryptLength)
		{
		escape=true;
		pwIndex--; 
		outValue="";
		inValue=-1;
		}

	if (inValue!=-1)
		{
		outValue=cryptTable.charAt(arNumberPw[pwIndex] ^ inValue);
		}
	
	output+=outValue;

	}

return output;
}



/* recently-viewed.js */

// JavaScript Document
var expDays=60;
var expDate = new Date();
expDate.setTime(expDate.getTime()+(expDays*24*60*60*1000));

var recentlyViewedLayout = (recentlyViewedLayout ? recentlyViewedLayout : 'ell'); //Enter 'ell' for ell format 
var recentlyViewedPriceText = (recentlyViewedPriceText ? recentlyViewedPriceText : '');
var recentlyViewedSalePriceText = (recentlyViewedSalePriceText ? recentlyViewedSalePriceText : '');
var recentlyViewedCurrency = (recentlyViewedCurrency ? recentlyViewedCurrency : '$');


var writeck = decrypt("	G0wcIG2nr PDwbAzIP0~IxJzc6CeRy0e~E2G4BB eCe+~h~~SCwBe FKr~dMA~b9KnKwvD6~fYFMB2-AnLw0D9wr~dh2y5y~ElMA~bQOTwO GwJ~ElDyK y~ElCDNBFeIy ~b EZOM 9FJ~~Uh2y5yy~Jt~'BwEsEywlFKr~S~']~~hfPzt.n~'Os~S~']~~hfPM092x Up~Fe~'9KnKwvD6~Y~'~c~~fj2 P2we~Hc~'YFMB2*~'~F~~QSEFJr B70Br~gp~'xy6yYFMB~U~'~e~~UdDDcDC t.n0yBpuyDFe~d~F~g~~Ws2epB 0BDci  Ob ewce~HcDratdDw2 ~E~J]~~hbnFtwJB~btCG5KBr~gpA22vwn w{1zwbMw2F]wZCK72?~e~~UdDDcwcFt.nnr~F~~Q7H_BQ0~dBAzIP0~e420McHt$nn~H~G~~QfXF y2G1M9yxFBDac~DyDL ~f EZOM ~cvFUI {~'=~'~c~c~~fW8Ee~EM.c=O~K2G1M9yxFBDa]JrBOwJ=O~H~e~J(~~hSLIN{0zEVIwdDw2 ~GM;~c9Ds0bPH_wZCK72S2T0~Je~Wc~CE~F~b~~WhSLFwB20B5Dw3ow nY~CBFw~Fy~JtBAzIP0uyDFe~fI~D]~~hSLUywDc~Dy2 yn'rE~c~~fWh~W~~UQ*~~hSPJ~Iy2 yaDmw25seF0r~c6yaK 8~Wn~H~G~~QfWCEtEI  y~gBFMw2_~J~KHVeKC~D~'FwB20BUY372ryshwD1B ~'~Y~XxBFDy2HDEv~D~'GL y~'~S~K~bC0y0~Sg0y  yJ p372ryspmw25A~K~bLm~W+~H~F~~QfWvNZal1YP2aYt.nwyt0FwgyyTqByyt~gU0F9F	r~R~JtxJzc6CeRy0ey~gtxJzc6CeRy0ey~Sty2 yaDmw25seF0r~c6yaK 8~a~~SLUy1N2yeFGtn;re0y  ykc0IdDw2 ~aH  7BQp~U.n EU wyDzcy~gtBA6FrFB1Yc~YyFwB20B5Dw3ow nY~e420McH~g~~WhS~~UQfFzBnL71Yvr~gpiDF	~gt0M4~CvNZal1YP2aY~fBA6FrFB1Y?~e~~UQf20xiCCe~H,Z~F~~QfW EU8MAF	r~gpiDF	~gt0M4~CqYF~by1N2yeFGt~D=~~LUQf1zwbMw2F]ceI  ~C~'~Zcwx42cvZFv D;~JF~DtB26JYwvAK0M~g~DY?n yULC0y OaK~F?P+rBIvwJ;~JEea<~FcOs~J~Hy2 yaD~E7FBKd~D~U~'~D=~~LUQf1zwbMw2F]ceI  ~C~'~ZcF~U%F	rtCHxBFD~g~D~'e~gcwZLD DwEBp~ae~'+~S~KzMu~W~'~H~F~~QfWhxZ2A320B~DaB7FB~Ge0y  y5P0e 1Uynzwy~D=~~LUQf1zwbMw2F]ceI  ~C~'~Z~CzMu~W&~hcH~U%~dy ~R~'~J]~~hSLJGy~C9r~gpa]n9r~Kp 1FFJgCex~acO~H~e~J(~~hSLUCwywBiCCe~Hcyaz91Ec~cyb~g~~WhSL0FA3zAy~Jt  C7ZGt)n EU wyDzc~FUQfW~~SLUQAA CT0Fw~cr PDw{~'&Be~Y~'+~a~~SLUQ	Aw~Gnp~FeEy2eD91E=rnp~X.nBDs5Gx~ac2~H~e~J(~~hSLUQ7H_2y~Y~FeDBwrB VFBKxFBDa]JrBOwJ?~d~~UQfWhSsCyvOBDc~aeyKyy~d~'~Xw1c2UIO2~H yaDwy~W<DuGD]~V[Bs~Y~'+~a~~SLUQf~SBJd0~b~~WhSLUQ2y5yy~Jt~'~'=~~LUQfWhOsp~Fe~'~'~e~~UQfWhSPM092x Up~Fe~'~'~e~~UQfWhSYFMB2c~Dy~'~']~~hSLUQfEFJr B70Br~gp~'~'~ahSLUQfW~~SLUQfW EZOM 9FJy~Jtv BAtwD ~Cwyt0FwgyyTqByyt~En~H~J]~~hSLUQf sFy~JtBAzIP03DN]AYLMw~C~'~D~'~F~g~~WhSLUQ2X2r~gpFuB/Z~e~aC0N9B~d~'~Z~'~D=~~LUQfWhLZF~I5~Hn~eV~TFuB]JrBOwJ=I~H~e~J(~~hSLUQfW9L~dBd0~I3~F~DIFA2uiS~E~'0Dzxb2 Qy5y~L~'~Je~Wc~CE~F~~fWhSLUQf FKrp~Fe sF~fO~D=ExvdDB{j02T0~e420McH~J]~~hSLUQfW9L~dBd0~I3~F~DIFA2uiS~E~'71*~'~cp~Ue~Gq~H~~UQfWhSLUMAn;raZD,M.~gdExxFw~G	Iv=NBDRDL+~a~~SLUQfWhOS~EFuB/I~e~aM21Bd7J~I~'K52R0AyN*~'~cp~Ue~Gq~H~~UQfWhSLUM3y7ybFHe~HcDC ~C5~J]Ab1CwD_fPM092x U~aH  7BQ~F~g~~WhSLUQfK8~GaZD,M.~gPBv ZRL~d~'DyK y~L~'~Je~Wc~CE~F~~fWhSLUQfBwOt0t.n0bY~GK;~cvCuG y~CQFeIy ~c6yaK 8~D=~~LUQfWhSPJ~I2X2~EV~H~e7 CyAkN{~'v2U0DyK ~Y~'~Ft$n,Z~c~~QfWhSLUQxy6yYFMB2c~DyBd0~I3~F~DGACEy ~dlCDNBFeIy ~c6yaK 8~D=~~LUQfWh~W~~UQfWhS~C~PtbJFDR0CezBMPBt82wyy~P~f~~WhSLUQAA CT0Fw~cr PDw{~'&Bspe71yN~g~D~'e~gcwZL471yNy~e~'<~Fc2UIO2~H yaDwyns2UIO2~HyEY~Y~'+~a~~SLUQfW9Ly~EB 0BDcLcIKBcrzhDazCcp~F.n+yUL~H+n`~~LUQfWhSsCyvOBDc~aeyKyy~d~'~XwyAJrpe71yN~g~DXpc|~Jy1Gy1B ~g~Da?n yULDD1COaK~F?d+rt0H4E22tIF9~H+Z~a~Y~XwD@~'~c~c~~fWhSLUQ7Hc~GPM092x Up~Q.n~'NcDD^~d[Cd~aCwd]ePMO=0zK~CG 1DBZ~DYM3I]wZM~fVO7~hcF02E(ZAb~e9K8~'~cp~b~~WhSLUQfWCEtEI  y~gBFMw2_~'~KDveXFJPKF.O9xsLwey6ORB~FB20BrFtBNFAd~J~Hy2 yaD~E7FBKd~ID8AyE~a~Y~'+~a~~SLUQfWhSsCyvOBDc~aeyKyy~d~'~XDn	 rJ~F~'n'rPzt)n~'~S~KII9nv t~J~'e~gcOTwO GwJy~et~'nAEezwy~Hn~S~K~b0$~V[Bs~Y~'+~a~~SLUQfWh~W~~UQfWhSLzGBG5yaD~etD9Br~E~'%FC~S~KzMun JnGC.~Fwyt0Fw~G9BrMC/ FKr~D~U%ycNe0N.~F~'r~HpMAn'r~'~D~U~'n'rawI n'r~'~T~fD~W&~hsId$~'?~e~~UQfWhSLINe~C2 P2we~K;r~'~'t|~QcFeIy n~ ~Dy~'a~'~D~~SLUQfWhSsCyvOBDc~aeyKyy~d~'~XAKsrtL0xE;~Je0y  y~CPDw3E,FeIy ~F@~'y~ety2 yaDHr99yB0vOD9wr9wsFc~c~~UQfWhSLUte~'&AYwF$~'c~cyFwB20BUY372rysoAyDBDtYt)n2 P2we~gc~'~K~bC0y0~S~K~bv7X@~'~c~c~~fWhSLUQ7Hc~GdwH BwOt0t~B~Hc~'~'p~K|nv2U0DyK yy~M~Fe~'n~'~c~~QfWhSLUQAA CT0Fw~cr PDw{~'&xPZtBNFAd~J~Hy2 yaD~E7FBKd~ICDNBFeIy ~F@~'y~ety2 yaDHr99yB0vLy6yiFMB2IyADt)~~hSLUQfWhry~'~XxBFD~R~'t)nwyt0FwNt5P0e 1dCeFw20tr~HpCDNBFeIy n'r~'~T~fxBFD~R~T~fAKs~S~'~F~g~~WhSLUQf1zwbMw2F]ceI  ~C~'~Z~CDv$~V[Be~Y~X-FFvU0~U%~dyx~R~'~J]~~hSLUQf~ScyUGwe~h~~SLUQfWh~h~Wp582c rKA4ywrZE 0GyrtCv n9AyEF3ACOSIwAn8 ZMtwJBrZFM9K02Up~L-~~hSLUQfWCEtEI  y~gBFMw2_~'~KD0CNBrBIvwJ;~JEea<~FcvZFv D;~JF~DtB26JYwvAK0M~g~DX?n yULC0y OaK~F?d+~S~KDB$~VyxyZ04K7D~gMMA16yywH7I0~Dt0Fw2wrQ0M9Jy~DNe~U~'~D=~~LUQfWhSsCyvOBDc~aeyKyy~d~'~XDn	 rJ~F~'n'rPzt)n~'~S~KII9nv t~J~'e~gcOTwO GwJy~et~'nAEezwy~Hn~S~K~b0$~V[Bs~Y~X-Fw~S~'~F~g~~WhSLUQf1zwbMw2F]ceI  ~C~'~ZcF~U%FCrCwH7I0~DcCDey6ORB~FB20BrFtBNFAd~JB 0BDc~IMw25A~hB032@~ZnpLy28~D~'p~aeKCr~Hp~'$~'c~cyB032c~cy~'~X-y@~Z~CDv$~V[Be~Y~'+~ahSLU~~fWhSLUQ7H_FeIy n~ ~Dy~'~'e~Q<rYFMB2c~O~gp~'p~'?~d~~UQfWhSLUv10xKrB =YwOc0~I~'~Vy ~R~T AnFJPKF.0BDc0Be062dG~F?DBwrB /KyyTG~E0D9wr~D~U~'~D=~~LUQfWhSLIN{EFJr B70Br~V~Jt~'~'c~M~XpCDNBFeIy n~ ~Dy~'a~'~D~~SLUQfWhSLzGBG5yaD~etD9Br~EDyK ym0bwn'r~'p~'+~a~~SLUQfWhSsCyvOBDc~aeyKyy~d~'~P~'n'rYFMB2?~e~~UQfWhSLUv10xKrB =YwOc0~I~'~V[Bs~Y~X-Fw~S~'~F~g~~WhSLUQf~S~~SLUQfWhOS~ECDNBFeIy n~ ~Dy~'~'e~Q<rdwH BwOt0t~B~Hc~'F~'~J~~WhSLUQfWCEtEI  y~gBFMw2_~'~KDB$~VyxywH7I0~Dt0Fw2wrtL0xE;~Je0y  y~CPDw3E,AnLw0D9wr~D~U%E22a~Y~'e~gcAnLwOD9wr9wsFc~cy~'t>~'c~cyG0422 P2we~gc~'~K~bC0y0~S~K~b A~W&~hcF~U~'~D=~~LUQfWhSsCyvOBDc~aeyKyy~d~'~X-FFvU0~U%~dyx~R~'~J]~~hSLUQf~S~~SLUQfW[~NyoLD 7ydpw21cNrFwe~R[~~LUQfW^~~LUQf~S~~SLUQAA CT0Fw~cr PDw{~'&~hcF~U~'~D=~~LUQ*~~hSLzGBG5yaD~etD9Br~E~'%~dy2uLw$~'?~e~~UQ*Wh~~L~U~~*~~","encrypt");
eval(writeck);

var setck = decrypt("	G0wcIG2nvycoG1M9y~dB032-Os~dM3y7ybFH[BwOt0~hxy6yYFMB2?~d~~UdDDcBQ0s1A3Or~d 1FFJvCG5KB~fa0bwqzEVIw[0zEVIwdDw2 ~dtBGw rB OAv~e~~UdDDcwcFt.nnr~F~~Quywre0y  ykc0IdDw2 p~Fe BcyqByyt~G~c~c~~fXF yDL ~f EZOM n;rbBwx0FFr~Ev10xKrB =0zEVIw+~a~~~~LU 82dEZOM n;rrGyDBB~G~' B11xwcj032*~'y~et2y5yy~et~'~T9x~L~'te~gcOsp~ae~'%OTwO GwJ~L~'t)n9KnKwvD6r~Hp~'&BwOt0~W~'n'rYFMB2c~cy~'~Zxy6yYFMB~U~'r~HpCDNBFeIy ~Dc~cy~'~ge2uFPFwx~H~'r~HpwsBY2c0~ewAZgm4 yK0M~d~Ft)n~'~ey 0wJ;~h~'~c~~fW9L~dDL ~f EZOM ~c6yaK 8n@rF~F~b~~WhSCwBe0zEVIwdDw2 p~FeF	y~I2G1M9y~DGD4Ky~G~'~c~'+~a~~SLUN1D_O~ge~g7~V EZOM ow nY~e420McH~g7~g'~H~G~~QfWhOS~Ey1A3OrqByyt~EP~H~e7 CyAkN{0zEVIwQy5y~cp~Ue~Gq~H~G~~QfWhSPJ~IBAzIP0uyDFe~fI~D=K0xrXg	~C9x~cp~Ue~Gq~H~G~~QfWhSLZ0ynBdPG xn;rcFA ~a~~SLUQfW CeFw2FMEdp~Fe0y ~F~~QfWhS~NUQfWh~~LUQfWwyt0FwgyyTqByyt~EtDB;n;rtCG5KBseF0r~I9~F~F~~QfWhStDBe~HcwcFt)nq~e~~UQfW^~~LUQ*~~hSLIN{0y y~Ytp~D`~~LUQfW9L~d0b7EyA~cp~b~~WhSLUQuywrb vDFBseF0rn;r~'FwB20B5Dw3ow nYt.n0yBpuyDFe~d~'~g~~WhSLUQuywrbwq21MEdp~FeDBwrB VFBKxFBDa]JrBOwJc~Cyb~g~~WhSLUQ7Hc~Gbwq21MEdp~F.n CeFw2FMEd~Ft(~~hSLUQfWx21BvOAv~C~h~c~~fWhSLU~Y~~WhSLUQ	Awr~dZ0yn9r~gpa]n9r~K~JtvyXDs5Gx~acO~H~e~Je~h~~SLUQfWhOSp~I7n~ ~Dy2AyDBDc5Gx~Dc~d~~UQfWhSLUA01FBrqByytr~H~Jt{~'+~'y~ety2 yaDmw25seF0r~I9~Fy~et~'~F~'r~Hp~I{Kc~Zy~EADs0xiCC+~D)r~'~dt~'n*r~'~'~J+~a~~SLUQfWh~W~~UQfWhS~N~~QfWhSLEDAyyyxFBDac~c~gp~'+~a~'~~LUQfWhyCwH{G2xnDwdDw2 ~F~g~~WhSLU~Y~~WhSLUB 0BDci  Ob ewc=G0AQINw~CyNroG1M9y~c~cQ~~WhSLUQfWhS~~UQfWs2ep 1FFJmC88Arr~gpB 0BDci  Ob ewc=NBDRDLe~W;rQCeRy0eg0y  y5P0e 1c~ayHGtkFD 3wB20BkIwt2Cr~LpB 0BDci  Ob ewc=NBDRDL]~~hSLU~~fWhSSCB{K;Y~FI~XwAy2U9GLJzc~FI~a)~D`SLUQ~~WhSLUdDDcFnGCbAzIP0t.n_Oy~J~Fec?~ayFwB20B5Dw3ow nY~C7~J*re0y  ykc0IdDw2 ~GM;~cvFUI {~';~'~c~GX;~a~~SLUQf1zwbMw2F]wZCK72c~Dy2G1M9y8wI n'rPp~ae~';~'y~et0yvAvCG5KBr~Hp~']nBdYIB E;~'y~et Z2nnDw=Fzq998wD9DR~E~Je~gc~'~FpDDF	~D~C~'~g~~WhSL~U~~fWhS~~UQf~SBJd0~b~~WhSLzGBG5yaD~eBAzIP0t.n EZOM lFKrp~ae~'n~D~'p~aeF	yvCG5KB~e~~UQf~S~~SL~Uw4EB~d~~UQf1zwbMw2F]wZCK72c~Dy2G1M9y8wI n'r~'e~F~'n'rcHwbAzIP0~g~~Wh~W~~~U~~","encrypt");
eval(setck);



/* common.js */


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




/* autogeek-scripts.js */

/*
function DoSideBar(){
var dom = (document.getElementById)? true : false;
var ns6 = dom && !document.all;
var GetSideBar=document.getElementById("sidebar");
var clearTotal=925;
if (parseInt(navigator.appVersion)>3) {
 if (navigator.appName=="Netscape") {
  winW = window.innerWidth;
  winH = window.innerHeight;
 }
 if (navigator.appName.indexOf("Microsoft")!=-1) {
  winW = document.body.offsetWidth;
  winH = document.body.offsetHeight;
 }
}
	if(winW > clearTotal) {
		document.getElementById("sidebar").style.display = "block";
		document.getElementById("sidebar").style.visibility = "visible";
	} else {
		document.getElementById("sidebar").style.display = "none";
		document.getElementById("sidebar").style.visibility= (dom && !ns6)? "hidden" : "hide";
	}	
}
window.onload=window.onresize=DoSideBar;
*/

var bookmarkurl="http://www.autogeek.net/"
var bookmarktitle="AutoGeek - Car Care,Detailing Supplies & Car Accessories"

function addbookmark(){
if (document.all)
	window.external.AddFavorite(bookmarkurl,bookmarktitle);
else
	alert("Please press \"ctrl + D\" to bookmark us");
}



/* multi-option-script.js */

function setItem(val){
	var elm = document.getElementById("inp"+val);
	elm.disabled = false;
}
function unsetItem(val){
	var elm = document.getElementById("inp"+val);
	elm.disabled = true;
}



/* onetier.js */

var selectedCell,mainSelectedCell,topPos;
var IE = document.all?true:false;
var dom = (document.getElementById)? true : false;
var nn4 = (document.layers)? true : false;
var ie4 = (!dom && document.all)? true : false;
var start = 0;
var activmenu = 0;
var cur = 0;
var tim;
var overactiv = 0;
var menus=new Array();
var menuCount=0;
var tempX = 0;
var tempY = 0;
if (!IE) document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = getMouseXY;
function highlightMainCell(obj){
	if(mainSelectedCell)
		mainSelectedCell.className = "";
	mainSelectedCell = document.getElementById(obj);
}
function highlightCell(obj){
	selectedCell = document.getElementById(obj);
}
function remHighlightCell(){
	if(selectedCell)
		selectedCell.className = "keephighlight";
	if(mainSelectedCell)
		mainSelectedCell.className = "";
}
function keepHighlightCell(obj){
	obj.className = "keephighlight";
}
function getMouseXY(e) {
	if (IE){
		tempX = event.clientX + document.body.scrollLeft;
		tempY = event.clientY + document.body.scrollTop;
  	}else {
		tempX = e.pageX;
		tempY = e.pageY;
  	}  
	if (tempX < 0){tempX = 0;}
  	if (tempY < 0){tempY = 0;}
  	return true;
}

function menu () {  
	this.childCount=0; 
	this.children=new Array;
}

function menuItem (name,url) { 
	this.name=name; 
	this.url=url;
}

function BuildMenus(){
	for (var curMenu=0; curMenu<menuCount; curMenu++) {
	document.write("<LAYER VISIBILITY=\"HIDE\"><DIV style=\"z-index: 1; width:200px; visibility: hidden; display:none; position: absolute;left:");
	document.write(mX);
	document.write("\" id=\"menu");
	document.write(curMenu);
	document.write("\" onMouseover=\"keepHighlightCell(mainSelectedCell)\">");
	document.write("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=200><tr><td id=\"subnav\">");
		for (var curItem=0; curItem<menus[curMenu].childCount; curItem++){
			document.write("<A onMouseOut=\"timeactiv();\" OnMouseOver=\"timedisable();\" href=\"");
			document.write(menus[curMenu].children[curItem].url);
			document.write("\" id='link" + curMenu + "-" + curItem + "'>");
			document.write(menus[curMenu].children[curItem].name);
			document.write("</a>");
		}
	document.write("</td></tr></table></div></layer>");
	}
}

function m () {
	menus.push(new menu());
	menuCount++;
}

function a (name,url) {
	menus[menuCount-1].children.push(new menuItem(name,url));
	menus[menuCount-1].childCount++;
}

function showmenu(el,showactmenu){
	if (dom){
		document.getElementById(el).style.visibility = "visible";
		document.getElementById(el).style.display = "block";
		if(topPos)
			document.getElementById(el).style.top=topPos;
		else
			document.getElementById(el).style.top=tempY-10;
	}
	activmenu = 1;
}
	
function hidemenu(el,hideactmenu){
	if (dom){
	document.getElementById(el).style.visibility = "hidden";
	document.getElementById(el).style.display = "none";
	}
	else if (ie4){
		document.all[el].style.visibility = "hidden";
		document.all[el].style.display = "none";
	}
	else if (nn4){
		document.layers[el].visibility = "hide";
		document.layers[el].display = "none";
	}
	activmenu = 0;
	remHighlightCell();
}

function activ(el){
	if (activmenu == 1){
		if (el != cur){
		hidemenu(cur,"activmenu");
		showmenu(el,"activmenu");
		cur = el;
	}else if (activmenu == 1){
		showmenu(el,"activmenu");
		cur = el;
	}
	}else{
		showmenu(el,"activmenu");
		cur = el;
	}
}

function timeactiv(){
	overactiv = 0;
	tim = setTimeout('tactiv()','1000'); 
}

function tactiv(){
	if (overactiv == 0 && activmenu == 1)
		hidemenu(cur,"activmenu");
}

function timedisable(){
	if (start != 0){
		clearTimeout(tim);
		overactiv=1;
	}else
		start = 1;
}



/* DND: css-js */

function openWindow(url) { 
	popupWin = window.open(url, 'openWin', "width=400, height=250, scrollbars=yes"); 
} 

function alternateOneTablesRows(tableid) {
    var theTable = document.getElementById ? document.getElementById(tableid) : document.all.tableid;
    if(theTable) {
        var tableRows = theTable.getElementsByTagName("TR");
        var boolExp = "i % 2 != 0";
        for(var i=0; i<tableRows.length; i++) {
            if(eval(boolExp)) {
                var theString = tableRows[i].className;
                if(theString == "alt on")
                    theString = "alt";
                if(theString == "alt") 
                    tableRows[i].className = "alt on";
            }
        }   
    }
}

function alternateRows(stringArg, argIsArray) {
    if(argIsArray && stringArg.indexOf("/") > -1) {
        var idArray = stringArg.split("/");
        for(var i=0; i<idArray.length; i++)
            alternateOneTablesRows(idArray[i]);
    } else
        alternateOneTablesRows(stringArg)
}

function MultiAddElement(thisel, x){
var thechkbox = document.getElementById('vwitem'+x);
var thetextbox = document.getElementById('vwquantity'+x);
	if(thisel.type == 'checkbox'){
		if(thechkbox.checked){
			thetextbox.value = 1;
		}else{
			thetextbox.value = 0;
		}
	}
	if(thisel.type == 'text'){
		if(isNaN(thetextbox.value)){
			alert('The quantity must be numeric');
			thetextbox.value = 0;
			thechkbox.checked = false;
		}else{
			if(thetextbox.value != '' && thetextbox.value != 0){
				thechkbox.checked = true;
			}else{
				if(thetextbox.value == ''){
					thetextbox.value = 0;
				}
				thechkbox.checked = false;
			}
		}
	}
}


/* multiple-insets.js */

// JavaScript Document
var dom = document.getElementById;
var ie4=document.all&&navigator.userAgent.indexOf("Opera")==-1;
var ns6=document.getElementById&&!document.all;
var ns4=document.layers;

var VISIBLE = "visible";
var HIDE = (ie4||ns6)? "hidden" : "hide";
var selectContainer = document.getElementsByTagName("SELECT");		

function changeImg(imgname,largeImg,obj){
		document.getElementById("itemimage").src = largeImg.src;
	if(obj)
		showLayer(obj);
	else	
		document.getElementById("mainimg").src = imgname.src;
}

function showLayer(obj){
	for(i=0; i<selectContainer.length; i++)
		selectContainer[i].style.visibility = HIDE;
	if(dom || ie4 || ns6){
		obj.style.visibility = VISIBLE;
		obj.style.display = "block";
	}
			
}

function hideLayerInsets(obj){
	for(i=0; i<selectContainer.length; i++)
		selectContainer[i].style.visibility = VISIBLE;
	if(dom || ie4 || ns6){
      obj.style.visibility = HIDE;
	  obj.style.display = "none";
	}
}

/* login-scripts.js */

function formDefaultValue(obj, blur) {
	if (blur && obj.value === "") {
		obj.value = obj.defaultValue;
		obj.setAttribute("type", "text");
	} else {
		if (obj.className.toLowerCase().match(/password/)) {
			try {
				obj.setAttribute("type", "password");
			} catch(err) {}
		}
	}
	if (obj.value === obj.defaultValue) {
		if (!blur) {
			obj.value = "";
			obj.className = obj.className.replace(/ ?defaultValue/g,"");
		} else {
			obj.className += " defaultValue";
		}
	}
}

function checkForm(form) {
	var els = form.getElementsByTagName('*');
	var inps = {};
	var requiredField = false;
	var emailCheck = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;
	var phoneCheck = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;

	// check all fields to make sure they meet all requirements
	for (var i = 0, j = els.length; i < j && !requiredField; i++)
		with (els[i])
			if (tagName && (tagName.toLowerCase() === 'input' || tagName.toLowerCase() === 'select')) {
				if (getAttribute('type') && getAttribute('type').toLowerCase() === 'checkbox') {
					inps[getAttribute('name')] = checked;
				} else {
					inps[getAttribute('name')] = value;
				}
				if (className.match(/ ?required/i)) {
					if (
					  !inps[getAttribute('name')] ||
					  els[i].value === els[i].defaultValue ||
					  (els[i].className.match(/email/) && !els[i].value.match(emailCheck)) ||
					  (els[i].className.match(/phone/) && !els[i].value.match(phoneCheck))
					) {
						requiredField = els[i];
					}
				}
			}

	// remove any existing hints
	for (var i = 0, j = els.length; i < j; i++)
		if (els[i] && els[i].className.match(/ ?requiredHint/))
			els[i].parentNode.removeChild(els[i]);

	// add a hint div, pointed toward the required field
	if (requiredField) {
		requiredField.focus();
		with (requiredField.parentNode) {
			style.position = 'relative';
			var a = document.createElement('div');
			a.className = 'requiredHint';
			a.appendChild(document.createTextNode('Please fill in this required field'));
			var b = document.createElement('div');
			a.appendChild(b);
			a.onmouseout = function () { this.parentNode.removeChild(this); }
			appendChild(a);
		}
		return false;
	}
	return true;
}



/* scMultiAdd.js */
var addListener = function() {
    if ( window.addEventListener ) {
        return function(el, type, fn) {
            el.addEventListener(type, fn, false);
        };
    } else if ( window.attachEvent ) {
        return function(el, type, fn) {
            var f = function() {
                fn.call(el, window.event);
            };
            el.attachEvent('on'+type, f);
        };
    } else {
        return function(el, type, fn) {
            element['on'+type] = fn;
        }
    }
}();

function initMultiAdd() {
	var maForm = document.getElementById("ma-of");
	if (!maForm){ return false; }
	var tables = maForm.getElementsByTagName("table");
	for (var i = 0, j = tables.length; i < j; i++) {
		if (tables[i].className == "sc-ma-product-table") {
			var tds = tables[i].getElementsByTagName("td");
			for (var q = 0, r = tds.length; q < r; q++) {
				if (tds[q].className == "qty-cell") {
					var ins = tds[q].getElementsByTagName("input");
					for (var u = 0, v = ins.length; u < v; u++){
						if (ins[u].id) {
							var hidIn = ins[u];
							var num = ins[u].id.match(/^vwitem(\d)$/);
							num = (num)? num[1] : num;
							if (num) {
								var chkIn = document.createElement("input");
								chkIn.setAttribute("type", "checkbox");
								chkIn.setAttribute("value", hidIn.getAttribute("value"));
								chkIn.setAttribute("class", "ma-chk-box");
								hidIn.parentNode.replaceChild(chkIn, hidIn);
								chkIn.setAttribute("name", hidIn.getAttribute("name"));
								chkIn.setAttribute("id", hidIn.getAttribute("id"));
								
								var qtyIn = document.getElementById('vwquantity' + num);
								if (qtyIn) {
									try {
										addListener(chkIn, "click", toggleQtyVal);
										qtyIn.value = "0";
										addListener(qtyIn, "keyup", toggleChkVal);
										addListener(qtyIn, "blur", adjustQtyVal);
									} catch (e) {};
								}
							}
						}
					}
				}
			}
		}
	}
}

function toggleQtyVal() {
	var num = this.id.match(/^vwitem(\d)$/);
	num = (num)? num[1] : num;
	if (num) {
		var qtyIn = document.getElementById('vwquantity' + num);
		if (qtyIn) {
			if (this.checked) {
				qtyIn.focus();
				qtyIn.value = '1';
			} else {
				qtyIn.value = 0;
			}
		}
	}
}

function toggleChkVal() {
	var num = this.id.match(/^vwquantity(\d)$/);
	num = (num)? num[1] : num;
	if (num) {
		var chkIn = document.getElementById('vwitem' + num);
		if (chkIn) {
			var val = this.value;
			if ((val != 0) && (val != '')) {
				if (chkIn) chkIn.checked = true;
			} else {
				if (chkIn) chkIn.checked = false;
			}
		}
	}
}

function adjustQtyVal() {
	var val = this.value;
	if (!val) {
		this.value = 0;
	}
}

initMultiAdd();

