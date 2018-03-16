/* ========================================
09. Ensemble Accordion
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleAccordion = function(options) {

		var opts = $.extend({
			beginOpen: 'false'
		}, options);

		var $accordion = this;

		if (opts.beginOpen === 'true') {
			$('.accordion__content:first').slideDown(300);
		}

		$accordion.find('.accordion__header').on('click', function() {
			if ($('.accordion__header').next('.accordion__content').is(":visible")) {
				$('.accordion__content').slideUp(300).prev('.accordion__header').removeClass('accordion__active');
			} else {
				$('.accordion__content').slideUp(300).prev('.accordion__header').removeClass('accordion__active');
				$(this).next('.accordion__content').slideDown(300).prev('.accordion__header').addClass('accordion__active');
			}
		});
		return $accordion;
	};

}(jQuery, window, document));
