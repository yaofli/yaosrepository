try {
	SC.addVersion('0\x3061', '1.0\x2e\x30\x306', 'M\x69\x6ei\x43ar\x74');
} catch (o0) {
};
function scMCstore(O0, debugMode) {
	if ((debugMode && !SC.debugMode())
			|| SC.getCookie('scCa\x72\x74\x54\x72o\x75b\x6ce')
			|| (SC.Browser.name === '\x77\x65\x62tv')
			|| (SC.getHostName(O0) !== SC.getHostName())) {
		return 0;
	}
	SC.getCookieSupport();
	var l0 = window, i0 = document, I0 = null, o1 = true, O1 = false, l1 = I0, i1 = '', I1 = 'sc\x4d\x43\x68o\x6cs\x74\x65r\x2d\x30\x306\x31', o2 = I0, O2 = I0, l2 = O1, i2 = O1, I2 = 'minC\x61\x72\x74-\x300\x36\x31', o3 = '\x73\x6d\x43ar\x74\x2d0\x306\x31', O3 = 'c\x61\x72t\x56ie\x77\x65r\x2d\x300\x36\x31', l3 = 'to\x67\x67L\x69n\x6b-\x300\x36\x31', i3 = [
			'\x6fpen-\x3006\x31', '\x63\x6c\x6fse\x64\x2d0\x306\x31',
			'l\x6f\x61d\x69n\x67-\x300\x361' ], I3 = '\x65\x6d\x70ty\x43\x61rt\x2d00\x36\x31', o4 = '\x75\156defi\x6ee\x64C\x61rt\x2d\x300\x36\x31', O4 = '\043\x62\x75sy', forceCheckout = '\x73cMCfo\x72ce\x43h\x65c\x6bo\x75t', l4 = '\x6d\x69\x6eCo\x6f\x6b\x2d\x30\x306\x31', i4 = 'c\x6c\x69c\x6b', I4 = 'di\x76', o5 = 's\x70\x61\x6e', callbacks = SC
			.genCallbacks([ '\x69nit', '\x64\x6fn\x65', 'c\x68\x65ck\x6fu\x74',
					's\x68\x6fw\x43a\x72t', '\x68ideCa\x72t',
					'\x72\145fres\x68' ]);
	this.callbacks = callbacks;
	function swapClass(O5) {
		SC.addClass(o2, i3[O5]);
		for (var i = 0, j = i3.length; i < j; i++) {
			if (O5 !== i) {
				SC.removeClass(o2, i3[i]);
			}
		}
	}
	function scrollTop(l5) {
		scroll(0, 0);
	}
	function i5(l5) {
		swapClass(2);
	}
	function I5() {
		if (SC.$(O3)) {
			try {
				l0.frames[O3].location.href = i1 + '#scH\x6fstNa\x6d\x65='
						+ SC.getHostName();
				l2 = !(i2 = o1);
			} catch (o0) {
			}
		}
	}
	function o6(l5) {
		if (!l2) {
			l2 = o1;
			i5();
			if (!i2) {
				I5();
			} else {
				swapClass(0);
				scrollTop();
				callbacks.showCart.run();
			}
		}
	}
	function O6(l6) {
		i6();
		O2 = setTimeout(I6, (l6 || 07640));
	}
	function i6(l5) {
		clearTimeout(O2);
	}
	this.setIiFrameWindow = function(o7) {
		l1 = o7;
	};
	function O7(l5) {
		if (l1 && (SC.getTarget(l5).id !== O3)) {
			try {
				var l7 = l1.document.location;
				if (l7.hash.indexOf(O4) !== -1) {
					l7.hash = l7.hash.replace(O4, '#');
				}
			} catch (o0) {
			}
		}
	}
	function I6() {
		i6();
		if (l1) {
			try {
				switch (l1.document.location.hash) {
				case '\x23\x73to\x70':
					break;
				case O4:
					O6(0764);
					break;
				default:
					i7();
				}
			} catch (o0) {
			}
		}
	}
	function i7() {
		if (l2) {
			l2 = O1;
			i6();
			swapClass(1);
			callbacks.hideCart.run();
		}
	}
	function I7(l5) {
		l5 = l5 || l0.event;
		SC.killDefault(l5);
		if (SC.hasClass(o2, i3[1])) {
			o6();
		} else {
			i7();
		}
	}
	function o8(l5) {
		l5 = l5 || l0.event;
		SC.killDefault(l5);
		callbacks.checkout.run();
		if (SC.hasClass(o2, i3[1]) && !SC.hasClass(o2, o4)
				&& !SC.hasClass(o2, I3)) {
			try {
				l0.location.href = getShippingBillingPageUrl() + '\x26'
						+ forceCheckout;
			} catch (o0) {
			}
		}
	}
	function O8(l5) {
		if (l2) {
			var l8 = SC.getTarget(l5), i8 = O1;
			do {
				if (l8.id === I1) {
					i8 = o1;
				}
			} while (!i8 && (l8 = l8.parentNode));
			if (!i8) {
				i7();
			}
			i8 = l8 = I0;
		}
	}
	function refresh(I8) {
		var o2 = SC.$(I1), o9 = SC.$(I2);
		SC.orphan(o9);
		if (I8) {
			i2 = o1;
			SC.setCookie(l4, escape(SC.toJSON(I8)));
		} else {
			I8 = SC.fromJSON(unescape(SC.getCookie(l4)));
		}
		if (I8) {
			if (I8.h) {
				var O9 = SC.$(O3);
				I8.h = SC.forceInt(I8.h);
				if (I8.h < 1) {
					I8.h = 0620;
				}
				if (O9) {
					O9.style.height = I8.h + '\x70\x78';
				}
				O9 = I0;
			}
			if (I8.e) {
				SC.addClass(o2, I3);
				SC.addElem(o5, o9, {
					className : 'e\x6d\x70t\x79Ms\x67-006\x31',
					innerTxt : I8.e
				});
			} else {
				SC.removeClass(o2, I3);
				SC.insElem(SC.genElem(o5, {
					innerTxt : 'Item\x28s):\x20'
				}), SC.addElem(o5, o9, {
					className : '\151tem\x43\x6et\x2d0\x306\x31',
					innerTxt : I8.i
				}));
				SC.addElem(o5, o9, {
					className : '\x69\164\145m\x54tl-0\x306\x31',
					innerTxt : I8.t
				});
			}
		} else {
			SC.removeClass(o2, I3);
			SC.addEvt(SC.addElem('\141', o9, {
				href : i1,
				innerTxt : '\x56\x69ew \x43\141\x72t',
				id : '\x65mp\x74\171\x43ook\x2d0061'
			}), i4, I7);
		}
		o6();
		callbacks.refresh.run();
	}
	this.refresh = refresh;
	function init() {
		if (SC.getCookieSupport() > 1) {
			callbacks.init.run();
			i1 = SC.getCartURL();
			o2 = SC.$(I1);
			if (o2) {
				if (l0.location.hash == '#\x6f\x72derP\x6caced') {
					l0.location.hash = '';
					SC.setCookie(l4);
				}
				SC.orphan(o2);
				var l9 = SC.addElem(I4, o2, {
					id : 'ctr\x6cP\x61\144\x2d0\x3061'
				}), i9 = I0;
				SC.addElem(I4, l9, {
					id : I2
				});
				refresh();
				i7();
				i9 = SC.addElem(I4, l9, {
					id : 'c\x74r\x6c\102\x6fx-00\x361'
				});
				var aLink = SC.addElem('\x61', i9, {
					id : l3,
					href : i1
				});
				SC.addElem(o5, aLink, {
					innerTxt : '\x54\x6fggle C\x61rt'
				});
				SC.addEvt(aLink, i4, I7);
				aLink = SC.addElem('\x61', i9, {
					id : 'checkou\x74Li\x6ek-006\x31',
					href : i1
				});
				SC.addElem(o5, aLink, {
					innerTxt : '\x43\x68eckout'
				});
				SC.addEvt(aLink, i4, o8);
				aLink = I0;
				SC.addElem(I4, l9, {
					className : 'cle\x61rer\x2d0061'
				});
				i9 = l9 = I0;
				SC.addElem('i\x66ram\x65', SC.addElem(I4, o2, {
					id : o3
				}), {
					name : O3,
					id : O3,
					src : '\x61b\x6fut:blan\x6b',
					border : '0'
				});
				try {
					l0.frames[O3].location.href = 'a\x62ou\x74\072\142\x6cank';
				} catch (o0) {
				}
				SC.targetForms(O3, o1);
				if (l0.scDp2DrawCallback) {
					scDp2DrawCallback.add(function() {
						SC.targetForms(O3, o1);
					});
				}
				SC.callbacks.atcInit.add(i5);
				SC.callbacks.atcDone.add(O6);
				SC.addEvt(i0, i4, O8);
				SC.addEvt(i0, 'mouse\x6fve\x72', O7);
			}
			callbacks.done.run();
		} else {
			if (!SC.callbacks.cookieTest.has(scMiniCart.init)) {
				SC.callbacks.cookieTest.add(scMiniCart.init);
			}
		}
	}
	this.init = init;
}

var scMiniCart = new scMCstore('www.carcare.net');

function getShippingBillingPageUrl() {
	return null;
	// return "https://us-dc1-order.store.yahoo.net/" + SC.getStoreId() +
	// "/ymix/MetaController.html?ysco_key_store_id=" + SC.getStoreId() +
	// "&sectionId=ysco.ship-bill";
}
