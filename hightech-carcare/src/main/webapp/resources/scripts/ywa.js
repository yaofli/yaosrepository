var YAHOO;
YAHOO = YAHOO || {};
YAHOO.ywa = YAHOO.ywa || {};
YAHOO.ywa.tracking = YAHOO.ywa.tracking || {};
if (typeof YAHOO.ywa.tracking.Console === "undefined") {
	YAHOO.ywa.tracking.Console = (function() {
		var Private, Public;
		Private = {
			con : null,
			nativeConsole : null,
			enabled : false,
			messageSchemes : {
				TYPE_LOG : {
					foreground : "#000000",
					background : "#ffffff",
					className : "ywatc-console-log"
				},
				TYPE_DEBUG : {
					foreground : "#000000",
					background : "#d7ffc9",
					className : "ywatc-console-debug"
				},
				TYPE_INFO : {
					foreground : "#000000",
					background : "#ebf5ff",
					className : "ywatc-console-info"
				},
				TYPE_WARNING : {
					foreground : "#000000",
					background : "#ffffc8",
					className : "ywatc-console-warning"
				},
				TYPE_ERROR : {
					foreground : "#ff0000",
					background : "#ffebeb",
					className : "ywatc-console-error"
				}
			},
			writeToConsole : function(config) {
				var msgElement;
				if (config.message === undefined || config.message === null
						|| config.message === "") {
					return;
				}
				config.displayType = (Private.messageSchemes[config.displayType] !== undefined ? config.displayType
						: "TYPE_LOG");
				msgElement = document.createElement("div");
				msgElement.className = Private.messageSchemes[config.displayType].className;
				msgElement.style.color = Private.messageSchemes[config.displayType].foreground;
				msgElement.style.backgroundColor = Private.messageSchemes[config.displayType].background;
				msgElement.innerHTML = config.message;
				if (Private.con !== null || Private.con !== undefined) {
					Private.con.appendChild(msgElement);
				}
			}
		};
		Public = {
			log : function(messageToWrite) {
				if (!Private.enabled) {
					return;
				}
				Private.writeToConsole({
					message : messageToWrite,
					displayType : "TYPE_LOG"
				});
				if (Private.nativeConsole && Private.nativeConsole.log) {
					Private.nativeConsole.log(messageToWrite);
				}
			},
			debug : function(messageToWrite) {
				if (!Private.enabled) {
					return;
				}
				Private.writeToConsole({
					message : messageToWrite,
					displayType : "TYPE_DEBUG"
				});
				if (Private.nativeConsole && Private.nativeConsole.debug) {
					Private.nativeConsole.debug(messageToWrite);
				}
			},
			warn : function(messageToWrite) {
				if (!Private.enabled) {
					return;
				}
				Private.writeToConsole({
					message : messageToWrite,
					displayType : "TYPE_WARNING"
				});
				if (Private.nativeConsole && Private.nativeConsole.warn) {
					Private.nativeConsole.warn(messageToWrite);
				}
			},
			info : function(messageToWrite) {
				if (!Private.enabled) {
					return;
				}
				Private.writeToConsole({
					message : messageToWrite,
					displayType : "TYPE_INFO"
				});
				if (Private.nativeConsole && Private.nativeConsole.info) {
					Private.nativeConsole.info(messageToWrite);
				}
			},
			error : function(messageToWrite) {
				if (!Private.enabled) {
					return;
				}
				Private.writeToConsole({
					message : messageToWrite,
					displayType : "TYPE_ERROR"
				});
				if (Private.nativeConsole && Private.nativeConsole.error) {
					Private.nativeConsole.error(messageToWrite);
				}
			},
			clear : function() {
				if (!Private.enabled) {
					return;
				}
				Private.con.innerHTML = "";
				if (Private.nativeConsole && Private.nativeConsole.clear) {
					Private.nativeConsole.clear();
				}
			}
		};
		(function() {
			Private.con = document.createElement("div");
			Private.con.id = "ywa-tracking-console";
			Private.con.style.display = "none";
			Private.con.style.fontFamily = "monospace";
			Private.con.style.fontSize = "11px";
			if (document.body !== null || document.body !== undefined) {
				document.body.appendChild(Private.con);
			}
			if (typeof console !== "undefined") {
				Private.nativeConsole = console;
			}
			if (typeof window.console !== "undefined") {
				Private.nativeConsole = window.console;
			}
			try {
				Private.enabled = YWA_Global_Conf.tracking.enableConsole;
			} catch (eNoYWAGlobalConfAvailable) {
				Private.enabled = false;
			}
		}());
		return Public;
	}());
}
if (typeof YAHOO.ywa.tracking.ColoSetting === "undefined") {
	YAHOO.ywa.tracking.ColoSetting = (function() {
		var Private, Public;
		Private = {
			trackingDomains : {
				US : {
					nonSecure : "a.analytics.yahoo.com",
					secure : "a.analytics.yahoo.com"
				},
				EU : {
					nonSecure : "s.analytics.yahoo.com",
					secure : "s.analytics.yahoo.com"
				},
				ONO : {
					nonSecure : "o.analytics.yahoo.com",
					secure : "o.analytics.yahoo.com"
				},
				APAC : {
					nonSecure : "apac.analytics.yahoo.com",
					secure : "apac.analytics.yahoo.com"
				},
				VSCALE : {
					nonSecure : "z.analytics.yahoo.com",
					secure : "z.analytics.yahoo.com"
				},
				VSCALE2 : {
					nonSecure : "e.analytics.yahoo.com",
					secure : "e.analytics.yahoo.com"
				},
				VSCALE3 : {
					nonSecure : "y.analytics.yahoo.com",
					secure : "y.analytics.yahoo.com"
				},
				VSCALE4 : {
					nonSecure : "y3.analytics.yahoo.com",
					secure : "y3.analytics.yahoo.com"
				}
			},
			defaultTrackingDomain : {
				nonSecure : "a.analytics.yahoo.com",
				secure : "a.analytics.yahoo.com"
			}
		};
		Public = {
			isKnownColo : function(coloId) {
				return (Private.trackingDomains[coloId] !== undefined);
			},
			getColoDescriptor : function(coloId) {
				var result;
				result = {};
				if (Public.isKnownColo(coloId)) {
					result.nonSecure = Private.trackingDomains[coloId].nonSecure;
					result.secure = Private.trackingDomains[coloId].secure;
				} else {
					result.nonSecure = Private.defaultTrackingDomain.nonSecure;
					result.secure = Private.defaultTrackingDomain.secure;
				}
				return result;
			}
		};
		return Public;
	}());
}
if (typeof YAHOO.ywa.tracking.TrackerManager === "undefined") {
	YAHOO.ywa.tracking.TrackerManager = (function() {
		var Private, Public;
		Private = {
			scriptPlace : document.body,
			trackers : {},
			verMajorMinor : "5.1.0.19",
			verBuildTime : "Apr 03, 2014 -  7:38AM",
			verBuildType : "js",
			lockedForTracker : true,
			isSecure : (window.location !== undefined
					&& window.location.protocol !== undefined ? window.location.protocol
					.indexOf("https:") === 0
					: false),
			excludedDomain : "",
			excludeProtocol : "",
			downloadExtension : "\\.pdf$|\\.doc$|\\.dot$|\\.xls$|\\.xlt$|\\.xlw$|\\.ppt$|\\.pps$|\\.zip$|\\.rar$|\\.gz$|\\.gzip$|\\.wav$|\\.mp[3-4]?$|\\.mpeg$",
			enableOverwriteOnclicks : true,
			isOnloadOverwrite : false,
			windowOnload : null,
			flashVer : "",
			isPrerender : false,
			ywaOLH : function(evt) {
				if (Private.windowOnload) {
					Private.windowOnload.call(window, evt);
				}
				if (Private.enableOverwriteOnclicks) {
					Private.addOCHs();
				}
				window.onload = Private.windowOnload;
			},
			ywaOCH : function(evt) {
				var idx;
				for (idx in Private.trackers) {
					if (Private.trackers[idx] !== undefined
							&& Private.trackers[idx] !== null
							&& Private.trackers[idx].onclickOverwrite) {
						Private.trackers[idx].onclickOverwrite(this);
					}
				}
				return (this.ywaOnClick ? this.ywaOnClick(evt) : true);
			},
			addOLH : function() {
				var a;
				if (Private.isOnloadOverwrite) {
					return;
				}
				a = [];
				if (window.screen || a.toSource || (a.shift && Private.mic)) {
					if (window.onload && !Private.windowOnload) {
						Private.windowOnload = window.onload;
					}
					window.onload = Private.ywaOLH;
				}
				Private.isOnloadOverwrite = true;
			},
			addOCHs : function() {
				var i, ln;
				for (i = 0, ln = document.links.length; i < ln; i += 1) {
					if (document.links[i].onclick) {
						document.links[i].ywaOnClick = document.links[i].onclick;
					}
					document.links[i].onclick = Private.ywaOCH;
				}
			},
			mxRgXpStr : function(e) {
				while (e.indexOf(" ") >= 0) {
					e = e.replace(" ", "");
				}
				var i, j, b, bl, r, a, al;
				r = "";
				a = e.split(",");
				for (i = 0, al = a.length; i < al; i += 1) {
					b = a[i].split(".");
					for (j = 0, bl = b.length; j < bl; j += 1) {
						if (b[j].indexOf("*") >= 0) {
							b[j] = ".+";
						}
					}
					if (bl > 0) {
						a[i] = b.join("\\.");
					}
				}
				if (al > 0) {
					r += a.join("$|^");
				}
				if (r.length > 0) {
					return "^" + r + "$";
				}
				return "";
			},
			ehDocVisibilityChange : function(e) {
				var idx, ittl;
				if (!Private.isPrerender) {
					return;
				}
				for (idx = 0, ittl = window.ITTs.length; idx < ittl; idx += 1) {
					if (window.ITTs[idx].submit !== undefined) {
						window.ITTs[idx].submit();
					}
				}
				Private.isPrerender = false;
			},
			checkDomainValidity : function(domain) {
				var formatChecker;
				formatChecker = /\.yahoo\.com$/i;
				if (domain.secure === undefined || domain.secure === null
						|| domain.nonSecure === undefined
						|| domain.nonSecure === null) {
					return false;
				}
				return (formatChecker.test(domain.secure) && formatChecker
						.test(domain.nonSecure));
			},
			setTrackingDomains : function(coloId, presetDomain) {
				var result, predefinedDomain;
				result = {
					nonSecure : "",
					secure : ""
				};
				predefinedDomain = YAHOO.ywa.tracking.ColoSetting
						.getColoDescriptor(coloId);
				if (presetDomain) {
					result.secure = presetDomain.secure
							|| presetDomain.nonSecure;
					result.nonSecure = presetDomain.nonSecure;
				} else {
					result.secure = predefinedDomain.secure;
					result.nonSecure = predefinedDomain.nonSecure;
				}
				if (!Private.checkDomainValidity(result)) {
					throw new Error(
							"[YWA-TrackerManager] Tracking domain is not a valid Yahoo! domain.");
				}
				return result;
			}
		};
		Public = {
			getDPID : function() {
				return "" + Math.floor(Math.random() * 4294967295);
			},
			getScriptPlace : function() {
				return Private.scriptPlace;
			},
			version : function() {
				return Private.verMajorMinor;
			},
			buildType : function() {
				return Private.verBuildType;
			},
			buildTime : function() {
				return Private.verBuildTime;
			},
			versionAndType : function() {
				return Public.version() + "." + Public.buildType();
			},
			fullVersion : function() {
				return Public.versionAndType() + " " + Public.buildTime();
			},
			isLockedForTracker : function() {
				return Private.lockedForTracker;
			},
			createTracker : function(trackerConfiguration) {
				var resultTracker;
				if (trackerConfiguration === undefined
						|| trackerConfiguration === null) {
					throw new Error(
							"[YWA-TrackerManager] Unavailable configuration descriptor to create a tracker.");
				}
				if (!trackerConfiguration.projectId) {
					throw new Error(
							"[YWA-TrackerManager] Undefined project ID in configuration descriptor.");
				}
				Private.lockedForTracker = false;
				trackerConfiguration.coloId = trackerConfiguration.coloId || "";
				trackerConfiguration.domainSetting = Private
						.setTrackingDomains(trackerConfiguration.coloId,
								trackerConfiguration.domainSetting);
				trackerConfiguration.enableOnclickHandler = ((trackerConfiguration.enableOnclickHandler !== undefined && trackerConfiguration.enableOnclickHandler !== null) ? trackerConfiguration.enableOnclickHandler
						: true);
				trackerConfiguration.excludeParameters = trackerConfiguration.excludeParameters
						|| "";
				trackerConfiguration.excludeProtocol = trackerConfiguration.excludeProtocol
						|| Public.getExcludeProtocol();
				resultTracker = new YAHOO.ywa.tracking.Tracker(
						trackerConfiguration);
				Private.trackers[trackerConfiguration.projectId] = resultTracker;
				window.ITTs[resultTracker.getITTIdx()] = resultTracker;
				Private.lockedForTracker = true;
				YAHOO.ywa.tracking.Console.log("[YWA-TrackerManager][PID="
						+ trackerConfiguration.projectId
						+ "] Tracker object is created.");
				return resultTracker;
			},
			getTracker : function() {
				var rst;
				if (arguments.length < 1 || arguments[0] === null) {
					throw new Error("[YWA-TrackerManager] Undefined project ID");
				}
				if (Private.trackers[arguments[0]]) {
					rst = Private.trackers[arguments[0]];
				} else {
					if (arguments.length < 2
							|| YAHOO.ywa.tracking.ColoSetting
									.isKnownColo(arguments[1])) {
						rst = Public.createTracker({
							projectId : arguments[0],
							coloId : arguments[1]
						});
					} else {
						rst = Public.createTracker({
							projectId : arguments[0],
							domainSetting : {
								secure : arguments[2] || arguments[1],
								nonSecure : arguments[1]
							}
						});
					}
				}
				return rst;
			},
			getIsSecure : function() {
				return Private.isSecure;
			},
			getExcludeDomains : function() {
				return Private.excludedDomain;
			},
			getExcludeProtocol : function() {
				return Private.excludeProtocol;
			},
			getDownloadExtension : function() {
				return Private.downloadExtension;
			},
			getEnableOverwriteOnclicks : function() {
				return Private.enableOverwriteOnclicks;
			},
			setEnableOverwriteOnclicks : function(o) {
				Private.enableOverwriteOnclicks = ((o !== undefined && o !== null) ? o
						: true);
			},
			gcpn : function(x) {
				var k, l, z, i, j;
				z = location.search;
				i = z.indexOf("?" + x + "=");
				j = z.indexOf("&" + x + "=");
				if ((i === 0) || (j > -1)) {
					k = (i === 0) ? 0 : j;
					l = z.indexOf("&", k + 1);
					return z.substring(k + 2 + x.length, (l > -1) ? l
							: z.length);
				}
				return "";
			},
			getFileName : function(x) {
				var i;
				i = x.indexOf("?");
				x = ((i > 0) ? x.substring(0, i) : x);
				return x.substring(x.lastIndexOf("/") + 1, x.length);
			},
			gh : function(x) {
				var i;
				i = x.host.indexOf(":");
				return (i >= 0) ? x.host.substring(0, i) : x.host;
			},
			ghs : function(x) {
				var i;
				i = x.indexOf("//");
				if (i >= 0) {
					x = x.substring(i + 2, x.length);
					i = x.indexOf("/");
					if (i >= 0) {
						return x.substring(0, i);
					}
					return x.substring(i + 2, x.length);
				}
				return "";
			},
			gpr : function(x) {
				var y, i;
				y = x.protocol;
				i = y.indexOf(":");
				return (i >= 0) ? y : y + ":";
			},
			gp : function(x) {
				var y, i;
				y = x.pathname;
				i = y.indexOf("/");
				return (i === 0) ? y : "/" + y;
			},
			mxDmnRGXP : function(v) {
				if (v.toUpperCase().indexOf("REGEXP:") === 0) {
					return new RegExp(v.substring(7), "i");
				} else {
					return new RegExp(Private.mxRgXpStr(v), "i");
				}
			},
			getCookie : function(name) {
				var start, end, dc, pos;
				dc = document.cookie || "";
				pos = dc.indexOf(name + "=");
				if (pos !== -1) {
					start = pos + name.length + 1;
					end = dc.indexOf(";", start);
					if (end === -1) {
						end = dc.length;
					}
					return dc.substring(start, end);
				}
				return "";
			},
			setCookie : function(name, value, off, dom, path) {
				var expiry, cookie, d;
				d = new Date();
				d.setTime(d.getTime() + (off * 1000));
				expiry = ((off >= 0) ? "; expires=" + d.toGMTString()
						: "; expires=Thu, 01-Jan-1970 00:00:01 GMT");
				cookie = name + "=" + value + expiry + "; path=" + path
						+ ((dom !== "") ? ("; domain=" + dom) : (""));
				document.cookie = cookie;
			},
			deleteCookie : function(name, dom, path) {
				return Public.setCookie(name, "1", -1, dom, path);
			},
			parseCookieData : function(cookieValue, pid) {
				var i, result, cookies, tmp, excl;
				result = decodeURIComponent(cookieValue).split(";");
				cookies = {};
				for (i = 0, excl = result.length; i < excl; i += 1) {
					tmp = result[i].split(":");
					cookies[tmp[0]] = tmp[1];
				}
				if (pid) {
					return cookies[pid];
				}
				return cookies;
			},
			serializeCookieData : function(cookies) {
				var key, data;
				data = [];
				for (key in cookies) {
					if (key && cookies[key]) {
						data.push(key + ":" + cookies[key]);
					}
				}
				return encodeURIComponent(data.join(";"));
			},
			flash : function() {
				if (Private.flashVer === "") {
					var swVer2, fd, np, sVBSwfVer;
					fd = "";
					np = navigator.plugins;
					if (typeof np !== "undefined" && np !== null
							&& np.length > 0) {
						if (np["Shockwave Flash 2.0"] || np["Shockwave Flash"]) {
							swVer2 = np["Shockwave Flash 2.0"] ? " 2.0" : "";
							fd = np["Shockwave Flash" + swVer2].description;
						}
					} else {
						sVBSwfVer = function(i) {
							var swC;
							swC = new ActiveXObject(
									"ShockwaveFlash.ShockwaveFlash." + i);
							return ((swC !== undefined && swC !== null) ? swC
									.GetVariable("$version") : 0);
						};
						try {
							fd = sVBSwfVer(1);
						} catch (eNoActiveXAvailable) {
							fd = "unknown";
						}
					}
					Private.flashVer = fd;
				}
				return Private.flashVer;
			},
			windowErrorHandler : function() {
				if (Public.errorId !== "") {
					window.ITTs[Public.errorId].submitError();
				}
			},
			isDocVisibilityEqualsTo : function(v) {
				if (v !== "visible" && v !== "hidden" && v !== "preview"
						&& v !== "prerender") {
					return false;
				}
				return ((document.webkitVisibilityState !== undefined && document.webkitVisibilityState === v) || (document.visibilityState !== undefined && document.visibilityState === v));
			},
			submitTracker : function(projectId) {
				if (Private.trackers[projectId] !== undefined
						&& Private.trackers[projectId] !== null
						&& Private.trackers[projectId].submit) {
					Private.trackers[projectId].submit();
				}
			},
			submitTrackers : function() {
				var projectId;
				for (projectId in Private.trackers) {
					if (Private.trackers[projectId] !== undefined
							&& Private.trackers[projectId] !== null) {
						Public.submitTracker(projectId);
					}
				}
			},
			createBeaconDescriptor : function() {
				return {
					trackingDomain : "",
					scriptParent : null,
					version : "",
					TrackerDescriptor : {},
					EnvironmentDescriptor : {},
					PageDescriptor : {},
					Additional : {}
				};
			}
		};
		(function() {
			var heads;
			window.ITTs = [];
			try {
				heads = document.getElementsByTagName("head");
				if (heads !== undefined && heads !== null && heads.length > 0) {
					Private.scriptPlace = heads[0];
				}
			} catch (eNoHeadAvailable) {
			}
			Private.isPrerender = Public.isDocVisibilityEqualsTo("prerender");
			if (document.attachEvent) {
				document.attachEvent("webkitvisibilitychange",
						Private.ehDocVisibilityChange);
				document.attachEvent("visibilitychange",
						Private.ehDocVisibilityChange);
			}
			if (document.addEventListener) {
				document.addEventListener("webkitvisibilitychange",
						Private.ehDocVisibilityChange, false);
				document.addEventListener("visibilitychange",
						Private.ehDocVisibilityChange, false);
			}
			Private.addOLH();
		}());
		return Public;
	}());
	window.YWA = YAHOO.ywa.tracking.TrackerManager;
}
if (typeof YAHOO.ywa.tracking.Tracker === "undefined") {
	YAHOO.ywa.tracking.Tracker = function(trackerConfiguration) {
		var Private, Public;
		Private = {
			tm : YAHOO.ywa.tracking.TrackerManager,
			beaconDescriptor : null,
			config : {
				domainSetting : {},
				index : window.ITTs.length,
				enableOnclickHandler : true,
				isPageViewTracked : false,
				isNoErrorOccured : true,
				excludeParameters : "",
				excludeDomains : "",
				excludeProtocol : "",
				excludePath : "",
				downloadExtensions : "",
				domains : "",
				isNotAllowedToSendBeacon : false,
				isColoInitialized : false,
				fpCookieName : "",
				fpCookieDomain : "",
				fpCookiePath : "/"
			},
			getClnUrl : function(u) {
				var u2, p, exc, exc2, excl, i, r, k, pn, re, nonexc, pl, accept, specchars, a;
				nonexc = "_S_PEPOS,_S_PEPRM";
				specchars = [ "[", "]" ];
				if (Private.config.excludeParameters === undefined
						|| Private.config.excludeParameters === null) {
					return u;
				}
				u2 = u.split("?");
				if (u2 !== undefined && u2.length === 1) {
					return u;
				}
				p = u2[1].split("&");
				exc = ((Private.config.excludeParameters.indexOf(";") >= 0) ? Private.config.excludeParameters
						.split(";")
						: Private.config.excludeParameters.split(","));
				exc2 = [];
				i = 0;
				for (k = 0, excl = exc.length; k < excl; k += 1) {
					if ((k < excl - 1) || ((k === excl - 1) && (exc[k] !== ""))) {
						exc2[i] = exc[k];
						i += 1;
					}
				}
				excl = i;
				r = "";
				for (k = 0, pl = p.length; k < pl; k += 1) {
					pn = p[k].split("=")[0];
					for (i = 0; i < specchars.length; i += 1) {
						a = pn.indexOf(specchars[i]);
						if (a >= 0) {
							pn = pn.substring(0, a) + "\\"
									+ pn.substring(a, pn.length);
						}
					}
					accept = true;
					re = new RegExp("\\b" + pn + "\\b", "gi");
					for (i = 0; i < excl; i += 1) {
						accept = accept
								&& (((pn.length > 0) && (!re.test(exc2[i]))) || ((pn.length === 0) && (exc2[i] !== "")));
					}
					if (accept) {
						r += ((r.length > 0) ? "&" : "") + p[k];
					}
				}
				return u2[0] + ((r.length > 0) ? "?" + r : "");
			},
			getBeaconDescriptor : function() {
				var descriptor, isAnyType, isNumber, isInteger, isObject, isArray, isDate, cloneSubDescriptor;
				isAnyType = function(pValue, pstrType) {
					return (typeof pValue === pstrType.toLowerCase());
				};
				isNumber = function(pnumValue) {
					return isAnyType(pnumValue, "number");
				};
				isInteger = function(pintValue) {
					if (!isNumber(pintValue)) {
						return false;
					}
					return (parseInt(pintValue, 10) === pintValue);
				};
				isObject = function(pobjValue) {
					return isAnyType(pobjValue, "object");
				};
				isArray = function(parrValue) {
					if (parrValue === null || parrValue === undefined) {
						return false;
					}
					return ((isObject(parrValue)) && (parrValue.reverse) && (parrValue
							.valueOf().toString() === parrValue.toString()));
				};
				isDate = function(pdateValue) {
					if (pdateValue === null || pdateValue === undefined) {
						return false;
					}
					return ((isObject(pdateValue))
							&& (isInteger(pdateValue.valueOf())) && (pdateValue
							.valueOf().toString() !== pdateValue.toString()));
				};
				cloneSubDescriptor = function(subDescriptor,
						targetSubDescriptor) {
					var key;
					if (subDescriptor === undefined) {
						return undefined;
					}
					if (subDescriptor === null) {
						return null;
					}
					for (key in subDescriptor) {
						if (isDate(subDescriptor[key])) {
							targetSubDescriptor[key] = new Date(
									subDescriptor[key].getTime());
						} else {
							if (isArray(subDescriptor[key])) {
								targetSubDescriptor[key] = subDescriptor
										.slice(0);
							} else {
								if (isObject(subDescriptor[key])) {
									targetSubDescriptor[key] = cloneSubDescriptor(subDescriptor[key]);
								} else {
									targetSubDescriptor[key] = subDescriptor[key];
								}
							}
						}
					}
				};
				descriptor = Private.tm.createBeaconDescriptor();
				descriptor.trackingDomain = Private.beaconDescriptor.trackingDomain;
				descriptor.scriptParent = Private.beaconDescriptor.scriptParent;
				descriptor.version = Private.beaconDescriptor.version;
				cloneSubDescriptor(Private.beaconDescriptor.TrackerDescriptor,
						descriptor.TrackerDescriptor);
				if (!Private.config.isPageViewTracked) {
					cloneSubDescriptor(
							Private.beaconDescriptor.EnvironmentDescriptor,
							descriptor.EnvironmentDescriptor);
				}
				cloneSubDescriptor(Private.beaconDescriptor.PageDescriptor,
						descriptor.PageDescriptor);
				cloneSubDescriptor(Private.beaconDescriptor.Additional,
						descriptor.Additional);
				return descriptor;
			},
			setupEnviromentDescriptor : function() {
				var its, pt, t, r, date;
				its = [];
				t = "";
				r = document.referrer || "";
				Private.tm.errorId = Private.config.index;
				if (Private.beaconDescriptor.PageDescriptor.referrer !== undefined
						&& Private.beaconDescriptor.PageDescriptor.referrer !== null
						&& Private.beaconDescriptor.PageDescriptor.referrer.length > 0) {
					r = Private.beaconDescriptor.PageDescriptor.referrer;
				} else {
					if ((navigator.userAgent.indexOf("Mac") >= 0)
							&& (navigator.userAgent.indexOf("MSIE 4") >= 0)) {
						r = document.referrer || "";
					} else {
						if (Private.config.isNoErrorOccured) {
							Private.tm.windowOnerror = window.onerror;
							window.onerror = Private.tm.windowErrorHandler;
							try {
								if (document.location.href !== top.location.href) {
									r = top.document.referrer;
									t = top.location.href;
								}
							} catch (eNoTopDefined) {
								Private.beaconDescriptor.PageDescriptor.isNoReferrer = "webkit";
							}
						} else {
							Private.beaconDescriptor.PageDescriptor.isNoReferrer = "t";
						}
					}
				}
				if (Private.tm.windowOnerror) {
					window.onerror = Private.tm.windowOnerror;
				} else {
					window.onerror = null;
				}
				if (r.length > 0) {
					pt = (Private.config.domains !== undefined && Private.config.domains !== null) ? Private.tm
							.mxDmnRGXP(Private.config.domains)
							: Private.tm.mxDmnRGXP(Private.tm.gh(location));
					Private.beaconDescriptor.PageDescriptor.referrer = (pt
							.test(Private.tm.ghs(r)) ? Private.getClnUrl(r) : r);
				}
				if (t.length > 0) {
					Private.beaconDescriptor.PageDescriptor.topLocation = t;
				}
				date = new Date();
				date.ywaStandardTimezoneOffset = (function() {
					var january, july;
					january = new Date(new Date().getFullYear(), 0, 1);
					july = new Date(new Date().getFullYear(), 6, 1);
					return Math.max(january.getTimezoneOffset(), july
							.getTimezoneOffset());
				}());
				Private.beaconDescriptor.Additional.trackingDate = date
						.toGMTString();
				Private.beaconDescriptor.EnvironmentDescriptor.timezoneOffset = parseInt(
						date.getTimezoneOffset() / 60, 10)
						+ (date.getTimezoneOffset() < date.ywaStandardTimezoneOffset ? "d"
								: "");
				Private.beaconDescriptor.EnvironmentDescriptor.navigatorLanguage = navigator.language
						|| navigator.userLanguage || "unknown";
				Private.beaconDescriptor.EnvironmentDescriptor.navigatorJava = (typeof navigator.javaEnabled === "function"
						&& navigator.javaEnabled() ? "Y" : "N");
				try {
					Private.beaconDescriptor.EnvironmentDescriptor.screenDimension = screen.width
							+ "x" + screen.height;
					Private.beaconDescriptor.EnvironmentDescriptor.colorDepth = screen.colorDepth
							|| screen.pixelDepth || "unknown";
				} catch (eNoScreenProperties) {
				}
				Private.beaconDescriptor.EnvironmentDescriptor.cookieSupport = "true";
			},
			reset : function() {
				Private.beaconDescriptor.Additional = {};
			},
			checkDPID : function() {
				var oldDpCookie, cookieData = Private.tm
						.parseCookieData(Private.tm.getCookie("ywandp"));
				if (Private.beaconDescriptor.TrackerDescriptor.dpId === ""
						|| Private.beaconDescriptor.TrackerDescriptor.dpId === undefined
						|| Private.beaconDescriptor.TrackerDescriptor.dpId === null) {
					oldDpCookie = Private.tm
							.getCookie("ywadp"
									+ Private.beaconDescriptor.TrackerDescriptor.projectId);
					if (oldDpCookie) {
						cookieData[Private.beaconDescriptor.TrackerDescriptor.projectId] = oldDpCookie;
						Private.tm
								.deleteCookie(
										"ywadp"
												+ Private.beaconDescriptor.TrackerDescriptor.projectId,
										Private.config.fpCookieDomain,
										Private.config.fpCookiePath);
					} else {
						cookieData[Private.beaconDescriptor.TrackerDescriptor.projectId] = Private.tm
								.getDPID();
					}
					Private.beaconDescriptor.TrackerDescriptor.dpId = cookieData[Private.beaconDescriptor.TrackerDescriptor.projectId];
					Private.tm.setCookie("ywandp", Private.tm
							.serializeCookieData(cookieData), 94608000,
							Private.config.fpCookieDomain,
							Private.config.fpCookiePath);
				}
			},
			track : function() {
				if (Private.tm.isDocVisibilityEqualsTo("prerender")) {
					return;
				}
				Private.checkDPID();
				if (Private.config.isNotAllowedToSendBeacon) {
					return;
				}
				if (!Private.config.isPageViewTracked) {
					Private.setupEnviromentDescriptor();
				}
				if (!Public.isProtocolExcluded()) {
					Private.config.isColoInitialized = true;
					YAHOO.ywa.tracking.BeaconScheduler.addToQueue(Private
							.getBeaconDescriptor());
				} else {
					YAHOO.ywa.tracking.Console.warn("[YWA-BeaconScheduler] '"
							+ Public.getBeaconUrl()
							+ "' isn't tracked due to excluded protocol.");
				}
				Private.config.isPageViewTracked = true;
				Private.reset();
				Private.tm.errorId = "";
			},
			exitlink : function(ln) {
				Private.beaconDescriptor.Additional.exitUrl = ln;
				Private.track();
			}
		};
		Public = {
			FPCV : "",
			isOnclickHandlerEnabled : function() {
				return Private.config.enableOnclickHandler;
			},
			setOnclickHandlerEnabled : function(pboolEnable) {
				Private.config.enableOnclickHandler = pboolEnable;
			},
			onclickOverwrite : function(x) {
				var pt, fn;
				if (!Private.config.enableOnclickHandler) {
					return;
				}
				if (Public.isDomainExcluded(Private.tm.gh(x))) {
					YAHOO.ywa.tracking.Console
							.warn("[YWA-Tracker][PID="
									+ Private.beaconDescriptor.TrackerDescriptor.projectId
									+ "] '" + Private.tm.ghs(x.href)
									+ "' isn't tracked as exitlink.");
					return true;
				}
				if (x.pathname !== undefined && x.pathname !== null) {
					fn = Private.tm.getFileName(x.pathname);
					if (fn !== "") {
						pt = new RegExp(Public.getDownloadExts(), "i");
						if (pt.test(fn) && (fn.indexOf(".") !== -1)) {
							if (((Private.config.excludePath !== "") && (!Private.tm
									.mxDmnRGXP(Private.config.excludePath)
									.test(x.pathname)))
									|| (Private.config.excludePath.length === 0)) {
								Public.download(x.href);
							}
						} else {
							Public.el(x);
						}
					} else {
						Public.el(x);
					}
				}
			},
			initializeTrackingDomain : function(coloId) {
				if (Private.config.isColoInitialized) {
					return;
				}
				Private.config.isColoInitialized = true;
				Private.config.domainSetting = YAHOO.ywa.tracking.ColoSetting
						.getColoDescriptor(coloId);
				try {
					Private.beaconDescriptor.trackingDomain = (window.location.protocol
							.indexOf("https:") === 0 ? "https://"
							+ Private.config.domainSetting.secure : "http://"
							+ Private.config.domainSetting.nonSecure);
				} catch (eNoWindowLocation) {
					Private.beaconDescriptor.trackingDomain = "http://"
							+ Private.config.domainSetting.nonSecure;
				}
			},
			getBeaconUrl : function() {
				return YAHOO.ywa.tracking.BeaconScheduler
						.getTrackingUrl(Private.getBeaconDescriptor());
			},
			getITTIdx : function() {
				return Private.config.index;
			},
			getSessionId : function() {
				return Private.beaconDescriptor.TrackerDescriptor.sessionId;
			},
			setSessionId : function(sessionId) {
				Private.beaconDescriptor.TrackerDescriptor.sessionId = sessionId;
			},
			getSpaceId : function() {
				return Private.beaconDescriptor.TrackerDescriptor.spaceId;
			},
			setSpaceId : function(spaceId) {
				Private.beaconDescriptor.TrackerDescriptor.spaceId = spaceId;
			},
			getDocumentName : function() {
				return Private.beaconDescriptor.PageDescriptor.documentName;
			},
			setDocumentName : function(dn) {
				Private.beaconDescriptor.PageDescriptor.documentName = dn;
			},
			getDocumentGroup : function() {
				return Private.beaconDescriptor.PageDescriptor.documentGroup;
			},
			setDocumentGroup : function(dg) {
				Private.beaconDescriptor.PageDescriptor.documentGroup = dg;
			},
			getMemberId : function() {
				return Private.beaconDescriptor.PageDescriptor.memberId;
			},
			setMemberId : function(m) {
				Private.beaconDescriptor.PageDescriptor.memberId = m;
			},
			getAction : function() {
				return Private.beaconDescriptor.Additional.action;
			},
			setAction : function(a) {
				Private.beaconDescriptor.Additional.action = a;
			},
			getAmount : function() {
				return Private.beaconDescriptor.Additional.amount;
			},
			setAmount : function(a) {
				Private.beaconDescriptor.Additional.amount = a;
			},
			getOrderId : function() {
				return Private.beaconDescriptor.Additional.orderId;
			},
			setOrderId : function(oi) {
				Private.beaconDescriptor.Additional.orderId = oi;
			},
			getTax : function() {
				return Private.beaconDescriptor.Additional.tax;
			},
			setTax : function(t) {
				Private.beaconDescriptor.Additional.tax = t;
			},
			getShipping : function() {
				return Private.beaconDescriptor.Additional.shipping;
			},
			setShipping : function(s) {
				Private.beaconDescriptor.Additional.shipping = s;
			},
			getDiscount : function() {
				return Private.beaconDescriptor.Additional.discount;
			},
			setDiscount : function(d) {
				Private.beaconDescriptor.Additional.discount = d;
			},
			getSKU : function() {
				return Private.beaconDescriptor.Additional.sku;
			},
			setSKU : function(s) {
				Private.beaconDescriptor.Additional.sku = s;
			},
			getUnits : function() {
				return Private.beaconDescriptor.Additional.units;
			},
			setUnits : function(u) {
				Private.beaconDescriptor.Additional.units = u;
			},
			getAmounts : function() {
				return Private.beaconDescriptor.Additional.amounts;
			},
			setAmounts : function(a) {
				Private.beaconDescriptor.Additional.amounts = a;
			},
			getCmpQuery : function() {
				return Private.beaconDescriptor.Additional.campaignQuery;
			},
			setCmpQuery : function(c) {
				Private.beaconDescriptor.Additional.campaignQuery = c;
			},
			getCampaign : function() {
				return Private.beaconDescriptor.Additional.campaign;
			},
			setCampaign : function(campaignName, campaignParameter) {
				Private.beaconDescriptor.Additional.campaign = campaignName
						+ "#" + campaignParameter;
			},
			getPromo : function() {
				return Private.beaconDescriptor.Additional.promo;
			},
			setPromo : function(promoName, promoParameter) {
				Private.beaconDescriptor.Additional.promo = promoName + "#"
						+ promoParameter;
			},
			getISK : function() {
				return Private.beaconDescriptor.Additional.internalSearchKey;
			},
			setISK : function(i) {
				Private.beaconDescriptor.Additional.internalSearchKey = i;
			},
			getISR : function() {
				return Private.beaconDescriptor.Additional.internalSearchResult;
			},
			setISR : function(i) {
				Private.beaconDescriptor.Additional.internalSearchResult = i;
			},
			getEF : function(n) {
				n = parseInt(n, 10);
				return Private.beaconDescriptor.Additional["extraField" + n];
			},
			setEF : function(n, v) {
				n = parseInt(n, 10);
				Private.beaconDescriptor.Additional["extraField" + n] = v;
			},
			getCF : function(n) {
				n = parseInt(n, 10);
				return Private.beaconDescriptor.Additional["customField"
						+ ((n < 10) ? "0" : "") + n];
			},
			setCF : function(n, v) {
				n = parseInt(n, 10);
				Private.beaconDescriptor.Additional["customField"
						+ ((n < 10) ? "0" : "") + n] = v;
			},
			getDebug : function() {
				return false;
			},
			getRun : function() {
				return Private.config.isNotAllowedToSendBeacon;
			},
			setRun : function(r) {
				if (r === undefined || r === null || r) {
					Private.config.isNotAllowedToSendBeacon = (Private.beaconDescriptor.TrackerDescriptor.projectId !== undefined);
				} else {
					Private.config.isNotAllowedToSendBeacon = false;
				}
			},
			getUrl : function() {
				return Private.beaconDescriptor.PageDescriptor.url;
			},
			setUrl : function(u) {
				Private.beaconDescriptor.PageDescriptor.url = Private
						.getClnUrl(u);
			},
			getEncoding : function() {
				return Private.beaconDescriptor.PageDescriptor.encoding;
			},
			setEncoding : function(e) {
				Private.beaconDescriptor.PageDescriptor.encoding = ((e !== undefined && e !== null) ? e
						: "");
			},
			getCookieDomain : function() {
				return Private.config.fpCookieDomain;
			},
			setCookieDomain : function(d) {
				Private.config.fpCookieDomain = ((d !== undefined && d !== null && d !== "") ? d
						: "");
			},
			getCookiePath : function() {
				return Private.config.fpCookiePath;
			},
			setCookiePath : function(p) {
				if (p !== undefined && p !== null && p !== "") {
					if (p.charAt(0) !== "/") {
						p = "/" + p;
					}
					Private.config.fpCookiePath = p;
				} else {
					Private.config.fpCookiePath = "/";
				}
			},
			getTPSC : function() {
				return (Private.beaconDescriptor.TrackerDescriptor.thirdPartySessionCookie === 1);
			},
			setTPSC : function(n) {
				Private.beaconDescriptor.TrackerDescriptor.thirdPartySessionCookie = (n === true ? 1
						: "");
			},
			getReferrer : function() {
				return Private.beaconDescriptor.PageDescriptor.referrer;
			},
			setReferrer : function(r) {
				if (r !== undefined && r !== null && r.length > 0) {
					Private.beaconDescriptor.PageDescriptor.referrer = r;
				}
			},
			getDomains : function() {
				return Private.config.domains;
			},
			setDomains : function(d) {
				Private.config.domains = ((d !== undefined && d !== null && d !== "") ? d
						: undefined);
			},
			getFlashUrl : function() {
				return Private.beaconDescriptor.Additional.flashUrl;
			},
			setFlashUrl : function(u) {
				Private.beaconDescriptor.Additional.flashUrl = ((u !== undefined && u !== null) ? u
						: "");
			},
			getExcludeDomains : function() {
				var d;
				d = Private.tm.getExcludeDomains();
				d += (d.length > 0 && Private.config.excludeDomains.length > 0 ? ","
						: "")
						+ Private.config.excludeDomains;
				return d;
			},
			addExcludeDomain : function(d) {
				Private.config.excludeDomains += (Private.config.excludeDomains.length > 0 ? ","
						: "")
						+ d;
			},
			removeExcludeDomain : function(d) {
				var i, ds1, ds2, ds1l;
				ds1 = Private.config.excludeDomains.split(",");
				ds2 = [];
				for (i = 0, ds1l = ds1.length; i < ds1l; i += 1) {
					if (ds1[i] !== d) {
						ds2[ds2.length] = ds1[i];
					}
				}
				Private.config.excludeDomains = ds2.join(",");
			},
			isDomainExcluded : function(domainToCheck) {
				var pt, excl;
				excl = Public.getExcludeDomains();
				if (excl !== "") {
					pt = Private.tm.mxDmnRGXP(excl);
					return pt.test(domainToCheck);
				}
				return false;
			},
			getDownloadExts : function() {
				var e;
				e = Private.tm.getDownloadExtension();
				e += (e.length > 0
						&& Private.config.downloadExtensions.length > 0 ? "|"
						: "")
						+ Private.config.downloadExtensions;
				return e;
			},
			addDownloadExt : function(e) {
				var i, c, e1, e2, e1l;
				e1 = e.toLowerCase();
				e2 = "";
				for (i = 0, e1l = e1.length; i < e1l; i += 1) {
					c = e1.charAt(i);
					if ((c >= "a" && c <= "z") || (c >= "0" && c <= "9")
							|| c === "-" || c === "_") {
						e2 += c;
					}
				}
				Private.config.downloadExtensions += (Private.config.downloadExtensions.length > 0 ? "|"
						: "")
						+ "\\." + e2 + "$";
			},
			removeDownloadExt : function(e) {
				var i, es1, es2, es1l;
				es1 = Private.config.downloadExtensions.split("|");
				es2 = [];
				for (i = 0, es1l = es1.length; i < es1l; i += 1) {
					if (es1[i] !== "\\." + e.toLowerCase() + "$") {
						es2[es2.length] = es1[i];
					}
				}
				Private.config.downloadExtensions = es2.join("|");
			},
			getExcludeProtocol : function() {
				return Private.config.excludeProtocol;
			},
			addExcludeProtocol : function(e) {
				Private.config.excludeProtocol += (Private.config.excludeProtocol.length > 0 ? ","
						: "")
						+ e.toLowerCase();
			},
			removeExcludeProtocol : function(e) {
				var i, es1, es2, es1l;
				es1 = Private.config.excludeProtocol.split(",");
				es2 = [];
				for (i = 0, es1l = es1.length; i < es1l; i += 1) {
					if (es1[i] !== e.toLowerCase()) {
						es2[es2.length] = es1[i];
					}
				}
				Private.config.excludeProtocol = es2.join(",");
			},
			isProtocolExcluded : function() {
				var ep;
				ep = "," + Public.getExcludeProtocol() + ",";
				return ep.indexOf("," + window.location.protocol + ",") >= 0;
			},
			setFPCookies : function() {
				var cookieData, oldCookie;
				cookieData = Private.tm.parseCookieData(Private.tm
						.getCookie(Private.config.fpCookieName));
				if (Public.FPCV !== "") {
					Private.beaconDescriptor.TrackerDescriptor.fpcValue = Public.FPCV;
					cookieData[Private.beaconDescriptor.TrackerDescriptor.projectId] = Public.FPCV;
					Private.tm.setCookie(Private.config.fpCookieName,
							Private.tm.serializeCookieData(cookieData),
							31536000, Private.config.fpCookieDomain,
							Private.config.fpCookiePath);
				}
				oldCookie = Private.tm.getCookie(Private.config.fpCookieName
						+ Private.beaconDescriptor.TrackerDescriptor.projectId);
				if (oldCookie) {
					Private.tm
							.deleteCookie(
									Private.config.fpCookieName
											+ Private.beaconDescriptor.TrackerDescriptor.projectId,
									Private.config.fpCookieDomain,
									Private.config.fpCookiePath);
				}
			},
			submitPT : function() {
				return Public.submit();
			},
			submitError : function() {
				Private.config.isNoErrorOccured = false;
				return Private.submit();
			},
			submit : function() {
				return Private.track();
			},
			submit_customfield : function() {
				Private.beaconDescriptor.Additional.customFieldsOnly = true;
				Private.track();
			},
			submit_action : function() {
				Private.beaconDescriptor.Additional.actionOnly = true;
				Private.track();
			},
			submit_icmp : function() {
				Private.beaconDescriptor.Additional.internalCampaignOnly = true;
				Private.track();
			},
			el : function(x) {
				var pt, targetHost;
				targetHost = Private.tm.gh(x);
				if (Private.tm.gh(location) === targetHost) {
					return true;
				}
				if (!Public.isProtocolExcluded()) {
					pt = ((Private.config.domains !== undefined
							&& Private.config.domains !== null && Private.config.domains !== "") ? Private.tm
							.mxDmnRGXP(Private.config.domains)
							: Private.tm.mxDmnRGXP(Private.tm.gh(location)));
				} else {
					pt = Private.tm.mxDmnRGXP("protocolexclusion");
				}
				if (pt.test(targetHost)) {
					return true;
				}
				if (x.href.indexOf("java") !== 0) {
					Private.exitlink(x.href);
				}
				return true;
			},
			download : function(fn) {
				Private.beaconDescriptor.Additional.downloadUrl = fn;
				Private.track();
			},
			page : function(docName, docGroup, memberid, action, amount) {
				var u;
				u = Private.beaconDescriptor.PageDescriptor.url;
				Private.beaconDescriptor.PageDescriptor.url = Private.beaconDescriptor.Additional.flashUrl !== "" ? Private.beaconDescriptor.Additional.flashUrl
						: "FLASH";
				Private.beaconDescriptor.PageDescriptor.documentName = docName;
				Private.beaconDescriptor.PageDescriptor.documentGroup = docGroup;
				Private.beaconDescriptor.PageDescriptor.memberId = memberid;
				Private.beaconDescriptor.Additional.action = action;
				Private.beaconDescriptor.Additional.amount = amount;
				Public.submit();
				Private.beaconDescriptor.PageDescriptor.url = u;
			}
		};
		(function() {
			var pageUrl;
			if (Private.tm.isLockedForTracker()) {
				throw new Error(
						"[YWA-Tracker] Invalid method to get a tracker object.");
			}
			if (trackerConfiguration === undefined
					|| trackerConfiguration === null) {
				throw new Error(
						"[YWA-Tracker] Unavailable configuration descriptor to create a tracker.");
			}
			if (!trackerConfiguration.projectId) {
				throw new Error(
						"[YWA-Tracker] Undefined project ID in configuration descriptor.");
			}
			if (!trackerConfiguration.domainSetting) {
				throw new Error(
						"[YWA-Tracker] Undefined tracking domain information in configuration descriptor.");
			}
			if (!trackerConfiguration.domainSetting.nonSecure
					|| !trackerConfiguration.domainSetting.secure) {
				throw new Error(
						"[YWA-Tracker] Invalid tracking domain information.");
			}
			Private.config.domainSetting = {
				nonSecure : trackerConfiguration.domainSetting.nonSecure,
				secure : trackerConfiguration.domainSetting.secure
			};
			Private.config.enableOnclickHandler = (trackerConfiguration.enableOnclickHandler || true);
			Private.config.excludeParameters = (trackerConfiguration.excludeParameters || "");
			Private.config.excludeProtocol = (trackerConfiguration.excludeProtocol || "");
			Private.beaconDescriptor = Private.tm.createBeaconDescriptor();
			try {
				Private.beaconDescriptor.trackingDomain = (window.location.protocol
						.indexOf("https:") === 0 ? "https://"
						+ Private.config.domainSetting.secure : "http://"
						+ Private.config.domainSetting.nonSecure);
			} catch (eNoWindowLocation) {
				Private.beaconDescriptor.trackingDomain = "http://"
						+ Private.config.domainSetting.nonSecure;
			}
			Private.beaconDescriptor.scriptParent = Private.tm.getScriptPlace();
			Private.beaconDescriptor.version = Private.tm.versionAndType();
			Private.beaconDescriptor.TrackerDescriptor.projectId = trackerConfiguration.projectId;
			Private.beaconDescriptor.TrackerDescriptor.dpId = Private.tm
					.parseCookieData(
							Private.tm.getCookie("ywandp"),
							Private.beaconDescriptor.TrackerDescriptor.projectId);
			Private.config.fpCookieName = "fpc";
			Private.beaconDescriptor.TrackerDescriptor.fpcValue = Private.tm
					.parseCookieData(
							Private.tm.getCookie(Private.config.fpCookieName),
							Private.beaconDescriptor.TrackerDescriptor.projectId);
			Private.beaconDescriptor.TrackerDescriptor.trackerIdx = Private.config.index;
			if (!document.URL) {
				if (!document.location.href) {
					if (window.location.href) {
						pageUrl = window.location.href;
					} else {
						pageUrl = "";
					}
				} else {
					pageUrl = document.location.href;
				}
			} else {
				pageUrl = document.URL;
			}
			Private.beaconDescriptor.PageDescriptor.url = Private
					.getClnUrl(pageUrl);
			Private.beaconDescriptor.PageDescriptor.documentName = document.title;
			Private.beaconDescriptor.PageDescriptor.encoding = document.charset
					|| document.characterSet || "";
			Private.beaconDescriptor.EnvironmentDescriptor.flashVersion = Private.tm
					.flash();
		}());
		return Public;
	};
}
if (typeof YAHOO.ywa.tracking.BeaconScheduler === "undefined") {
	YAHOO.ywa.tracking.BeaconScheduler = (function() {
		var Private, Public;
		Private = {
			parameterOrder : [ "a", "v", "dpid", ".ys", "b", "c", "m", "f",
					"e", "t", "n", "d", "cp", "cq", "scp", "ci", "enc", "x",
					"sid", "ca", "oc", "p", "q", "r", "xa", "xd", "xs", "xt",
					"el", "fn", "flv", "fpc", "isk", "isr", "g", "h", "ittidx",
					"ix", "j", "k", "l", "tp", "nr", "js", "cf01", "cf02",
					"cf03", "cf04", "cf05", "cf06", "cf07", "cf08", "cf09",
					"cf10", "cf11", "cf12", "cf13", "cf14", "cf15", "cf16",
					"cf17", "cf18", "cf19", "cf20", "cf21", "cf22", "cf23",
					"cf24", "cf25", "cf26", "cf27", "cf28", "cf29", "cf30",
					"cf31", "cf32", "cf33", "cf34", "cf35", "cf36", "cf37",
					"cf38", "cf39", "cf40", "cf41", "cf42", "cf43", "cf44",
					"cf45", "cf46", "cf47", "cf48", "cf49", "cf50", "cf51",
					"cf52", "cf53", "cf54", "cf55", "cf56", "cf57", "cf58",
					"cf59", "cf60", "cf61", "cf62", "cf63", "cf64", "cf65",
					"cf66", "cf67", "cf68", "cf69", "cf70", "cf71", "cf72",
					"cf73", "cf74", "cf75", "cf76", "cf77", "cf78", "cf79",
					"cf80", "cf81", "cf82", "cf83", "cf84", "cf85", "cf86",
					"cf87", "cf88", "cf89", "cf90", "cf91", "cf92", "cf93",
					"cf94", "cf95", "cf96", "cf97", "cf98", "cf99", "cf100" ],
			trackerAttributes : {
				dpId : "dpid",
				projectId : "a",
				fpcValue : "fpc",
				trackerIdx : "ittidx",
				sessionId : "sid",
				spaceId : ".ys",
				thirdPartySessionCookie : "tp"
			},
			environmentAttributes : {
				timezoneOffset : "n",
				navigatorLanguage : "g",
				navigatorJava : "h",
				screenDimension : "j",
				colorDepth : "k",
				cookieSupport : "l",
				flashVersion : "flv"
			},
			pageAttributes : {
				documentName : "b",
				documentGroup : "c",
				memberId : "m",
				url : "f",
				referrer : "e",
				topLocation : "t",
				encoding : "enc",
				isNoReferrer : "nr"
			},
			additionalAttributes : {
				trackingDate : "d",
				action : "x",
				amount : "xa",
				orderId : "oc",
				tax : "xt",
				shipping : "xs",
				discount : "xd",
				sku : "p",
				units : "q",
				amounts : "r",
				campaignQuery : "cq",
				internalSearchKey : "isk",
				internalSearchResult : "isr",
				exitUrl : "el",
				downloadUrl : "fn",
				customFieldsOnly : "cf",
				actionOnly : "ca",
				internalCampaignOnly : "ci",
				campaign : "cp",
				promo : "scp"
			},
			beaconQueue : [],
			responseScript : null,
			trunc : function(x, z) {
				var url, qry, prms, x2, idx1, idx2, isAmp, prmordl, prmsl;
				if (x.length <= z) {
					return x;
				}
				url = x.split("?");
				if (url.length > 1) {
					x2 = url[0] + "?";
					qry = url[1];
					prms = qry.split("&");
					prms.sort();
					isAmp = false;
					prmsl = prms.length;
					for (idx1 = 0, prmordl = Private.parameterOrder.length; idx1 < prmordl; idx1 += 1) {
						for (idx2 = 0; idx2 < prmsl; idx2 += 1) {
							if (prms[idx2].indexOf(Private.parameterOrder[idx1]
									+ "=") === 0) {
								if (x2.length + "&".length + prms[idx2].length > z) {
									return x2 + "&trnc=1";
								}
								x2 += (isAmp ? "&" : "") + prms[idx2];
								isAmp = true;
								break;
							}
						}
					}
					return x2;
				} else {
					return x;
				}
			},
			checkBeaconDescriptorValidity : function(beaconDescriptor) {
				var isValid;
				isValid = true;
				isValid = isValid
						&& (beaconDescriptor.trackingDomain !== undefined
								&& beaconDescriptor.trackingDomain !== null && beaconDescriptor.trackingDomain !== "");
				isValid = isValid
						&& (beaconDescriptor.scriptParent !== undefined
								&& beaconDescriptor.scriptParent !== null && beaconDescriptor.scriptParent.appendChild);
				isValid = isValid
						&& (beaconDescriptor.version !== undefined
								&& beaconDescriptor.version !== null && beaconDescriptor.version !== "");
				if (beaconDescriptor.TrackerDescriptor !== undefined
						&& beaconDescriptor.TrackerDescriptor !== null) {
					isValid = isValid
							&& (beaconDescriptor.TrackerDescriptor.dpId !== undefined
									&& beaconDescriptor.TrackerDescriptor.dpId !== null && beaconDescriptor.TrackerDescriptor.dpId !== "");
					isValid = isValid
							&& (beaconDescriptor.TrackerDescriptor.projectId !== undefined
									&& beaconDescriptor.TrackerDescriptor.projectId !== null && beaconDescriptor.TrackerDescriptor.projectId !== "");
				} else {
					isValid = isValid && false;
				}
				isValid = isValid
						&& (beaconDescriptor.EnvironmentDescriptor !== undefined && beaconDescriptor.EnvironmentDescriptor !== null);
				isValid = isValid
						&& (beaconDescriptor.PageDescriptor !== undefined && beaconDescriptor.PageDescriptor !== null);
				isValid = isValid
						&& (beaconDescriptor.Additional !== undefined && beaconDescriptor.Additional !== null);
				return isValid;
			},
			timePop : function() {
				window.setTimeout(Private.pop, 50);
			},
			correctBeaconDescriptor : function(beaconDescriptor) {
				var tracker;
				if (beaconDescriptor.TrackerDescriptor.fpcValue === undefined
						|| beaconDescriptor.TrackerDescriptor.fpcValue === null
						|| beaconDescriptor.TrackerDescriptor.fpcValue === "") {
					tracker = YAHOO.ywa.tracking.TrackerManager
							.getTracker(beaconDescriptor.TrackerDescriptor.projectId);
					beaconDescriptor.TrackerDescriptor.fpcValue = tracker.FPCV;
				}
			},
			send : function(beaconDescriptor) {
				var trackingUrl;
				Private.correctBeaconDescriptor(beaconDescriptor);
				trackingUrl = Public.getTrackingUrl(beaconDescriptor);
				Private.responseScript = document.createElement("script");
				Private.responseScript.onload = Private.responseScript.onreadystatechange = function() {
					if (!this.readyState || this.readyState === "loaded"
							|| this.readyState === "complete") {
						YAHOO.ywa.tracking.Console
								.log("[YWA-BeaconScheduler][PID="
										+ beaconDescriptor.TrackerDescriptor.projectId
										+ "] Beacon sent.");
						Private.timePop();
					}
				};
				Private.responseScript.onerror = function() {
					Private.timePop();
					throw new Error(
							"[YWA-BeaconScheduler] No data collection available");
				};
				Private.responseScript.defer = true;
				Private.responseScript.type = "text/javascript";
				Private.responseScript.src = trackingUrl;
				beaconDescriptor.scriptParent
						.appendChild(Private.responseScript);
			},
			pop : function() {
				var beacon;
				if (Private.beaconQueue.length > 0) {
					beacon = Private.beaconQueue.splice(0, 1);
					Private.send(beacon[0]);
				} else {
					Private.timePop();
				}
			}
		};
		Public = {
			getTrackingUrl : function(beaconDescriptor) {
				var trackingUrl, getSubUrl;
				getSubUrl = function(subDescriptor, attributes) {
					var key;
					for (key in subDescriptor) {
						if (subDescriptor[key] !== undefined
								&& subDescriptor[key] !== ""
								&& attributes[key] !== undefined) {
							trackingUrl.push("&" + attributes[key] + "="
									+ encodeURIComponent(subDescriptor[key]));
						}
					}
				};
				trackingUrl = [];
				trackingUrl.push(beaconDescriptor.trackingDomain);
				trackingUrl.push("/fpc.pl");
				trackingUrl.push("?v=" + beaconDescriptor.version);
				getSubUrl(beaconDescriptor.TrackerDescriptor,
						Private.trackerAttributes);
				getSubUrl(beaconDescriptor.EnvironmentDescriptor,
						Private.environmentAttributes);
				getSubUrl(beaconDescriptor.PageDescriptor,
						Private.pageAttributes);
				getSubUrl(beaconDescriptor.Additional,
						Private.additionalAttributes);
				trackingUrl = Private.trunc(trackingUrl.join(""), 2000);
				return trackingUrl;
			},
			addToQueue : function(beaconDescriptor) {
				if (!Private.checkBeaconDescriptorValidity(beaconDescriptor)) {
					YAHOO.ywa.tracking.Console
							.warn("[YWA-BeaconScheduler][PID="
									+ beaconDescriptor.TrackerDescriptor.projectId
									+ "] Sending beacon via queue is prohibited due to invalid beacon descriptor!");
					return;
				}
				Private.beaconQueue.push(beaconDescriptor);
				YAHOO.ywa.tracking.Console.info("[YWA-BeaconScheduler][PID="
						+ beaconDescriptor.TrackerDescriptor.projectId
						+ "] Beacon is added to queue.");
			}
		};
		(function() {
			var idx;
			for (idx = 0; idx < 10; idx += 1) {
				Private.additionalAttributes["extraField" + (1 + idx)] = "p"
						+ (1 + idx);
			}
			for (idx = 0; idx < 99; idx += 1) {
				Private.additionalAttributes["customField"
						+ ((idx < 9) ? "0" : "") + (1 + idx)] = "cf"
						+ (1 + idx);
			}
			Private.timePop();
		}());
		return Public;
	}());
}
if (typeof YAHOO.ywa.tracking.MetaSetupController === "undefined") {
	YAHOO.ywa.tracking.MetaSetupController = (function() {
		var Private, Public;
		Private = {
			setupTrackerByMeta : function(metaElement) {
				var propertyIdentifier, tracker, metaContent;
				propertyIdentifier = metaElement.getAttribute("name")
						.split("-");
				metaContent = metaElement.getAttribute("content");
				if (propertyIdentifier.length !== 3
						&& propertyIdentifier.length !== 4) {
					return;
				}
				if (propertyIdentifier[0].toUpperCase() !== "YWATC") {
					return;
				}
				tracker = YAHOO.ywa.tracking.TrackerManager
						.getTracker(propertyIdentifier[1]);
				propertyIdentifier[2] = propertyIdentifier[2].toUpperCase();
				switch (propertyIdentifier[2]) {
				case "COLO":
					tracker.initializeTrackingDomain(metaContent);
					break;
				case "ONCLICKHANDLER":
					tracker
							.setOnclickHandlerEnabled(metaContent.toLowerCase() === "true");
					break;
				case "SESSIONID":
					tracker.setSessionId(metaContent);
					break;
				case "SPACEID":
					tracker.setSpaceId(metaContent);
					break;
				case "DOCUMENTNAME":
					tracker.setDocumentName(metaContent);
					break;
				case "DOCUMENTGROUP":
					tracker.setDocumentGroup(metaContent);
					break;
				case "MEMBERID":
					tracker.setMemberId(metaContent);
					break;
				case "ACTION":
					tracker.setAction(metaContent);
					break;
				case "AMOUNT":
					tracker.setAmount(metaContent);
					break;
				case "ORDERID":
					tracker.setOrderId(metaContent);
					break;
				case "TAX":
					tracker.setTax(metaContent);
					break;
				case "SHIPPING":
					tracker.setShipping(metaContent);
					break;
				case "DISCOUNT":
					tracker.setDiscount(metaContent);
					break;
				case "SKU":
					tracker.setSKU(metaContent);
					break;
				case "UNITS":
					tracker.setUnits(metaContent);
					break;
				case "AMOUNTS":
					tracker.setAmounts(metaContent);
					break;
				case "CMPQUERY":
					tracker.setCmpQuery(metaContent);
					break;
				case "CAMPAIGN":
					if (propertyIdentifier.length === 4) {
						tracker.setCampaign(propertyIdentifier[3], metaContent);
					}
					break;
				case "PROMO":
					if (propertyIdentifier.length === 4) {
						tracker.setPromo(propertyIdentifier[3], metaContent);
					}
					break;
				case "ISK":
					tracker.setISK(metaContent);
					break;
				case "ISR":
					tracker.setISR(metaContent);
					break;
				case "EXTRAFIELD":
					if (propertyIdentifier.length === 4) {
						tracker.setEF(propertyIdentifier[3], metaContent);
					}
					break;
				case "CUSTOMFIELD":
					if (propertyIdentifier.length === 4) {
						tracker.setCF(propertyIdentifier[3], metaContent);
					}
					break;
				case "RUN":
					tracker.setRun(metaContent.toLowerCase() === "true");
					break;
				case "ALLOWSEND":
					tracker.setRun(metaContent.toLowerCase() !== "true");
					break;
				case "URL":
					tracker.setUrl(metaContent);
					break;
				case "ENCODING":
					tracker.setEncoding(metaContent);
					break;
				case "COOKIEDOMAIN":
					tracker.setCookieDomain(metaContent);
					break;
				case "COOKIEPATH":
					tracker.setCookiePath(metaContent);
					break;
				case "TPSC":
					tracker.setTPSC(metaContent.toLowerCase() === "true");
					break;
				case "REFERRER":
					tracker.setReferrer(metaContent);
					break;
				case "DOMAINS":
					tracker.setDomains(metaContent);
					break;
				case "FLASHURL":
					tracker.setFlashUrl(metaContent);
					break;
				case "EXCLUDEDOMAIN":
					tracker.addExcludeDomain(metaContent);
					break;
				case "EXCLUDEPROTOCOL":
					tracker.addExcludeProtocol(metaContent);
					break;
				case "DOWNLOADEXTENSION":
					tracker.addDownloadExt(metaContent);
					break;
				}
			},
			setupTrackersByMetaTags : function() {
				var metatags, idx, mtl, mname;
				metatags = document.getElementsByTagName("meta");
				for (idx = 0, mtl = metatags.length; idx < mtl; idx += 1) {
					mname = metatags[idx].getAttribute("name");
					if (mname !== undefined && mname !== null
							&& mname.indexOf("YWATC") === 0) {
						Private.setupTrackerByMeta(metatags[idx]);
					}
				}
			}
		};
		Public = {};
		(function() {
			Private.setupTrackersByMetaTags();
			YAHOO.ywa.tracking.TrackerManager.submitTrackers();
		}());
	}());
}