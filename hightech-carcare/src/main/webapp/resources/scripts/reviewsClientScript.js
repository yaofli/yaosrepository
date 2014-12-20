/***************************************/
/******** UTILITY FUNCTIONS ************/
/** ************************************ */
function prIsBlank(item) {
	item = String(item).toLowerCase();
	if (item == "undefined" || item == "" || item == "null")
		return true;
	else
		return false;
}
/** ************************************************* */
/** ****** DISPLAY ITEM PAGE RATING STARS *********** */
/** ************************************************* */
function prItemRatingDisplay() {
	if (prDebug) {
		alert("ratingDisplay");
	}
	var prItemRating = document.getElementById('prItemRating');
	if (prItemRating) {
		html = '';
		if (pdPrOverall.reviewCount > 0) {
			if (pdPrOverall.reviewCount > 1) {
				var prS = "s"
			} else {
				var prS = "";
			}
			html += '<table border="0" cellpadding="0" cellspacing="0"><tr>';
			html += '<td>';
			html += '<div class="prItemRatingStars"><a href="#reviews" onclick="pdOpenProductReviewsTab();">';
			html += '<img src="' + prClientDomain + 'mod_productReviews/skins/'
					+ prClientSkin + '/images/' + pdPrOverall.rating
					+ '.png" border="0">';
			html += '</a></div>';
			html += '</td>';

			html += '<td>';
			html += '<div class="prItemRatingLinks"><a href="#reviews" onclick="pdOpenProductReviewsTab();" id="pdReadReviews">';
			html += pdPrOverall.reviewCount;
			html += ' Review';
			if (pdPrOverall.reviewCount > 1) {
				html += 's';
			}
			html += '</a></div>';
			html += '</td>';

			html += '<td><span class="prItemRatingBar">|</span></td>';

			html += '<td>';
			html += '<div class="prItemRatingLinks">';
			html += '<a href="' + prClientDomain
					+ 'mod_productReviews/reviewForm.php?productId='
					+ pdPrOverall.productId + '">';
			html += 'Write a Review';
			html += '</a></div>';
			html += '</td></tr></table>';
			prItemRating.innerHTML = html;
		}
	}
	if (prDebug) {
		alert("ratingDisplay");
	}
}

function prProductReviewsDisplay() {
	if (prDebug) {
		alert("prProductReviews");
	}
	var prProductReviews = document.getElementById('prProductReviewsDisplay');
	if (prProductReviews) {
		prProductReviews.innerHTML = pdPrOverall.formattedHtml;
	}
}

function pdDisplayFeaturedReviews(featuredReviewsInfo) {

	// *****************
	// *** PREP DATA ***
	// *****************
	var featuredReviewsList = featuredReviewsInfo.list;

	// *******************************
	// *** RENDER FEATURED REVIEWS ***
	// *******************************
	var html = '';
	html += '<div class="prListFeaturedWrapper">';
	html += '<div class="prListFeaturedTitle">';
	if (typeof prFeaturedTitle === "undefined") {
		var prFeaturedTitle = "Featured Customer Reviews";
	}
	if (isBlank(prFeaturedTitle))
		prFeaturedTitle = "Featured Customer Reviews";
	html += prFeaturedTitle;
	html += '</div>';

	for (var i = 0; i < featuredReviewsList.length; i++) {

		html += '<div class="prListFeaturedReview">';
		// ******** REVIEW STARS *******
		html += '<div class="rating">';
		html += '<img src="' + prClientDomain + 'mod_productReviews/skins/'
				+ prClientSkin + '/images/' + featuredReviewsList[i].rating
				+ 'sm.png" border="0">';
		html += '</div>';

		if (!prIsBlank(featuredReviewsList[i].reviewTitle)) {
			html += '<div class="title">' + featuredReviewsList[i].reviewTitle
					+ '</div>';
		}

		// ******** REVIEW BODY *******
		html += '<div class="body">';
		html += featuredReviewsList[i].reviewBody + '<br clear="all">';
		html += '</div>';

		// ******** REVIEW SIGNATURE
		html += '<div class="name">';
		html += '- ' + featuredReviewsList[i].name;
		html += '</div>';

		// *** REVIEW SEPARATOR
		html += '</div>';
	}

	// ******* LINK TO OPEN REVIEWS TAB ***********
	html += '<br><div class="read"><a href="#reviews" onclick="pdOpenProductReviewsTab();">';
	if (featuredReviewsInfo.reviewCount > 1) {
		html += 'Read ';
		html += featuredReviewsInfo.reviewCount;
		html += ' Reviews';
	} else {
		html += 'Read All Reviews';
	}
	html += '</a></div>';

	html += '</div>';

	// *********************
	// *** WRITE DISPLAY ***
	// *********************
	if (featuredReviewsList.length > 0) {
		document.getElementById("pdFeaturedProductReviews").innerHTML = html;
	} else {
		document.getElementById("pdFeaturedProductReviews").style.display = "none";
	}
}
