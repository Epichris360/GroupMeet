/* ========================================
10. Ensemble tabs
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleTabs = function( /*options*/ ) {

		var $tabs = this;

		$('.list').on('click',".list-item--tabs", function() {
			var tabId = $(this).attr('data-tab');

			$('.list-item--tabs').removeClass('current-list-tab');
			$('.tabs__content').removeClass('current-content-tab');

			$(this).addClass('current-list-tab');
			$('#' + tabId).addClass('current-content-tab');
		});

		return $tabs;
	};

}(jQuery, window, document));
