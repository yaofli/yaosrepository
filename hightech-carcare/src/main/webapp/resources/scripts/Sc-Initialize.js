var obj = document.getElementById('dropdownNav');
if (obj)
	obj.selectedIndex = 0;

/* misc. IE fixes follow */
try {
	document.execCommand('BackgroundImageCache', false, true);
} catch (e) {
}
