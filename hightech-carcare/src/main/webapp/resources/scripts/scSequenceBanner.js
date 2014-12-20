(function($) {
	$.fn.scSequenceBanner = function(options) {
		var defaults = {
			slideOnClass : "scSBon",
			slidePausePos : "center",
			slideWidth : 500,
			showNumbers : true,
			slideAuto : true,
			slideTimer : 5,
			showNumbersX : 100,
			showNumbersY : 100
		};
		var settings = $.extend({}, defaults, options);
		return this
				.each(function() {
					var mainObj = $(this);
					var subMainObj = mainObj.children("div");
					var slideObjs = mainObj.children("div").children("div");
					var slideNumber = subMainObj.children("div").length;
					var currNum = 0, pauseBtn;

					// set main containers width
					subMainObj.css('width', (settings.slideWidth) + "px");

					// if slideAuto is True start interval
					function startInterval() {
						var slideTime = settings.slideTimer * 1000;
						scSBInterval = setInterval(processAuto, slideTime);
					}

					// scrolling function
					function processBtn(_btnnum) {
						var numberBtns = numberContainer.children("a");
						numberBtns.removeClass(settings.slideOnClass);
						numberBtns.eq(_btnnum).addClass(settings.slideOnClass);
						currNum = _btnnum;
					}

					// auto scroll process
					function processAuto() {
						(currNum == (slideNumber - 1)) ? currNum = 0
								: currNum += 1;
						(settings.showNumbers) ? processBtn(currNum) : '';
						processTransition(currNum);
					}

					// transition function
					function processTransition(_btnnum) {
						subMainObj.children().eq(_btnnum).animate({
							opacity : 1
						}, 300).css('z-index', 1);
						subMainObj.children().not(slideObjs.eq(_btnnum))
								.animate({
									opacity : 0
								}, 300).css('z-index', 0);
					}

					// show number buttons
					function showNumbers() {
						numberContainer = $(document.createElement("div"))
								.addClass("scSequenceButtons").css("top",
										settings.showNumbersY).css("right",
										settings.showNumbersX);
						slideObjs
								.each(function(i) {
									numberContainer
											.append($(
													document.createElement("a"))
													.click(
															function(e) {
																processBtn(i);
																processTransition(i);
																(settings.slideAuto) ? clearInterval(scSBInterval)
																		: '';
																e
																		.preventDefault();
															}).addClass(
															"scSButton").text(
															i + 1));
								});
						mainObj.append(numberContainer);
						numberContainer.children("a").eq(0).addClass(
								settings.slideOnClass);
					}

					// pause button functionality
					function showPause() {
						pauseBtn.animate({
							bottom : 0
						}, 400);
					}
					function hidePause() {
						pauseBtn.animate({
							bottom : -pauseBtn.height()
						}, 400);
					}
					$.fn.opacity = function(_value) {
						return $(this).css('opacity', _value);
					};
					// feature initialization
					$.fn.initialize = function() {
						slideObjs.each(function() {
							slide = $(this);
							slide.width(settings.slideWidth).height(
									mainObj.height());
							slide.not(slideObjs.eq(0)).opacity(0).css(
									'z-index', 0);
							slideObjs.eq(0).opacity(1).css('z-index', 1)
						});
						(settings.showNumbers) ? showNumbers() : '';
						if (settings.slideAuto) {
							mainObj.hover(function() {
								clearInterval(scSBInterval);
								showPause();
							}, function() {
								startInterval();
								hidePause();
							});
							startInterval();
							pauseBtn = $(document.createElement("div"))
									.addClass("scSequencePause");
							mainObj.append(pauseBtn);
							switch (settings.slidePausePos) {
							case "right":
								pauseBtn.css({
									bottom : -pauseBtn.height(),
									left : (mainObj.width() - pauseBtn.width())
								});
								break;
							case "left":
								pauseBtn.css({
									bottom : -pauseBtn.height(),
									left : 0
								});
								break;
							case "center":
								pauseBtn.css({
									bottom : -pauseBtn.height(),
									left : (mainObj.width() / 2 - pauseBtn
											.width() / 2)
								});
								break;
							}
							if ($(".scSequenceButtons a").length == 1) {
								$(".scSequenceButtons").remove();
								$(".scSequencePause").remove();
							}
						}
					}
				});
	}
})(jQuery);