/* ========================================

Table of CONTENTS

01.	Page pre loader
02.	Slider
03. Isotope
03a. Fitvids
04.	Smooth scroll
05.	Back to top
06.	Navigation
07.	Header
08.	Transitional layer
09.	Modals
10.	Notices
11.	Accordion
12.	Draws
13.	Alerts
14.	Tabs
15.	Maps
16.	Lightbox
17.	Countdown
18.	Utility bar
19.	Hero units
20.	Contact form

======================================== */

var a = $(window),
	b = $(document),
	animSpeed = 300,
	header = $('.primary-header'),
	nav = $('nav'),
	mobNavToggleClass = '.mobile-nav-toggle',
	mobNavToggle = $('.mobile-nav-toggle'),
	heroUnit = $('.hero-unit'),
	desktopNav = $('desktop-nav'),
	ofHeroUnit = $('.offset-hero-unit__contents'),
	mobNavSubmenu = '.has-submenu',
	mobNavMegamenu = '.has-megamenu',
	transitionLayer = $('.transition-layer');

a.on('load', function() {
	'use strict';

	/* ========================================
	01. Page pre loader
	======================================== */

	$('.page-pre-loader').fadeOut('slow',function(){
		$(this).remove();
	});

	/* ========================================
	02. Slider
	======================================== */

	$(".ensemble-slideshow__first-slide").find(".ensemble-slideshow__caption").addClass("animated go");
		$(".ensemble-slideshow").on("cycle-before", function(b, c, d, a) {
  		$(a).find(".ensemble-slideshow__caption").removeClass("animated go");
	});
	$(".ensemble-slideshow").on("cycle-after", function(b, c, d, a) {
  		$(a).find(".ensemble-slideshow__caption").addClass("animated go");
	});
	$(".ensemble-slideshow").cycle();

	/* ========================================
	03. Isotope
	======================================== */

	var $container = $('.isotope-items');
	$container.isotope({
		filter: '*',
		transitionDuration: '0.6s',
		percentPosition: true,
	});

	$('.isotope-filters-button').click(function() {
		$('.isotope-filters-button').removeClass('isotope-filters-button__selected');
		$(this).addClass('isotope-filters-button__selected');

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,

		});
		return false;
	});
});

b.ready(function() {
	'use strict';

    /* ========================================
	03a. Fitvids
	======================================== */

    $("body").fitVids();

	/* ========================================
	04. Smooth scroll
	======================================== */

	$('a').smoothScroll({
		speed: 800,
		offset: -100
	});

	/* ========================================
	05. Back to top
	======================================== */

	$(function() {
		$(".back-to-top").on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});

	$(".back-to-top--floating").hide();
	$(function() {
		a.on('scroll', function() {
			if($(a).scrollTop() > 100) {
				$(".back-to-top--floating").fadeIn(1500);
			} else {
				$(".back-to-top--floating").fadeOut(1500);
			}
		});

		$(".back-to-top--floating").on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});
});

/* ========================================
06. Navigation
======================================== */

function checkSize() {
	if (mobNavToggle.css('display') === 'none') {
		nav.addClass('desktop-nav');
			desktopNav.removeClass('mobile-nav');
	}

	if (mobNavToggle.css('display') === 'block') {
		nav.addClass('mobile-nav');
			nav.removeClass('desktop-nav');
	}
}
checkSize();

nav.on('click',mobNavSubmenu, function(e) {
	$(this).toggleClass('submenu-open');
	e.stopPropagation();
});

nav.on('click',mobNavMegamenu, function(e) {
	$(this).toggleClass('submenu-open');
	e.stopPropagation();
});

header.on('click',mobNavToggleClass, function() {
	nav.toggleClass('mobile-nav-slide-in');
});

header.on('click',mobNavToggleClass, function() {
	if ($(this).hasClass('mobile-nav-toggle__is-active')) {
		$(this).removeClass('mobile-nav-toggle__is-active');
	} else {
		$(this).addClass('mobile-nav-toggle__is-active');
	}
});
a.on('resize', checkSize);

/* ========================================
07. Header
======================================== */

