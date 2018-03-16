/* ========================================
11. Ensemble modal
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleModal = function(options) {

		var opts = $.extend({
			delay: '8000',
			clickOverlayClosing: 'false'
		}, options);

		var $modal = this,
			animSpeed = 300;

		if (opts.clickOverlayClosing === 'true') {
			$modal.on('click', function(e) {
				if (e.target !== this) {
					return;
				} else {
					$modal.fadeOut(animSpeed);
				}
			});
		}

		if ($modal.hasClass('modal-timed-open')) {
			setTimeout(function() {
				$('.modal-timed-open.modal').fadeIn(animSpeed);
			}, opts.delay);
		}

		if ($modal.hasClass('modal-toggle')) {
			$('.modal-open').on('click', function(e) {
				e.preventDefault();
				$('.modal.modal-toggle').fadeIn(animSpeed);
			});
		}

		$('.modal').on('click',".modal-close", function() {
			$modal.fadeOut(animSpeed);
		});

		return $modal;
	};

}(jQuery, window, document));
