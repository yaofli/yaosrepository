function removeRelated() {
	if (jQuery('iframe[src*="gstatic.com"],iframe.grelated-iframe,iframe.notranslate').length > 0) {
		jQuery(
				'iframe[src*="gstatic.com"],iframe.grelated-iframe,iframe.notranslate')
				.remove();
		clearInterval(rrI);
	} else {
		if (rrCount > 30) {
			clearInterval(rrI);
		} else {
			rrCount = rrCount + 1;
		}
	}

}
var rrCount = 0;
var rrI = 0;
rrI = setInterval(removeRelated, 500);