a.on('scroll',header, function() {
	if ($(this).scrollTop() > 200 && (mobNavToggle.css('display') === 'none')) {
		$('.primary-header--fixed-nav').addClass('primary-header--resized');
	} else {
		$('.primary-header--fixed-nav').removeClass('primary-header--resized');
	}

	/* ========================================
	08. Transitional layer
	======================================== */

	if (a.scrollTop() < 300) {
		transitionLayer.addClass('transition-layer__closing');
		transitionLayer.removeClass('transition-layer__opening');
	}

	if (a.scrollTop() > 400) {
		transitionLayer.addClass('transition-layer__visible transition-layer__opening');
		transitionLayer.removeClass('transition-layer__closing');
	}
});

/* ========================================
09. Modals
======================================== */

$('.modal').ensembleModal({
	delay: '8000',
	clickOverlayClosing: 'true'
});

/* ========================================
10. Notices
======================================== */

$('.notice').ensembleNotices({
	delay: '8000'
});

/* ========================================
11. Accordion
======================================== */

$('.accordion').ensembleAccordion({
	beginOpen: 'false'
});

/* ========================================
12. Draws
======================================== */

$('.draw').ensembleDraws();

/* ========================================
13. Alerts
======================================== */

$('.alert').on('click','.alert__close', function() {
	$(this).closest('.alert').fadeOut(animSpeed);
});

/* ========================================
14. Tabs
======================================== */

$('.tabs').ensembleTabs();

/* ========================================
15. Maps
======================================== */

if ($('.google-map').length) {
	var map;
	map = new GMaps({
		div: '.google-map',
		lat: 51.523004,
		lng: -0.127010,
		scrollwheel: false,
		height: 400
	});
	map.drawOverlay({
		lat: map.getCenter().lat(),
		lng: map.getCenter().lng(),
		content: '<div></div>',
		verticalAlign: 'top',
		horizontalAlign: 'center'
	});
	map.addMarker({
		lat: 51.523004,
		lng: -0.127010,
		icon: "img/general/map-marker.png",
		title: 'Vidal Themes',
		infoWindow: {
			content: 'We are located here'
		}
	});

	var styles = [{
		stylers: [{
			hue: "#1a2a8f"
		}, {
			saturation: 10
		}, {
			lightness: '50'
		}, {
			invert_lightness: false
		}, {
			gamma: '1.5'
		}]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [{
			lightness: 100
		}, {
			visibility: "simplified"
		}]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [{
			visibility: "on"
		}]
	}];
	map.setOptions({
		styles: styles
	});
}

/* ========================================
16. Lightbox
======================================== */

$('a[data-lightbox="lightbox"]').ensembleLightbox({
	activity: true,
	button: true,
	caption: true,
	overlay: true,
	quitOnImgClick: true,
	selector: 'a[data-lightbox="lightbox"]'
});

$('a[data-lightbox="gallery"]').ensembleLightbox({
	activity: true,
	button: true,
	caption: true,
	navigation: false,
	overlay: true,
	arrows: true,
	selector: 'a[data-lightbox="gallery"]'
});

/* ========================================
17. Countdown
======================================== */

$(function() {
	var launchDay = new Date();
	launchDay = new Date(2016, 12 - 1, 25);
	$('#countdown').countdown({
		until: launchDay
	});
	$('#year').text(launchDay.getFullYear());
});

/* ========================================
18. Utility bar
======================================== */

header.on('click','.utility-bar-toggle', function() {
	$('.utility-bar').toggleClass('submenu-open');
});

header.on('click','.utility-bar-toggle', function() {
	$('.utility-bar-toggle i').toggleClass('utility-bar-toggle__active');
});

/* ========================================
19. Hero units
======================================== */

a.on('resize', function() {
	var windowHeight = a.height();
	heroUnit.css('height', windowHeight);

	var heroImageHeight = $('.offset-hero-unit__images').height();
	var content = $('.offset-hero-unit__content');
	if (heroImageHeight > 0) {
		ofHeroUnit.css('height', heroImageHeight);
	} else {
		content.css('transform', 'translateY(0)');
	}
});
a.trigger('resize');

/* ========================================
20. Contact form
======================================== */

$(function() {

	// Get the form.
	var form = $('#form__contact-form');

	// Get the messages div.
	var formMessages = $('.form__form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#lastname').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
