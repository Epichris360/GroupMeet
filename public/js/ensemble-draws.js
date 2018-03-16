/* ========================================
10. Ensemble draws
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleDraws = function( /*options*/ ) {

		var $draws = this;

		$('.draw').on('click',".draw__header", function() {
			if ($(this).next('.draw__content').is(":visible")) {
				$('.draw__content').slideUp(300).prev('.draw__header').removeClass('draw--active');
			} else {
				$('.draw__content').slideUp(300).prev('.draw__header').removeClass('draw--active');
				$(this).next('.draw__content').slideDown(300).prev('.draw__header').addClass('draw--active');
			}
		});

		return $draws;
	};

}(jQuery, window, document));
