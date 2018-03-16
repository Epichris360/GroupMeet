/* ========================================
11. Ensemble notices
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleNotices = function(options) {

		var opts = $.extend({
			delay: '8000'
		}, options);

		var $notices = this;

		if ($('.notice').hasClass('notice--timed')) {
			setTimeout(function() {
				$('.notice').fadeIn(300);
			}, opts.delay);
		}

		$('.notice').on('click',".notice__close", function() {
			$('.notice').fadeOut(300);
		});

		return $notices;
	};

}(jQuery, window, document));
