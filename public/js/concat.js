/* ========================================
@preserve
NOTICE
Plug-ins contained in this file under MIT
license retain that license, copyright
of the plug-in is attributed to the
individual Author. Modifications made to any
plug-in in this file is copyright of
Vidal Themes, these modifications are licensed
under ENVATO'S REGULAR/EXTENDED LICENSE and may
NOT be re-distributed.
======================================== */
/* ========================================

CONTENTS

01. Animation
02. Countdown
03. Isotope
04. Maps
05. Section slider
06. Syntax
07. Smooth scroll
08. Ensemble slider
09. Ensemble lightbox
10. Ensemble modal
11. Ensemble accordion
12. Ensemble draws
13. Ensemble tabs
14. Ensemble notices
15. Fitvids

======================================== */

/* ========================================
@preserve
01. CSS3 Animate it
Copyright (c) 2014 Jack McCourt
https://github.com/kriegar/css3-animate-it
Version: 0.1.0
======================================== */

(function($) {
	var selectors = [];
	var check_binded = false;
	var check_lock = false;
	var defaults = {
		interval: 250,
		force_process: false
	};
	var $window = $(window);
	var $prior_appeared;

	function process() {
		check_lock = false;
		for (var index = 0; index < selectors.length; index++) {
			var $appeared = $(selectors[index]).filter(function() {
				return $(this).is(':appeared');
			});
			$appeared.trigger('appear', [$appeared]);
			if ($prior_appeared) {
				var $disappeared = $prior_appeared.not($appeared);
				$disappeared.trigger('disappear', [$disappeared]);
			}
			$prior_appeared = $appeared;
		}
	}
	// "appeared" custom filter
	$.expr[':'].appeared = function(element) {
		var $element = $(element);
		if (!$element.is(':visible')) {
			return false;
		}
		var window_left = $window.scrollLeft();
		var window_top = $window.scrollTop();
		var offset = $element.offset();
		var left = offset.left;
		var top = offset.top;
		if (top + $element.height() >= window_top && top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() && left + $element.width() >= window_left && left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
			return true;
		} else {
			return false;
		}
	};
	$.fn.extend({
		// watching for element's appearance in browser viewport
		appear: function(options) {
			var opts = $.extend({}, defaults, options || {});
			var selector = this.selector || this;
			if (!check_binded) {
				var on_check = function() {
					if (check_lock) {
						return;
					}
					check_lock = true;
					setTimeout(process, opts.interval);
				};
				$(window).scroll(on_check).resize(on_check);
				check_binded = true;
			}
			if (opts.force_process) {
				setTimeout(process, opts.interval);
			}
			selectors.push(selector);
			return $(selector);
		}
	});
	$.extend({
		// force elements's appearance check
		force_appear: function() {
			if (check_binded) {
				process();
				return true;
			}
			return false;
		}
	});
}(jQuery));
(function($) {
	'$:nomunge';
	var cache = {},
		doTimeout = 'doTimeout',
		aps = Array.prototype.slice;
	$[doTimeout] = function() {
		return p_doTimeout.apply(window, [0].concat(aps.call(arguments)));
	};
	$.fn[doTimeout] = function() {
		var args = aps.call(arguments),
			result = p_doTimeout.apply(this, [doTimeout + args[0]].concat(args));
		return typeof args[0] === 'number' || typeof args[1] === 'number' ? this : result;
	};

	function p_doTimeout(jquery_data_key) {
		var that = this,
			elem, data = {},
			method_base = jquery_data_key ? $.fn : $,
			args = arguments,
			slice_args = 4,
			id = args[1],
			delay = args[2],
			callback = args[3];
		if (typeof id !== 'string') {
			slice_args--;
			id = jquery_data_key = 0;
			delay = args[1];
			callback = args[2];
		}
		if (jquery_data_key) {
			elem = that.eq(0);
			elem.data(jquery_data_key, data = elem.data(jquery_data_key) || {});
		} else if (id) {
			data = cache[id] || (cache[id] = {});
		}
		delete data.id;

		function cleanup() {
			if (jquery_data_key) {
				elem.removeData(jquery_data_key);
			} else if (id) {
				delete cache[id];
			}
		}

		function actually_setTimeout() {
			data.id = setTimeout(function() {
				data.fn();
			}, delay);
		}
		if (callback) {
			data.fn = function(no_polling_loop) {
				if (typeof callback === 'string') {
					callback = method_base[callback];
				}
				callback.apply(that, aps.call(args, slice_args)) === true && !no_polling_loop ? actually_setTimeout() : cleanup();
			};
			actually_setTimeout();
		} else if (data.fn) {
			//   delay === undefined ? cleanup() : data.fn( delay === false );
			return true;
		} else {
			cleanup();
		}
	}
}(jQuery));
$(window).load(function() {
	$('.animated-parent').appear();
	$('.animate-on-click').click(function() {
		var target = $(this).attr('data-target');
		if ($(this).attr('data-sequence') !== undefined) {
			var firstId = $('.' + target + ':first').attr('data-id');
			var lastId = $('.' + target + ':last').attr('data-id');
			var number = firstId;
			if ($('.' + target + '[data-id=' + number + ']').hasClass('go')) {
				$('.' + target + '[data-id=' + number + ']').addClass('goAway');
				$('.' + target + '[data-id=' + number + ']').removeClass('go');
			} else {
				$('.' + target + '[data-id=' + number + ']').addClass('go');
				$('.' + target + '[data-id=' + number + ']').removeClass('goAway');
			}
			number++;
			delay = Number($(this).attr('data-sequence'));
			$.doTimeout(delay, function() {
				if ($('.' + target + '[data-id=' + number + ']').hasClass('go')) {
					$('.' + target + '[data-id=' + number + ']').addClass('goAway');
					$('.' + target + '[data-id=' + number + ']').removeClass('go');
				} else {
					$('.' + target + '[data-id=' + number + ']').addClass('go');
					$('.' + target + '[data-id=' + number + ']').removeClass('goAway');
				}
				++number;
				if (number <= lastId) {
					return true;
				}
			});
		} else {
			if ($('.' + target).hasClass('go')) {
				$('.' + target).addClass('goAway');
				$('.' + target).removeClass('go');
			} else {
				$('.' + target).addClass('go');
				$('.' + target).removeClass('goAway');
			}
		}
	});
	$(document.body).on('appear', '.animated-parent', function() {
		var ele = $(this).find('.animated');
		var parent = $(this);
		if (parent.attr('data-sequence') !== undefined) {
			var firstId = $(this).find('.animated:first').attr('data-id');
			var number = firstId;
			var lastId = $(this).find('.animated:last').attr('data-id');
			$(parent).find('.animated[data-id=' + number + ']').addClass('go');
			number++;
			delay = Number(parent.attr('data-sequence'));
			$.doTimeout(delay, function() {
				$(parent).find('.animated[data-id=' + number + ']').addClass('go');
				++number;
				if (number <= lastId) {
					return true;
				}
			});
		} else {
			ele.addClass('go');
		}
	});
});
$(document.body).on('disappear', '.animated-parent', function() {
	if (!$(this).hasClass('animate-once')) {
		$(this).find('.animated').removeClass('go');
	}
});
$(window).load(function() {
	$.force_appear();
});
/* ========================================
@preserve
Simple JavaScript Inheritance
By John Resig http://ejohn.org/
MIT Licensed.
======================================== */
(function() {
	var initializing = false;
	// The base JQClass implementation (does nothing)
	window.JQClass = function() {};
	// Collection of derived classes
	JQClass.classes = {};
	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] === 'function' && typeof base[name] === 'function' ? function(name, fn) {
				return function() {
					var __super = this._super;
					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = function(args) {
						return base[name].apply(this, args || []);
					};
					var ret = fn.apply(this, arguments);
					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					this._super = __super;
					return ret;
				};
			}(name, prop[name]) : prop[name];
		}
		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}
		// Populate our constructed prototype object
		JQClass.prototype = prototype;
		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;
		// And make this class extendable
		JQClass.extend = extender;
		return JQClass;
	};
}());
(function($) {
	// Ensure $, encapsulate
	/** Abstract base class for collection plugins v1.0.1.
				Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
				Licensed under the MIT (http://keith-wood.name/licence.html) license.
				@module $.JQPlugin
				@abstract */
	JQClass.classes.JQPlugin = JQClass.extend({
		/** Name to identify this plugin.
				@example name: 'tabs' */
		name: 'plugin',
		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
		selectedClass: 'selected',
		triggers: 'click'
	} */
		defaultOptions: {},
		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			@example regionalOptions: {
	'': {
		greeting: 'Hi'
	}
	} */
		regionalOptions: {},
		/** Names of getter methods - those that can't be chained (default: []).
				@example _getters: ['activeTab'] */
		_getters: [],
		/** Retrieve a marker class for affected elements.
				@private
				@return {string} The marker class. */
		_getMarker: function() {
			return 'is-' + this.name;
		},
		/** Initialise the plugin.
				Create the jQuery bridge - plugin name <code>xyz</code>
				produces <code>$.xyz</code> and <code>$.fn.xyz</code>. */
		_init: function() {
			// Apply default localisations
			$.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[''] || {});
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function(options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				if ($[jqName]._isNotChained(options, otherArgs)) {
					return $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs));
				}
				return this.each(function() {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						$[jqName][options].apply($[jqName], [this].concat(otherArgs));
					} else {
						$[jqName]._attach(this, options);
					}
				});
			};
		},
		/** Set default values for all subsequent instances.
				@param options {object} The new default options.
				@example $.plugin.setDefauls({name: value}) */
		setDefaults: function(options) {
			$.extend(this.defaultOptions, options || {});
		},
		/** Determine whether a method is a getter and doesn't permit chaining.
				@private
				@param name {string} The method name.
				@param otherArgs {any[]} Any other arguments for the method.
				@return {boolean} True if this method is a getter, false otherwise. */
		_isNotChained: function(name, otherArgs) {
			if (name === 'option' && (otherArgs.length === 0 || otherArgs.length === 1 && typeof otherArgs[0] === 'string')) {
				return true;
			}
			return $.inArray(name, this._getters) > -1;
		},
		/** Initialise an element. Called internally only.
				Adds an instance object as data named for the plugin.
				@param elem {Element} The element to enhance.
				@param options {object} Overriding settings. */
		_attach: function(elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
			var inst = $.extend({
				name: this.name,
				elem: elem,
				options: options
			}, this._instSettings(elem, options));
			elem.data(this.name, inst);
			// Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},
		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			@param elem {jQuery} The current jQuery element.
			@param options {object} The instance options.
			@return {object} Any extra instance values.
			@example _instSettings: function(elem, options) {
		return {nav: elem.find(options.navSelector)};
	} */
		_instSettings: function(elem, options) {
			return {};
		},
		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _postAttach: function(elem, inst) {
		elem.on('click.' + this.name, function() {
			...
		});
	} */
		_postAttach: function(elem, inst) {},
		/** Retrieve metadata configuration from the element.
				Metadata is specified as an attribute:
				<code>data-&lt;plugin name>="&lt;setting name>: '&lt;value>', ..."</code>.
				Dates should be specified as strings in this format: 'new Date(y, m-1, d)'.
				@private
				@param elem {jQuery} The source element.
				@return {object} The inline configuration or {}. */
		_getMetadata: function(elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data.replace(/'/g, '"');
				data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
					var count = data.substring(0, i).match(/"/g);
					// Handle embedded ':'
					return !count || count.length % 2 === 0 ? '"' + group + '":' : group + ':';
				});
				data = $.parseJSON('{' + data + '}');
				for (var name in data) {
					// Convert dates
					var value = data[name];
					if (typeof value === 'string' && value.match(/^new Date\((.*)\)$/)) {
						data[name] = eval(value);
					}
				}
				return data;
			} catch (e) {
				return {};
			}
		},
		/** Retrieve the instance data for element.
				@param elem {Element} The source element.
				@return {object} The instance data or {}. */
		_getInst: function(elem) {
			return $(elem).data(this.name) || {};
		},
		/** Retrieve or reconfigure the settings for a plugin.
			@param elem {Element} The source element.
			@param name {object|string} The collection of new option values or the name of a single option.
			@param [value] {any} The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value)
	$(selector).plugin('option', {name: value, ...})
	var value = $(selector).plugin('option', 'name')
	var options = $(selector).plugin('option') */
		option: function(elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			if (!name || typeof name === 'string' && value === null) {
				var options = (inst || {}).options;
				return options && name ? options[name] : options;
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var options = name || {};
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},
		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@param options {object} The new options.
			@example _optionsChanged: function(elem, inst, options) {
		if (options.name != inst.options.name) {
			elem.removeClass(inst.options.name).addClass(options.name);
		}
	} */
		_optionsChanged: function(elem, inst, options) {},
		/** Remove all trace of the plugin.
				Override <code>_preDestroy</code> for plugin-specific processing.
				@param elem {Element} The source element.
				@example $(selector).plugin('destroy') */
		destroy: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},
		/** Plugin specific pre destruction.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the <code>_postAttach</code> or <code>_optionsChanged</code> functions.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _preDestroy: function(elem, inst) {
		elem.off('.' + this.name);
	} */
		_preDestroy: function(elem, inst) {}
	});
	/** Convert names from hyphenated to camel-case.
				@private
				@param value {string} The original hyphenated name.
				@return {string} The camel-case version. */
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function(match, group) {
			return group.toUpperCase();
		});
	}
	/** Expose the plugin base.
				@namespace "$.JQPlugin" */
	$.JQPlugin = {
		/** Create a new collection plugin.
			@memberof "$.JQPlugin"
			@param [superClass='JQPlugin'] {string} The name of the parent class to inherit from.
			@param overrides {object} The property/function overrides for the new class.
			@example $.JQPlugin.createPlugin({
		name: 'tabs',
		defaultOptions: {selectedClass: 'selected'},
		_initSettings: function(elem, options) { return {...}; },
		_postAttach: function(elem, inst) { ... }
	}); */
		createPlugin: function(superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className]();
		}
	};
}(jQuery));


/* ========================================
@preserve
http://keith-wood.name/countdown.html
02. Countdown for jQuery v2.0.2.
Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
Available under the MIT (http://keith-wood.name/licence.html) license.
Please attribute the author if you use it.
======================================== */

(function($) {
	// Hide scope, no $ conflict
	var pluginName = 'countdown';
	var Y = 0;
	// Years
	var O = 1;
	// Months
	var W = 2;
	// Weeks
	var D = 3;
	// Days
	var H = 4;
	// Hours
	var M = 5;
	// Minutes
	var S = 6;
	// Seconds
	/** Create the countdown plugin.
				<p>Sets an element to show the time remaining until a given instant.</p>
				<p>Expects HTML like:</p>
				<pre>&lt;div>&lt;/div></pre>
				<p>Provide inline configuration like:</p>
				<pre>&lt;div data-countdown="name: 'value'">&lt;/div></pre>
					@module Countdown
				@augments JQPlugin
				@example $(selector).countdown({until: +300}) */
	$.JQPlugin.createPlugin({
		/** The name of the plugin. */
		name: pluginName,
		/** Countdown expiry callback.
				Triggered when the countdown expires.
				@callback expiryCallback */
		/** Countdown server synchronisation callback.
				Triggered when the countdown is initialised.
				@callback serverSyncCallback
				@return {Date} The current date/time on the server as expressed in the local timezone. */
		/** Countdown tick callback.
				Triggered on every <code>tickInterval</code> ticks of the countdown.
				@callback tickCallback
				@param periods {number[]} The breakdown by period (years, months, weeks, days,
						hours, minutes, seconds) of the time remaining/passed. */
		/** Countdown which labels callback.
				Triggered when the countdown is being display to determine which set of labels
				(<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
				@callback whichLabelsCallback
				@param num {number} The current period value.
				@return {number} The suffix for the label set to use. */
		/** Default settings for the plugin.
			@property until {Date|number|string} The date/time to count down to, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@example until: new Date(2013, 12-1, 25, 13, 30)
	until: +300
	until: '+1O -2D'
			@property [since] {Date|number|string} The date/time to count up from, or
						number of seconds offset from now, or string for unit offset(s):
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@example since: new Date(2013, 1-1, 1)
	since: -300
	since: '-1O +2D'
			@property [timezone=null] {number} The timezone (hours or minutes from GMT) for the target times,
						or null for client local timezone.
			@example timezone: +10
	timezone: -60
			@property [serverSync=null] {serverSyncCallback} A function to retrieve the current server time
						for synchronisation.
			@property [format='dHMS'] {string} The format for display - upper case for always, lower case only if non-zero,
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@property [layout=''] {string} Build your own layout for the countdown.
			@example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
			@property [compact=false] {boolean} True to display in a compact format, false for an expanded one.
			@property [padZeroes=false] {boolean} True to add leading zeroes
			@property [significant=0] {number} The number of periods with non-zero values to show, zero for all.
			@property [description=''] {string} The description displayed for the countdown.
			@property [expiryUrl=''] {string} A URL to load upon expiry, replacing the current page.
			@property [expiryText=''] {string} Text to display upon expiry, replacing the countdown. This may be HTML.
			@property [alwaysExpire=false] {boolean} True to trigger <code>onExpiry</code> even if target time has passed.
			@property [onExpiry=null] {expiryCallback} Callback when the countdown expires -
						receives no parameters and <code>this</code> is the containing division.
			@example onExpiry: function() {
	...
	}
			@property [onTick=null] {tickCallback} Callback when the countdown is updated -
						receives <code>number[7]</code> being the breakdown by period
						(years, months, weeks, days, hours, minutes, seconds - based on
						<code>format</code>) and <code>this</code> is the containing division.
			@example onTick: function(periods) {
		var secs = $.countdown.periodsToSeconds(periods);
		if (secs < 300) { // Last five minutes
		...
		}
	}
			@property [tickInterval=1] {number} The interval (seconds) between <code>onTick</code> callbacks. */
		defaultOptions: {
			until: null,
			since: null,
			timezone: null,
			serverSync: null,
			format: 'dHMS',
			layout: '',
			compact: false,
			padZeroes: false,
			significant: 0,
			description: '',
			expiryUrl: '',
			expiryText: '',
			alwaysExpire: false,
			onExpiry: null,
			onTick: null,
			tickInterval: 1
		},
		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']] {string[]}
						The display texts for the counter periods.
			@property [labels1=['Year','Month','Week','Day','Hour','Minute','Second']] {string[]}
						The display texts for the counter periods if they have a value of 1.
						Add other <code>labels<em>n</em></code> attributes as necessary to
						cater for other numeric idiosyncrasies of the localisation.
			@property [compactLabels=['y','m','w','d']] {string[]} The compact texts for the counter periods.
			@property [whichLabels=null] {whichLabelsCallback} A function to determine which
						<code>labels<em>n</em></code> to use.
			@example whichLabels: function(num) {
	return (num > 1 ? 0 : 1);
	}
			@property [digits=['0','1',...,'9']] {number[]} The digits to display (0-9).
			@property [timeSeparator=':'] {string} Separator for time periods in the compact layout.
			@property [isRTL=false] {boolean} True for right-to-left languages, false for left-to-right. */
		regionalOptions: {
			// Available regional settings, indexed by language/country code
			'': {
				// Default regional settings - English/US
				labels: [
					'Years',
					'Months',
					'Weeks',
					'Days',
					'Hours',
					'Minutes',
					'Seconds'
				],
				labels1: [
					'Year',
					'Month',
					'Week',
					'Day',
					'Hour',
					'Minute',
					'Second'
				],
				compactLabels: [
					'y',
					'm',
					'w',
					'd'
				],
				whichLabels: null,
				digits: [
					'0',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9'
				],
				timeSeparator: ':',
				isRTL: false
			}
		},
		/** Names of getter methods - those that can't be chained. */
		_getters: ['getTimes'],
		/* Class name for the right-to-left marker. */
		_rtlClass: pluginName + '-rtl',
		/* Class name for the countdown section marker. */
		_sectionClass: pluginName + '-section',
		/* Class name for the period amount marker. */
		_amountClass: pluginName + '-amount',
		/* Class name for the period name marker. */
		_periodClass: pluginName + '-period',
		/* Class name for the countdown row marker. */
		_rowClass: pluginName + '-row',
		/* Class name for the holding countdown marker. */
		_holdingClass: pluginName + '-holding',
		/* Class name for the showing countdown marker. */
		_showClass: pluginName + '-show',
		/* Class name for the description marker. */
		_descrClass: pluginName + '-descr',
		/* List of currently active countdown elements. */
		_timerElems: [],
		/** Additional setup for the countdown.
				Apply default localisations.
				Create the timer. */
		_init: function() {
			var self = this;
			this._super();
			this._serverSyncs = [];
			var now = typeof Date.now === 'function' ? Date.now : function() {
				return new Date().getTime();
			};
			var perfAvail = window.performance && typeof window.performance.now === 'function';
			// Shared timer for all countdowns
			function timerCallBack(timestamp) {
				var drawStart = timestamp < 1000000000000 ? perfAvail ? performance.now() + performance.timing.navigationStart : now() : // Integer milliseconds since unix epoch
					timestamp || now();
				if (drawStart - animationStartTime >= 1000) {
					self._updateElems();
					animationStartTime = drawStart;
				}
				requestAnimationFrame(timerCallBack);
			}
			var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
			// This is when we expect a fall-back to setInterval as it's much more fluid
			var animationStartTime = 0;
			if (!requestAnimationFrame || $.noRequestAnimationFrame) {
				$.noRequestAnimationFrame = null;
				setInterval(function() {
					self._updateElems();
				}, 980); // Fall back to good old setInterval
			} else {
				animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now();
				requestAnimationFrame(timerCallBack);
			}
		},
		/** Convert a date/time to UTC.
			@param tz {number} The hour or minute offset from GMT, e.g. +9, -360.
			@param year {Date|number} the date/time in that timezone or the year in that timezone.
			@param [month] {number} The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
			@param [day] {number} The day (omit if <code>year</code> is a <code>Date</code>).
			@param [hours] {number} The hour (omit if <code>year</code> is a <code>Date</code>).
			@param [mins] {number} The minute (omit if <code>year</code> is a <code>Date</code>).
			@param [secs] {number} The second (omit if <code>year</code> is a <code>Date</code>).
			@param [ms] {number} The millisecond (omit if <code>year</code> is a <code>Date</code>).
			@return {Date} The equivalent UTC date/time.
			@example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
	$.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
		UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
			if (typeof year === 'object' && year.constructor === Date) {
				ms = year.getMilliseconds();
				secs = year.getSeconds();
				mins = year.getMinutes();
				hours = year.getHours();
				day = year.getDate();
				month = year.getMonth();
				year = year.getFullYear();
			}
			var d = new Date();
			d.setUTCFullYear(year);
			d.setUTCDate(1);
			d.setUTCMonth(month || 0);
			d.setUTCDate(day || 1);
			d.setUTCHours(hours || 0);
			d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
			d.setUTCSeconds(secs || 0);
			d.setUTCMilliseconds(ms || 0);
			return d;
		},
		/** Convert a set of periods into seconds.
				Averaged for months and years.
			@param periods {number[]} The periods per year/month/week/day/hour/minute/second.
			@return {number} The corresponding number of seconds.
			@example var secs = $.countdown.periodsToSeconds(periods) */
		periodsToSeconds: function(periods) {
			return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 + periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6];
		},
		/** Resynchronise the countdowns with the server.
				@example $.countdown.resync() */
		resync: function() {
			var self = this;
			$('.' + this._getMarker()).each(function() {
				// Each countdown
				var inst = $.data(this, self.name);
				if (inst.options.serverSync) {
					// If synced
					var serverSync = null;
					for (var i = 0; i < self._serverSyncs.length; i++) {
						if (self._serverSyncs[i][0] === inst.options.serverSync) {
							// Find sync details
							serverSync = self._serverSyncs[i];
							break;
						}
					}
					if (serverSync[2] === null) {
						// Recalculate if missing
						var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(this, []) : null;
						serverSync[2] = (serverResult ? new Date().getTime() - serverResult.getTime() : 0) - serverSync[1];
					}
					if (inst._since) {
						// Apply difference
						inst._since.setMilliseconds(inst._since.getMilliseconds() + serverSync[2]);
					}
					inst._until.setMilliseconds(inst._until.getMilliseconds() + serverSync[2]);
				}
			});
			for (var i = 0; i < self._serverSyncs.length; i++) {
				// Update sync details
				if (self._serverSyncs[i][2] !== null) {
					self._serverSyncs[i][1] += self._serverSyncs[i][2];
					delete self._serverSyncs[i][2];
				}
			}
		},
		_instSettings: function(elem, options) {
			return {
				_periods: [
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]
			};
		},
		/** Add an element to the list of active ones.
				@private
				@param elem {Element} The countdown element. */
		_addElem: function(elem) {
			if (!this._hasElem(elem)) {
				this._timerElems.push(elem);
			}
		},
		/** See if an element is in the list of active ones.
				@private
				@param elem {Element} The countdown element.
				@return {boolean} True if present, false if not. */
		_hasElem: function(elem) {
			return $.inArray(elem, this._timerElems) > -1;
		},
		/** Remove an element from the list of active ones.
				@private
				@param elem {Element} The countdown element. */
		_removeElem: function(elem) {
			this._timerElems = $.map(this._timerElems, function(value) {
				return value === elem ? null : value;
			}); // delete entry
		},
		/** Update each active timer element.
				@private */
		_updateElems: function() {
			for (var i = this._timerElems.length - 1; i >= 0; i--) {
				this._updateCountdown(this._timerElems[i]);
			}
		},
		_optionsChanged: function(elem, inst, options) {
			if (options.layout) {
				options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
			}
			this._resetExtraLabels(inst.options, options);
			var timezoneChanged = inst.options.timezone !== options.timezone;
			$.extend(inst.options, options);
			this._adjustSettings(elem, inst, options.until !== null || options.since !== null || timezoneChanged);
			var now = new Date();
			if (inst._since && inst._since < now || inst._until && inst._until > now) {
				this._addElem(elem[0]);
			}
			this._updateCountdown(elem, inst);
		},
		/** Redisplay the countdown with an updated display.
				@private
				@param elem {Element|jQuery} The containing division.
				@param inst {object} The current settings for this instance. */
		_updateCountdown: function(elem, inst) {
			elem = elem.jquery ? elem : $(elem);
			inst = inst || this._getInst(elem);
			if (!inst) {
				return;
			}
			elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL);
			if ($.isFunction(inst.options.onTick)) {
				var periods = inst._hold !== 'lap' ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
				if (inst.options.tickInterval === 1 || this.periodsToSeconds(periods) % inst.options.tickInterval === 0) {
					inst.options.onTick.apply(elem[0], [periods]);
				}
			}
			var expired = inst._hold !== 'pause' && (inst._since ? inst._now.getTime() < inst._since.getTime() : inst._now.getTime() >= inst._until.getTime());
			if (expired && !inst._expiring) {
				inst._expiring = true;
				if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
					this._removeElem(elem[0]);
					if ($.isFunction(inst.options.onExpiry)) {
						inst.options.onExpiry.apply(elem[0], []);
					}
					if (inst.options.expiryText) {
						var layout = inst.options.layout;
						inst.options.layout = inst.options.expiryText;
						this._updateCountdown(elem[0], inst);
						inst.options.layout = layout;
					}
					if (inst.options.expiryUrl) {
						window.location = inst.options.expiryUrl;
					}
				}
				inst._expiring = false;
			} else if (inst._hold === 'pause') {
				this._removeElem(elem[0]);
			}
		},
		/** Reset any extra labelsn and compactLabelsn entries if changing labels.
				@private
				@param base {object} The options to be updated.
				@param options {object} The new option values. */
		_resetExtraLabels: function(base, options) {
			for (var n in options) {
				if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
					base[n] = options[n];
				}
			}
			for (var n in base) {
				// Remove custom numbered labels
				if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof options[n] === 'undefined') {
					base[n] = null;
				}
			}
		},
		/** Calculate internal settings for an instance.
				@private
				@param elem {jQuery} The containing division.
				@param inst {object} The current settings for this instance.
				@param recalc {boolean} True if until or since are set. */
		_adjustSettings: function(elem, inst, recalc) {
			var serverEntry = null;
			for (var i = 0; i < this._serverSyncs.length; i++) {
				if (this._serverSyncs[i][0] === inst.options.serverSync) {
					serverEntry = this._serverSyncs[i][1];
					break;
				}
			}
			if (serverEntry !== null) {
				var serverOffset = inst.options.serverSync ? serverEntry : 0;
				var now = new Date();
			} else {
				var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(elem[0], []) : null;
				var now = new Date();
				var serverOffset = serverResult ? now.getTime() - serverResult.getTime() : 0;
				this._serverSyncs.push([
					inst.options.serverSync,
					serverOffset
				]);
			}
			var timezone = inst.options.timezone;
			timezone = timezone === null ? -now.getTimezoneOffset() : timezone;
			if (recalc || !recalc && inst._until === null && inst._since === null) {
				inst._since = inst.options.since;
				if (inst._since !== null) {
					inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
					if (inst._since && serverOffset) {
						inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset);
					}
				}
				inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
				if (serverOffset) {
					inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset);
				}
			}
			inst._show = this._determineShow(inst);
		},
		/** Remove the countdown widget from a div.
				@param elem {jQuery} The containing division.
				@param inst {object} The current instance object. */
		_preDestroy: function(elem, inst) {
			this._removeElem(elem[0]);
			elem.empty();
		},
		/** Pause a countdown widget at the current time.
				Stop it running but remember and display the current time.
			@param elem {Element} The containing division.
			@example $(selector).countdown('pause') */
		pause: function(elem) {
			this._hold(elem, 'pause');
		},
		/** Pause a countdown widget at the current time.
				Stop the display but keep the countdown running.
			@param elem {Element} The containing division.
			@example $(selector).countdown('lap') */
		lap: function(elem) {
			this._hold(elem, 'lap');
		},
		/** Resume a paused countdown widget.
				@param elem {Element} The containing division.
				@example $(selector).countdown('resume') */
		resume: function(elem) {
			this._hold(elem, null);
		},
		/** Toggle a paused countdown widget.
				@param elem {Element} The containing division.
				@example $(selector).countdown('toggle') */
		toggle: function(elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'pause' : 'resume'](elem);
		},
		/** Toggle a lapped countdown widget.
				@param elem {Element} The containing division.
				@example $(selector).countdown('toggleLap') */
		toggleLap: function(elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'lap' : 'resume'](elem);
		},
		/** Pause or resume a countdown widget.
				@private
				@param elem {Element} The containing division.
				@param hold {string} The new hold setting. */
		_hold: function(elem, hold) {
			var inst = $.data(elem, this.name);
			if (inst) {
				if (inst._hold === 'pause' && !hold) {
					inst._periods = inst._savePeriods;
					var sign = inst._since ? '-' : '+';
					inst[inst._since ? '_since' : '_until'] = this._determineTime(sign + inst._periods[0] + 'y' + sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' + sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' + sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
					this._addElem(elem);
				}
				inst._hold = hold;
				inst._savePeriods = hold === 'pause' ? inst._periods : null;
				$.data(elem, this.name, inst);
				this._updateCountdown(elem, inst);
			}
		},
		/** Return the current time periods.
				@param elem {Element} The containing division.
				@return {number[]} The current periods for the countdown.
				@example var periods = $(selector).countdown('getTimes') */
		getTimes: function(elem) {
			var inst = $.data(elem, this.name);
			return !inst ? null : inst._hold === 'pause' ? inst._savePeriods : !inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
		},
		/** A time may be specified as an exact value or a relative one.
				@private
				@param setting {string|number|Date} The date/time value as a relative or absolute value.
				@param defaultTime {Date} The date/time to use if no other is supplied.
				@return {Date} The corresponding date/time. */
		_determineTime: function(setting, defaultTime) {
			var self = this;
			var offsetNumeric = function(offset) {
				// e.g. +300, -2
				var time = new Date();
				time.setTime(time.getTime() + offset * 1000);
				return time;
			};
			var offsetString = function(offset) {
				// e.g. '+2d', '-4w', '+3h +30m'
				offset = offset.toLowerCase();
				var time = new Date();
				var year = time.getFullYear();
				var month = time.getMonth();
				var day = time.getDate();
				var hour = time.getHours();
				var minute = time.getMinutes();
				var second = time.getSeconds();
				var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || 's') {
						case 's':
							second += parseInt(matches[1], 10);
							break;
						case 'm':
							minute += parseInt(matches[1], 10);
							break;
						case 'h':
							hour += parseInt(matches[1], 10);
							break;
						case 'd':
							day += parseInt(matches[1], 10);
							break;
						case 'w':
							day += parseInt(matches[1], 10) * 7;
							break;
						case 'o':
							month += parseInt(matches[1], 10);
							day = Math.min(day, self._getDaysInMonth(year, month));
							break;
						case 'y':
							year += parseInt(matches[1], 10);
							day = Math.min(day, self._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day, hour, minute, second, 0);
			};
			var time = setting === null ? defaultTime : typeof setting === 'string' ? offsetString(setting) : typeof setting === 'number' ? offsetNumeric(setting) : setting;
			if (time)
				time.setMilliseconds(0);
			return time;
		},
		/** Determine the number of days in a month.
				@private
				@param year {number} The year.
				@param month {number} The month.
				@return {number} The days in that month. */
		_getDaysInMonth: function(year, month) {
			return 32 - new Date(year, month, 32).getDate();
		},
		/** Default implementation to determine which set of labels should be used for an amount.
				Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
				@private
				@param num {number} The amount to be displayed.
				@return {number} The set of labels to be used for this amount. */
		_normalLabels: function(num) {
			return num;
		},
		/** Generate the HTML to display the countdown widget.
				@private
				@param inst {object} The current settings for this instance.
				@return {string} The new HTML for the countdown display. */
		_generateHTML: function(inst) {
			var self = this;
			// Determine what to show
			inst._periods = inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
			// Show all 'asNeeded' after first non-zero value
			var shownNonZero = false;
			var showCount = 0;
			var sigCount = inst.options.significant;
			var show = $.extend({}, inst._show);
			for (var period = Y; period <= S; period++) {
				shownNonZero |= inst._show[period] === '?' && inst._periods[period] > 0;
				show[period] = inst._show[period] === '?' && !shownNonZero ? null : inst._show[period];
				showCount += show[period] ? 1 : 0;
				sigCount -= inst._periods[period] > 0 ? 1 : 0;
			}
			var showSignificant = [
				false,
				false,
				false,
				false,
				false,
				false,
				false
			];
			for (var period = S; period >= Y; period--) {
				// Determine significant periods
				if (inst._show[period]) {
					if (inst._periods[period]) {
						showSignificant[period] = true;
					} else {
						showSignificant[period] = sigCount > 0;
						sigCount--;
					}
				}
			}
			var labels = inst.options.compact ? inst.options.compactLabels : inst.options.labels;
			var whichLabels = inst.options.whichLabels || this._normalLabels;
			var showCompact = function(period) {
				var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
				return show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] : labels[period]) + ' ' : '';
			};
			var minDigits = inst.options.padZeroes ? 2 : 1;
			var showFull = function(period) {
				var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
				return !inst.options.significant && show[period] || inst.options.significant && showSignificant[period] ? '<span class="' + self._sectionClass + '">' + '<span class="' + self._amountClass + '">' + self._minDigits(inst, inst._periods[period], minDigits) + '</span>' + '<span class="' + self._periodClass + '">' + (labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '';
			};
			return inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) : (inst.options.compact ? // Compact version
				'<span class="' + this._rowClass + ' ' + this._amountClass + (inst._hold ? ' ' + this._holdingClass : '') + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') + (show[M] ? (show[H] ? inst.options.timeSeparator : '') + this._minDigits(inst, inst._periods[M], 2) : '') + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') + this._minDigits(inst, inst._periods[S], 2) : '') : // Full version
				'<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) + (inst._hold ? ' ' + this._holdingClass : '') + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + '</span>' + (inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + inst.options.description + '</span>' : '');
		},
		/** Construct a custom layout.
				@private
				@param inst {object} The current settings for this instance.
				@param show {boolean[]} Flags indicating which periods are requested.
				@param layout {string} The customised layout.
				@param compact {boolean} True if using compact labels.
				@param significant {number} The number of periods with values to show, zero for all.
				@param showSignificant {boolean[]} Other periods to show for significance.
				@return {string} The custom HTML. */
		_buildLayout: function(inst, show, layout, compact, significant, showSignificant) {
			var labels = inst.options[compact ? 'compactLabels' : 'labels'];
			var whichLabels = inst.options.whichLabels || this._normalLabels;
			var labelFor = function(index) {
				return (inst.options[(compact ? 'compactLabels' : 'labels') + whichLabels(inst._periods[index])] || labels)[index];
			};
			var digit = function(value, position) {
				return inst.options.digits[Math.floor(value / position) % 10];
			};
			var subs = {
				desc: inst.options.description,
				sep: inst.options.timeSeparator,
				yl: labelFor(Y),
				yn: this._minDigits(inst, inst._periods[Y], 1),
				ynn: this._minDigits(inst, inst._periods[Y], 2),
				ynnn: this._minDigits(inst, inst._periods[Y], 3),
				y1: digit(inst._periods[Y], 1),
				y10: digit(inst._periods[Y], 10),
				y100: digit(inst._periods[Y], 100),
				y1000: digit(inst._periods[Y], 1000),
				ol: labelFor(O),
				on: this._minDigits(inst, inst._periods[O], 1),
				onn: this._minDigits(inst, inst._periods[O], 2),
				onnn: this._minDigits(inst, inst._periods[O], 3),
				o1: digit(inst._periods[O], 1),
				o10: digit(inst._periods[O], 10),
				o100: digit(inst._periods[O], 100),
				o1000: digit(inst._periods[O], 1000),
				wl: labelFor(W),
				wn: this._minDigits(inst, inst._periods[W], 1),
				wnn: this._minDigits(inst, inst._periods[W], 2),
				wnnn: this._minDigits(inst, inst._periods[W], 3),
				w1: digit(inst._periods[W], 1),
				w10: digit(inst._periods[W], 10),
				w100: digit(inst._periods[W], 100),
				w1000: digit(inst._periods[W], 1000),
				dl: labelFor(D),
				dn: this._minDigits(inst, inst._periods[D], 1),
				dnn: this._minDigits(inst, inst._periods[D], 2),
				dnnn: this._minDigits(inst, inst._periods[D], 3),
				d1: digit(inst._periods[D], 1),
				d10: digit(inst._periods[D], 10),
				d100: digit(inst._periods[D], 100),
				d1000: digit(inst._periods[D], 1000),
				hl: labelFor(H),
				hn: this._minDigits(inst, inst._periods[H], 1),
				hnn: this._minDigits(inst, inst._periods[H], 2),
				hnnn: this._minDigits(inst, inst._periods[H], 3),
				h1: digit(inst._periods[H], 1),
				h10: digit(inst._periods[H], 10),
				h100: digit(inst._periods[H], 100),
				h1000: digit(inst._periods[H], 1000),
				ml: labelFor(M),
				mn: this._minDigits(inst, inst._periods[M], 1),
				mnn: this._minDigits(inst, inst._periods[M], 2),
				mnnn: this._minDigits(inst, inst._periods[M], 3),
				m1: digit(inst._periods[M], 1),
				m10: digit(inst._periods[M], 10),
				m100: digit(inst._periods[M], 100),
				m1000: digit(inst._periods[M], 1000),
				sl: labelFor(S),
				sn: this._minDigits(inst, inst._periods[S], 1),
				snn: this._minDigits(inst, inst._periods[S], 2),
				snnn: this._minDigits(inst, inst._periods[S], 3),
				s1: digit(inst._periods[S], 1),
				s10: digit(inst._periods[S], 10),
				s100: digit(inst._periods[S], 100),
				s1000: digit(inst._periods[S], 1000)
			};
			var html = layout;
			// Replace period containers: {p<}...{p>}
			for (var i = Y; i <= S; i++) {
				var period = 'yowdhms'.charAt(i);
				var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
				html = html.replace(re, !significant && show[i] || significant && showSignificant[i] ? '$1' : '');
			}
			// Replace period values: {pn}
			$.each(subs, function(n, v) {
				var re = new RegExp('\\{' + n + '\\}', 'g');
				html = html.replace(re, v);
			});
			return html;
		},
		/** Ensure a numeric value has at least n digits for display.
				@private
				@param inst {object} The current settings for this instance.
				@param value {number} The value to display.
				@param len {number} The minimum length.
				@return {string} The display text. */
		_minDigits: function(inst, value, len) {
			value = '' + value;
			if (value.length >= len) {
				return this._translateDigits(inst, value);
			}
			value = '0000000000' + value;
			return this._translateDigits(inst, value.substr(value.length - len));
		},
		/** Translate digits into other representations.
				@private
				@param inst {object} The current settings for this instance.
				@param value {string} The text to translate.
				@return {string} The translated text. */
		_translateDigits: function(inst, value) {
			return ('' + value).replace(/[0-9]/g, function(digit) {
				return inst.options.digits[digit];
			});
		},
		/** Translate the format into flags for each period.
				@private
				@param inst {object} The current settings for this instance.
				@return {string[]} Flags indicating which periods are requested (?) or
						required (!) by year, month, week, day, hour, minute, second. */
		_determineShow: function(inst) {
			var format = inst.options.format;
			var show = [];
			show[Y] = format.match('y') ? '?' : format.match('Y') ? '!' : null;
			show[O] = format.match('o') ? '?' : format.match('O') ? '!' : null;
			show[W] = format.match('w') ? '?' : format.match('W') ? '!' : null;
			show[D] = format.match('d') ? '?' : format.match('D') ? '!' : null;
			show[H] = format.match('h') ? '?' : format.match('H') ? '!' : null;
			show[M] = format.match('m') ? '?' : format.match('M') ? '!' : null;
			show[S] = format.match('s') ? '?' : format.match('S') ? '!' : null;
			return show;
		},
		/** Calculate the requested periods between now and the target time.
				@private
				@param inst {object} The current settings for this instance.
				@param show {string[]} Flags indicating which periods are requested/required.
				@param significant {number} The number of periods with values to show, zero for all.
				@param now {Date} The current date and time.
				@return {number[]} The current time periods (always positive)
						by year, month, week, day, hour, minute, second. */
		_calculatePeriods: function(inst, show, significant, now) {
			// Find endpoints
			inst._now = now;
			inst._now.setMilliseconds(0);
			var until = new Date(inst._now.getTime());
			if (inst._since) {
				if (now.getTime() < inst._since.getTime()) {
					inst._now = now = until;
				} else {
					now = inst._since;
				}
			} else {
				until.setTime(inst._until.getTime());
				if (now.getTime() > inst._until.getTime()) {
					inst._now = now = until;
				}
			}
			// Calculate differences by period
			var periods = [
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			if (show[Y] || show[O]) {
				// Treat end of months as the same
				var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
				var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
				var sameDay = until.getDate() === now.getDate() || until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil);
				var getSecs = function(date) {
					return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
				};
				var months = Math.max(0, (until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() && !sameDay || sameDay && getSecs(until) < getSecs(now) ? -1 : 0));
				periods[Y] = show[Y] ? Math.floor(months / 12) : 0;
				periods[O] = show[O] ? months - periods[Y] * 12 : 0;
				// Adjust for months difference and end of month if necessary
				now = new Date(now.getTime());
				var wasLastDay = now.getDate() === lastNow;
				var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
				if (now.getDate() > lastDay) {
					now.setDate(lastDay);
				}
				now.setFullYear(now.getFullYear() + periods[Y]);
				now.setMonth(now.getMonth() + periods[O]);
				if (wasLastDay) {
					now.setDate(lastDay);
				}
			}
			var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
			var extractPeriod = function(period, numSecs) {
				periods[period] = show[period] ? Math.floor(diff / numSecs) : 0;
				diff -= periods[period] * numSecs;
			};
			extractPeriod(W, 604800);
			extractPeriod(D, 86400);
			extractPeriod(H, 3600);
			extractPeriod(M, 60);
			extractPeriod(S, 1);
			if (diff > 0 && !inst._since) {
				// Round up if left overs
				var multiplier = [
					1,
					12,
					4.3482,
					7,
					24,
					60,
					60
				];
				var lastShown = S;
				var max = 1;
				for (var period = S; period >= Y; period--) {
					if (show[period]) {
						if (periods[lastShown] >= max) {
							periods[lastShown] = 0;
							diff = 1;
						}
						if (diff > 0) {
							periods[period]++;
							diff = 0;
							lastShown = period;
							max = 1;
						}
					}
					max *= multiplier[period];
				}
			}
			if (significant) {
				// Zero out insignificant periods
				for (var period = Y; period <= S; period++) {
					if (significant && periods[period]) {
						significant--;
					} else if (!significant) {
						periods[period] = 0;
					}
				}
			}
			return periods;
		}
	});
}(jQuery));


/* ========================================
@preserve
03. Isotope used and distributed under
Commercial License
Isotope PACKAGED v3.0.0
Licensed GPLv3 for open source use
or Isotope Commercial License for commercial use
http://isotope.metafizzy.co
Copyright 2016 Metafizzy
Bridget makes jQuery widgets
v2.0.0
MIT license
======================================== */
(function(window, factory) {
	'use strict';
	/* globals define: false, module: false, require: false */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('jquery-bridget/jquery-bridget', ['jquery'], function(jQuery) {
			factory(window, jQuery);
		});
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(window, require('jquery'));
	} else {
		// browser global
		window.jQueryBridget = factory(window, window.jQuery);
	}
}(window, function factory(window, jQuery) {
	'use strict';
	// ----- utils ----- //
	var arraySlice = Array.prototype.slice;
	// helper function for logging errors
	// $.error breaks jQuery chaining
	var console = window.console;
	var logError = typeof console == 'undefined' ? function() {} : function(message) {
		console.error(message);
	};
	// ----- jQueryBridget ----- //
	function jQueryBridget(namespace, PluginClass, $) {
		$ = $ || jQuery || window.jQuery;
		if (!$) {
			return;
		}
		// add option method -> $().plugin('option', {...})
		if (!PluginClass.prototype.option) {
			// option setter
			PluginClass.prototype.option = function(opts) {
				// bail out if not an object
				if (!$.isPlainObject(opts)) {
					return;
				}
				this.options = $.extend(true, this.options, opts);
			};
		}
		// make jQuery plugin
		$.fn[namespace] = function(arg0) {
			if (typeof arg0 == 'string') {
				// method call $().plugin( 'methodName', { options } )
				// shift arguments by 1
				var args = arraySlice.call(arguments, 1);
				return methodCall(this, arg0, args);
			}
			// just $().plugin({ options })
			plainCall(this, arg0);
			return this;
		};
		// $().plugin('methodName')
		function methodCall($elems, methodName, args) {
			var returnValue;
			var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
			$elems.each(function(i, elem) {
				// get instance
				var instance = $.data(elem, namespace);
				if (!instance) {
					logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
					return;
				}
				var method = instance[methodName];
				if (!method || methodName.charAt(0) == '_') {
					logError(pluginMethodStr + ' is not a valid method');
					return;
				}
				// apply method, get return value
				var value = method.apply(instance, args);
				// set return value if value is returned, use only first value
				returnValue = returnValue === undefined ? value : returnValue;
			});
			return returnValue !== undefined ? returnValue : $elems;
		}

		function plainCall($elems, options) {
			$elems.each(function(i, elem) {
				var instance = $.data(elem, namespace);
				if (instance) {
					// set options & init
					instance.option(options);
					instance._init();
				} else {
					// initialize new instance
					instance = new PluginClass(elem, options);
					$.data(elem, namespace, instance);
				}
			});
		}
		updateJQuery($);
	}
	// ----- updateJQuery ----- //
	// set $.bridget for v1 backwards compatibility
	function updateJQuery($) {
		if (!$ || $ && $.bridget) {
			return;
		}
		$.bridget = jQueryBridget;
	}
	updateJQuery(jQuery || window.jQuery);
	// -----  ----- //
	return jQueryBridget;
}));
/**
	* EvEmitter v1.0.3
	* Lil' event emitter
	* MIT License
	*/
/* jshint unused: true, undef: true, strict: true */
(function(global, factory) {
	// universal module definition
	/* jshint strict: false */
	/* globals define, module, window */
	if (typeof define == 'function' && define.amd) {
		// AMD - RequireJS
		define('ev-emitter/ev-emitter', factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS - Browserify, Webpack
		module.exports = factory();
	} else {
		// Browser globals
		global.EvEmitter = factory();
	}
}(typeof window != 'undefined' ? window : this, function() {
	function EvEmitter() {}
	var proto = EvEmitter.prototype;
	proto.on = function(eventName, listener) {
		if (!eventName || !listener) {
			return;
		}
		// set events hash
		var events = this._events = this._events || {};
		// set listeners array
		var listeners = events[eventName] = events[eventName] || [];
		// only add once
		if (listeners.indexOf(listener) == -1) {
			listeners.push(listener);
		}
		return this;
	};
	proto.once = function(eventName, listener) {
		if (!eventName || !listener) {
			return;
		}
		// add event
		this.on(eventName, listener);
		// set once flag
		// set onceEvents hash
		var onceEvents = this._onceEvents = this._onceEvents || {};
		// set onceListeners object
		var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
		// set flag
		onceListeners[listener] = true;
		return this;
	};
	proto.off = function(eventName, listener) {
		var listeners = this._events && this._events[eventName];
		if (!listeners || !listeners.length) {
			return;
		}
		var index = listeners.indexOf(listener);
		if (index != -1) {
			listeners.splice(index, 1);
		}
		return this;
	};
	proto.emitEvent = function(eventName, args) {
		var listeners = this._events && this._events[eventName];
		if (!listeners || !listeners.length) {
			return;
		}
		var i = 0;
		var listener = listeners[i];
		args = args || [];
		// once stuff
		var onceListeners = this._onceEvents && this._onceEvents[eventName];
		while (listener) {
			var isOnce = onceListeners && onceListeners[listener];
			if (isOnce) {
				// remove listener
				// remove before trigger to prevent recursion
				this.off(eventName, listener);
				// unset once flag
				delete onceListeners[listener];
			}
			// trigger listener
			listener.apply(this, args);
			// get next listener
			i += isOnce ? 0 : 1;
			listener = listeners[i];
		}
		return this;
	};
	return EvEmitter;
}));
/*!
	* getSize v2.0.2
	* measure size of elements
	* MIT license
	*/
/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */
(function(window, factory) {
	'use strict';
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('get-size/get-size', [], function() {
			return factory();
		});
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory();
	} else {
		// browser global
		window.getSize = factory();
	}
}(window, function factory() {
	'use strict';
	// -------------------------- helpers -------------------------- //
	// get a number from a string, not a percentage
	function getStyleSize(value) {
		var num = parseFloat(value);
		// not a percent like '100%', and a number
		var isValid = value.indexOf('%') == -1 && !isNaN(num);
		return isValid && num;
	}

	function noop() {}
	var logError = typeof console == 'undefined' ? noop : function(message) {
		console.error(message);
	};
	// -------------------------- measurements -------------------------- //
	var measurements = [
		'paddingLeft',
		'paddingRight',
		'paddingTop',
		'paddingBottom',
		'marginLeft',
		'marginRight',
		'marginTop',
		'marginBottom',
		'borderLeftWidth',
		'borderRightWidth',
		'borderTopWidth',
		'borderBottomWidth'
	];
	var measurementsLength = measurements.length;

	function getZeroSize() {
		var size = {
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0
		};
		for (var i = 0; i < measurementsLength; i++) {
			var measurement = measurements[i];
			size[measurement] = 0;
		}
		return size;
	}
	// -------------------------- getStyle -------------------------- //
	/**
		* getStyle, get style of element, check for Firefox bug
		* https://bugzilla.mozilla.org/show_bug.cgi?id=548397
		*/
	function getStyle(elem) {
		var style = getComputedStyle(elem);
		if (!style) {
			logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1');
		}
		return style;
	}
	// -------------------------- setup -------------------------- //
	var isSetup = false;
	var isBoxSizeOuter;
	/**
		* setup
		* check isBoxSizerOuter
		* do on first getSize() rather than on page load for Firefox bug
		*/
	function setup() {
		// setup once
		if (isSetup) {
			return;
		}
		isSetup = true;
		// -------------------------- box sizing -------------------------- //
		/**
			* WebKit measures the outer-width on style.width on border-box elems
			* IE & Firefox<29 measures the inner-width
			*/
		var div = document.createElement('div');
		div.style.width = '200px';
		div.style.padding = '1px 2px 3px 4px';
		div.style.borderStyle = 'solid';
		div.style.borderWidth = '1px 2px 3px 4px';
		div.style.boxSizing = 'border-box';
		var body = document.body || document.documentElement;
		body.appendChild(div);
		var style = getStyle(div);
		getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
		body.removeChild(div);
	}
	// -------------------------- getSize -------------------------- //
	function getSize(elem) {
		setup();
		// use querySeletor if elem is string
		if (typeof elem == 'string') {
			elem = document.querySelector(elem);
		}
		// do not proceed on non-objects
		if (!elem || typeof elem != 'object' || !elem.nodeType) {
			return;
		}
		var style = getStyle(elem);
		// if hidden, everything is 0
		if (style.display == 'none') {
			return getZeroSize();
		}
		var size = {};
		size.width = elem.offsetWidth;
		size.height = elem.offsetHeight;
		var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
		// get all measurements
		for (var i = 0; i < measurementsLength; i++) {
			var measurement = measurements[i];
			var value = style[measurement];
			var num = parseFloat(value);
			// any 'auto', 'medium' value will be 0
			size[measurement] = !isNaN(num) ? num : 0;
		}
		var paddingWidth = size.paddingLeft + size.paddingRight;
		var paddingHeight = size.paddingTop + size.paddingBottom;
		var marginWidth = size.marginLeft + size.marginRight;
		var marginHeight = size.marginTop + size.marginBottom;
		var borderWidth = size.borderLeftWidth + size.borderRightWidth;
		var borderHeight = size.borderTopWidth + size.borderBottomWidth;
		var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
		// overwrite width and height if we can get it from style
		var styleWidth = getStyleSize(style.width);
		if (styleWidth !== false) {
			size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
		}
		var styleHeight = getStyleSize(style.height);
		if (styleHeight !== false) {
			size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
		}
		size.innerWidth = size.width - (paddingWidth + borderWidth);
		size.innerHeight = size.height - (paddingHeight + borderHeight);
		size.outerWidth = size.width + marginWidth;
		size.outerHeight = size.height + marginHeight;
		return size;
	}
	return getSize;
}));
/**
	* matchesSelector v2.0.1
	* matchesSelector( element, '.selector' )
	* MIT license
	*/
/*jshint browser: true, strict: true, undef: true, unused: true */
(function(window, factory) {
	/*global define: false, module: false */
	'use strict';
	// universal module definition
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('desandro-matches-selector/matches-selector', factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory();
	} else {
		// browser global
		window.matchesSelector = factory();
	}
}(window, function factory() {
	'use strict';
	var matchesMethod = function() {
		var ElemProto = Element.prototype;
		// check for the standard method name first
		if (ElemProto.matches) {
			return 'matches';
		}
		// check un-prefixed
		if (ElemProto.matchesSelector) {
			return 'matchesSelector';
		}
		// check vendor prefixes
		var prefixes = [
			'webkit',
			'moz',
			'ms',
			'o'
		];
		for (var i = 0; i < prefixes.length; i++) {
			var prefix = prefixes[i];
			var method = prefix + 'MatchesSelector';
			if (ElemProto[method]) {
				return method;
			}
		}
	}();
	return function matchesSelector(elem, selector) {
		return elem[matchesMethod](selector);
	};
}));
/**
	* Fizzy UI utils v2.0.2
	* MIT license
	*/
/*jshint browser: true, undef: true, unused: true, strict: true */
(function(window, factory) {
	// universal module definition
	/*jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function(matchesSelector) {
			return factory(window, matchesSelector);
		});
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(window, require('desandro-matches-selector'));
	} else {
		// browser global
		window.fizzyUIUtils = factory(window, window.matchesSelector);
	}
}(window, function factory(window, matchesSelector) {
	var utils = {};
	// ----- extend ----- //
	// extends objects
	utils.extend = function(a, b) {
		for (var prop in b) {
			a[prop] = b[prop];
		}
		return a;
	};
	// ----- modulo ----- //
	utils.modulo = function(num, div) {
		return (num % div + div) % div;
	};
	// ----- makeArray ----- //
	// turn element or nodeList into an array
	utils.makeArray = function(obj) {
		var ary = [];
		if (Array.isArray(obj)) {
			// use object if already an array
			ary = obj;
		} else if (obj && typeof obj.length == 'number') {
			// convert nodeList to array
			for (var i = 0; i < obj.length; i++) {
				ary.push(obj[i]);
			}
		} else {
			// array of single index
			ary.push(obj);
		}
		return ary;
	};
	// ----- removeFrom ----- //
	utils.removeFrom = function(ary, obj) {
		var index = ary.indexOf(obj);
		if (index != -1) {
			ary.splice(index, 1);
		}
	};
	// ----- getParent ----- //
	utils.getParent = function(elem, selector) {
		while (elem != document.body) {
			elem = elem.parentNode;
			if (matchesSelector(elem, selector)) {
				return elem;
			}
		}
	};
	// ----- getQueryElement ----- //
	// use element as selector string
	utils.getQueryElement = function(elem) {
		if (typeof elem == 'string') {
			return document.querySelector(elem);
		}
		return elem;
	};
	// ----- handleEvent ----- //
	// enable .ontype to trigger from .addEventListener( elem, 'type' )
	utils.handleEvent = function(event) {
		var method = 'on' + event.type;
		if (this[method]) {
			this[method](event);
		}
	};
	// ----- filterFindElements ----- //
	utils.filterFindElements = function(elems, selector) {
		// make array of elems
		elems = utils.makeArray(elems);
		var ffElems = [];
		elems.forEach(function(elem) {
			// check that elem is an actual element
			if (!(elem instanceof HTMLElement)) {
				return;
			}
			// add elem if no selector
			if (!selector) {
				ffElems.push(elem);
				return;
			}
			// filter & find items if we have a selector
			// filter
			if (matchesSelector(elem, selector)) {
				ffElems.push(elem);
			}
			// find children
			var childElems = elem.querySelectorAll(selector);
			// concat childElems to filterFound array
			for (var i = 0; i < childElems.length; i++) {
				ffElems.push(childElems[i]);
			}
		});
		return ffElems;
	};
	// ----- debounceMethod ----- //
	utils.debounceMethod = function(_class, methodName, threshold) {
		// original method
		var method = _class.prototype[methodName];
		var timeoutName = methodName + 'Timeout';
		_class.prototype[methodName] = function() {
			var timeout = this[timeoutName];
			if (timeout) {
				clearTimeout(timeout);
			}
			var args = arguments;
			var _this = this;
			this[timeoutName] = setTimeout(function() {
				method.apply(_this, args);
				delete _this[timeoutName];
			}, threshold || 100);
		};
	};
	// ----- docReady ----- //
	utils.docReady = function(callback) {
		var readyState = document.readyState;
		if (readyState == 'complete' || readyState == 'interactive') {
			callback();
		} else {
			document.addEventListener('DOMContentLoaded', callback);
		}
	};
	// ----- htmlInit ----- //
	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	utils.toDashed = function(str) {
		return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
			return $1 + '-' + $2;
		}).toLowerCase();
	};
	var console = window.console;
	/**
		* allow user to initialize classes via [data-namespace] or .js-namespace class
		* htmlInit( Widget, 'widgetName' )
		* options are parsed from data-namespace-options
		*/
	utils.htmlInit = function(WidgetClass, namespace) {
		utils.docReady(function() {
			var dashedNamespace = utils.toDashed(namespace);
			var dataAttr = 'data-' + dashedNamespace;
			var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
			var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
			var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
			var dataOptionsAttr = dataAttr + '-options';
			var jQuery = window.jQuery;
			elems.forEach(function(elem) {
				var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
				var options;
				try {
					options = attr && JSON.parse(attr);
				} catch (error) {
					// log error, do not initialize
					if (console) {
						console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
					}
					return;
				}
				// initialize
				var instance = new WidgetClass(elem, options);
				// make available via $().data('layoutname')
				if (jQuery) {
					jQuery.data(elem, namespace, instance);
				}
			});
		});
	};
	// -----  ----- //
	return utils;
}));
/**
	* Outlayer Item
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/* globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD - RequireJS
		define('outlayer/item', [
			'ev-emitter/ev-emitter',
			'get-size/get-size'
		], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS - Browserify, Webpack
		module.exports = factory(require('ev-emitter'), require('get-size'));
	} else {
		// browser global
		window.Outlayer = {};
		window.Outlayer.Item = factory(window.EvEmitter, window.getSize);
	}
}(window, function factory(EvEmitter, getSize) {
	'use strict';
	// ----- helpers ----- //
	function isEmptyObj(obj) {
		for (var prop in obj) {
			return false;
		}
		prop = null;
		return true;
	}
	// -------------------------- CSS3 support -------------------------- //
	var docElemStyle = document.documentElement.style;
	var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
	var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
	var transitionEndEvent = {
		WebkitTransition: 'webkitTransitionEnd',
		transition: 'transitionend'
	}[transitionProperty];
	// cache all vendor properties that could have vendor prefix
	var vendorProperties = {
		transform: transformProperty,
		transition: transitionProperty,
		transitionDuration: transitionProperty + 'Duration',
		transitionProperty: transitionProperty + 'Property',
		transitionDelay: transitionProperty + 'Delay'
	};
	// -------------------------- Item -------------------------- //
	function Item(element, layout) {
		if (!element) {
			return;
		}
		this.element = element;
		// parent layout class, i.e. Masonry, Isotope, or Packery
		this.layout = layout;
		this.position = {
			x: 0,
			y: 0
		};
		this._create();
	}
	// inherit EvEmitter
	var proto = Item.prototype = Object.create(EvEmitter.prototype);
	proto.constructor = Item;
	proto._create = function() {
		// transition objects
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		};
		this.css({
			position: 'absolute'
		});
	};
	// trigger specified handler for event type
	proto.handleEvent = function(event) {
		var method = 'on' + event.type;
		if (this[method]) {
			this[method](event);
		}
	};
	proto.getSize = function() {
		this.size = getSize(this.element);
	};
	/**
		* apply CSS styles to element
		* @param {Object} style
		*/
	proto.css = function(style) {
		var elemStyle = this.element.style;
		for (var prop in style) {
			// use vendor property if available
			var supportedProp = vendorProperties[prop] || prop;
			elemStyle[supportedProp] = style[prop];
		}
	};
	// measure position, and sets it
	proto.getPosition = function() {
		var style = getComputedStyle(this.element);
		var isOriginLeft = this.layout._getOption('originLeft');
		var isOriginTop = this.layout._getOption('originTop');
		var xValue = style[isOriginLeft ? 'left' : 'right'];
		var yValue = style[isOriginTop ? 'top' : 'bottom'];
		// convert percent to pixels
		var layoutSize = this.layout.size;
		var x = xValue.indexOf('%') != -1 ? parseFloat(xValue) / 100 * layoutSize.width : parseInt(xValue, 10);
		var y = yValue.indexOf('%') != -1 ? parseFloat(yValue) / 100 * layoutSize.height : parseInt(yValue, 10);
		// clean up 'auto' or other non-integer values
		x = isNaN(x) ? 0 : x;
		y = isNaN(y) ? 0 : y;
		// remove padding from measurement
		x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
		y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
		this.position.x = x;
		this.position.y = y;
	};
	// set settled position, apply padding
	proto.layoutPosition = function() {
		var layoutSize = this.layout.size;
		var style = {};
		var isOriginLeft = this.layout._getOption('originLeft');
		var isOriginTop = this.layout._getOption('originTop');
		// x
		var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
		var xProperty = isOriginLeft ? 'left' : 'right';
		var xResetProperty = isOriginLeft ? 'right' : 'left';
		var x = this.position.x + layoutSize[xPadding];
		// set in percentage or pixels
		style[xProperty] = this.getXValue(x);
		// reset other property
		style[xResetProperty] = '';
		// y
		var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
		var yProperty = isOriginTop ? 'top' : 'bottom';
		var yResetProperty = isOriginTop ? 'bottom' : 'top';
		var y = this.position.y + layoutSize[yPadding];
		// set in percentage or pixels
		style[yProperty] = this.getYValue(y);
		// reset other property
		style[yResetProperty] = '';
		this.css(style);
		this.emitEvent('layout', [this]);
	};
	proto.getXValue = function(x) {
		var isHorizontal = this.layout._getOption('horizontal');
		return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
	};
	proto.getYValue = function(y) {
		var isHorizontal = this.layout._getOption('horizontal');
		return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
	};
	proto._transitionTo = function(x, y) {
		this.getPosition();
		// get current x & y from top/left
		var curX = this.position.x;
		var curY = this.position.y;
		var compareX = parseInt(x, 10);
		var compareY = parseInt(y, 10);
		var didNotMove = compareX === this.position.x && compareY === this.position.y;
		// save end position
		this.setPosition(x, y);
		// if did not move and not transitioning, just go to layout
		if (didNotMove && !this.isTransitioning) {
			this.layoutPosition();
			return;
		}
		var transX = x - curX;
		var transY = y - curY;
		var transitionStyle = {};
		transitionStyle.transform = this.getTranslate(transX, transY);
		this.transition({
			to: transitionStyle,
			onTransitionEnd: {
				transform: this.layoutPosition
			},
			isCleaning: true
		});
	};
	proto.getTranslate = function(x, y) {
		// flip cooridinates if origin on right or bottom
		var isOriginLeft = this.layout._getOption('originLeft');
		var isOriginTop = this.layout._getOption('originTop');
		x = isOriginLeft ? x : -x;
		y = isOriginTop ? y : -y;
		return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	};
	// non transition + transform support
	proto.goTo = function(x, y) {
		this.setPosition(x, y);
		this.layoutPosition();
	};
	proto.moveTo = proto._transitionTo;
	proto.setPosition = function(x, y) {
		this.position.x = parseInt(x, 10);
		this.position.y = parseInt(y, 10);
	};
	// ----- transition ----- //
	/**
		* @param {Object} style - CSS
		* @param {Function} onTransitionEnd
		*/
	// non transition, just trigger callback
	proto._nonTransition = function(args) {
		this.css(args.to);
		if (args.isCleaning) {
			this._removeStyles(args.to);
		}
		for (var prop in args.onTransitionEnd) {
			args.onTransitionEnd[prop].call(this);
		}
	};
	/**
		* proper transition
		* @param {Object} args - arguments
		*   @param {Object} to - style to transition to
		*   @param {Object} from - style to start transition from
		*   @param {Boolean} isCleaning - removes transition styles after transition
		*   @param {Function} onTransitionEnd - callback
		*/
	proto.transition = function(args) {
		// redirect to nonTransition if no transition duration
		if (!parseFloat(this.layout.options.transitionDuration)) {
			this._nonTransition(args);
			return;
		}
		var _transition = this._transn;
		// keep track of onTransitionEnd callback by css property
		for (var prop in args.onTransitionEnd) {
			_transition.onEnd[prop] = args.onTransitionEnd[prop];
		}
		// keep track of properties that are transitioning
		for (prop in args.to) {
			_transition.ingProperties[prop] = true;
			// keep track of properties to clean up when transition is done
			if (args.isCleaning) {
				_transition.clean[prop] = true;
			}
		}
		// set from styles
		if (args.from) {
			this.css(args.from);
			// force redraw. http://blog.alexmaccaw.com/css-transitions
			var h = this.element.offsetHeight;
			// hack for JSHint to hush about unused var
			h = null;
		}
		// enable transition
		this.enableTransition(args.to);
		// set styles that are transitioning
		this.css(args.to);
		this.isTransitioning = true;
	};
	// dash before all cap letters, including first for
	// WebkitTransform => -webkit-transform
	function toDashedAll(str) {
		return str.replace(/([A-Z])/g, function($1) {
			return '-' + $1.toLowerCase();
		});
	}
	var transitionProps = 'opacity,' + toDashedAll(transformProperty);
	proto.enableTransition = function() {
		// HACK changing transitionProperty during a transition
		// will cause transition to jump
		if (this.isTransitioning) {
			return;
		}
		// make `transition: foo, bar, baz` from style object
		// HACK un-comment this when enableTransition can work
		// while a transition is happening
		// var transitionValues = [];
		// for ( var prop in style ) {
		//   // dash-ify camelCased properties like WebkitTransition
		//   prop = vendorProperties[ prop ] || prop;
		//   transitionValues.push( toDashedAll( prop ) );
		// }
		// munge number to millisecond, to match stagger
		var duration = this.layout.options.transitionDuration;
		duration = typeof duration == 'number' ? duration + 'ms' : duration;
		// enable transition styles
		this.css({
			transitionProperty: transitionProps,
			transitionDuration: duration,
			transitionDelay: this.staggerDelay || 0
		});
		// listen for transition end event
		this.element.addEventListener(transitionEndEvent, this, false);
	};
	// ----- events ----- //
	proto.onwebkitTransitionEnd = function(event) {
		this.ontransitionend(event);
	};
	proto.onotransitionend = function(event) {
		this.ontransitionend(event);
	};
	// properties that I munge to make my life easier
	var dashedVendorProperties = {
		'-webkit-transform': 'transform'
	};
	proto.ontransitionend = function(event) {
		// disregard bubbled events from children
		if (event.target !== this.element) {
			return;
		}
		var _transition = this._transn;
		// get property name of transitioned property, convert to prefix-free
		var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
		// remove property that has completed transitioning
		delete _transition.ingProperties[propertyName];
		// check if any properties are still transitioning
		if (isEmptyObj(_transition.ingProperties)) {
			// all properties have completed transitioning
			this.disableTransition();
		}
		// clean style
		if (propertyName in _transition.clean) {
			// clean up style
			this.element.style[event.propertyName] = '';
			delete _transition.clean[propertyName];
		}
		// trigger onTransitionEnd callback
		if (propertyName in _transition.onEnd) {
			var onTransitionEnd = _transition.onEnd[propertyName];
			onTransitionEnd.call(this);
			delete _transition.onEnd[propertyName];
		}
		this.emitEvent('transitionEnd', [this]);
	};
	proto.disableTransition = function() {
		this.removeTransitionStyles();
		this.element.removeEventListener(transitionEndEvent, this, false);
		this.isTransitioning = false;
	};
	/**
		* removes style property from element
		* @param {Object} style
		**/
	proto._removeStyles = function(style) {
		// clean up transition styles
		var cleanStyle = {};
		for (var prop in style) {
			cleanStyle[prop] = '';
		}
		this.css(cleanStyle);
	};
	var cleanTransitionStyle = {
		transitionProperty: '',
		transitionDuration: '',
		transitionDelay: ''
	};
	proto.removeTransitionStyles = function() {
		// remove transition
		this.css(cleanTransitionStyle);
	};
	// ----- stagger ----- //
	proto.stagger = function(delay) {
		delay = isNaN(delay) ? 0 : delay;
		this.staggerDelay = delay + 'ms';
	};
	// ----- show/hide/remove ----- //
	// remove element from DOM
	proto.removeElem = function() {
		this.element.parentNode.removeChild(this.element);
		// remove display: none
		this.css({
			display: ''
		});
		this.emitEvent('remove', [this]);
	};
	proto.remove = function() {
		// just remove element if no transition support or no transition
		if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
			this.removeElem();
			return;
		}
		// start transition
		this.once('transitionEnd', function() {
			this.removeElem();
		});
		this.hide();
	};
	proto.reveal = function() {
		delete this.isHidden;
		// remove display: none
		this.css({
			display: ''
		});
		var options = this.layout.options;
		var onTransitionEnd = {};
		var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
		onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
		this.transition({
			from: options.hiddenStyle,
			to: options.visibleStyle,
			isCleaning: true,
			onTransitionEnd: onTransitionEnd
		});
	};
	proto.onRevealTransitionEnd = function() {
		// check if still visible
		// during transition, item may have been hidden
		if (!this.isHidden) {
			this.emitEvent('reveal');
		}
	};
	/**
		* get style property use for hide/reveal transition end
		* @param {String} styleProperty - hiddenStyle/visibleStyle
		* @returns {String}
		*/
	proto.getHideRevealTransitionEndProperty = function(styleProperty) {
		var optionStyle = this.layout.options[styleProperty];
		// use opacity
		if (optionStyle.opacity) {
			return 'opacity';
		}
		// get first property
		for (var prop in optionStyle) {
			return prop;
		}
	};
	proto.hide = function() {
		// set flag
		this.isHidden = true;
		// remove display: none
		this.css({
			display: ''
		});
		var options = this.layout.options;
		var onTransitionEnd = {};
		var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
		onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
		this.transition({
			from: options.visibleStyle,
			to: options.hiddenStyle,
			// keep hidden stuff hidden
			isCleaning: true,
			onTransitionEnd: onTransitionEnd
		});
	};
	proto.onHideTransitionEnd = function() {
		// check if still hidden
		// during transition, item may have been un-hidden
		if (this.isHidden) {
			this.css({
				display: 'none'
			});
			this.emitEvent('hide');
		}
	};
	proto.destroy = function() {
		this.css({
			position: '',
			left: '',
			right: '',
			top: '',
			bottom: '',
			transition: '',
			transform: ''
		});
	};
	return Item;
}));
/*!
	* Outlayer v2.1.0
	* the brains and guts of a layout library
	* MIT license
	*/
(function(window, factory) {
	'use strict';
	// universal module definition
	/* jshint strict: false */
	/* globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD - RequireJS
		define('outlayer/outlayer', [
			'ev-emitter/ev-emitter',
			'get-size/get-size',
			'fizzy-ui-utils/utils',
			'./item'
		], function(EvEmitter, getSize, utils, Item) {
			return factory(window, EvEmitter, getSize, utils, Item);
		});
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS - Browserify, Webpack
		module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'));
	} else {
		// browser global
		window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
	}
}(window, function factory(window, EvEmitter, getSize, utils, Item) {
	'use strict';
	// ----- vars ----- //
	var console = window.console;
	var jQuery = window.jQuery;
	var noop = function() {};
	// -------------------------- Outlayer -------------------------- //
	// globally unique identifiers
	var GUID = 0;
	// internal store of all Outlayer intances
	var instances = {};
	/**
		* @param {Element, String} element
		* @param {Object} options
		* @constructor
		*/
	function Outlayer(element, options) {
		var queryElement = utils.getQueryElement(element);
		if (!queryElement) {
			if (console) {
				console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
			}
			return;
		}
		this.element = queryElement;
		// add jQuery
		if (jQuery) {
			this.$element = jQuery(this.element);
		}
		// options
		this.options = utils.extend({}, this.constructor.defaults);
		this.option(options);
		// add id for Outlayer.getFromElement
		var id = ++GUID;
		this.element.outlayerGUID = id;
		// expando
		instances[id] = this;
		// associate via id
		// kick it off
		this._create();
		var isInitLayout = this._getOption('initLayout');
		if (isInitLayout) {
			this.layout();
		}
	}
	// settings are for internal use only
	Outlayer.namespace = 'outlayer';
	Outlayer.Item = Item;
	// default options
	Outlayer.defaults = {
		containerStyle: {
			position: 'relative'
		},
		initLayout: true,
		originLeft: true,
		originTop: true,
		resize: true,
		resizeContainer: true,
		// item options
		transitionDuration: '0.4s',
		hiddenStyle: {
			opacity: 0,
			transform: 'scale(0.001)'
		},
		visibleStyle: {
			opacity: 1,
			transform: 'scale(1)'
		}
	};
	var proto = Outlayer.prototype;
	// inherit EvEmitter
	utils.extend(proto, EvEmitter.prototype);
	/**
		* set options
		* @param {Object} opts
		*/
	proto.option = function(opts) {
		utils.extend(this.options, opts);
	};
	/**
		* get backwards compatible option value, check old name
		*/
	proto._getOption = function(option) {
		var oldOption = this.constructor.compatOptions[option];
		return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
	};
	Outlayer.compatOptions = {
		// currentName: oldName
		initLayout: 'isInitLayout',
		horizontal: 'isHorizontal',
		layoutInstant: 'isLayoutInstant',
		originLeft: 'isOriginLeft',
		originTop: 'isOriginTop',
		resize: 'isResizeBound',
		resizeContainer: 'isResizingContainer'
	};
	proto._create = function() {
		// get items from children
		this.reloadItems();
		// elements that affect layout, but are not laid out
		this.stamps = [];
		this.stamp(this.options.stamp);
		// set container style
		utils.extend(this.element.style, this.options.containerStyle);
		// bind resize method
		var canBindResize = this._getOption('resize');
		if (canBindResize) {
			this.bindResize();
		}
	};
	// goes through all children again and gets bricks in proper order
	proto.reloadItems = function() {
		// collection of item elements
		this.items = this._itemize(this.element.children);
	};
	/**
		* turn elements into Outlayer.Items to be used in layout
		* @param {Array or NodeList or HTMLElement} elems
		* @returns {Array} items - collection of new Outlayer Items
		*/
	proto._itemize = function(elems) {
		var itemElems = this._filterFindItemElements(elems);
		var Item = this.constructor.Item;
		// create new Outlayer Items for collection
		var items = [];
		for (var i = 0; i < itemElems.length; i++) {
			var elem = itemElems[i];
			var item = new Item(elem, this);
			items.push(item);
		}
		return items;
	};
	/**
		* get item elements to be used in layout
		* @param {Array or NodeList or HTMLElement} elems
		* @returns {Array} items - item elements
		*/
	proto._filterFindItemElements = function(elems) {
		return utils.filterFindElements(elems, this.options.itemSelector);
	};
	/**
		* getter method for getting item elements
		* @returns {Array} elems - collection of item elements
		*/
	proto.getItemElements = function() {
		return this.items.map(function(item) {
			return item.element;
		});
	};
	// ----- init & layout ----- //
	/**
		* lays out all items
		*/
	proto.layout = function() {
		this._resetLayout();
		this._manageStamps();
		// don't animate first layout
		var layoutInstant = this._getOption('layoutInstant');
		var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
		this.layoutItems(this.items, isInstant);
		// flag for initalized
		this._isLayoutInited = true;
	};
	// _init is alias for layout
	proto._init = proto.layout;
	/**
		* logic before any new layout
		*/
	proto._resetLayout = function() {
		this.getSize();
	};
	proto.getSize = function() {
		this.size = getSize(this.element);
	};
	/**
		* get measurement from option, for columnWidth, rowHeight, gutter
		* if option is String -> get element from selector string, & get size of element
		* if option is Element -> get size of element
		* else use option as a number
		*
		* @param {String} measurement
		* @param {String} size - width or height
		* @private
		*/
	proto._getMeasurement = function(measurement, size) {
		var option = this.options[measurement];
		var elem;
		if (!option) {
			// default to 0
			this[measurement] = 0;
		} else {
			// use option as an element
			if (typeof option == 'string') {
				elem = this.element.querySelector(option);
			} else if (option instanceof HTMLElement) {
				elem = option;
			}
			// use size of element, if element
			this[measurement] = elem ? getSize(elem)[size] : option;
		}
	};
	/**
		* layout a collection of item elements
		* @api public
		*/
	proto.layoutItems = function(items, isInstant) {
		items = this._getItemsForLayout(items);
		this._layoutItems(items, isInstant);
		this._postLayout();
	};
	/**
		* get the items to be laid out
		* you may want to skip over some items
		* @param {Array} items
		* @returns {Array} items
		*/
	proto._getItemsForLayout = function(items) {
		return items.filter(function(item) {
			return !item.isIgnored;
		});
	};
	/**
		* layout items
		* @param {Array} items
		* @param {Boolean} isInstant
		*/
	proto._layoutItems = function(items, isInstant) {
		this._emitCompleteOnItems('layout', items);
		if (!items || !items.length) {
			// no items, emit event with empty array
			return;
		}
		var queue = [];
		items.forEach(function(item) {
			// get x/y object from method
			var position = this._getItemLayoutPosition(item);
			// enqueue
			position.item = item;
			position.isInstant = isInstant || item.isLayoutInstant;
			queue.push(position);
		}, this);
		this._processLayoutQueue(queue);
	};
	/**
		* get item layout position
		* @param {Outlayer.Item} item
		* @returns {Object} x and y position
		*/
	proto._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		};
	};
	/**
		* iterate over array and position each item
		* Reason being - separating this logic prevents 'layout invalidation'
		* thx @paul_irish
		* @param {Array} queue
		*/
	proto._processLayoutQueue = function(queue) {
		this.updateStagger();
		queue.forEach(function(obj, i) {
			this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
		}, this);
	};
	// set stagger from option in milliseconds number
	proto.updateStagger = function() {
		var stagger = this.options.stagger;
		if (stagger === null || stagger === undefined) {
			this.stagger = 0;
			return;
		}
		this.stagger = getMilliseconds(stagger);
		return this.stagger;
	};
	/**
		* Sets position of item in DOM
		* @param {Outlayer.Item} item
		* @param {Number} x - horizontal position
		* @param {Number} y - vertical position
		* @param {Boolean} isInstant - disables transitions
		*/
	proto._positionItem = function(item, x, y, isInstant, i) {
		if (isInstant) {
			// if not transition, just set CSS
			item.goTo(x, y);
		} else {
			item.stagger(i * this.stagger);
			item.moveTo(x, y);
		}
	};
	/**
		* Any logic you want to do after each layout,
		* i.e. size the container
		*/
	proto._postLayout = function() {
		this.resizeContainer();
	};
	proto.resizeContainer = function() {
		var isResizingContainer = this._getOption('resizeContainer');
		if (!isResizingContainer) {
			return;
		}
		var size = this._getContainerSize();
		if (size) {
			this._setContainerMeasure(size.width, true);
			this._setContainerMeasure(size.height, false);
		}
	};
	/**
		* Sets width or height of container if returned
		* @returns {Object} size
		*   @param {Number} width
		*   @param {Number} height
		*/
	proto._getContainerSize = noop;
	/**
		* @param {Number} measure - size of width or height
		* @param {Boolean} isWidth
		*/
	proto._setContainerMeasure = function(measure, isWidth) {
		if (measure === undefined) {
			return;
		}
		var elemSize = this.size;
		// add padding and border width if border box
		if (elemSize.isBorderBox) {
			measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
		}
		measure = Math.max(measure, 0);
		this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
	};
	/**
		* emit eventComplete on a collection of items events
		* @param {String} eventName
		* @param {Array} items - Outlayer.Items
		*/
	proto._emitCompleteOnItems = function(eventName, items) {
		var _this = this;

		function onComplete() {
			_this.dispatchEvent(eventName + 'Complete', null, [items]);
		}
		var count = items.length;
		if (!items || !count) {
			onComplete();
			return;
		}
		var doneCount = 0;

		function tick() {
			doneCount++;
			if (doneCount == count) {
				onComplete();
			}
		}
		// bind callback
		items.forEach(function(item) {
			item.once(eventName, tick);
		});
	};
	/**
		* emits events via EvEmitter and jQuery events
		* @param {String} type - name of event
		* @param {Event} event - original event
		* @param {Array} args - extra arguments
		*/
	proto.dispatchEvent = function(type, event, args) {
		// add original event to arguments
		var emitArgs = event ? [event].concat(args) : args;
		this.emitEvent(type, emitArgs);
		if (jQuery) {
			// set this.$element
			this.$element = this.$element || jQuery(this.element);
			if (event) {
				// create jQuery event
				var $event = jQuery.Event(event);
				$event.type = type;
				this.$element.trigger($event, args);
			} else {
				// just trigger with type if no event available
				this.$element.trigger(type, args);
			}
		}
	};
	// -------------------------- ignore & stamps -------------------------- //
	/**
		* keep item in collection, but do not lay it out
		* ignored items do not get skipped in layout
		* @param {Element} elem
		*/
	proto.ignore = function(elem) {
		var item = this.getItem(elem);
		if (item) {
			item.isIgnored = true;
		}
	};
	/**
		* return item to layout collection
		* @param {Element} elem
		*/
	proto.unignore = function(elem) {
		var item = this.getItem(elem);
		if (item) {
			delete item.isIgnored;
		}
	};
	/**
		* adds elements to stamps
		* @param {NodeList, Array, Element, or String} elems
		*/
	proto.stamp = function(elems) {
		elems = this._find(elems);
		if (!elems) {
			return;
		}
		this.stamps = this.stamps.concat(elems);
		// ignore
		elems.forEach(this.ignore, this);
	};
	/**
		* removes elements to stamps
		* @param {NodeList, Array, or Element} elems
		*/
	proto.unstamp = function(elems) {
		elems = this._find(elems);
		if (!elems) {
			return;
		}
		elems.forEach(function(elem) {
			// filter out removed stamp elements
			utils.removeFrom(this.stamps, elem);
			this.unignore(elem);
		}, this);
	};
	/**
		* finds child elements
		* @param {NodeList, Array, Element, or String} elems
		* @returns {Array} elems
		*/
	proto._find = function(elems) {
		if (!elems) {
			return;
		}
		// if string, use argument as selector string
		if (typeof elems == 'string') {
			elems = this.element.querySelectorAll(elems);
		}
		elems = utils.makeArray(elems);
		return elems;
	};
	proto._manageStamps = function() {
		if (!this.stamps || !this.stamps.length) {
			return;
		}
		this._getBoundingRect();
		this.stamps.forEach(this._manageStamp, this);
	};
	// update boundingLeft / Top
	proto._getBoundingRect = function() {
		// get bounding rect for container element
		var boundingRect = this.element.getBoundingClientRect();
		var size = this.size;
		this._boundingRect = {
			left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
			top: boundingRect.top + size.paddingTop + size.borderTopWidth,
			right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
			bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
		};
	};
	/**
		* @param {Element} stamp
		**/
	proto._manageStamp = noop;
	/**
		* get x/y position of element relative to container element
		* @param {Element} elem
		* @returns {Object} offset - has left, top, right, bottom
		*/
	proto._getElementOffset = function(elem) {
		var boundingRect = elem.getBoundingClientRect();
		var thisRect = this._boundingRect;
		var size = getSize(elem);
		var offset = {
			left: boundingRect.left - thisRect.left - size.marginLeft,
			top: boundingRect.top - thisRect.top - size.marginTop,
			right: thisRect.right - boundingRect.right - size.marginRight,
			bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
		};
		return offset;
	};
	// -------------------------- resize -------------------------- //
	// enable event handlers for listeners
	// i.e. resize -> onresize
	proto.handleEvent = utils.handleEvent;
	/**
		* Bind layout to window resizing
		*/
	proto.bindResize = function() {
		window.addEventListener('resize', this);
		this.isResizeBound = true;
	};
	/**
		* Unbind layout to window resizing
		*/
	proto.unbindResize = function() {
		window.removeEventListener('resize', this);
		this.isResizeBound = false;
	};
	proto.onresize = function() {
		this.resize();
	};
	utils.debounceMethod(Outlayer, 'onresize', 100);
	proto.resize = function() {
		// don't trigger if size did not change
		// or if resize was unbound. See #9
		if (!this.isResizeBound || !this.needsResizeLayout()) {
			return;
		}
		this.layout();
	};
	/**
		* check if layout is needed post layout
		* @returns Boolean
		*/
	proto.needsResizeLayout = function() {
		var size = getSize(this.element);
		// check that this.size and size are there
		// IE8 triggers resize on body size change, so they might not be
		var hasSizes = this.size && size;
		return hasSizes && size.innerWidth !== this.size.innerWidth;
	};
	// -------------------------- methods -------------------------- //
	/**
		* add items to Outlayer instance
		* @param {Array or NodeList or Element} elems
		* @returns {Array} items - Outlayer.Items
		**/
	proto.addItems = function(elems) {
		var items = this._itemize(elems);
		// add items to collection
		if (items.length) {
			this.items = this.items.concat(items);
		}
		return items;
	};
	/**
		* Layout newly-appended item elements
		* @param {Array or NodeList or Element} elems
		*/
	proto.appended = function(elems) {
		var items = this.addItems(elems);
		if (!items.length) {
			return;
		}
		// layout and reveal just the new items
		this.layoutItems(items, true);
		this.reveal(items);
	};
	/**
		* Layout prepended elements
		* @param {Array or NodeList or Element} elems
		*/
	proto.prepended = function(elems) {
		var items = this._itemize(elems);
		if (!items.length) {
			return;
		}
		// add items to beginning of collection
		var previousItems = this.items.slice(0);
		this.items = items.concat(previousItems);
		// start new layout
		this._resetLayout();
		this._manageStamps();
		// layout new stuff without transition
		this.layoutItems(items, true);
		this.reveal(items);
		// layout previous items
		this.layoutItems(previousItems);
	};
	/**
		* reveal a collection of items
		* @param {Array of Outlayer.Items} items
		*/
	proto.reveal = function(items) {
		this._emitCompleteOnItems('reveal', items);
		if (!items || !items.length) {
			return;
		}
		var stagger = this.updateStagger();
		items.forEach(function(item, i) {
			item.stagger(i * stagger);
			item.reveal();
		});
	};
	/**
		* hide a collection of items
		* @param {Array of Outlayer.Items} items
		*/
	proto.hide = function(items) {
		this._emitCompleteOnItems('hide', items);
		if (!items || !items.length) {
			return;
		}
		var stagger = this.updateStagger();
		items.forEach(function(item, i) {
			item.stagger(i * stagger);
			item.hide();
		});
	};
	/**
		* reveal item elements
		* @param {Array}, {Element}, {NodeList} items
		*/
	proto.revealItemElements = function(elems) {
		var items = this.getItems(elems);
		this.reveal(items);
	};
	/**
		* hide item elements
		* @param {Array}, {Element}, {NodeList} items
		*/
	proto.hideItemElements = function(elems) {
		var items = this.getItems(elems);
		this.hide(items);
	};
	/**
		* get Outlayer.Item, given an Element
		* @param {Element} elem
		* @param {Function} callback
		* @returns {Outlayer.Item} item
		*/
	proto.getItem = function(elem) {
		// loop through items to get the one that matches
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if (item.element == elem) {
				// return item
				return item;
			}
		}
	};
	/**
		* get collection of Outlayer.Items, given Elements
		* @param {Array} elems
		* @returns {Array} items - Outlayer.Items
		*/
	proto.getItems = function(elems) {
		elems = utils.makeArray(elems);
		var items = [];
		elems.forEach(function(elem) {
			var item = this.getItem(elem);
			if (item) {
				items.push(item);
			}
		}, this);
		return items;
	};
	/**
		* remove element(s) from instance and DOM
		* @param {Array or NodeList or Element} elems
		*/
	proto.remove = function(elems) {
		var removeItems = this.getItems(elems);
		this._emitCompleteOnItems('remove', removeItems);
		// bail if no items to remove
		if (!removeItems || !removeItems.length) {
			return;
		}
		removeItems.forEach(function(item) {
			item.remove();
			// remove item from collection
			utils.removeFrom(this.items, item);
		}, this);
	};
	// ----- destroy ----- //
	// remove and disable Outlayer instance
	proto.destroy = function() {
		// clean up dynamic styles
		var style = this.element.style;
		style.height = '';
		style.position = '';
		style.width = '';
		// destroy items
		this.items.forEach(function(item) {
			item.destroy();
		});
		this.unbindResize();
		var id = this.element.outlayerGUID;
		delete instances[id];
		// remove reference to instance by id
		delete this.element.outlayerGUID;
		// remove data for jQuery
		if (jQuery) {
			jQuery.removeData(this.element, this.constructor.namespace);
		}
	};
	// -------------------------- data -------------------------- //
	/**
		* get Outlayer instance from element
		* @param {Element} elem
		* @returns {Outlayer}
		*/
	Outlayer.data = function(elem) {
		elem = utils.getQueryElement(elem);
		var id = elem && elem.outlayerGUID;
		return id && instances[id];
	};
	// -------------------------- create Outlayer class -------------------------- //
	/**
		* create a layout class
		* @param {String} namespace
		*/
	Outlayer.create = function(namespace, options) {
		// sub-class Outlayer
		var Layout = subclass(Outlayer);
		// apply new options and compatOptions
		Layout.defaults = utils.extend({}, Outlayer.defaults);
		utils.extend(Layout.defaults, options);
		Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
		Layout.namespace = namespace;
		Layout.data = Outlayer.data;
		// sub-class Item
		Layout.Item = subclass(Item);
		// -------------------------- declarative -------------------------- //
		utils.htmlInit(Layout, namespace);
		// -------------------------- jQuery bridge -------------------------- //
		// make into jQuery plugin
		if (jQuery && jQuery.bridget) {
			jQuery.bridget(namespace, Layout);
		}
		return Layout;
	};

	function subclass(Parent) {
		function SubClass() {
			Parent.apply(this, arguments);
		}
		SubClass.prototype = Object.create(Parent.prototype);
		SubClass.prototype.constructor = SubClass;
		return SubClass;
	}
	// ----- helpers ----- //
	// how many milliseconds are in each unit
	var msUnits = {
		ms: 1,
		s: 1000
	};
	// munge time-like parameter into millisecond number
	// '0.4s' -> 40
	function getMilliseconds(time) {
		if (typeof time == 'number') {
			return time;
		}
		var matches = time.match(/(^\d*\.?\d*)(\w*)/);
		var num = matches && matches[1];
		var unit = matches && matches[2];
		if (!num.length) {
			return 0;
		}
		num = parseFloat(num);
		var mult = msUnits[unit] || 1;
		return num * mult;
	}
	// ----- fin ----- //
	// back in global
	Outlayer.Item = Item;
	return Outlayer;
}));
/**
	* Isotope Item
	**/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('isotope/js/item', ['outlayer/outlayer'], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require('outlayer'));
	} else {
		// browser global
		window.Isotope = window.Isotope || {};
		window.Isotope.Item = factory(window.Outlayer);
	}
}(window, function factory(Outlayer) {
	'use strict';
	// -------------------------- Item -------------------------- //
	// sub-class Outlayer Item
	function Item() {
		Outlayer.Item.apply(this, arguments);
	}
	var proto = Item.prototype = Object.create(Outlayer.Item.prototype);
	var _create = proto._create;
	proto._create = function() {
		// assign id, used for original-order sorting
		this.id = this.layout.itemGUID++;
		_create.call(this);
		this.sortData = {};
	};
	proto.updateSortData = function() {
		if (this.isIgnored) {
			return;
		}
		// default sorters
		this.sortData.id = this.id;
		// for backward compatibility
		this.sortData['original-order'] = this.id;
		this.sortData.random = Math.random();
		// go thru getSortData obj and apply the sorters
		var getSortData = this.layout.options.getSortData;
		var sorters = this.layout._sorters;
		for (var key in getSortData) {
			var sorter = sorters[key];
			this.sortData[key] = sorter(this.element, this);
		}
	};
	var _destroy = proto.destroy;
	proto.destroy = function() {
		// call super
		_destroy.apply(this, arguments);
		// reset display, #741
		this.css({
			display: ''
		});
	};
	return Item;
}));
/**
	* Isotope LayoutMode
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('isotope/js/layout-mode', [
			'get-size/get-size',
			'outlayer/outlayer'
		], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require('get-size'), require('outlayer'));
	} else {
		// browser global
		window.Isotope = window.Isotope || {};
		window.Isotope.LayoutMode = factory(window.getSize, window.Outlayer);
	}
}(window, function factory(getSize, Outlayer) {
	'use strict';
	// layout mode class
	function LayoutMode(isotope) {
		this.isotope = isotope;
		// link properties
		if (isotope) {
			this.options = isotope.options[this.namespace];
			this.element = isotope.element;
			this.items = isotope.filteredItems;
			this.size = isotope.size;
		}
	}
	var proto = LayoutMode.prototype;
	/**
		* some methods should just defer to default Outlayer method
		* and reference the Isotope instance as `this`
		**/
	var facadeMethods = [
		'_resetLayout',
		'_getItemLayoutPosition',
		'_manageStamp',
		'_getContainerSize',
		'_getElementOffset',
		'needsResizeLayout',
		'_getOption'
	];
	facadeMethods.forEach(function(methodName) {
		proto[methodName] = function() {
			return Outlayer.prototype[methodName].apply(this.isotope, arguments);
		};
	});
	// -----  ----- //
	// for horizontal layout modes, check vertical size
	proto.needsVerticalResizeLayout = function() {
		// don't trigger if size did not change
		var size = getSize(this.isotope.element);
		// check that this.size and size are there
		// IE8 triggers resize on body size change, so they might not be
		var hasSizes = this.isotope.size && size;
		return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
	};
	// ----- measurements ----- //
	proto._getMeasurement = function() {
		this.isotope._getMeasurement.apply(this, arguments);
	};
	proto.getColumnWidth = function() {
		this.getSegmentSize('column', 'Width');
	};
	proto.getRowHeight = function() {
		this.getSegmentSize('row', 'Height');
	};
	/**
		* get columnWidth or rowHeight
		* segment: 'column' or 'row'
		* size 'Width' or 'Height'
		**/
	proto.getSegmentSize = function(segment, size) {
		var segmentName = segment + size;
		var outerSize = 'outer' + size;
		// columnWidth / outerWidth // rowHeight / outerHeight
		this._getMeasurement(segmentName, outerSize);
		// got rowHeight or columnWidth, we can chill
		if (this[segmentName]) {
			return;
		}
		// fall back to item of first element
		var firstItemSize = this.getFirstItemSize();
		this[segmentName] = firstItemSize && firstItemSize[outerSize] || // or size of container
			this.isotope.size['inner' + size];
	};
	proto.getFirstItemSize = function() {
		var firstItem = this.isotope.filteredItems[0];
		return firstItem && firstItem.element && getSize(firstItem.element);
	};
	// ----- methods that should reference isotope ----- //
	proto.layout = function() {
		this.isotope.layout.apply(this.isotope, arguments);
	};
	proto.getSize = function() {
		this.isotope.getSize();
		this.size = this.isotope.size;
	};
	// -------------------------- create -------------------------- //
	LayoutMode.modes = {};
	LayoutMode.create = function(namespace, options) {
		function Mode() {
			LayoutMode.apply(this, arguments);
		}
		Mode.prototype = Object.create(proto);
		Mode.prototype.constructor = Mode;
		// default options
		if (options) {
			Mode.options = options;
		}
		Mode.prototype.namespace = namespace;
		// register in Isotope
		LayoutMode.modes[namespace] = Mode;
		return Mode;
	};
	return LayoutMode;
}));
/*!
	* Masonry v4.1.0
	* Cascading grid layout library
	* http://masonry.desandro.com
	* MIT License
	* by David DeSandro
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('masonry/masonry', [
			'outlayer/outlayer',
			'get-size/get-size'
		], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require('outlayer'), require('get-size'));
	} else {
		// browser global
		window.Masonry = factory(window.Outlayer, window.getSize);
	}
}(window, function factory(Outlayer, getSize) {
	// -------------------------- masonryDefinition -------------------------- //
	// create an Outlayer layout class
	var Masonry = Outlayer.create('masonry');
	// isFitWidth -> fitWidth
	Masonry.compatOptions.fitWidth = 'isFitWidth';
	Masonry.prototype._resetLayout = function() {
		this.getSize();
		this._getMeasurement('columnWidth', 'outerWidth');
		this._getMeasurement('gutter', 'outerWidth');
		this.measureColumns();
		// reset column Y
		this.colYs = [];
		for (var i = 0; i < this.cols; i++) {
			this.colYs.push(0);
		}
		this.maxY = 0;
	};
	Masonry.prototype.measureColumns = function() {
		this.getContainerWidth();
		// if columnWidth is 0, default to outerWidth of first item
		if (!this.columnWidth) {
			var firstItem = this.items[0];
			var firstItemElem = firstItem && firstItem.element;
			// columnWidth fall back to item of first element
			this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
				this.containerWidth;
		}
		var columnWidth = this.columnWidth += this.gutter;
		// calculate columns
		var containerWidth = this.containerWidth + this.gutter;
		var cols = containerWidth / columnWidth;
		// fix rounding errors, typically with gutters
		var excess = columnWidth - containerWidth % columnWidth;
		// if overshoot is less than a pixel, round up, otherwise floor it
		var mathMethod = excess && excess < 1 ? 'round' : 'floor';
		cols = Math[mathMethod](cols);
		this.cols = Math.max(cols, 1);
	};
	Masonry.prototype.getContainerWidth = function() {
		// container is parent if fit width
		var isFitWidth = this._getOption('fitWidth');
		var container = isFitWidth ? this.element.parentNode : this.element;
		// check that this.size and size are there
		// IE8 triggers resize on body size change, so they might not be
		var size = getSize(container);
		this.containerWidth = size && size.innerWidth;
	};
	Masonry.prototype._getItemLayoutPosition = function(item) {
		item.getSize();
		// how many columns does this brick span
		var remainder = item.size.outerWidth % this.columnWidth;
		var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
		// round if off by 1 pixel, otherwise use ceil
		var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
		colSpan = Math.min(colSpan, this.cols);
		var colGroup = this._getColGroup(colSpan);
		// get the minimum Y value from the columns
		var minimumY = Math.min.apply(Math, colGroup);
		var shortColIndex = colGroup.indexOf(minimumY);
		// position the brick
		var position = {
			x: this.columnWidth * shortColIndex,
			y: minimumY
		};
		// apply setHeight to necessary columns
		var setHeight = minimumY + item.size.outerHeight;
		var setSpan = this.cols + 1 - colGroup.length;
		for (var i = 0; i < setSpan; i++) {
			this.colYs[shortColIndex + i] = setHeight;
		}
		return position;
	};
	/**
		* @param {Number} colSpan - number of columns the element spans
		* @returns {Array} colGroup
		*/
	Masonry.prototype._getColGroup = function(colSpan) {
		if (colSpan < 2) {
			// if brick spans only one column, use all the column Ys
			return this.colYs;
		}
		var colGroup = [];
		// how many different places could this brick fit horizontally
		var groupCount = this.cols + 1 - colSpan;
		// for each group potential horizontal position
		for (var i = 0; i < groupCount; i++) {
			// make an array of colY values for that one group
			var groupColYs = this.colYs.slice(i, i + colSpan);
			// and get the max value of the array
			colGroup[i] = Math.max.apply(Math, groupColYs);
		}
		return colGroup;
	};
	Masonry.prototype._manageStamp = function(stamp) {
		var stampSize = getSize(stamp);
		var offset = this._getElementOffset(stamp);
		// get the columns that this stamp affects
		var isOriginLeft = this._getOption('originLeft');
		var firstX = isOriginLeft ? offset.left : offset.right;
		var lastX = firstX + stampSize.outerWidth;
		var firstCol = Math.floor(firstX / this.columnWidth);
		firstCol = Math.max(0, firstCol);
		var lastCol = Math.floor(lastX / this.columnWidth);
		// lastCol should not go over if multiple of columnWidth #425
		lastCol -= lastX % this.columnWidth ? 0 : 1;
		lastCol = Math.min(this.cols - 1, lastCol);
		// set colYs to bottom of the stamp
		var isOriginTop = this._getOption('originTop');
		var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
		for (var i = firstCol; i <= lastCol; i++) {
			this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
		}
	};
	Masonry.prototype._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var size = {
			height: this.maxY
		};
		if (this._getOption('fitWidth')) {
			size.width = this._getContainerFitWidth();
		}
		return size;
	};
	Masonry.prototype._getContainerFitWidth = function() {
		var unusedCols = 0;
		// count unused columns
		var i = this.cols;
		while (--i) {
			if (this.colYs[i] !== 0) {
				break;
			}
			unusedCols++;
		}
		// fit container to columns that have been used
		return (this.cols - unusedCols) * this.columnWidth - this.gutter;
	};
	Masonry.prototype.needsResizeLayout = function() {
		var previousWidth = this.containerWidth;
		this.getContainerWidth();
		return previousWidth != this.containerWidth;
	};
	return Masonry;
}));
/*!
	* Masonry layout mode
	* sub-classes Masonry
	* http://masonry.desandro.com
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('isotope/js/layout-modes/masonry', [
			'../layout-mode',
			'masonry/masonry'
		], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require('../layout-mode'), require('masonry-layout'));
	} else {
		// browser global
		factory(window.Isotope.LayoutMode, window.Masonry);
	}
}(window, function factory(LayoutMode, Masonry) {
	'use strict';
	// -------------------------- masonryDefinition -------------------------- //
	// create an Outlayer layout class
	var MasonryMode = LayoutMode.create('masonry');
	var proto = MasonryMode.prototype;
	var keepModeMethods = {
		_getElementOffset: true,
		layout: true,
		_getMeasurement: true
	};
	// inherit Masonry prototype
	for (var method in Masonry.prototype) {
		// do not inherit mode methods
		if (!keepModeMethods[method]) {
			proto[method] = Masonry.prototype[method];
		}
	}
	var measureColumns = proto.measureColumns;
	proto.measureColumns = function() {
		// set items, used if measuring first item
		this.items = this.isotope.filteredItems;
		measureColumns.call(this);
	};
	// point to mode options for fitWidth
	var _getOption = proto._getOption;
	proto._getOption = function(option) {
		if (option == 'fitWidth') {
			return this.options.isFitWidth !== undefined ? this.options.isFitWidth : this.options.fitWidth;
		}
		return _getOption.apply(this.isotope, arguments);
	};
	return MasonryMode;
}));
/**
	* fitRows layout mode
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], factory);
	} else if (typeof exports == 'object') {
		// CommonJS
		module.exports = factory(require('../layout-mode'));
	} else {
		// browser global
		factory(window.Isotope.LayoutMode);
	}
}(window, function factory(LayoutMode) {
	'use strict';
	var FitRows = LayoutMode.create('fitRows');
	var proto = FitRows.prototype;
	proto._resetLayout = function() {
		this.x = 0;
		this.y = 0;
		this.maxY = 0;
		this._getMeasurement('gutter', 'outerWidth');
	};
	proto._getItemLayoutPosition = function(item) {
		item.getSize();
		var itemWidth = item.size.outerWidth + this.gutter;
		// if this element cannot fit in the current row
		var containerWidth = this.isotope.size.innerWidth + this.gutter;
		if (this.x !== 0 && itemWidth + this.x > containerWidth) {
			this.x = 0;
			this.y = this.maxY;
		}
		var position = {
			x: this.x,
			y: this.y
		};
		this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
		this.x += itemWidth;
		return position;
	};
	proto._getContainerSize = function() {
		return {
			height: this.maxY
		};
	};
	return FitRows;
}));
/**
	* vertical layout mode
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define('isotope/js/layout-modes/vertical', ['../layout-mode'], factory);
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require('../layout-mode'));
	} else {
		// browser global
		factory(window.Isotope.LayoutMode);
	}
}(window, function factory(LayoutMode) {
	'use strict';
	var Vertical = LayoutMode.create('vertical', {
		horizontalAlignment: 0
	});
	var proto = Vertical.prototype;
	proto._resetLayout = function() {
		this.y = 0;
	};
	proto._getItemLayoutPosition = function(item) {
		item.getSize();
		var x = (this.isotope.size.innerWidth - item.size.outerWidth) * this.options.horizontalAlignment;
		var y = this.y;
		this.y += item.size.outerHeight;
		return {
			x: x,
			y: y
		};
	};
	proto._getContainerSize = function() {
		return {
			height: this.y
		};
	};
	return Vertical;
}));
/*!
	* Isotope v3.0.1
	*
	* Licensed GPLv3 for open source use
	* or Isotope Commercial License for commercial use
	*
	* http://isotope.metafizzy.co
	* Copyright 2016 Metafizzy
	*/
(function(window, factory) {
	// universal module definition
	/* jshint strict: false */
	/*globals define, module, require */
	if (typeof define == 'function' && define.amd) {
		// AMD
		define([
			'outlayer/outlayer',
			'get-size/get-size',
			'desandro-matches-selector/matches-selector',
			'fizzy-ui-utils/utils',
			'isotope/js/item',
			'isotope/js/layout-mode',
			// include default layout modes
			'isotope/js/layout-modes/masonry',
			'isotope/js/layout-modes/fit-rows',
			'isotope/js/layout-modes/vertical'
		], function(Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
			return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
		});
	} else if (typeof module == 'object' && module.exports) {
		// CommonJS
		module.exports = factory(window, require('outlayer'), require('get-size'), require('desandro-matches-selector'), require('fizzy-ui-utils'), require('isotope/js/item'), require('isotope/js/layout-mode'), // include default layout modes
			require('isotope/js/layout-modes/masonry'), require('isotope/js/layout-modes/fit-rows'), require('isotope/js/layout-modes/vertical'));
	} else {
		// browser global
		window.Isotope = factory(window, window.Outlayer, window.getSize, window.matchesSelector, window.fizzyUIUtils, window.Isotope.Item, window.Isotope.LayoutMode);
	}
}(window, function factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
	// -------------------------- vars -------------------------- //
	var jQuery = window.jQuery;
	// -------------------------- helpers -------------------------- //
	var trim = String.prototype.trim ? function(str) {
		return str.trim();
	} : function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	};
	// -------------------------- isotopeDefinition -------------------------- //
	// create an Outlayer layout class
	var Isotope = Outlayer.create('isotope', {
		layoutMode: 'masonry',
		isJQueryFiltering: true,
		sortAscending: true
	});
	Isotope.Item = Item;
	Isotope.LayoutMode = LayoutMode;
	var proto = Isotope.prototype;
	proto._create = function() {
		this.itemGUID = 0;
		// functions that sort items
		this._sorters = {};
		this._getSorters();
		// call super
		Outlayer.prototype._create.call(this);
		// create layout modes
		this.modes = {};
		// start filteredItems with all items
		this.filteredItems = this.items;
		// keep of track of sortBys
		this.sortHistory = ['original-order'];
		// create from registered layout modes
		for (var name in LayoutMode.modes) {
			this._initLayoutMode(name);
		}
	};
	proto.reloadItems = function() {
		// reset item ID counter
		this.itemGUID = 0;
		// call super
		Outlayer.prototype.reloadItems.call(this);
	};
	proto._itemize = function() {
		var items = Outlayer.prototype._itemize.apply(this, arguments);
		// assign ID for original-order
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			item.id = this.itemGUID++;
		}
		this._updateItemsSortData(items);
		return items;
	};
	// -------------------------- layout -------------------------- //
	proto._initLayoutMode = function(name) {
		var Mode = LayoutMode.modes[name];
		// set mode options
		// HACK extend initial options, back-fill in default options
		var initialOpts = this.options[name] || {};
		this.options[name] = Mode.options ? utils.extend(Mode.options, initialOpts) : initialOpts;
		// init layout mode instance
		this.modes[name] = new Mode(this);
	};
	proto.layout = function() {
		// if first time doing layout, do all magic
		if (!this._isLayoutInited && this._getOption('initLayout')) {
			this.arrange();
			return;
		}
		this._layout();
	};
	// private method to be used in layout() & magic()
	proto._layout = function() {
		// don't animate first layout
		var isInstant = this._getIsInstant();
		// layout flow
		this._resetLayout();
		this._manageStamps();
		this.layoutItems(this.filteredItems, isInstant);
		// flag for initalized
		this._isLayoutInited = true;
	};
	// filter + sort + layout
	proto.arrange = function(opts) {
		// set any options pass
		this.option(opts);
		this._getIsInstant();
		// filter, sort, and layout
		// filter
		var filtered = this._filter(this.items);
		this.filteredItems = filtered.matches;
		this._bindArrangeComplete();
		if (this._isInstant) {
			this._noTransition(this._hideReveal, [filtered]);
		} else {
			this._hideReveal(filtered);
		}
		this._sort();
		this._layout();
	};
	// alias to _init for main plugin method
	proto._init = proto.arrange;
	proto._hideReveal = function(filtered) {
		this.reveal(filtered.needReveal);
		this.hide(filtered.needHide);
	};
	// HACK
	// Don't animate/transition first layout
	// Or don't animate/transition other layouts
	proto._getIsInstant = function() {
		var isLayoutInstant = this._getOption('layoutInstant');
		var isInstant = isLayoutInstant !== undefined ? isLayoutInstant : !this._isLayoutInited;
		this._isInstant = isInstant;
		return isInstant;
	};
	// listen for layoutComplete, hideComplete and revealComplete
	// to trigger arrangeComplete
	proto._bindArrangeComplete = function() {
		// listen for 3 events to trigger arrangeComplete
		var isLayoutComplete, isHideComplete, isRevealComplete;
		var _this = this;

		function arrangeParallelCallback() {
			if (isLayoutComplete && isHideComplete && isRevealComplete) {
				_this.dispatchEvent('arrangeComplete', null, [_this.filteredItems]);
			}
		}
		this.once('layoutComplete', function() {
			isLayoutComplete = true;
			arrangeParallelCallback();
		});
		this.once('hideComplete', function() {
			isHideComplete = true;
			arrangeParallelCallback();
		});
		this.once('revealComplete', function() {
			isRevealComplete = true;
			arrangeParallelCallback();
		});
	};
	// -------------------------- filter -------------------------- //
	proto._filter = function(items) {
		var filter = this.options.filter;
		filter = filter || '*';
		var matches = [];
		var hiddenMatched = [];
		var visibleUnmatched = [];
		var test = this._getFilterTest(filter);
		// test each item
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.isIgnored) {
				continue;
			}
			// add item to either matched or unmatched group
			var isMatched = test(item);
			// item.isFilterMatched = isMatched;
			// add to matches if its a match
			if (isMatched) {
				matches.push(item);
			}
			// add to additional group if item needs to be hidden or revealed
			if (isMatched && item.isHidden) {
				hiddenMatched.push(item);
			} else if (!isMatched && !item.isHidden) {
				visibleUnmatched.push(item);
			}
		}
		// return collections of items to be manipulated
		return {
			matches: matches,
			needReveal: hiddenMatched,
			needHide: visibleUnmatched
		};
	};
	// get a jQuery, function, or a matchesSelector test given the filter
	proto._getFilterTest = function(filter) {
		if (jQuery && this.options.isJQueryFiltering) {
			// use jQuery
			return function(item) {
				return jQuery(item.element).is(filter);
			};
		}
		if (typeof filter == 'function') {
			// use filter as function
			return function(item) {
				return filter(item.element);
			};
		}
		// default, use filter as selector string
		return function(item) {
			return matchesSelector(item.element, filter);
		};
	};
	// -------------------------- sorting -------------------------- //
	/**
		* @params {Array} elems
		* @public
		*/
	proto.updateSortData = function(elems) {
		// get items
		var items;
		if (elems) {
			elems = utils.makeArray(elems);
			items = this.getItems(elems);
		} else {
			// update all items if no elems provided
			items = this.items;
		}
		this._getSorters();
		this._updateItemsSortData(items);
	};
	proto._getSorters = function() {
		var getSortData = this.options.getSortData;
		for (var key in getSortData) {
			var sorter = getSortData[key];
			this._sorters[key] = mungeSorter(sorter);
		}
	};
	/**
		* @params {Array} items - of Isotope.Items
		* @private
		*/
	proto._updateItemsSortData = function(items) {
		// do not update if no items
		var len = items && items.length;
		for (var i = 0; len && i < len; i++) {
			var item = items[i];
			item.updateSortData();
		}
	};
	// ----- munge sorter ----- //
	// encapsulate this, as we just need mungeSorter
	// other functions in here are just for munging
	var mungeSorter = function() {
		// add a magic layer to sorters for convienent shorthands
		// `.foo-bar` will use the text of .foo-bar querySelector
		// `[foo-bar]` will use attribute
		// you can also add parser
		// `.foo-bar parseInt` will parse that as a number
		function mungeSorter(sorter) {
			// if not a string, return function or whatever it is
			if (typeof sorter != 'string') {
				return sorter;
			}
			// parse the sorter string
			var args = trim(sorter).split(' ');
			var query = args[0];
			// check if query looks like [an-attribute]
			var attrMatch = query.match(/^\[(.+)\]$/);
			var attr = attrMatch && attrMatch[1];
			var getValue = getValueGetter(attr, query);
			// use second argument as a parser
			var parser = Isotope.sortDataParsers[args[1]];
			// parse the value, if there was a parser
			sorter = parser ? function(elem) {
					return elem && parser(getValue(elem));
				} : // otherwise just return value
				function(elem) {
					return elem && getValue(elem);
				};
			return sorter;
		}
		// get an attribute getter, or get text of the querySelector
		function getValueGetter(attr, query) {
			// if query looks like [foo-bar], get attribute
			if (attr) {
				return function getAttribute(elem) {
					return elem.getAttribute(attr);
				};
			}
			// otherwise, assume its a querySelector, and get its text
			return function getChildText(elem) {
				var child = elem.querySelector(query);
				return child && child.textContent;
			};
		}
		return mungeSorter;
	}();
	// parsers used in getSortData shortcut strings
	Isotope.sortDataParsers = {
		'parseInt': function(val) {
			return parseInt(val, 10);
		},
		'parseFloat': function(val) {
			return parseFloat(val);
		}
	};
	// ----- sort method ----- //
	// sort filteredItem order
	proto._sort = function() {
		var sortByOpt = this.options.sortBy;
		if (!sortByOpt) {
			return;
		}
		// concat all sortBy and sortHistory
		var sortBys = [].concat.apply(sortByOpt, this.sortHistory);
		// sort magic
		var itemSorter = getItemSorter(sortBys, this.options.sortAscending);
		this.filteredItems.sort(itemSorter);
		// keep track of sortBy History
		if (sortByOpt != this.sortHistory[0]) {
			// add to front, oldest goes in last
			this.sortHistory.unshift(sortByOpt);
		}
	};
	// returns a function used for sorting
	function getItemSorter(sortBys, sortAsc) {
		return function sorter(itemA, itemB) {
			// cycle through all sortKeys
			for (var i = 0; i < sortBys.length; i++) {
				var sortBy = sortBys[i];
				var a = itemA.sortData[sortBy];
				var b = itemB.sortData[sortBy];
				if (a > b || a < b) {
					// if sortAsc is an object, use the value given the sortBy key
					var isAscending = sortAsc[sortBy] !== undefined ? sortAsc[sortBy] : sortAsc;
					var direction = isAscending ? 1 : -1;
					return (a > b ? 1 : -1) * direction;
				}
			}
			return 0;
		};
	}
	// -------------------------- methods -------------------------- //
	// get layout mode
	proto._mode = function() {
		var layoutMode = this.options.layoutMode;
		var mode = this.modes[layoutMode];
		if (!mode) {
			// TODO console.error
			throw new Error('No layout mode: ' + layoutMode);
		}
		// HACK sync mode's options
		// any options set after init for layout mode need to be synced
		mode.options = this.options[layoutMode];
		return mode;
	};
	proto._resetLayout = function() {
		// trigger original reset layout
		Outlayer.prototype._resetLayout.call(this);
		this._mode()._resetLayout();
	};
	proto._getItemLayoutPosition = function(item) {
		return this._mode()._getItemLayoutPosition(item);
	};
	proto._manageStamp = function(stamp) {
		this._mode()._manageStamp(stamp);
	};
	proto._getContainerSize = function() {
		return this._mode()._getContainerSize();
	};
	proto.needsResizeLayout = function() {
		return this._mode().needsResizeLayout();
	};
	// -------------------------- adding & removing -------------------------- //
	// HEADS UP overwrites default Outlayer appended
	proto.appended = function(elems) {
		var items = this.addItems(elems);
		if (!items.length) {
			return;
		}
		// filter, layout, reveal new items
		var filteredItems = this._filterRevealAdded(items);
		// add to filteredItems
		this.filteredItems = this.filteredItems.concat(filteredItems);
	};
	// HEADS UP overwrites default Outlayer prepended
	proto.prepended = function(elems) {
		var items = this._itemize(elems);
		if (!items.length) {
			return;
		}
		// start new layout
		this._resetLayout();
		this._manageStamps();
		// filter, layout, reveal new items
		var filteredItems = this._filterRevealAdded(items);
		// layout previous items
		this.layoutItems(this.filteredItems);
		// add to items and filteredItems
		this.filteredItems = filteredItems.concat(this.filteredItems);
		this.items = items.concat(this.items);
	};
	proto._filterRevealAdded = function(items) {
		var filtered = this._filter(items);
		this.hide(filtered.needHide);
		// reveal all new items
		this.reveal(filtered.matches);
		// layout new items, no transition
		this.layoutItems(filtered.matches, true);
		return filtered.matches;
	};
	/**
		* Filter, sort, and layout newly-appended item elements
		* @param {Array or NodeList or Element} elems
		*/
	proto.insert = function(elems) {
		var items = this.addItems(elems);
		if (!items.length) {
			return;
		}
		// append item elements
		var i, item;
		var len = items.length;
		for (i = 0; i < len; i++) {
			item = items[i];
			this.element.appendChild(item.element);
		}
		// filter new stuff
		var filteredInsertItems = this._filter(items).matches;
		// set flag
		for (i = 0; i < len; i++) {
			items[i].isLayoutInstant = true;
		}
		this.arrange();
		// reset flag
		for (i = 0; i < len; i++) {
			delete items[i].isLayoutInstant;
		}
		this.reveal(filteredInsertItems);
	};
	var _remove = proto.remove;
	proto.remove = function(elems) {
		elems = utils.makeArray(elems);
		var removeItems = this.getItems(elems);
		// do regular thing
		_remove.call(this, elems);
		// bail if no items to remove
		var len = removeItems && removeItems.length;
		// remove elems from filteredItems
		for (var i = 0; len && i < len; i++) {
			var item = removeItems[i];
			// remove item from collection
			utils.removeFrom(this.filteredItems, item);
		}
	};
	proto.shuffle = function() {
		// update random sortData
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			item.sortData.random = Math.random();
		}
		this.options.sortBy = 'random';
		this._sort();
		this._layout();
	};
	/**
		* trigger fn without transition
		* kind of hacky to have this in the first place
		* @param {Function} fn
		* @param {Array} args
		* @returns ret
		* @private
		*/
	proto._noTransition = function(fn, args) {
		// save transitionDuration before disabling
		var transitionDuration = this.options.transitionDuration;
		// disable transition
		this.options.transitionDuration = 0;
		// do it
		var returnValue = fn.apply(this, args);
		// re-enable transition for reveal
		this.options.transitionDuration = transitionDuration;
		return returnValue;
	};
	// ----- helper methods ----- //
	/**
		* getter method for getting filtered item elements
		* @returns {Array} elems - collection of item elements
		*/
	proto.getFilteredItemElements = function() {
		return this.filteredItems.map(function(item) {
			return item.element;
		});
	};
	// -----  ----- //
	return Isotope;
}));


/* ========================================
@preserve
04. GMaps.js v0.4.22
http://hpneo.github.com/gmaps/
Copyright 2016, Gustavo Leon
Released under the MIT License.
======================================== */
'use strict';
(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([
			'jquery',
			'googlemaps!'
		], factory);
	} else {
		root.GMaps = factory();
	}
}(this, function () {
	/*!
		* GMaps.js v0.4.24
		* http://hpneo.github.com/gmaps/
		*
		* Copyright 2016, Gustavo Leon
		* Released under the MIT License.
		*/
	var extend_object = function (obj, new_obj) {
		var name;
		if (obj === new_obj) {
			return obj;
		}
		for (name in new_obj) {
			if (new_obj[name] !== undefined) {
				obj[name] = new_obj[name];
			}
		}
		return obj;
	};
	var replace_object = function (obj, replace) {
		var name;
		if (obj === replace) {
			return obj;
		}
		for (name in replace) {
			if (obj[name] != undefined) {
				obj[name] = replace[name];
			}
		}
		return obj;
	};
	var array_map = function (array, callback) {
		var original_callback_params = Array.prototype.slice.call(arguments, 2),
			array_return = [],
			array_length = array.length,
			i;
		if (Array.prototype.map && array.map === Array.prototype.map) {
			array_return = Array.prototype.map.call(array, function (item) {
				var callback_params = original_callback_params.slice(0);
				callback_params.splice(0, 0, item);
				return callback.apply(this, callback_params);
			});
		} else {
			for (i = 0; i < array_length; i++) {
				callback_params = original_callback_params;
				callback_params.splice(0, 0, array[i]);
				array_return.push(callback.apply(this, callback_params));
			}
		}
		return array_return;
	};
	var array_flat = function (array) {
		var new_array = [],
			i;
		for (i = 0; i < array.length; i++) {
			new_array = new_array.concat(array[i]);
		}
		return new_array;
	};
	var coordsToLatLngs = function (coords, useGeoJSON) {
		var first_coord = coords[0],
			second_coord = coords[1];
		if (useGeoJSON) {
			first_coord = coords[1];
			second_coord = coords[0];
		}
		return new google.maps.LatLng(first_coord, second_coord);
	};
	var arrayToLatLng = function (coords, useGeoJSON) {
		var i;
		for (i = 0; i < coords.length; i++) {
			if (!(coords[i] instanceof google.maps.LatLng)) {
				if (coords[i].length > 0 && typeof coords[i][0] === 'object') {
					coords[i] = arrayToLatLng(coords[i], useGeoJSON);
				} else {
					coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
				}
			}
		}
		return coords;
	};
	var getElementsByClassName = function (class_name, context) {
		var element, _class = class_name.replace('.', '');
		if ('jQuery' in this && context) {
			element = $('.' + _class, context)[0];
		} else {
			element = document.getElementsByClassName(_class)[0];
		}
		return element;
	};
	var getElementById = function (id, context) {
		var element, id = id.replace('#', '');
		if ('jQuery' in window && context) {
			element = $('#' + id, context)[0];
		} else {
			element = document.getElementById(id);
		}
		return element;
	};
	var findAbsolutePosition = function (obj) {
		var curleft = 0,
			curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return [
			curleft,
			curtop
		];
	};
	var GMaps = function (global) {
		'use strict';
		var doc = document;
		/**
			* Creates a new GMaps instance, including a Google Maps map.
			* @class GMaps
			* @constructs
			* @param {object} options - `options` accepts all the [MapOptions](https://developers.google.com/maps/documentation/javascript/reference#MapOptions) and [events](https://developers.google.com/maps/documentation/javascript/reference#Map) listed in the Google Maps API. Also accepts:
			* * `lat` (number): Latitude of the map's center
			* * `lng` (number): Longitude of the map's center
			* * `el` (string or HTMLElement): container where the map will be rendered
			* * `markerClusterer` (function): A function to create a marker cluster. You can use MarkerClusterer or MarkerClustererPlus.
			*/
		var GMaps = function (options) {
			if (!(typeof window.google === 'object' && window.google.maps)) {
				if (typeof window.console === 'object' && window.console.error) {
					console.error('Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js.');
				}
				return function () {};
			}
			if (!this)
				return new GMaps(options);
			options.zoom = options.zoom || 15;
			options.mapType = options.mapType || 'roadmap';
			var valueOrDefault = function (value, defaultValue) {
				return value === undefined ? defaultValue : value;
			};
			var self = this,
				i, events_that_hide_context_menu = [
					'bounds_changed',
					'center_changed',
					'click',
					'dblclick',
					'drag',
					'dragend',
					'dragstart',
					'idle',
					'maptypeid_changed',
					'projection_changed',
					'resize',
					'tilesloaded',
					'zoom_changed'
				],
				events_that_doesnt_hide_context_menu = [
					'mousemove',
					'mouseout',
					'mouseover'
				],
				options_to_be_deleted = [
					'el',
					'lat',
					'lng',
					'mapType',
					'width',
					'height',
					'markerClusterer',
					'enableNewStyle'
				],
				identifier = options.el || options.div,
				markerClustererFunction = options.markerClusterer,
				mapType = google.maps.MapTypeId[options.mapType.toUpperCase()],
				map_center = new google.maps.LatLng(options.lat, options.lng),
				zoomControl = valueOrDefault(options.zoomControl, true),
				zoomControlOpt = options.zoomControlOpt || {
					style: 'DEFAULT',
					position: 'TOP_LEFT'
				},
				zoomControlStyle = zoomControlOpt.style || 'DEFAULT',
				zoomControlPosition = zoomControlOpt.position || 'TOP_LEFT',
				panControl = valueOrDefault(options.panControl, true),
				mapTypeControl = valueOrDefault(options.mapTypeControl, true),
				scaleControl = valueOrDefault(options.scaleControl, true),
				streetViewControl = valueOrDefault(options.streetViewControl, true),
				overviewMapControl = valueOrDefault(overviewMapControl, true),
				map_options = {},
				map_base_options = {
					zoom: this.zoom,
					center: map_center,
					mapTypeId: mapType
				},
				map_controls_options = {
					panControl: panControl,
					zoomControl: zoomControl,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle[zoomControlStyle],
						position: google.maps.ControlPosition[zoomControlPosition]
					},
					mapTypeControl: mapTypeControl,
					scaleControl: scaleControl,
					streetViewControl: streetViewControl,
					overviewMapControl: overviewMapControl
				};
			if (typeof options.el === 'string' || typeof options.div === 'string') {
				if (identifier.indexOf('#') > -1) {
					/**
						* Container element
						*
						* @type {HTMLElement}
						*/
					this.el = getElementById(identifier, options.context);
				} else {
					this.el = getElementsByClassName.apply(this, [
						identifier,
						options.context
					]);
				}
			} else {
				this.el = identifier;
			}
			if (typeof this.el === 'undefined' || this.el === null) {
				throw 'No element defined.';
			}
			window.context_menu = window.context_menu || {};
			window.context_menu[self.el.id] = {};
			/**
				* Collection of custom controls in the map UI
				*
				* @type {array}
				*/
			this.controls = [];
			/**
				* Collection of map's overlays
				*
				* @type {array}
				*/
			this.overlays = [];
			/**
				* Collection of KML/GeoRSS and FusionTable layers
				*
				* @type {array}
				*/
			this.layers = [];
			/**
				* Collection of data layers (See {@link GMaps#addLayer})
				*
				* @type {object}
				*/
			this.singleLayers = {};
			/**
				* Collection of map's markers
				*
				* @type {array}
				*/
			this.markers = [];
			/**
				* Collection of map's lines
				*
				* @type {array}
				*/
			this.polylines = [];
			/**
				* Collection of map's routes requested by {@link GMaps#getRoutes}, {@link GMaps#renderRoute}, {@link GMaps#drawRoute}, {@link GMaps#travelRoute} or {@link GMaps#drawSteppedRoute}
				*
				* @type {array}
				*/
			this.routes = [];
			/**
				* Collection of map's polygons
				*
				* @type {array}
				*/
			this.polygons = [];
			this.infoWindow = null;
			this.overlay_el = null;
			/**
				* Current map's zoom
				*
				* @type {number}
				*/
			this.zoom = options.zoom;
			this.registered_events = {};
			this.el.style.width = options.width || this.el.scrollWidth || this.el.offsetWidth;
			this.el.style.height = options.height || this.el.scrollHeight || this.el.offsetHeight;
			google.maps.visualRefresh = options.enableNewStyle;
			for (i = 0; i < options_to_be_deleted.length; i++) {
				delete options[options_to_be_deleted[i]];
			}
			if (options.disableDefaultUI != true) {
				map_base_options = extend_object(map_base_options, map_controls_options);
			}
			map_options = extend_object(map_base_options, options);
			for (i = 0; i < events_that_hide_context_menu.length; i++) {
				delete map_options[events_that_hide_context_menu[i]];
			}
			for (i = 0; i < events_that_doesnt_hide_context_menu.length; i++) {
				delete map_options[events_that_doesnt_hide_context_menu[i]];
			}
			/**
				* Google Maps map instance
				*
				* @type {google.maps.Map}
				*/
			this.map = new google.maps.Map(this.el, map_options);
			if (markerClustererFunction) {
				/**
					* Marker Clusterer instance
					*
					* @type {object}
					*/
				this.markerClusterer = markerClustererFunction.apply(this, [this.map]);
			}
			var buildContextMenuHTML = function (control, e) {
				var html = '',
					options = window.context_menu[self.el.id][control];
				for (var i in options) {
					if (options.hasOwnProperty(i)) {
						var option = options[i];
						html += '<li><a id="' + control + '_' + i + '" href="#">' + option.title + '</a></li>';
					}
				}
				if (!getElementById('gmaps_context_menu'))
					return;
				var context_menu_element = getElementById('gmaps_context_menu');
				context_menu_element.innerHTML = html;
				var context_menu_items = context_menu_element.getElementsByTagName('a'),
					context_menu_items_count = context_menu_items.length,
					i;
				for (i = 0; i < context_menu_items_count; i++) {
					var context_menu_item = context_menu_items[i];
					var assign_menu_item_action = function (ev) {
						ev.preventDefault();
						options[this.id.replace(control + '_', '')].action.apply(self, [e]);
						self.hideContextMenu();
					};
					google.maps.event.clearListeners(context_menu_item, 'click');
					google.maps.event.addDomListenerOnce(context_menu_item, 'click', assign_menu_item_action, false);
				}
				var position = findAbsolutePosition.apply(this, [self.el]),
					left = position[0] + e.pixel.x - 15,
					top = position[1] + e.pixel.y - 15;
				context_menu_element.style.left = left + 'px';
				context_menu_element.style.top = top + 'px'; // context_menu_element.style.display = 'block';
			};
			this.buildContextMenu = function (control, e) {
				if (control === 'marker') {
					e.pixel = {};
					var overlay = new google.maps.OverlayView();
					overlay.setMap(self.map);
					overlay.draw = function () {
						var projection = overlay.getProjection(),
							position = e.marker.getPosition();
						e.pixel = projection.fromLatLngToContainerPixel(position);
						buildContextMenuHTML(control, e);
					};
				} else {
					buildContextMenuHTML(control, e);
				}
				var context_menu_element = getElementById('gmaps_context_menu');
				setTimeout(function () {
					context_menu_element.style.display = 'block';
				}, 0);
			};
			/**
				* Add a context menu for a map or a marker.
				*
				* @param {object} options - The `options` object should contain:
				* * `control` (string): Kind of control the context menu will be attached. Can be "map" or "marker".
				* * `options` (array): A collection of context menu items:
				*   * `title` (string): Item's title shown in the context menu.
				*   * `name` (string): Item's identifier.
				*   * `action` (function): Function triggered after selecting the context menu item.
				*/
			this.setContextMenu = function (options) {
				window.context_menu[self.el.id][options.control] = {};
				var i, ul = doc.createElement('ul');
				for (i in options.options) {
					if (options.options.hasOwnProperty(i)) {
						var option = options.options[i];
						window.context_menu[self.el.id][options.control][option.name] = {
							title: option.title,
							action: option.action
						};
					}
				}
				ul.id = 'gmaps_context_menu';
				ul.style.display = 'none';
				ul.style.position = 'absolute';
				ul.style.minWidth = '100px';
				ul.style.background = 'white';
				ul.style.listStyle = 'none';
				ul.style.padding = '8px';
				ul.style.boxShadow = '2px 2px 6px #ccc';
				if (!getElementById('gmaps_context_menu')) {
					doc.body.appendChild(ul);
				}
				var context_menu_element = getElementById('gmaps_context_menu');
				google.maps.event.addDomListener(context_menu_element, 'mouseout', function (ev) {
					if (!ev.relatedTarget || !this.contains(ev.relatedTarget)) {
						window.setTimeout(function () {
							context_menu_element.style.display = 'none';
						}, 400);
					}
				}, false);
			};
			/**
				* Hide the current context menu
				*/
			this.hideContextMenu = function () {
				var context_menu_element = getElementById('gmaps_context_menu');
				if (context_menu_element) {
					context_menu_element.style.display = 'none';
				}
			};
			var setupListener = function (object, name) {
				google.maps.event.addListener(object, name, function (e) {
					if (e == undefined) {
						e = this;
					}
					options[name].apply(this, [e]);
					self.hideContextMenu();
				});
			};
			//google.maps.event.addListener(this.map, 'idle', this.hideContextMenu);
			google.maps.event.addListener(this.map, 'zoom_changed', this.hideContextMenu);
			for (var ev = 0; ev < events_that_hide_context_menu.length; ev++) {
				var name = events_that_hide_context_menu[ev];
				if (name in options) {
					setupListener(this.map, name);
				}
			}
			for (var ev = 0; ev < events_that_doesnt_hide_context_menu.length; ev++) {
				var name = events_that_doesnt_hide_context_menu[ev];
				if (name in options) {
					setupListener(this.map, name);
				}
			}
			google.maps.event.addListener(this.map, 'rightclick', function (e) {
				if (options.rightclick) {
					options.rightclick.apply(this, [e]);
				}
				if (window.context_menu[self.el.id].map != undefined) {
					self.buildContextMenu('map', e);
				}
			});
			/**
				* Trigger a `resize` event, useful if you need to repaint the current map (for changes in the viewport or display / hide actions).
				*/
			this.refresh = function () {
				google.maps.event.trigger(this.map, 'resize');
			};
			/**
				* Adjust the map zoom to include all the markers added in the map.
				*/
			this.fitZoom = function () {
				var latLngs = [],
					markers_length = this.markers.length,
					i;
				for (i = 0; i < markers_length; i++) {
					if (typeof this.markers[i].visible === 'boolean' && this.markers[i].visible) {
						latLngs.push(this.markers[i].getPosition());
					}
				}
				this.fitLatLngBounds(latLngs);
			};
			/**
				* Adjust the map zoom to include all the coordinates in the `latLngs` array.
				*
				* @param {array} latLngs - Collection of `google.maps.LatLng` objects.
				*/
			this.fitLatLngBounds = function (latLngs) {
				var total = latLngs.length,
					bounds = new google.maps.LatLngBounds(),
					i;
				for (i = 0; i < total; i++) {
					bounds.extend(latLngs[i]);
				}
				this.map.fitBounds(bounds);
			};
			/**
				* Center the map using the `lat` and `lng` coordinates.
				*
				* @param {number} lat - Latitude of the coordinate.
				* @param {number} lng - Longitude of the coordinate.
				* @param {function} [callback] - Callback that will be executed after the map is centered.
				*/
			this.setCenter = function (lat, lng, callback) {
				this.map.panTo(new google.maps.LatLng(lat, lng));
				if (callback) {
					callback();
				}
			};
			/**
				* Return the HTML element container of the map.
				*
				* @returns {HTMLElement} the element container.
				*/
			this.getElement = function () {
				return this.el;
			};
			/**
				* Increase the map's zoom.
				*
				* @param {number} [magnitude] - The number of times the map will be zoomed in.
				*/
			this.zoomIn = function (value) {
				value = value || 1;
				this.zoom = this.map.getZoom() + value;
				this.map.setZoom(this.zoom);
			};
			/**
				* Decrease the map's zoom.
				*
				* @param {number} [magnitude] - The number of times the map will be zoomed out.
				*/
			this.zoomOut = function (value) {
				value = value || 1;
				this.zoom = this.map.getZoom() - value;
				this.map.setZoom(this.zoom);
			};
			var native_methods = [],
				method;
			for (method in this.map) {
				if (typeof this.map[method] == 'function' && !this[method]) {
					native_methods.push(method);
				}
			}
			for (i = 0; i < native_methods.length; i++) {
				(function (gmaps, scope, method_name) {
					gmaps[method_name] = function () {
						return scope[method_name].apply(scope, arguments);
					};
				}(this, this.map, native_methods[i]));
			}
		};
		return GMaps;
	}(this);
	GMaps.prototype.createControl = function (options) {
		var control = document.createElement('div');
		control.style.cursor = 'pointer';
		if (options.disableDefaultStyles !== true) {
			control.style.fontFamily = 'Roboto, Arial, sans-serif';
			control.style.fontSize = '11px';
			control.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
		}
		for (var option in options.style) {
			control.style[option] = options.style[option];
		}
		if (options.id) {
			control.id = options.id;
		}
		if (options.title) {
			control.title = options.title;
		}
		if (options.classes) {
			control.className = options.classes;
		}
		if (options.content) {
			if (typeof options.content === 'string') {
				control.innerHTML = options.content;
			} else if (options.content instanceof HTMLElement) {
				control.appendChild(options.content);
			}
		}
		if (options.position) {
			control.position = google.maps.ControlPosition[options.position.toUpperCase()];
		}
		for (var ev in options.events) {
			(function (object, name) {
				google.maps.event.addDomListener(object, name, function () {
					options.events[name].apply(this, [this]);
				});
			}(control, ev));
		}
		control.index = 1;
		return control;
	};
	/**
		* Add a custom control to the map UI.
		*
		* @param {object} options - The `options` object should contain:
		* * `style` (object): The keys and values of this object should be valid CSS properties and values.
		* * `id` (string): The HTML id for the custom control.
		* * `classes` (string): A string containing all the HTML classes for the custom control.
		* * `content` (string or HTML element): The content of the custom control.
		* * `position` (string): Any valid [`google.maps.ControlPosition`](https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning) value, in lower or upper case.
		* * `events` (object): The keys of this object should be valid DOM events. The values should be functions.
		* * `disableDefaultStyles` (boolean): If false, removes the default styles for the controls like font (family and size), and box shadow.
		* @returns {HTMLElement}
		*/
	GMaps.prototype.addControl = function (options) {
		var control = this.createControl(options);
		this.controls.push(control);
		this.map.controls[control.position].push(control);
		return control;
	};
	/**
		* Remove a control from the map. `control` should be a control returned by `addControl()`.
		*
		* @param {HTMLElement} control - One of the controls returned by `addControl()`.
		* @returns {HTMLElement} the removed control.
		*/
	GMaps.prototype.removeControl = function (control) {
		var position = null,
			i;
		for (i = 0; i < this.controls.length; i++) {
			if (this.controls[i] == control) {
				position = this.controls[i].position;
				this.controls.splice(i, 1);
			}
		}
		if (position) {
			for (i = 0; i < this.map.controls.length; i++) {
				var controlsForPosition = this.map.controls[control.position];
				if (controlsForPosition.getAt(i) == control) {
					controlsForPosition.removeAt(i);
					break;
				}
			}
		}
		return control;
	};
	GMaps.prototype.createMarker = function (options) {
		if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
			throw 'No latitude or longitude defined.';
		}
		var self = this,
			details = options.details,
			fences = options.fences,
			outside = options.outside,
			base_options = {
				position: new google.maps.LatLng(options.lat, options.lng),
				map: null
			},
			marker_options = extend_object(base_options, options);
		delete marker_options.lat;
		delete marker_options.lng;
		delete marker_options.fences;
		delete marker_options.outside;
		var marker = new google.maps.Marker(marker_options);
		marker.fences = fences;
		if (options.infoWindow) {
			marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);
			var info_window_events = [
				'closeclick',
				'content_changed',
				'domready',
				'position_changed',
				'zindex_changed'
			];
			for (var ev = 0; ev < info_window_events.length; ev++) {
				(function (object, name) {
					if (options.infoWindow[name]) {
						google.maps.event.addListener(object, name, function (e) {
							options.infoWindow[name].apply(this, [e]);
						});
					}
				}(marker.infoWindow, info_window_events[ev]));
			}
		}
		var marker_events = [
			'animation_changed',
			'clickable_changed',
			'cursor_changed',
			'draggable_changed',
			'flat_changed',
			'icon_changed',
			'position_changed',
			'shadow_changed',
			'shape_changed',
			'title_changed',
			'visible_changed',
			'zindex_changed'
		];
		var marker_events_with_mouse = [
			'dblclick',
			'drag',
			'dragend',
			'dragstart',
			'mousedown',
			'mouseout',
			'mouseover',
			'mouseup'
		];
		for (var ev = 0; ev < marker_events.length; ev++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function () {
						options[name].apply(this, [this]);
					});
				}
			}(marker, marker_events[ev]));
		}
		for (var ev = 0; ev < marker_events_with_mouse.length; ev++) {
			(function (map, object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function (me) {
						if (!me.pixel) {
							me.pixel = map.getProjection().fromLatLngToPoint(me.latLng);
						}
						options[name].apply(this, [me]);
					});
				}
			}(this.map, marker, marker_events_with_mouse[ev]));
		}
		google.maps.event.addListener(marker, 'click', function () {
			this.details = details;
			if (options.click) {
				options.click.apply(this, [this]);
			}
			if (marker.infoWindow) {
				self.hideInfoWindows();
				marker.infoWindow.open(self.map, marker);
			}
		});
		google.maps.event.addListener(marker, 'rightclick', function (e) {
			e.marker = this;
			if (options.rightclick) {
				options.rightclick.apply(this, [e]);
			}
			if (window.context_menu[self.el.id].marker != undefined) {
				self.buildContextMenu('marker', e);
			}
		});
		if (marker.fences) {
			google.maps.event.addListener(marker, 'dragend', function () {
				self.checkMarkerGeofence(marker, function (m, f) {
					outside(m, f);
				});
			});
		}
		return marker;
	};
	GMaps.prototype.addMarker = function (options) {
		var marker;
		if (options.hasOwnProperty('gm_accessors_')) {
			// Native google.maps.Marker object
			marker = options;
		} else {
			if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng') || options.position) {
				marker = this.createMarker(options);
			} else {
				throw 'No latitude or longitude defined.';
			}
		}
		marker.setMap(this.map);
		if (this.markerClusterer) {
			this.markerClusterer.addMarker(marker);
		}
		this.markers.push(marker);
		GMaps.fire('marker_added', marker, this);
		return marker;
	};
	GMaps.prototype.addMarkers = function (array) {
		for (var i = 0, marker; marker = array[i]; i++) {
			this.addMarker(marker);
		}
		return this.markers;
	};
	GMaps.prototype.hideInfoWindows = function () {
		for (var i = 0, marker; marker = this.markers[i]; i++) {
			if (marker.infoWindow) {
				marker.infoWindow.close();
			}
		}
	};
	GMaps.prototype.removeMarker = function (marker) {
		for (var i = 0; i < this.markers.length; i++) {
			if (this.markers[i] === marker) {
				this.markers[i].setMap(null);
				this.markers.splice(i, 1);
				if (this.markerClusterer) {
					this.markerClusterer.removeMarker(marker);
				}
				GMaps.fire('marker_removed', marker, this);
				break;
			}
		}
		return marker;
	};
	GMaps.prototype.removeMarkers = function (collection) {
		var new_markers = [];
		if (typeof collection == 'undefined') {
			for (var i = 0; i < this.markers.length; i++) {
				var marker = this.markers[i];
				marker.setMap(null);
				GMaps.fire('marker_removed', marker, this);
			}
			if (this.markerClusterer && this.markerClusterer.clearMarkers) {
				this.markerClusterer.clearMarkers();
			}
			this.markers = new_markers;
		} else {
			for (var i = 0; i < collection.length; i++) {
				var index = this.markers.indexOf(collection[i]);
				if (index > -1) {
					var marker = this.markers[index];
					marker.setMap(null);
					if (this.markerClusterer) {
						this.markerClusterer.removeMarker(marker);
					}
					GMaps.fire('marker_removed', marker, this);
				}
			}
			for (var i = 0; i < this.markers.length; i++) {
				var marker = this.markers[i];
				if (marker.getMap() != null) {
					new_markers.push(marker);
				}
			}
			this.markers = new_markers;
		}
	};
	GMaps.prototype.drawOverlay = function (options) {
		var overlay = new google.maps.OverlayView(),
			auto_show = true;
		overlay.setMap(this.map);
		if (options.auto_show != null) {
			auto_show = options.auto_show;
		}
		overlay.onAdd = function () {
			var el = document.createElement('div');
			el.style.borderStyle = 'none';
			el.style.borderWidth = '0px';
			el.style.position = 'absolute';
			el.style.zIndex = 100;
			el.innerHTML = options.content;
			overlay.el = el;
			if (!options.layer) {
				options.layer = 'overlayLayer';
			}
			var panes = this.getPanes(),
				overlayLayer = panes[options.layer],
				stop_overlay_events = [
					'contextmenu',
					'DOMMouseScroll',
					'dblclick',
					'mousedown'
				];
			overlayLayer.appendChild(el);
			for (var ev = 0; ev < stop_overlay_events.length; ev++) {
				(function (object, name) {
					google.maps.event.addDomListener(object, name, function (e) {
						if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && document.all) {
							e.cancelBubble = true;
							e.returnValue = false;
						} else {
							e.stopPropagation();
						}
					});
				}(el, stop_overlay_events[ev]));
			}
			if (options.click) {
				panes.overlayMouseTarget.appendChild(overlay.el);
				google.maps.event.addDomListener(overlay.el, 'click', function () {
					options.click.apply(overlay, [overlay]);
				});
			}
			google.maps.event.trigger(this, 'ready');
		};
		overlay.draw = function () {
			var projection = this.getProjection(),
				pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));
			options.horizontalOffset = options.horizontalOffset || 0;
			options.verticalOffset = options.verticalOffset || 0;
			var el = overlay.el,
				content = el.children[0],
				content_height = content.clientHeight,
				content_width = content.clientWidth;
			switch (options.verticalAlign) {
			case 'top':
				el.style.top = pixel.y - content_height + options.verticalOffset + 'px';
				break;
			default:
			case 'middle':
				el.style.top = pixel.y - content_height / 2 + options.verticalOffset + 'px';
				break;
			case 'bottom':
				el.style.top = pixel.y + options.verticalOffset + 'px';
				break;
			}
			switch (options.horizontalAlign) {
			case 'left':
				el.style.left = pixel.x - content_width + options.horizontalOffset + 'px';
				break;
			default:
			case 'center':
				el.style.left = pixel.x - content_width / 2 + options.horizontalOffset + 'px';
				break;
			case 'right':
				el.style.left = pixel.x + options.horizontalOffset + 'px';
				break;
			}
			el.style.display = auto_show ? 'block' : 'none';
			if (!auto_show) {
				options.show.apply(this, [el]);
			}
		};
		overlay.onRemove = function () {
			var el = overlay.el;
			if (options.remove) {
				options.remove.apply(this, [el]);
			} else {
				overlay.el.parentNode.removeChild(overlay.el);
				overlay.el = null;
			}
		};
		this.overlays.push(overlay);
		return overlay;
	};
	GMaps.prototype.removeOverlay = function (overlay) {
		for (var i = 0; i < this.overlays.length; i++) {
			if (this.overlays[i] === overlay) {
				this.overlays[i].setMap(null);
				this.overlays.splice(i, 1);
				break;
			}
		}
	};
	GMaps.prototype.removeOverlays = function () {
		for (var i = 0, item; item = this.overlays[i]; i++) {
			item.setMap(null);
		}
		this.overlays = [];
	};
	GMaps.prototype.drawPolyline = function (options) {
		var path = [],
			points = options.path;
		if (points.length) {
			if (points[0][0] === undefined) {
				path = points;
			} else {
				for (var i = 0, latlng; latlng = points[i]; i++) {
					path.push(new google.maps.LatLng(latlng[0], latlng[1]));
				}
			}
		}
		var polyline_options = {
			map: this.map,
			path: path,
			strokeColor: options.strokeColor,
			strokeOpacity: options.strokeOpacity,
			strokeWeight: options.strokeWeight,
			geodesic: options.geodesic,
			clickable: true,
			editable: false,
			visible: true
		};
		if (options.hasOwnProperty('clickable')) {
			polyline_options.clickable = options.clickable;
		}
		if (options.hasOwnProperty('editable')) {
			polyline_options.editable = options.editable;
		}
		if (options.hasOwnProperty('icons')) {
			polyline_options.icons = options.icons;
		}
		if (options.hasOwnProperty('zIndex')) {
			polyline_options.zIndex = options.zIndex;
		}
		var polyline = new google.maps.Polyline(polyline_options);
		var polyline_events = [
			'click',
			'dblclick',
			'mousedown',
			'mousemove',
			'mouseout',
			'mouseover',
			'mouseup',
			'rightclick'
		];
		for (var ev = 0; ev < polyline_events.length; ev++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function (e) {
						options[name].apply(this, [e]);
					});
				}
			}(polyline, polyline_events[ev]));
		}
		this.polylines.push(polyline);
		GMaps.fire('polyline_added', polyline, this);
		return polyline;
	};
	GMaps.prototype.removePolyline = function (polyline) {
		for (var i = 0; i < this.polylines.length; i++) {
			if (this.polylines[i] === polyline) {
				this.polylines[i].setMap(null);
				this.polylines.splice(i, 1);
				GMaps.fire('polyline_removed', polyline, this);
				break;
			}
		}
	};
	GMaps.prototype.removePolylines = function () {
		for (var i = 0, item; item = this.polylines[i]; i++) {
			item.setMap(null);
		}
		this.polylines = [];
	};
	GMaps.prototype.drawCircle = function (options) {
		options = extend_object({
			map: this.map,
			center: new google.maps.LatLng(options.lat, options.lng)
		}, options);
		delete options.lat;
		delete options.lng;
		var polygon = new google.maps.Circle(options),
			polygon_events = [
				'click',
				'dblclick',
				'mousedown',
				'mousemove',
				'mouseout',
				'mouseover',
				'mouseup',
				'rightclick'
			];
		for (var ev = 0; ev < polygon_events.length; ev++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function (e) {
						options[name].apply(this, [e]);
					});
				}
			}(polygon, polygon_events[ev]));
		}
		this.polygons.push(polygon);
		return polygon;
	};
	GMaps.prototype.drawRectangle = function (options) {
		options = extend_object({
			map: this.map
		}, options);
		var latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]), new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1]));
		options.bounds = latLngBounds;
		var polygon = new google.maps.Rectangle(options),
			polygon_events = [
				'click',
				'dblclick',
				'mousedown',
				'mousemove',
				'mouseout',
				'mouseover',
				'mouseup',
				'rightclick'
			];
		for (var ev = 0; ev < polygon_events.length; ev++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function (e) {
						options[name].apply(this, [e]);
					});
				}
			}(polygon, polygon_events[ev]));
		}
		this.polygons.push(polygon);
		return polygon;
	};
	GMaps.prototype.drawPolygon = function (options) {
		var useGeoJSON = false;
		if (options.hasOwnProperty('useGeoJSON')) {
			useGeoJSON = options.useGeoJSON;
		}
		delete options.useGeoJSON;
		options = extend_object({
			map: this.map
		}, options);
		if (useGeoJSON == false) {
			options.paths = [options.paths.slice(0)];
		}
		if (options.paths.length > 0) {
			if (options.paths[0].length > 0) {
				options.paths = array_flat(array_map(options.paths, arrayToLatLng, useGeoJSON));
			}
		}
		var polygon = new google.maps.Polygon(options),
			polygon_events = [
				'click',
				'dblclick',
				'mousedown',
				'mousemove',
				'mouseout',
				'mouseover',
				'mouseup',
				'rightclick'
			];
		for (var ev = 0; ev < polygon_events.length; ev++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function (e) {
						options[name].apply(this, [e]);
					});
				}
			}(polygon, polygon_events[ev]));
		}
		this.polygons.push(polygon);
		GMaps.fire('polygon_added', polygon, this);
		return polygon;
	};
	GMaps.prototype.removePolygon = function (polygon) {
		for (var i = 0; i < this.polygons.length; i++) {
			if (this.polygons[i] === polygon) {
				this.polygons[i].setMap(null);
				this.polygons.splice(i, 1);
				GMaps.fire('polygon_removed', polygon, this);
				break;
			}
		}
	};
	GMaps.prototype.removePolygons = function () {
		for (var i = 0, item; item = this.polygons[i]; i++) {
			item.setMap(null);
		}
		this.polygons = [];
	};
	GMaps.prototype.getFromFusionTables = function (options) {
		var events = options.events;
		delete options.events;
		var fusion_tables_options = options,
			layer = new google.maps.FusionTablesLayer(fusion_tables_options);
		for (var ev in events) {
			(function (object, name) {
				google.maps.event.addListener(object, name, function (e) {
					events[name].apply(this, [e]);
				});
			}(layer, ev));
		}
		this.layers.push(layer);
		return layer;
	};
	GMaps.prototype.loadFromFusionTables = function (options) {
		var layer = this.getFromFusionTables(options);
		layer.setMap(this.map);
		return layer;
	};
	GMaps.prototype.getFromKML = function (options) {
		var url = options.url,
			events = options.events;
		delete options.url;
		delete options.events;
		var kml_options = options,
			layer = new google.maps.KmlLayer(url, kml_options);
		for (var ev in events) {
			(function (object, name) {
				google.maps.event.addListener(object, name, function (e) {
					events[name].apply(this, [e]);
				});
			}(layer, ev));
		}
		this.layers.push(layer);
		return layer;
	};
	GMaps.prototype.loadFromKML = function (options) {
		var layer = this.getFromKML(options);
		layer.setMap(this.map);
		return layer;
	};
	GMaps.prototype.addLayer = function (layerName, options) {
		//var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
		options = options || {};
		var layer;
		switch (layerName) {
		case 'weather':
			this.singleLayers.weather = layer = new google.maps.weather.WeatherLayer();
			break;
		case 'clouds':
			this.singleLayers.clouds = layer = new google.maps.weather.CloudLayer();
			break;
		case 'traffic':
			this.singleLayers.traffic = layer = new google.maps.TrafficLayer();
			break;
		case 'transit':
			this.singleLayers.transit = layer = new google.maps.TransitLayer();
			break;
		case 'bicycling':
			this.singleLayers.bicycling = layer = new google.maps.BicyclingLayer();
			break;
		case 'panoramio':
			this.singleLayers.panoramio = layer = new google.maps.panoramio.PanoramioLayer();
			layer.setTag(options.filter);
			delete options.filter;
			//click event
			if (options.click) {
				google.maps.event.addListener(layer, 'click', function (event) {
					options.click(event);
					delete options.click;
				});
			}
			break;
		case 'places':
			this.singleLayers.places = layer = new google.maps.places.PlacesService(this.map);
			//search, nearbySearch, radarSearch callback, Both are the same
			if (options.search || options.nearbySearch || options.radarSearch) {
				var placeSearchRequest = {
					bounds: options.bounds || null,
					keyword: options.keyword || null,
					location: options.location || null,
					name: options.name || null,
					radius: options.radius || null,
					rankBy: options.rankBy || null,
					types: options.types || null
				};
				if (options.radarSearch) {
					layer.radarSearch(placeSearchRequest, options.radarSearch);
				}
				if (options.search) {
					layer.search(placeSearchRequest, options.search);
				}
				if (options.nearbySearch) {
					layer.nearbySearch(placeSearchRequest, options.nearbySearch);
				}
			}
			//textSearch callback
			if (options.textSearch) {
				var textSearchRequest = {
					bounds: options.bounds || null,
					location: options.location || null,
					query: options.query || null,
					radius: options.radius || null
				};
				layer.textSearch(textSearchRequest, options.textSearch);
			}
			break;
		}
		if (layer !== undefined) {
			if (typeof layer.setOptions == 'function') {
				layer.setOptions(options);
			}
			if (typeof layer.setMap == 'function') {
				layer.setMap(this.map);
			}
			return layer;
		}
	};
	GMaps.prototype.removeLayer = function (layer) {
		if (typeof layer == 'string' && this.singleLayers[layer] !== undefined) {
			this.singleLayers[layer].setMap(null);
			delete this.singleLayers[layer];
		} else {
			for (var i = 0; i < this.layers.length; i++) {
				if (this.layers[i] === layer) {
					this.layers[i].setMap(null);
					this.layers.splice(i, 1);
					break;
				}
			}
		}
	};
	var travelMode, unitSystem;
	GMaps.prototype.getRoutes = function (options) {
		switch (options.travelMode) {
		case 'bicycling':
			travelMode = google.maps.TravelMode.BICYCLING;
			break;
		case 'transit':
			travelMode = google.maps.TravelMode.TRANSIT;
			break;
		case 'driving':
			travelMode = google.maps.TravelMode.DRIVING;
			break;
		default:
			travelMode = google.maps.TravelMode.WALKING;
			break;
		}
		if (options.unitSystem === 'imperial') {
			unitSystem = google.maps.UnitSystem.IMPERIAL;
		} else {
			unitSystem = google.maps.UnitSystem.METRIC;
		}
		var base_options = {
				avoidHighways: false,
				avoidTolls: false,
				optimizeWaypoints: false,
				waypoints: []
			},
			request_options = extend_object(base_options, options);
		request_options.origin = /string/.test(typeof options.origin) ? options.origin : new google.maps.LatLng(options.origin[0], options.origin[1]);
		request_options.destination = /string/.test(typeof options.destination) ? options.destination : new google.maps.LatLng(options.destination[0], options.destination[1]);
		request_options.travelMode = travelMode;
		request_options.unitSystem = unitSystem;
		delete request_options.callback;
		delete request_options.error;
		var self = this,
			routes = [],
			service = new google.maps.DirectionsService();
		service.route(request_options, function (result, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				for (var r in result.routes) {
					if (result.routes.hasOwnProperty(r)) {
						routes.push(result.routes[r]);
					}
				}
				if (options.callback) {
					options.callback(routes, result, status);
				}
			} else {
				if (options.error) {
					options.error(result, status);
				}
			}
		});
	};
	GMaps.prototype.removeRoutes = function () {
		this.routes.length = 0;
	};
	GMaps.prototype.getElevations = function (options) {
		options = extend_object({
			locations: [],
			path: false,
			samples: 256
		}, options);
		if (options.locations.length > 0) {
			if (options.locations[0].length > 0) {
				options.locations = array_flat(array_map([options.locations], arrayToLatLng, false));
			}
		}
		var callback = options.callback;
		delete options.callback;
		var service = new google.maps.ElevationService();
		//location request
		if (!options.path) {
			delete options.path;
			delete options.samples;
			service.getElevationForLocations(options, function (result, status) {
				if (callback && typeof callback === 'function') {
					callback(result, status);
				}
			}); //path request
		} else {
			var pathRequest = {
				path: options.locations,
				samples: options.samples
			};
			service.getElevationAlongPath(pathRequest, function (result, status) {
				if (callback && typeof callback === 'function') {
					callback(result, status);
				}
			});
		}
	};
	GMaps.prototype.cleanRoute = GMaps.prototype.removePolylines;
	GMaps.prototype.renderRoute = function (options, renderOptions) {
		var self = this,
			panel = typeof renderOptions.panel === 'string' ? document.getElementById(renderOptions.panel.replace('#', '')) : renderOptions.panel,
			display;
		renderOptions.panel = panel;
		renderOptions = extend_object({
			map: this.map
		}, renderOptions);
		display = new google.maps.DirectionsRenderer(renderOptions);
		this.getRoutes({
			origin: options.origin,
			destination: options.destination,
			travelMode: options.travelMode,
			waypoints: options.waypoints,
			unitSystem: options.unitSystem,
			error: options.error,
			avoidHighways: options.avoidHighways,
			avoidTolls: options.avoidTolls,
			optimizeWaypoints: options.optimizeWaypoints,
			callback: function (routes, response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					display.setDirections(response);
				}
			}
		});
	};
	GMaps.prototype.drawRoute = function (options) {
		var self = this;
		this.getRoutes({
			origin: options.origin,
			destination: options.destination,
			travelMode: options.travelMode,
			waypoints: options.waypoints,
			unitSystem: options.unitSystem,
			error: options.error,
			avoidHighways: options.avoidHighways,
			avoidTolls: options.avoidTolls,
			optimizeWaypoints: options.optimizeWaypoints,
			callback: function (routes) {
				if (routes.length > 0) {
					var polyline_options = {
						path: routes[routes.length - 1].overview_path,
						strokeColor: options.strokeColor,
						strokeOpacity: options.strokeOpacity,
						strokeWeight: options.strokeWeight
					};
					if (options.hasOwnProperty('icons')) {
						polyline_options.icons = options.icons;
					}
					self.drawPolyline(polyline_options);
					if (options.callback) {
						options.callback(routes[routes.length - 1]);
					}
				}
			}
		});
	};
	GMaps.prototype.travelRoute = function (options) {
		if (options.origin && options.destination) {
			this.getRoutes({
				origin: options.origin,
				destination: options.destination,
				travelMode: options.travelMode,
				waypoints: options.waypoints,
				unitSystem: options.unitSystem,
				error: options.error,
				callback: function (e) {
					//start callback
					if (e.length > 0 && options.start) {
						options.start(e[e.length - 1]);
					}
					//step callback
					if (e.length > 0 && options.step) {
						var route = e[e.length - 1];
						if (route.legs.length > 0) {
							var steps = route.legs[0].steps;
							for (var i = 0, step; step = steps[i]; i++) {
								step.step_number = i;
								options.step(step, route.legs[0].steps.length - 1);
							}
						}
					}
					//end callback
					if (e.length > 0 && options.end) {
						options.end(e[e.length - 1]);
					}
				}
			});
		} else if (options.route) {
			if (options.route.legs.length > 0) {
				var steps = options.route.legs[0].steps;
				for (var i = 0, step; step = steps[i]; i++) {
					step.step_number = i;
					options.step(step);
				}
			}
		}
	};
	GMaps.prototype.drawSteppedRoute = function (options) {
		var self = this;
		if (options.origin && options.destination) {
			this.getRoutes({
				origin: options.origin,
				destination: options.destination,
				travelMode: options.travelMode,
				waypoints: options.waypoints,
				error: options.error,
				callback: function (e) {
					//start callback
					if (e.length > 0 && options.start) {
						options.start(e[e.length - 1]);
					}
					//step callback
					if (e.length > 0 && options.step) {
						var route = e[e.length - 1];
						if (route.legs.length > 0) {
							var steps = route.legs[0].steps;
							for (var i = 0, step; step = steps[i]; i++) {
								step.step_number = i;
								var polyline_options = {
									path: step.path,
									strokeColor: options.strokeColor,
									strokeOpacity: options.strokeOpacity,
									strokeWeight: options.strokeWeight
								};
								if (options.hasOwnProperty('icons')) {
									polyline_options.icons = options.icons;
								}
								self.drawPolyline(polyline_options);
								options.step(step, route.legs[0].steps.length - 1);
							}
						}
					}
					//end callback
					if (e.length > 0 && options.end) {
						options.end(e[e.length - 1]);
					}
				}
			});
		} else if (options.route) {
			if (options.route.legs.length > 0) {
				var steps = options.route.legs[0].steps;
				for (var i = 0, step; step = steps[i]; i++) {
					step.step_number = i;
					var polyline_options = {
						path: step.path,
						strokeColor: options.strokeColor,
						strokeOpacity: options.strokeOpacity,
						strokeWeight: options.strokeWeight
					};
					if (options.hasOwnProperty('icons')) {
						polyline_options.icons = options.icons;
					}
					self.drawPolyline(polyline_options);
					options.step(step);
				}
			}
		}
	};
	GMaps.Route = function (options) {
		this.origin = options.origin;
		this.destination = options.destination;
		this.waypoints = options.waypoints;
		this.map = options.map;
		this.route = options.route;
		this.step_count = 0;
		this.steps = this.route.legs[0].steps;
		this.steps_length = this.steps.length;
		var polyline_options = {
			path: new google.maps.MVCArray(),
			strokeColor: options.strokeColor,
			strokeOpacity: options.strokeOpacity,
			strokeWeight: options.strokeWeight
		};
		if (options.hasOwnProperty('icons')) {
			polyline_options.icons = options.icons;
		}
		this.polyline = this.map.drawPolyline(polyline_options).getPath();
	};
	GMaps.Route.prototype.getRoute = function (options) {
		var self = this;
		this.map.getRoutes({
			origin: this.origin,
			destination: this.destination,
			travelMode: options.travelMode,
			waypoints: this.waypoints || [],
			error: options.error,
			callback: function () {
				self.route = e[0];
				if (options.callback) {
					options.callback.call(self);
				}
			}
		});
	};
	GMaps.Route.prototype.back = function () {
		if (this.step_count > 0) {
			this.step_count--;
			var path = this.route.legs[0].steps[this.step_count].path;
			for (var p in path) {
				if (path.hasOwnProperty(p)) {
					this.polyline.pop();
				}
			}
		}
	};
	GMaps.Route.prototype.forward = function () {
		if (this.step_count < this.steps_length) {
			var path = this.route.legs[0].steps[this.step_count].path;
			for (var p in path) {
				if (path.hasOwnProperty(p)) {
					this.polyline.push(path[p]);
				}
			}
			this.step_count++;
		}
	};
	GMaps.prototype.checkGeofence = function (lat, lng, fence) {
		return fence.containsLatLng(new google.maps.LatLng(lat, lng));
	};
	GMaps.prototype.checkMarkerGeofence = function (marker, outside_callback) {
		if (marker.fences) {
			for (var i = 0, fence; fence = marker.fences[i]; i++) {
				var pos = marker.getPosition();
				if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
					outside_callback(marker, fence);
				}
			}
		}
	};
	GMaps.prototype.toImage = function (options) {
		var options = options || {},
			static_map_options = {};
		static_map_options.size = options.size || [
			this.el.clientWidth,
			this.el.clientHeight
		];
		static_map_options.lat = this.getCenter().lat();
		static_map_options.lng = this.getCenter().lng();
		if (this.markers.length > 0) {
			static_map_options.markers = [];
			for (var i = 0; i < this.markers.length; i++) {
				static_map_options.markers.push({
					lat: this.markers[i].getPosition().lat(),
					lng: this.markers[i].getPosition().lng()
				});
			}
		}
		if (this.polylines.length > 0) {
			var polyline = this.polylines[0];
			static_map_options.polyline = {};
			static_map_options.polyline.path = google.maps.geometry.encoding.encodePath(polyline.getPath());
			static_map_options.polyline.strokeColor = polyline.strokeColor;
			static_map_options.polyline.strokeOpacity = polyline.strokeOpacity;
			static_map_options.polyline.strokeWeight = polyline.strokeWeight;
		}
		return GMaps.staticMapURL(static_map_options);
	};
	GMaps.staticMapURL = function (options) {
		var parameters = [],
			data, static_root = (location.protocol === 'file:' ? 'http:' : location.protocol) + '//maps.googleapis.com/maps/api/staticmap';
		if (options.url) {
			static_root = options.url;
			delete options.url;
		}
		static_root += '?';
		var markers = options.markers;
		delete options.markers;
		if (!markers && options.marker) {
			markers = [options.marker];
			delete options.marker;
		}
		var styles = options.styles;
		delete options.styles;
		var polyline = options.polyline;
		delete options.polyline;
		/** Map options **/
		if (options.center) {
			parameters.push('center=' + options.center);
			delete options.center;
		} else if (options.address) {
			parameters.push('center=' + options.address);
			delete options.address;
		} else if (options.lat) {
			parameters.push([
				'center=',
				options.lat,
				',',
				options.lng
			].join(''));
			delete options.lat;
			delete options.lng;
		} else if (options.visible) {
			var visible = encodeURI(options.visible.join('|'));
			parameters.push('visible=' + visible);
		}
		var size = options.size;
		if (size) {
			if (size.join) {
				size = size.join('x');
			}
			delete options.size;
		} else {
			size = '630x300';
		}
		parameters.push('size=' + size);
		if (!options.zoom && options.zoom !== false) {
			options.zoom = 15;
		}
		var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
		delete options.sensor;
		parameters.push('sensor=' + sensor);
		for (var param in options) {
			if (options.hasOwnProperty(param)) {
				parameters.push(param + '=' + options[param]);
			}
		}
		/** Markers **/
		if (markers) {
			var marker, loc;
			for (var i = 0; data = markers[i]; i++) {
				marker = [];
				if (data.size && data.size !== 'normal') {
					marker.push('size:' + data.size);
					delete data.size;
				} else if (data.icon) {
					marker.push('icon:' + encodeURI(data.icon));
					delete data.icon;
				}
				if (data.color) {
					marker.push('color:' + data.color.replace('#', '0x'));
					delete data.color;
				}
				if (data.label) {
					marker.push('label:' + data.label[0].toUpperCase());
					delete data.label;
				}
				loc = data.address ? data.address : data.lat + ',' + data.lng;
				delete data.address;
				delete data.lat;
				delete data.lng;
				for (var param in data) {
					if (data.hasOwnProperty(param)) {
						marker.push(param + ':' + data[param]);
					}
				}
				if (marker.length || i === 0) {
					marker.push(loc);
					marker = marker.join('|');
					parameters.push('markers=' + encodeURI(marker));
				} // New marker without styles
				else {
					marker = parameters.pop() + encodeURI('|' + loc);
					parameters.push(marker);
				}
			}
		}
		/** Map Styles **/
		if (styles) {
			for (var i = 0; i < styles.length; i++) {
				var styleRule = [];
				if (styles[i].featureType) {
					styleRule.push('feature:' + styles[i].featureType.toLowerCase());
				}
				if (styles[i].elementType) {
					styleRule.push('element:' + styles[i].elementType.toLowerCase());
				}
				for (var j = 0; j < styles[i].stylers.length; j++) {
					for (var p in styles[i].stylers[j]) {
						var ruleArg = styles[i].stylers[j][p];
						if (p == 'hue' || p == 'color') {
							ruleArg = '0x' + ruleArg.substring(1);
						}
						styleRule.push(p + ':' + ruleArg);
					}
				}
				var rule = styleRule.join('|');
				if (rule != '') {
					parameters.push('style=' + rule);
				}
			}
		}
		/** Polylines **/
		function parseColor(color, opacity) {
			if (color[0] === '#') {
				color = color.replace('#', '0x');
				if (opacity) {
					opacity = parseFloat(opacity);
					opacity = Math.min(1, Math.max(opacity, 0));
					if (opacity === 0) {
						return '0x00000000';
					}
					opacity = (opacity * 255).toString(16);
					if (opacity.length === 1) {
						opacity += opacity;
					}
					color = color.slice(0, 8) + opacity;
				}
			}
			return color;
		}
		if (polyline) {
			data = polyline;
			polyline = [];
			if (data.strokeWeight) {
				polyline.push('weight:' + parseInt(data.strokeWeight, 10));
			}
			if (data.strokeColor) {
				var color = parseColor(data.strokeColor, data.strokeOpacity);
				polyline.push('color:' + color);
			}
			if (data.fillColor) {
				var fillcolor = parseColor(data.fillColor, data.fillOpacity);
				polyline.push('fillcolor:' + fillcolor);
			}
			var path = data.path;
			if (path.join) {
				for (var j = 0, pos; pos = path[j]; j++) {
					polyline.push(pos.join(','));
				}
			} else {
				polyline.push('enc:' + path);
			}
			polyline = polyline.join('|');
			parameters.push('path=' + encodeURI(polyline));
		}
		/** Retina support **/
		var dpi = window.devicePixelRatio || 1;
		parameters.push('scale=' + dpi);
		parameters = parameters.join('&');
		return static_root + parameters;
	};
	GMaps.prototype.addMapType = function (mapTypeId, options) {
		if (options.hasOwnProperty('getTileUrl') && typeof options.getTileUrl == 'function') {
			options.tileSize = options.tileSize || new google.maps.Size(256, 256);
			var mapType = new google.maps.ImageMapType(options);
			this.map.mapTypes.set(mapTypeId, mapType);
		} else {
			throw '\'getTileUrl\' function required.';
		}
	};
	GMaps.prototype.addOverlayMapType = function (options) {
		if (options.hasOwnProperty('getTile') && typeof options.getTile == 'function') {
			var overlayMapTypeIndex = options.index;
			delete options.index;
			this.map.overlayMapTypes.insertAt(overlayMapTypeIndex, options);
		} else {
			throw '\'getTile\' function required.';
		}
	};
	GMaps.prototype.removeOverlayMapType = function (overlayMapTypeIndex) {
		this.map.overlayMapTypes.removeAt(overlayMapTypeIndex);
	};
	GMaps.prototype.addStyle = function (options) {
		var styledMapType = new google.maps.StyledMapType(options.styles, {
			name: options.styledMapName
		});
		this.map.mapTypes.set(options.mapTypeId, styledMapType);
	};
	GMaps.prototype.setStyle = function (mapTypeId) {
		this.map.setMapTypeId(mapTypeId);
	};
	GMaps.prototype.createPanorama = function (streetview_options) {
		if (!streetview_options.hasOwnProperty('lat') || !streetview_options.hasOwnProperty('lng')) {
			streetview_options.lat = this.getCenter().lat();
			streetview_options.lng = this.getCenter().lng();
		}
		this.panorama = GMaps.createPanorama(streetview_options);
		this.map.setStreetView(this.panorama);
		return this.panorama;
	};
	GMaps.createPanorama = function (options) {
		var el = getElementById(options.el, options.context);
		options.position = new google.maps.LatLng(options.lat, options.lng);
		delete options.el;
		delete options.context;
		delete options.lat;
		delete options.lng;
		var streetview_events = [
				'closeclick',
				'links_changed',
				'pano_changed',
				'position_changed',
				'pov_changed',
				'resize',
				'visible_changed'
			],
			streetview_options = extend_object({
				visible: true
			}, options);
		for (var i = 0; i < streetview_events.length; i++) {
			delete streetview_options[streetview_events[i]];
		}
		var panorama = new google.maps.StreetViewPanorama(el, streetview_options);
		for (var i = 0; i < streetview_events.length; i++) {
			(function (object, name) {
				if (options[name]) {
					google.maps.event.addListener(object, name, function () {
						options[name].apply(this);
					});
				}
			}(panorama, streetview_events[i]));
		}
		return panorama;
	};
	GMaps.prototype.on = function (event_name, handler) {
		return GMaps.on(event_name, this, handler);
	};
	GMaps.prototype.off = function (event_name) {
		GMaps.off(event_name, this);
	};
	GMaps.prototype.once = function (event_name, handler) {
		return GMaps.once(event_name, this, handler);
	};
	GMaps.custom_events = [
		'marker_added',
		'marker_removed',
		'polyline_added',
		'polyline_removed',
		'polygon_added',
		'polygon_removed',
		'geolocated',
		'geolocation_failed'
	];
	GMaps.on = function (event_name, object, handler) {
		if (GMaps.custom_events.indexOf(event_name) == -1) {
			if (object instanceof GMaps)
				object = object.map;
			return google.maps.event.addListener(object, event_name, handler);
		} else {
			var registered_event = {
				handler: handler,
				eventName: event_name
			};
			object.registered_events[event_name] = object.registered_events[event_name] || [];
			object.registered_events[event_name].push(registered_event);
			return registered_event;
		}
	};
	GMaps.off = function (event_name, object) {
		if (GMaps.custom_events.indexOf(event_name) == -1) {
			if (object instanceof GMaps)
				object = object.map;
			google.maps.event.clearListeners(object, event_name);
		} else {
			object.registered_events[event_name] = [];
		}
	};
	GMaps.once = function (event_name, object, handler) {
		if (GMaps.custom_events.indexOf(event_name) == -1) {
			if (object instanceof GMaps)
				object = object.map;
			return google.maps.event.addListenerOnce(object, event_name, handler);
		}
	};
	GMaps.fire = function (event_name, object, scope) {
		if (GMaps.custom_events.indexOf(event_name) == -1) {
			google.maps.event.trigger(object, event_name, Array.prototype.slice.apply(arguments).slice(2));
		} else {
			if (event_name in scope.registered_events) {
				var firing_events = scope.registered_events[event_name];
				for (var i = 0; i < firing_events.length; i++) {
					(function (handler, scope, object) {
						handler.apply(scope, [object]);
					}(firing_events[i].handler, scope, object));
				}
			}
		}
	};
	GMaps.geolocate = function (options) {
		var complete_callback = options.always || options.complete;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				options.success(position);
				if (complete_callback) {
					complete_callback();
				}
			}, function (error) {
				options.error(error);
				if (complete_callback) {
					complete_callback();
				}
			}, options.options);
		} else {
			options.not_supported();
			if (complete_callback) {
				complete_callback();
			}
		}
	};
	GMaps.geocode = function (options) {
		this.geocoder = new google.maps.Geocoder();
		var callback = options.callback;
		if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) {
			options.latLng = new google.maps.LatLng(options.lat, options.lng);
		}
		delete options.lat;
		delete options.lng;
		delete options.callback;
		this.geocoder.geocode(options, function (results, status) {
			callback(results, status);
		});
	};
	if (typeof window.google === 'object' && window.google.maps) {
		//==========================
		// Polygon containsLatLng
		// https://github.com/tparkin/Google-Maps-Point-in-Polygon
		// Poygon getBounds extension - google-maps-extensions
		// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
		if (!google.maps.Polygon.prototype.getBounds) {
			google.maps.Polygon.prototype.getBounds = function (latLng) {
				var bounds = new google.maps.LatLngBounds();
				var paths = this.getPaths();
				var path;
				for (var p = 0; p < paths.getLength(); p++) {
					path = paths.getAt(p);
					for (var i = 0; i < path.getLength(); i++) {
						bounds.extend(path.getAt(i));
					}
				}
				return bounds;
			};
		}
		if (!google.maps.Polygon.prototype.containsLatLng) {
			// Polygon containsLatLng - method to determine if a latLng is within a polygon
			google.maps.Polygon.prototype.containsLatLng = function (latLng) {
				// Exclude points outside of bounds as there is no way they are in the poly
				var bounds = this.getBounds();
				if (bounds !== null && !bounds.contains(latLng)) {
					return false;
				}
				// Raycast point in polygon method
				var inPoly = false;
				var numPaths = this.getPaths().getLength();
				for (var p = 0; p < numPaths; p++) {
					var path = this.getPaths().getAt(p);
					var numPoints = path.getLength();
					var j = numPoints - 1;
					for (var i = 0; i < numPoints; i++) {
						var vertex1 = path.getAt(i);
						var vertex2 = path.getAt(j);
						if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
							if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
								inPoly = !inPoly;
							}
						}
						j = i;
					}
				}
				return inPoly;
			};
		}
		if (!google.maps.Circle.prototype.containsLatLng) {
			google.maps.Circle.prototype.containsLatLng = function (latLng) {
				if (google.maps.geometry) {
					return google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
				} else {
					return true;
				}
			};
		}
		google.maps.Rectangle.prototype.containsLatLng = function (latLng) {
			return this.getBounds().contains(latLng);
		};
		google.maps.LatLngBounds.prototype.containsLatLng = function (latLng) {
			return this.contains(latLng);
		};
		google.maps.Marker.prototype.setFences = function (fences) {
			this.fences = fences;
		};
		google.maps.Marker.prototype.addFence = function (fence) {
			this.fences.push(fence);
		};
		google.maps.Marker.prototype.getId = function () {
			return this.__gm_id;
		};
	}
	//==========================
	// Array indexOf
	// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement) {
			'use strict';
			if (this == null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) {
					// shortcut for verifying if it's NaN
					n = 0;
				} else if (n != 0 && n != Infinity && n != -Infinity) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		};
	}
	return GMaps;
}));


/* ========================================
@preserve
05. Section slider MIT License
======================================== */

jQuery(document).ready(function ($) {
	var sliderContainers = $('.half-screen-slider');

	if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

	function initBlockSlider(sliderContainers) {
		sliderContainers.each(function () {
			var sliderContainer = $(this),
				slides = sliderContainer.children('.half-screen-slider__list').children('li'),
				sliderPagination = createSliderPagination(sliderContainer);

			sliderPagination.on('click', function (event) {
				event.preventDefault();
				var selected = $(this),
					index = selected.index();
				updateSlider(index, sliderPagination, slides);
			});

			sliderContainer.on('swipeleft', function () {
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if (!visibleSlide.is(':last-child') && bool) {
					updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
				}
			});

			sliderContainer.on('swiperight', function () {
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if (!visibleSlide.is(':first-child') && bool) {
					updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
				}
			});
		});
	}

	function createSliderPagination(container) {
		var wrapper = $('<ol class="half-screen-slider__nav"></ol>');
		container.children('.half-screen-slider__list').find('li').each(function (index) {
			var dotWrapper = (index === 0) ? $('<li class="half-screen-slider__nav-item selected"></li>') : $('<li class="half-screen-slider__nav-item"></li>'),
				dot = $('<a class="half-screen-slider__nav-link" href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			var dotText = (index + 1 < 10) ? '0' + (index + 1) : index + 1;
			dot.text(dotText);
		});
		wrapper.appendTo(container);
		return wrapper.children('li');
	}

	function updateSlider(n, navigation, slides) {
		navigation.removeClass('selected').eq(n).addClass('selected');
		slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

		//fixes a bug on Firefox with ul.half-screen-slider__navigation z-index
		navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
			$(this).removeClass('slider-animating');
		});
	}

	function enableSwipe(container) {
		return (container.parents('.touch').length > 0);
	}
});


/* ========================================
@preserve
08. Prism Syntax
MIT License
======================================== */

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+php+scss */
var _self = (typeof window !== 'undefined') ?
	window // if in browser
	:
	(
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ?
		self // if in worker
		:
		{} // if in node js
	);

	/**
	* Prism: Lightweight, robust, elegant syntax highlighting
	* MIT license http://www.opensource.org/licenses/mit-license.php/
	* @author Lea Verou http://lea.verou.me
	*/

var Prism = (function () {

	// Private helper vars
	var lang = /\blang(?:uage)?-(\w+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		util: {
			encode: function (tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function (o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', {
						value: ++uniqueId
					});
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function (o) {
				var type = _.util.type(o);

				switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function (v) {
						return _.util.clone(v);
					});
				}

				return o;
			}
		},

		languages: {
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
				* Insert a token before another token in a language literal
				* As this needs to recreate the object (we cannot actually insert before keys in object literals),
				* we cannot just provide an object, we need anobject and a key.
				* @param inside The key (or language id) of the parent
				* @param before The key to insert before. If not provided, the function appends instead.
				* @param insert Object with the key/value pairs to insert
				* @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
				*/
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function (o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function (async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || document.querySelectorAll(env.selector);

			for (var i = 0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function (element, async, callback) {
			// Find language
			var language, grammar, parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [, ''])[1];
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			if (!code || !grammar) {
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function (text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},

		tokenize: function (text, grammar, language) {
			var Token = _.Token;

			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			tokenloop: for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
						inside = pattern.inside,
						lookbehind = !!pattern.lookbehind,
						greedy = !!pattern.greedy,
						lookbehindLength = 0,
						alias = pattern.alias;

					pattern = pattern.pattern || pattern;

					for (var i = 0; i < strarr.length; i++) { // Don’t cache length as it changes during the loop

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							break tokenloop;
						}

						if (str instanceof Token) {
							continue;
						}

						pattern.lastIndex = 0;

						var match = pattern.exec(str),
							delNum = 1;

						// Greedy patterns can override/remove up to two previously matched tokens
						if (!match && greedy && i != strarr.length - 1) {
							// Reconstruct the original text using the next two tokens
							var nextToken = strarr[i + 1].matchedStr || strarr[i + 1],
								combStr = str + nextToken;

							if (i < strarr.length - 2) {
								combStr += strarr[i + 2].matchedStr || strarr[i + 2];
							}

							// Try the pattern again on the reconstructed text
							pattern.lastIndex = 0;
							match = pattern.exec(combStr);
							if (!match) {
								continue;
							}

							var from = match.index + (lookbehind ? match[1].length : 0);
							// To be a valid candidate, the new match has to start inside of str
							if (from >= str.length) {
								continue;
							}
							var to = match.index + match[0].length,
								len = str.length + nextToken.length;

							// Number of tokens to delete and replace with the new match
							delNum = 3;

							if (to <= len) {
								if (strarr[i + 1].greedy) {
									continue;
								}
								delNum = 2;
								combStr = combStr.slice(0, len);
							}
							str = combStr;
						}

						if (!match) {
							continue;
						}

						if (lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index + lookbehindLength,
							match = match[0].slice(lookbehindLength),
							to = from + match.length,
							before = str.slice(0, from),
							after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}

			return strarr;
		},

		hooks: {
			all: {},

			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.matchedStr = matchedStr || null;
		this.greedy = !!greedy;
	};

	Token.stringify = function (o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function (element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = '';

		for (var name in env.attributes) {
			attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (document.addEventListener && !script.hasAttribute('data-manual')) {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}

	return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}
Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
				// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}
Prism.languages.clike = {
	'comment': [{
		pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
		lookbehind: true
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: true
	}],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'class-name', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;
/**
	* Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
	* Modified by Miles Johnson: http://milesj.me
	*
	* Supports the following:
	* 		- Extends clike syntax
	* 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
	* 		- Smarter constant and function matching
	*
	* Adds the following new token classes:
	* 		constant, delimiter, variable, function, package
	*/

Prism.languages.php = Prism.languages.extend('clike', {
	'keyword': /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
	'constant': /\b[A-Z0-9_]{2,}\b/,
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
		lookbehind: true
	}
});

// Shell-like comments are matched after strings, because they are less
// common than strings containing hashes...
Prism.languages.insertBefore('php', 'class-name', {
	'shell-comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		alias: 'comment'
	}
});

Prism.languages.insertBefore('php', 'keyword', {
	'delimiter': /\?>|<\?(?:php)?/i,
	'variable': /\$\w+\b/i,
	'package': {
		pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
		lookbehind: true,
		inside: {
			punctuation: /\\/
		}
	}
});

// Must be defined after the function pattern
Prism.languages.insertBefore('php', 'operator', {
	'property': {
		pattern: /(->)[\w]+/,
		lookbehind: true
	}
});

// Add HTML support of the markup language exists
if (Prism.languages.markup) {

	// Tokenize all inline PHP blocks that are wrapped in <?php ?>
	// This allows for easy PHP + markup highlighting
	Prism.hooks.add('before-highlight', function (env) {
		if (env.language !== 'php') {
			return;
		}

		env.tokenStack = [];

		env.backupCode = env.code;
		env.code = env.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/ig, function (match) {
			env.tokenStack.push(match);

			return '{{{PHP' + env.tokenStack.length + '}}}';
		});
	});

	// Restore env.code for other plugins (e.g. line-numbers)
	Prism.hooks.add('before-insert', function (env) {
		if (env.language === 'php') {
			env.code = env.backupCode;
			delete env.backupCode;
		}
	});

	// Re-insert the tokens after highlighting
	Prism.hooks.add('after-highlight', function (env) {
		if (env.language !== 'php') {
			return;
		}

		for (var i = 0, t; t = env.tokenStack[i]; i++) {
			// The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
			env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$'));
		}

		env.element.innerHTML = env.highlightedCode;
	});

	// Wrap tokens in classes that are missing them
	Prism.hooks.add('wrap', function (env) {
		if (env.language === 'php' && env.type === 'markup') {
			env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, "<span class=\"token php\">$1</span>");
		}
	});

	// Add the rules before all others
	Prism.languages.insertBefore('php', 'comment', {
		'markup': {
			pattern: /<[^?]\/?(.*?)>/,
			inside: Prism.languages.markup
		},
		'php': /\{\{\{PHP[0-9]+\}\}\}/
	});
}
Prism.languages.scss = Prism.languages.extend('css', {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
		lookbehind: true
	},
	'atrule': {
		pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
		inside: {
			'rule': /@[\w-]+/
				// See rest below
		}
	},
	// url, compassified
	'url': /(?:[-a-z]+-)*url(?=\()/i,
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)
	'selector': {
		// Initial look-ahead is used to prevent matching of blank selectors
		pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
		inside: {
			'placeholder': /%[-_\w]+/
		}
	}
});

Prism.languages.insertBefore('scss', 'atrule', {
	'keyword': [
		/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
			pattern: /( +)(?:from|through)(?= )/,
			lookbehind: true
		}
	]
});

Prism.languages.insertBefore('scss', 'property', {
	// var and interpolated vars
	'variable': /\$[-_\w]+|#\{\$[-_\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
	'placeholder': {
		pattern: /%[-_\w]+/,
		alias: 'selector'
	},
	'statement': /\B!(?:default|optional)\b/i,
	'boolean': /\b(?:true|false)\b/,
	'null': /\bnull\b/,
	'operator': {
		pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
		lookbehind: true
	}
});

Prism.languages.scss['atrule'].inside.rest = Prism.util.clone(Prism.languages.scss);


/* ========================================
12. jQuery Smooth Scroll - v1.7.2 - 2016-01-23
https://github.com/kswedberg/jquery-smooth-scroll
Copyright (c) 2016 Karl Swedberg
Licensed MIT
@preserve
======================================== */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var version = '1.7.2';
	var optionOverrides = {};
	var defaults = {
		exclude: [],
		excludeWithin: [],
		offset: 0,

		// one of 'top' or 'left'
		direction: 'top',

		// if set, bind click events through delegation
		//  supported since jQuery 1.4.2
		delegateSelector: null,

		// jQuery set of elements you wish to scroll (for $.smoothScroll).
		//  if null (default), $('html, body').firstScrollable() is used.
		scrollElement: null,

		// only use if you want to override default behavior
		scrollTarget: null,

		// fn(opts) function to be called before scrolling occurs.
		// `this` is the element(s) being scrolled
		beforeScroll: function () {},

		// fn(opts) function to be called after scrolling occurs.
		// `this` is the triggering element
		afterScroll: function () {},
		easing: 'swing',
		speed: 400,

		// coefficient for "auto" speed
		autoCoefficient: 2,

		// $.fn.smoothScroll only: whether to prevent the default click action
		preventDefault: true
	};

	var getScrollable = function (opts) {
		var scrollable = [];
		var scrolled = false;
		var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

		this.each(function () {
			var el = $(this);

			if (this === document || this === window) {
				return;
			}

			if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
				scrollable.push(document.scrollingElement);

				return false;
			}

			if (el[dir]() > 0) {
				scrollable.push(this);
			} else {
				// if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
				el[dir](1);
				scrolled = el[dir]() > 0;

				if (scrolled) {
					scrollable.push(this);
				}
				// then put it back, of course
				el[dir](0);
			}
		});

		if (!scrollable.length) {
			this.each(function () {
				// If no scrollable elements and <html> has scroll-behavior:smooth because
				// "When this property is specified on the root element, it applies to the viewport instead."
				// and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
				// → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
				if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
					scrollable = [this];
				}

				// If still no scrollable elements, fall back to <body>,
				// if it's in the jQuery collection
				// (doing this because Safari sets scrollTop async,
				// so can't set it to 1 and immediately get the value.)
				if (!scrollable.length && this.nodeName === 'BODY') {
					scrollable = [this];
				}
			});
		}

		// Use the first scrollable element if we're calling firstScrollable()
		if (opts.el === 'first' && scrollable.length > 1) {
			scrollable = [scrollable[0]];
		}

		return scrollable;
	};

	$.fn.extend({
		scrollable: function (dir) {
			var scrl = getScrollable.call(this, {
				dir: dir
			});

			return this.pushStack(scrl);
		},
		firstScrollable: function (dir) {
			var scrl = getScrollable.call(this, {
				el: 'first',
				dir: dir
			});

			return this.pushStack(scrl);
		},

		smoothScroll: function (options, extra) {
			options = options || {};

			if (options === 'options') {
				if (!extra) {
					return this.first().data('ssOpts');
				}

				return this.each(function () {
					var $this = $(this);
					var opts = $.extend($this.data('ssOpts') || {}, extra);

					$(this).data('ssOpts', opts);
				});
			}

			var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

			var clickHandler = function (event) {
				var escapeSelector = function (str) {
					return str.replace(/(:|\.|\/)/g, '\\$1');
				};

				var link = this;
				var $link = $(this);
				var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
				var exclude = opts.exclude;
				var excludeWithin = thisOpts.excludeWithin;
				var elCounter = 0;
				var ewlCounter = 0;
				var include = true;
				var clickOpts = {};
				var locationPath = $.smoothScroll.filterPath(location.pathname);
				var linkPath = $.smoothScroll.filterPath(link.pathname);
				var hostMatch = location.hostname === link.hostname || !link.hostname;
				var pathMatch = thisOpts.scrollTarget || (linkPath === locationPath);
				var thisHash = escapeSelector(link.hash);

				if (thisHash && !$(thisHash).length) {
					include = false;
				}

				if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
					include = false;
				} else {
					while (include && elCounter < exclude.length) {
						if ($link.is(escapeSelector(exclude[elCounter++]))) {
							include = false;
						}
					}

					while (include && ewlCounter < excludeWithin.length) {
						if ($link.closest(excludeWithin[ewlCounter++]).length) {
							include = false;
						}
					}
				}

				if (include) {
					if (thisOpts.preventDefault) {
						event.preventDefault();
					}

					$.extend(clickOpts, thisOpts, {
						scrollTarget: thisOpts.scrollTarget || thisHash,
						link: link
					});

					$.smoothScroll(clickOpts);
				}
			};

			if (options.delegateSelector !== null) {
				this
					.undelegate(options.delegateSelector, 'click.smoothscroll')
					.delegate(options.delegateSelector, 'click.smoothscroll', clickHandler);
			} else {
				this
					.unbind('click.smoothscroll')
					.bind('click.smoothscroll', clickHandler);
			}

			return this;
		}
	});

	$.smoothScroll = function (options, px) {
		if (options === 'options' && typeof px === 'object') {
			return $.extend(optionOverrides, px);
		}
		var opts, $scroller, scrollTargetOffset, speed, delta;
		var scrollerOffset = 0;
		var offPos = 'offset';
		var scrollDir = 'scrollTop';
		var aniProps = {};
		var aniOpts = {};

		if (typeof options === 'number') {
			opts = $.extend({
				link: null
			}, $.fn.smoothScroll.defaults, optionOverrides);
			scrollTargetOffset = options;
		} else {
			opts = $.extend({
				link: null
			}, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

			if (opts.scrollElement) {
				offPos = 'position';

				if (opts.scrollElement.css('position') === 'static') {
					opts.scrollElement.css('position', 'relative');
				}
			}
		}

		scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

		if (opts.scrollElement) {
			$scroller = opts.scrollElement;

			if (!(/^(?:HTML|BODY)$/).test($scroller[0].nodeName)) {
				scrollerOffset = $scroller[scrollDir]();
			}
		} else {
			$scroller = $('html, body').firstScrollable(opts.direction);
		}

		// beforeScroll callback function must fire before calculating offset
		opts.beforeScroll.call($scroller, opts);

		scrollTargetOffset = (typeof options === 'number') ? options :
			px ||
			($(opts.scrollTarget)[offPos]() &&
				$(opts.scrollTarget)[offPos]()[opts.direction]) ||
			0;

		aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
		speed = opts.speed;

		// automatically calculate the speed of the scroll based on distance / coefficient
		if (speed === 'auto') {

			// $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
			// When delta is greater, speed will be greater.
			delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

			// Divide the delta by the coefficient
			speed = delta / opts.autoCoefficient;
		}

		aniOpts = {
			duration: speed,
			easing: opts.easing,
			complete: function () {
				opts.afterScroll.call(opts.link, opts);
			}
		};

		if (opts.step) {
			aniOpts.step = opts.step;
		}

		if ($scroller.length) {
			$scroller.stop().animate(aniProps, aniOpts);
		} else {
			opts.afterScroll.call(opts.link, opts);
		}
	};

	$.smoothScroll.version = version;
	$.smoothScroll.filterPath = function (string) {
		string = string || '';

		return string
			.replace(/^\//, '')
			.replace(/(?:index|default).[a-zA-Z]{3,4}$/, '')
			.replace(/\/$/, '');
	};

	// default options
	$.fn.smoothScroll.defaults = defaults;

}));


/* ========================================
@preserve
06. jQuery Cycle2; version: 2.1.6 build: 20141007
http://jquery.malsup.com/cycle2/
Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
======================================== */
/* Cycle2 core engine */
(function($) {
	'use strict';
	var version = '2.1.6';
	$.fn.cycle = function(options) {
		// fix mistakes with the ready state
		var o;
		if (this.length === 0 && !$.isReady) {
			o = {
				s: this.selector,
				c: this.context
			};
			$.fn.cycle.log('requeuing slideshow (dom not ready)');
			$(function() {
				$(o.s, o.c).cycle(options);
			});
			return this;
		}
		return this.each(function() {
			var data, opts, shortName, val;
			var container = $(this);
			var log = $.fn.cycle.log;
			if (container.data('cycle.opts'))
				return;
			// already initialized
			if (container.data('cycle-log') === false || options && options.log === false || opts && opts.log === false) {
				log = $.noop;
			}
			log('--c2 init--');
			data = container.data();
			for (var p in data) {
				// allow props to be accessed sans 'cycle' prefix and log the overrides
				if (data.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p)) {
					val = data[p];
					shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
					log(shortName + ':', val, '(' + typeof val + ')');
					data[shortName] = val;
				}
			}
			opts = $.extend({}, $.fn.cycle.defaults, data, options || {});
			opts.timeoutId = 0;
			opts.paused = opts.paused || false;
			// #57
			opts.container = container;
			opts._maxZ = opts.maxZ;
			opts.API = $.extend({
				_container: container
			}, $.fn.cycle.API);
			opts.API.log = log;
			opts.API.trigger = function(eventName, args) {
				opts.container.trigger(eventName, args);
				return opts.API;
			};
			container.data('cycle.opts', opts);
			container.data('cycle.API', opts.API);
			// opportunity for plugins to modify opts and API
			opts.API.trigger('cycle-bootstrap', [
				opts,
				opts.API
			]);
			opts.API.addInitialSlides();
			opts.API.preInitSlideshow();
			if (opts.slides.length)
				opts.API.initSlideshow();
		});
	};
	$.fn.cycle.API = {
		opts: function() {
			return this._container.data('cycle.opts');
		},
		addInitialSlides: function() {
			var opts = this.opts();
			var slides = opts.slides;
			opts.slideCount = 0;
			opts.slides = $();
			// empty set
			// add slides that already exist
			slides = slides.jquery ? slides : opts.container.find(slides);
			if (opts.random) {
				slides.sort(function() {
					return Math.random() - 0.5;
				});
			}
			opts.API.add(slides);
		},
		preInitSlideshow: function() {
			var opts = this.opts();
			opts.API.trigger('cycle-pre-initialize', [opts]);
			var tx = $.fn.cycle.transitions[opts.fx];
			if (tx && $.isFunction(tx.preInit))
				tx.preInit(opts);
			opts._preInitialized = true;
		},
		postInitSlideshow: function() {
			var opts = this.opts();
			opts.API.trigger('cycle-post-initialize', [opts]);
			var tx = $.fn.cycle.transitions[opts.fx];
			if (tx && $.isFunction(tx.postInit))
				tx.postInit(opts);
		},
		initSlideshow: function() {
			var opts = this.opts();
			var pauseObj = opts.container;
			var slideOpts;
			opts.API.calcFirstSlide();
			if (opts.container.css('position') == 'static')
				opts.container.css('position', 'relative');
			$(opts.slides[opts.currSlide]).css({
				opacity: 1,
				display: 'block',
				visibility: 'visible'
			});
			opts.API.stackSlides(opts.slides[opts.currSlide], opts.slides[opts.nextSlide], !opts.reverse);
			if (opts.pauseOnHover) {
				// allow pauseOnHover to specify an element
				if (opts.pauseOnHover !== true)
					pauseObj = $(opts.pauseOnHover);
				pauseObj.on('hover', function() {
					opts.API.pause(true);
				}, function() {
					opts.API.resume(true);
				});
			}
			// stage initial transition
			if (opts.timeout) {
				slideOpts = opts.API.getSlideOpts(opts.currSlide);
				opts.API.queueTransition(slideOpts, slideOpts.timeout + opts.delay);
			}
			opts._initialized = true;
			opts.API.updateView(true);
			opts.API.trigger('cycle-initialized', [opts]);
			opts.API.postInitSlideshow();
		},
		pause: function(hover) {
			var opts = this.opts(),
				slideOpts = opts.API.getSlideOpts(),
				alreadyPaused = opts.hoverPaused || opts.paused;
			if (hover)
				opts.hoverPaused = true;
			else
				opts.paused = true;
			if (!alreadyPaused) {
				opts.container.addClass('cycle-paused');
				opts.API.trigger('cycle-paused', [opts]).log('cycle-paused');
				if (slideOpts.timeout) {
					clearTimeout(opts.timeoutId);
					opts.timeoutId = 0;
					// determine how much time is left for the current slide
					opts._remainingTimeout -= $.now() - opts._lastQueue;
					if (opts._remainingTimeout < 0 || isNaN(opts._remainingTimeout))
						opts._remainingTimeout = undefined;
				}
			}
		},
		resume: function(hover) {
			var opts = this.opts(),
				alreadyResumed = !opts.hoverPaused && !opts.paused,
				remaining;
			if (hover)
				opts.hoverPaused = false;
			else
				opts.paused = false;
			if (!alreadyResumed) {
				opts.container.removeClass('cycle-paused');
				// #gh-230; if an animation is in progress then don't queue a new transition; it will
				// happen naturally
				if (opts.slides.filter(':animated').length === 0)
					opts.API.queueTransition(opts.API.getSlideOpts(), opts._remainingTimeout);
				opts.API.trigger('cycle-resumed', [
					opts,
					opts._remainingTimeout
				]).log('cycle-resumed');
			}
		},
		add: function(slides, prepend) {
			var opts = this.opts();
			var oldSlideCount = opts.slideCount;
			var startSlideshow = false;
			var len;
			if ($.type(slides) == 'string')
				slides = $.trim(slides);
			$(slides).each(function(i) {
				var slideOpts;
				var slide = $(this);
				if (prepend)
					opts.container.prepend(slide);
				else
					opts.container.append(slide);
				opts.slideCount++;
				slideOpts = opts.API.buildSlideOpts(slide);
				if (prepend)
					opts.slides = $(slide).add(opts.slides);
				else
					opts.slides = opts.slides.add(slide);
				opts.API.initSlide(slideOpts, slide, --opts._maxZ);
				slide.data('cycle.opts', slideOpts);
				opts.API.trigger('cycle-slide-added', [
					opts,
					slideOpts,
					slide
				]);
			});
			opts.API.updateView(true);
			startSlideshow = opts._preInitialized && (oldSlideCount < 2 && opts.slideCount >= 1);
			if (startSlideshow) {
				if (!opts._initialized)
					opts.API.initSlideshow();
				else if (opts.timeout) {
					len = opts.slides.length;
					opts.nextSlide = opts.reverse ? len - 1 : 1;
					if (!opts.timeoutId) {
						opts.API.queueTransition(opts);
					}
				}
			}
		},
		calcFirstSlide: function() {
			var opts = this.opts();
			var firstSlideIndex;
			firstSlideIndex = parseInt(opts.startingSlide || 0, 10);
			if (firstSlideIndex >= opts.slides.length || firstSlideIndex < 0)
				firstSlideIndex = 0;
			opts.currSlide = firstSlideIndex;
			if (opts.reverse) {
				opts.nextSlide = firstSlideIndex - 1;
				if (opts.nextSlide < 0)
					opts.nextSlide = opts.slides.length - 1;
			} else {
				opts.nextSlide = firstSlideIndex + 1;
				if (opts.nextSlide == opts.slides.length)
					opts.nextSlide = 0;
			}
		},
		calcNextSlide: function() {
			var opts = this.opts();
			var roll;
			if (opts.reverse) {
				roll = opts.nextSlide - 1 < 0;
				opts.nextSlide = roll ? opts.slideCount - 1 : opts.nextSlide - 1;
				opts.currSlide = roll ? 0 : opts.nextSlide + 1;
			} else {
				roll = opts.nextSlide + 1 == opts.slides.length;
				opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
				opts.currSlide = roll ? opts.slides.length - 1 : opts.nextSlide - 1;
			}
		},
		calcTx: function(slideOpts, manual) {
			var opts = slideOpts;
			var tx;
			if (opts._tempFx)
				tx = $.fn.cycle.transitions[opts._tempFx];
			else if (manual && opts.manualFx)
				tx = $.fn.cycle.transitions[opts.manualFx];
			if (!tx)
				tx = $.fn.cycle.transitions[opts.fx];
			opts._tempFx = null;
			this.opts()._tempFx = null;
			if (!tx) {
				tx = $.fn.cycle.transitions.fade;
				opts.API.log('Transition "' + opts.fx + '" not found.  Using fade.');
			}
			return tx;
		},
		prepareTx: function(manual, fwd) {
			var opts = this.opts();
			var after, curr, next, slideOpts, tx;
			if (opts.slideCount < 2) {
				opts.timeoutId = 0;
				return;
			}
			if (manual && (!opts.busy || opts.manualTrump)) {
				opts.API.stopTransition();
				opts.busy = false;
				clearTimeout(opts.timeoutId);
				opts.timeoutId = 0;
			}
			if (opts.busy)
				return;
			if (opts.timeoutId === 0 && !manual)
				return;
			curr = opts.slides[opts.currSlide];
			next = opts.slides[opts.nextSlide];
			slideOpts = opts.API.getSlideOpts(opts.nextSlide);
			tx = opts.API.calcTx(slideOpts, manual);
			opts._tx = tx;
			if (manual && slideOpts.manualSpeed !== undefined)
				slideOpts.speed = slideOpts.manualSpeed;
			// if ( opts.nextSlide === opts.currSlide )
			//     opts.API.calcNextSlide();
			// ensure that:
			//      1. advancing to a different slide
			//      2. this is either a manual event (prev/next, pager, cmd) or
			//              a timer event and slideshow is not paused
			if (opts.nextSlide != opts.currSlide && (manual || !opts.paused && !opts.hoverPaused && opts.timeout)) {
				// #62
				opts.API.trigger('cycle-before', [
					slideOpts,
					curr,
					next,
					fwd
				]);
				if (tx.before)
					tx.before(slideOpts, curr, next, fwd);
				after = function() {
					opts.busy = false;
					// #76; bail if slideshow has been destroyed
					if (!opts.container.data('cycle.opts'))
						return;
					if (tx.after)
						tx.after(slideOpts, curr, next, fwd);
					opts.API.trigger('cycle-after', [
						slideOpts,
						curr,
						next,
						fwd
					]);
					opts.API.queueTransition(slideOpts);
					opts.API.updateView(true);
				};
				opts.busy = true;
				if (tx.transition)
					tx.transition(slideOpts, curr, next, fwd, after);
				else
					opts.API.doTransition(slideOpts, curr, next, fwd, after);
				opts.API.calcNextSlide();
				opts.API.updateView();
			} else {
				opts.API.queueTransition(slideOpts);
			}
		},
		// perform the actual animation
		doTransition: function(slideOpts, currEl, nextEl, fwd, callback) {
			var opts = slideOpts;
			var curr = $(currEl),
				next = $(nextEl);
			var fn = function() {
				// make sure animIn has something so that callback doesn't trigger immediately
				next.animate(opts.animIn || {
					opacity: 1
				}, opts.speed, opts.easeIn || opts.easing, callback);
			};
			next.css(opts.cssBefore || {});
			curr.animate(opts.animOut || {}, opts.speed, opts.easeOut || opts.easing, function() {
				curr.css(opts.cssAfter || {});
				if (!opts.sync) {
					fn();
				}
			});
			if (opts.sync) {
				fn();
			}
		},
		queueTransition: function(slideOpts, specificTimeout) {
			var opts = this.opts();
			var timeout = specificTimeout !== undefined ? specificTimeout : slideOpts.timeout;
			if (opts.nextSlide === 0 && --opts.loop === 0) {
				opts.API.log('terminating; loop=0');
				opts.timeout = 0;
				if (timeout) {
					setTimeout(function() {
						opts.API.trigger('cycle-finished', [opts]);
					}, timeout);
				} else {
					opts.API.trigger('cycle-finished', [opts]);
				}
				// reset nextSlide
				opts.nextSlide = opts.currSlide;
				return;
			}
			if (opts.continueAuto !== undefined) {
				if (opts.continueAuto === false || $.isFunction(opts.continueAuto) && opts.continueAuto() === false) {
					opts.API.log('terminating automatic transitions');
					opts.timeout = 0;
					if (opts.timeoutId)
						clearTimeout(opts.timeoutId);
					return;
				}
			}
			if (timeout) {
				opts._lastQueue = $.now();
				if (specificTimeout === undefined)
					opts._remainingTimeout = slideOpts.timeout;
				if (!opts.paused && !opts.hoverPaused) {
					opts.timeoutId = setTimeout(function() {
						opts.API.prepareTx(false, !opts.reverse);
					}, timeout);
				}
			}
		},
		stopTransition: function() {
			var opts = this.opts();
			if (opts.slides.filter(':animated').length) {
				opts.slides.stop(false, true);
				opts.API.trigger('cycle-transition-stopped', [opts]);
			}
			if (opts._tx && opts._tx.stopTransition)
				opts._tx.stopTransition(opts);
		},
		// advance slide forward or back
		advanceSlide: function(val) {
			var opts = this.opts();
			clearTimeout(opts.timeoutId);
			opts.timeoutId = 0;
			opts.nextSlide = opts.currSlide + val;
			if (opts.nextSlide < 0)
				opts.nextSlide = opts.slides.length - 1;
			else if (opts.nextSlide >= opts.slides.length)
				opts.nextSlide = 0;
			opts.API.prepareTx(true, val >= 0);
			return false;
		},
		buildSlideOpts: function(slide) {
			var opts = this.opts();
			var val, shortName;
			var slideOpts = slide.data() || {};
			for (var p in slideOpts) {
				// allow props to be accessed sans 'cycle' prefix and log the overrides
				if (slideOpts.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p)) {
					val = slideOpts[p];
					shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
					opts.API.log('[' + (opts.slideCount - 1) + ']', shortName + ':', val, '(' + typeof val + ')');
					slideOpts[shortName] = val;
				}
			}
			slideOpts = $.extend({}, $.fn.cycle.defaults, opts, slideOpts);
			slideOpts.slideNum = opts.slideCount;
			try {
				// these props should always be read from the master state object
				delete slideOpts.API;
				delete slideOpts.slideCount;
				delete slideOpts.currSlide;
				delete slideOpts.nextSlide;
				delete slideOpts.slides;
			} catch (e) {}
			return slideOpts;
		},
		getSlideOpts: function(index) {
			var opts = this.opts();
			if (index === undefined)
				index = opts.currSlide;
			var slide = opts.slides[index];
			var slideOpts = $(slide).data('cycle.opts');
			return $.extend({}, opts, slideOpts);
		},
		initSlide: function(slideOpts, slide, suggestedZindex) {
			var opts = this.opts();
			slide.css(slideOpts.slideCss || {});
			if (suggestedZindex > 0)
				slide.css('zIndex', suggestedZindex);
			// ensure that speed settings are sane
			if (isNaN(slideOpts.speed))
				slideOpts.speed = $.fx.speeds[slideOpts.speed] || $.fx.speeds._default;
			if (!slideOpts.sync)
				slideOpts.speed = slideOpts.speed / 2;
			slide.addClass(opts.slideClass);
		},
		updateView: function(isAfter, isDuring, forceEvent) {
			var opts = this.opts();
			if (!opts._initialized)
				return;
			var slideOpts = opts.API.getSlideOpts();
			var currSlide = opts.slides[opts.currSlide];
			if (!isAfter && isDuring !== true) {
				opts.API.trigger('cycle-update-view-before', [
					opts,
					slideOpts,
					currSlide
				]);
				if (opts.updateView < 0)
					return;
			}
			if (opts.slideActiveClass) {
				opts.slides.removeClass(opts.slideActiveClass).eq(opts.currSlide).addClass(opts.slideActiveClass);
			}
			if (isAfter && opts.hideNonActive)
				opts.slides.filter(':not(.' + opts.slideActiveClass + ')').css('visibility', 'hidden');
			if (opts.updateView === 0) {
				setTimeout(function() {
					opts.API.trigger('cycle-update-view', [
						opts,
						slideOpts,
						currSlide,
						isAfter
					]);
				}, slideOpts.speed / (opts.sync ? 2 : 1));
			}
			if (opts.updateView !== 0)
				opts.API.trigger('cycle-update-view', [
					opts,
					slideOpts,
					currSlide,
					isAfter
				]);
			if (isAfter)
				opts.API.trigger('cycle-update-view-after', [
					opts,
					slideOpts,
					currSlide
				]);
		},
		getComponent: function(name) {
			var opts = this.opts();
			var selector = opts[name];
			// if selector is a child, sibling combinator, adjancent selector then use find, otherwise query parent element & then full dom
			if (/^\s*[\>|\+|~]/.test(selector)) {
				return opts.container.find(selector);
			} else {
				var inParent = opts.container.parent().find(selector);
				if (inParent.length > 0) {
					return inParent;
				} else {
					return $(selector);
				}
			}
			if (selector.jquery) {
				return selector;
			}
			return $(selector);
		},
		stackSlides: function(curr, next, fwd) {
			var opts = this.opts();
			if (!curr) {
				curr = opts.slides[opts.currSlide];
				next = opts.slides[opts.nextSlide];
				fwd = !opts.reverse;
			}
			// reset the zIndex for the common case:
			// curr slide on top,  next slide beneath, and the rest in order to be shown
			$(curr).css('zIndex', opts.maxZ);
			var i;
			var z = opts.maxZ - 2;
			var len = opts.slideCount;
			if (fwd) {
				for (i = opts.currSlide + 1; i < len; i++)
					$(opts.slides[i]).css('zIndex', z--);
				for (i = 0; i < opts.currSlide; i++)
					$(opts.slides[i]).css('zIndex', z--);
			} else {
				for (i = opts.currSlide - 1; i >= 0; i--)
					$(opts.slides[i]).css('zIndex', z--);
				for (i = len - 1; i > opts.currSlide; i--)
					$(opts.slides[i]).css('zIndex', z--);
			}
			$(next).css('zIndex', opts.maxZ - 1);
		},
		getSlideIndex: function(el) {
			return this.opts().slides.index(el);
		}
	};
	// API
	// default logger
	$.fn.cycle.log = function log() {
		/*global console:true */
		if (window.console && console.log)
			console.log('[cycle2] ' + Array.prototype.join.call(arguments, ' '));
	};
	$.fn.cycle.version = function() {
		return 'Cycle2: ' + version;
	};
	// helper functions
	function lowerCase(s) {
		return (s || '').toLowerCase();
	}
	// expose transition object
	$.fn.cycle.transitions = {
		custom: {},
		none: {
			before: function(opts, curr, next, fwd) {
				opts.API.stackSlides(next, curr, fwd);
				opts.cssBefore = {
					opacity: 1,
					visibility: 'visible',
					display: 'block'
				};
			}
		},
		fade: {
			before: function(opts, curr, next, fwd) {
				var css = opts.API.getSlideOpts(opts.nextSlide).slideCss || {};
				opts.API.stackSlides(curr, next, fwd);
				opts.cssBefore = $.extend(css, {
					opacity: 0,
					visibility: 'visible',
					display: 'block'
				});
				opts.animIn = {
					opacity: 1
				};
				opts.animOut = {
					opacity: 0
				};
			}
		},
		fadeout: {
			before: function(opts, curr, next, fwd) {
				var css = opts.API.getSlideOpts(opts.nextSlide).slideCss || {};
				opts.API.stackSlides(curr, next, fwd);
				opts.cssBefore = $.extend(css, {
					opacity: 1,
					visibility: 'visible',
					display: 'block'
				});
				opts.animOut = {
					opacity: 0
				};
			}
		},
		scrollHorz: {
			before: function(opts, curr, next, fwd) {
				opts.API.stackSlides(curr, next, fwd);
				var w = opts.container.css('overflow', 'hidden').width();
				opts.cssBefore = {
					left: fwd ? w : -w,
					top: 0,
					opacity: 1,
					visibility: 'visible',
					display: 'block'
				};
				opts.cssAfter = {
					zIndex: opts._maxZ - 2,
					left: 0
				};
				opts.animIn = {
					left: 0
				};
				opts.animOut = {
					left: fwd ? -w : w
				};
			}
		}
	};
	// @see: http://jquery.malsup.com/cycle2/api
	$.fn.cycle.defaults = {
		allowWrap: true,
		autoSelector: '.ensemble-slideshow',
		delay: 0,
		easing: null,
		fx: 'fade',
		hideNonActive: true,
		loop: 0,
		manualFx: undefined,
		manualSpeed: undefined,
		manualTrump: true,
		maxZ: 100,
		pauseOnHover: false,
		reverse: false,
		slideActiveClass: 'ensemble-slideshow__active-slide',
		slideClass: '',
		slideCss: {
			position: 'absolute',
			top: 0,
			left: 0
		},
		slides: '> img',
		speed: 500,
		startingSlide: 0,
		sync: true,
		timeout: 4000,
		updateView: 0
	};
	// automatically find and run slideshows
	$(document).ready(function() {
		$($.fn.cycle.defaults.autoSelector).cycle();
	});
}(jQuery));
/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		autoHeight: 0,
		// setting this option to false disables autoHeight logic
		autoHeightSpeed: 250,
		autoHeightEasing: null
	});
	$(document).on('cycle-initialized', function(e, opts) {
		var autoHeight = opts.autoHeight;
		var t = $.type(autoHeight);
		var resizeThrottle = null;
		var ratio;
		if (t !== 'string' && t !== 'number')
			return;
		// bind events
		opts.container.on('cycle-slide-added cycle-slide-removed', initAutoHeight);
		opts.container.on('cycle-destroyed', onDestroy);
		if (autoHeight === 'container') {
			opts.container.on('cycle-before', onBefore);
		} else if (t === 'string' && /\d+\:\d+/.test(autoHeight)) {
			// use ratio
			ratio = autoHeight.match(/(\d+)\:(\d+)/);
			ratio = ratio[1] / ratio[2];
			opts._autoHeightRatio = ratio;
		}
		// if autoHeight is a number then we don't need to recalculate the sentinel
		// index on resize
		if (t !== 'number') {
			// bind unique resize handler per slideshow (so it can be 'off-ed' in onDestroy)
			opts._autoHeightOnResize = function() {
				clearTimeout(resizeThrottle);
				resizeThrottle = setTimeout(onResize, 50);
			};
			$(window).on('resize orientationchange', opts._autoHeightOnResize);
		}
		setTimeout(onResize, 30);

		function onResize() {
			initAutoHeight(e, opts);
		}
	});

	function initAutoHeight(e, opts) {
		var clone, height, sentinelIndex;
		var autoHeight = opts.autoHeight;
		if (autoHeight === 'container') {
			height = $(opts.slides[opts.currSlide]).outerHeight();
			opts.container.height(height);
		} else if (opts._autoHeightRatio) {
			opts.container.height(opts.container.width() / opts._autoHeightRatio);
		} else if (autoHeight === 'calc' || $.type(autoHeight) == 'number' && autoHeight >= 0) {
			if (autoHeight === 'calc')
				sentinelIndex = calcSentinelIndex(e, opts);
			else if (autoHeight >= opts.slides.length)
				sentinelIndex = 0;
			else
				sentinelIndex = autoHeight;
			// only recreate sentinel if index is different
			if (sentinelIndex === opts._sentinelIndex)
				return;
			opts._sentinelIndex = sentinelIndex;
			if (opts._sentinel)
				opts._sentinel.remove();
			// clone existing slide as sentinel
			clone = $(opts.slides[sentinelIndex].cloneNode(true));
			// #50; remove special attributes from cloned content
			clone.removeAttr('id name rel').find('[id],[name],[rel]').removeAttr('id name rel');
			clone.css({
				position: 'static',
				visibility: 'hidden',
				display: 'block'
			}).prependTo(opts.container).addClass('cycle-sentinel cycle-slide').removeClass('cycle-slide-active');
			clone.find('*').css('visibility', 'hidden');
			opts._sentinel = clone;
		}
	}

	function calcSentinelIndex(e, opts) {
		var index = 0,
			max = -1;
		// calculate tallest slide index
		opts.slides.each(function(i) {
			var h = $(this).height();
			if (h > max) {
				max = h;
				index = i;
			}
		});
		return index;
	}

	function onBefore(e, opts, outgoing, incoming, forward) {
		var h = $(incoming).outerHeight();
		opts.container.animate({
			height: h
		}, opts.autoHeightSpeed, opts.autoHeightEasing);
	}

	function onDestroy(e, opts) {
		if (opts._autoHeightOnResize) {
			$(window).off('resize orientationchange', opts._autoHeightOnResize);
			opts._autoHeightOnResize = null;
		}
		opts.container.off('cycle-slide-added cycle-slide-removed', initAutoHeight);
		opts.container.off('cycle-destroyed', onDestroy);
		opts.container.off('cycle-before', onBefore);
		if (opts._sentinel) {
			opts._sentinel.remove();
			opts._sentinel = null;
		}
	}
}(jQuery));
/*! caption plugin for Cycle2;  version: 20130306 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		caption: '> .cycle-caption',
		captionTemplate: '{{slideNum}} / {{slideCount}}',
		overlay: '> .cycle-overlay',
		overlayTemplate: '<div>{{title}}</div><div>{{desc}}</div>',
		captionModule: 'caption'
	});
	$(document).on('cycle-update-view', function(e, opts, slideOpts, currSlide) {
		if (opts.captionModule !== 'caption')
			return;
		var el;
		$.each([
			'caption',
			'overlay'
		], function() {
			var name = this;
			var template = slideOpts[name + 'Template'];
			var el = opts.API.getComponent(name);
			if (el.length && template) {
				el.html(opts.API.tmpl(template, slideOpts, opts, currSlide));
				el.show();
			} else {
				el.hide();
			}
		});
	});
	$(document).on('cycle-destroyed', function(e, opts) {
		var el;
		$.each([
			'caption',
			'overlay'
		], function() {
			var name = this,
				template = opts[name + 'Template'];
			if (opts[name] && template) {
				el = opts.API.getComponent('caption');
				el.empty();
			}
		});
	});
}(jQuery));
/*! command plugin for Cycle2;  version: 20140415 */
(function($) {
	'use strict';
	var c2 = $.fn.cycle;
	$.fn.cycle = function(options) {
		var cmd, cmdFn, opts;
		var args = $.makeArray(arguments);
		if ($.type(options) === 'number') {
			return this.cycle('goto', options);
		}
		if ($.type(options) === 'string') {
			return this.each(function() {
				var cmdArgs;
				cmd = options;
				opts = $(this).data('cycle.opts');
				if (opts === undefined) {
					c2.log('slideshow must be initialized before sending commands; "' + cmd + '" ignored');
					return;
				} else {
					cmd = cmd === 'goto' ? 'jump' : cmd;
					// issue #3; change 'goto' to 'jump' internally
					cmdFn = opts.API[cmd];
					if ($.isFunction(cmdFn)) {
						cmdArgs = $.makeArray(args);
						cmdArgs.shift();
						return cmdFn.apply(opts.API, cmdArgs);
					} else {
						c2.log('unknown command: ', cmd);
					}
				}
			});
		} else {
			return c2.apply(this, arguments);
		}
	};
	// copy props
	$.extend($.fn.cycle, c2);
	$.extend(c2.API, {
		next: function() {
			var opts = this.opts();
			if (opts.busy && !opts.manualTrump)
				return;
			var count = opts.reverse ? -1 : 1;
			if (opts.allowWrap === false && opts.currSlide + count >= opts.slideCount)
				return;
			opts.API.advanceSlide(count);
			opts.API.trigger('cycle-next', [opts]).log('cycle-next');
		},
		prev: function() {
			var opts = this.opts();
			if (opts.busy && !opts.manualTrump)
				return;
			var count = opts.reverse ? 1 : -1;
			if (opts.allowWrap === false && opts.currSlide + count < 0)
				return;
			opts.API.advanceSlide(count);
			opts.API.trigger('cycle-prev', [opts]).log('cycle-prev');
		},
		destroy: function() {
			this.stop();
			//#204
			var opts = this.opts();
			var clean = $.isFunction($._data) ? $._data : $.noop;
			// hack for #184 and #201
			clearTimeout(opts.timeoutId);
			opts.timeoutId = 0;
			opts.API.stop();
			opts.API.trigger('cycle-destroyed', [opts]).log('cycle-destroyed');
			opts.container.removeData();
			clean(opts.container[0], 'parsedAttrs', false);
			// #75; remove inline styles
			if (!opts.retainStylesOnDestroy) {
				opts.container.removeAttr('style');
				opts.slides.removeAttr('style');
				opts.slides.removeClass(opts.slideActiveClass);
			}
			opts.slides.each(function() {
				var slide = $(this);
				slide.removeData();
				slide.removeClass(opts.slideClass);
				clean(this, 'parsedAttrs', false);
			});
		},
		jump: function(index, fx) {
			// go to the requested slide
			var fwd;
			var opts = this.opts();
			if (opts.busy && !opts.manualTrump)
				return;
			var num = parseInt(index, 10);
			if (isNaN(num) || num < 0 || num >= opts.slides.length) {
				opts.API.log('goto: invalid slide index: ' + num);
				return;
			}
			if (num === opts.currSlide) {
				opts.API.log('goto: skipping, already on slide', num);
				return;
			}
			opts.nextSlide = num;
			clearTimeout(opts.timeoutId);
			opts.timeoutId = 0;
			opts.API.log('goto: ', num, ' (zero-index)');
			fwd = opts.currSlide < opts.nextSlide;
			opts._tempFx = fx;
			opts.API.prepareTx(true, fwd);
		},
		stop: function() {
			var opts = this.opts();
			var pauseObj = opts.container;
			clearTimeout(opts.timeoutId);
			opts.timeoutId = 0;
			opts.API.stopTransition();
			if (opts.pauseOnHover) {
				if (opts.pauseOnHover !== true)
					pauseObj = $(opts.pauseOnHover);
				pauseObj.off('mouseenter mouseleave');
			}
			opts.API.trigger('cycle-stopped', [opts]).log('cycle-stopped');
		},
		reinit: function() {
			var opts = this.opts();
			opts.API.destroy();
			opts.container.cycle();
		},
		remove: function(index) {
			var opts = this.opts();
			var slide, slideToRemove, slides = [],
				slideNum = 1;
			for (var i = 0; i < opts.slides.length; i++) {
				slide = opts.slides[i];
				if (i === index) {
					slideToRemove = slide;
				} else {
					slides.push(slide);
					$(slide).data('cycle.opts').slideNum = slideNum;
					slideNum++;
				}
			}
			if (slideToRemove) {
				opts.slides = $(slides);
				opts.slideCount--;
				$(slideToRemove).remove();
				if (index === opts.currSlide)
					opts.API.advanceSlide(1);
				else if (index < opts.currSlide)
					opts.currSlide--;
				else
					opts.currSlide++;
				opts.API.trigger('cycle-slide-removed', [
					opts,
					index,
					slideToRemove
				]).log('cycle-slide-removed');
				opts.API.updateView();
			}
		}
	});
	// listen for clicks on elements with data-cycle-cmd attribute
	$(document).on('click.cycle', '[data-cycle-cmd]', function(e) {
		// issue cycle command
		e.preventDefault();
		var el = $(this);
		var command = el.data('cycle-cmd');
		var context = el.data('cycle-context') || '.cycle-slideshow';
		$(context).cycle(command, el.data('cycle-arg'));
	});
}(jQuery));
/*! hash plugin for Cycle2;  version: 20130905 */
(function($) {
	'use strict';
	$(document).on('cycle-pre-initialize', function(e, opts) {
		onHashChange(opts, true);
		opts._onHashChange = function() {
			onHashChange(opts, false);
		};
		$(window).on('hashchange', opts._onHashChange);
	});
	$(document).on('cycle-update-view', function(e, opts, slideOpts) {
		if (slideOpts.hash && '#' + slideOpts.hash !== window.location.hash) {
			opts._hashFence = true;
			window.location.hash = slideOpts.hash;
		}
	});
	$(document).on('cycle-destroyed', function(e, opts) {
		if (opts._onHashChange) {
			$(window).off('hashchange', opts._onHashChange);
		}
	});

	function onHashChange(opts, setStartingSlide) {
		var hash;
		if (opts._hashFence) {
			opts._hashFence = false;
			return;
		}
		hash = window.location.hash.substring(1);
		opts.slides.each(function(i) {
			if ($(this).data('cycle-hash') === hash) {
				if (setStartingSlide === true) {
					opts.startingSlide = i;
				} else {
					var fwd = opts.currSlide < i;
					opts.nextSlide = i;
					opts.API.prepareTx(true, fwd);
				}
				return false;
			}
		});
	}
}(jQuery));
/*! loader plugin for Cycle2;  version: 20131121 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		loader: false
	});
	$(document).on('cycle-bootstrap', function(e, opts) {
		var addFn;
		if (!opts.loader)
			return;
		// override API.add for this slideshow
		addFn = opts.API.add;
		opts.API.add = add;

		function add(slides, prepend) {
			var slideArr = [];
			if ($.type(slides) === 'string')
				slides = $.trim(slides);
			else if ($.type(slides) === 'array') {
				for (var i = 0; i < slides.length; i++)
					slides[i] = $(slides[i])[0];
			}
			slides = $(slides);
			var slideCount = slides.length;
			if (!slideCount)
				return;
			slides.css('visibility', 'hidden').appendTo('body').each(function(i) {
				// appendTo fixes #56
				var count = 0;
				var slide = $(this);
				var images = slide.is('img') ? slide : slide.find('img');
				slide.data('index', i);
				// allow some images to be marked as unimportant (and filter out images w/o src value)
				images = images.filter(':not(.cycle-loader-ignore)').filter(':not([src=""])');
				if (!images.length) {
					--slideCount;
					slideArr.push(slide);
					return;
				}
				count = images.length;
				images.each(function() {
					// add images that are already loaded
					if (this.complete) {
						imageLoaded();
					} else {
						$(this).load(function() {
							imageLoaded();
						}).on('error', function() {
							if (--count === 0) {
								// ignore this slide
								opts.API.log('slide skipped; img not loaded:', this.src);
								if (--slideCount === 0 && opts.loader === 'wait') {
									addFn.apply(opts.API, [
										slideArr,
										prepend
									]);
								}
							}
						});
					}
				});

				function imageLoaded() {
					if (--count === 0) {
						--slideCount;
						addSlide(slide);
					}
				}
			});
			if (slideCount)
				opts.container.addClass('cycle-loading');

			function addSlide(slide) {
				var curr;
				if (opts.loader === 'wait') {
					slideArr.push(slide);
					if (slideCount === 0) {
						// #59; sort slides into original markup order
						slideArr.sort(sorter);
						addFn.apply(opts.API, [
							slideArr,
							prepend
						]);
						opts.container.removeClass('cycle-loading');
					}
				} else {
					curr = $(opts.slides[opts.currSlide]);
					addFn.apply(opts.API, [
						slide,
						prepend
					]);
					curr.show();
					opts.container.removeClass('cycle-loading');
				}
			}

			function sorter(a, b) {
				return a.data('index') - b.data('index');
			}
		}
	});
}(jQuery));
/*! pager plugin for Cycle2;  version: 20140415 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		pager: '> .ensemble-slideshow__pager',
		pagerActiveClass: 'ensemble-slideshow__pager-item-active',
		pagerEvent: 'click.cycle',
		pagerEventBubble: undefined,
		pagerTemplate: '<span class="ensemble-slideshow__pager-item"></span>'
	});
	$(document).on('cycle-bootstrap', function(e, opts, API) {
		// add method to API
		API.buildPagerLink = buildPagerLink;
	});
	$(document).on('cycle-slide-added', function(e, opts, slideOpts, slideAdded) {
		if (opts.pager) {
			opts.API.buildPagerLink(opts, slideOpts, slideAdded);
			opts.API.page = page;
		}
	});
	$(document).on('cycle-slide-removed', function(e, opts, index, slideRemoved) {
		if (opts.pager) {
			var pagers = opts.API.getComponent('pager');
			pagers.each(function() {
				var pager = $(this);
				$(pager.children()[index]).remove();
			});
		}
	});
	$(document).on('cycle-update-view', function(e, opts, slideOpts) {
		var pagers;
		if (opts.pager) {
			pagers = opts.API.getComponent('pager');
			pagers.each(function() {
				$(this).children().removeClass(opts.pagerActiveClass).eq(opts.currSlide).addClass(opts.pagerActiveClass);
			});
		}
	});
	$(document).on('cycle-destroyed', function(e, opts) {
		var pager = opts.API.getComponent('pager');
		if (pager) {
			pager.children().off(opts.pagerEvent);
			// #202
			if (opts.pagerTemplate)
				pager.empty();
		}
	});

	function buildPagerLink(opts, slideOpts, slide) {
		var pagerLink;
		var pagers = opts.API.getComponent('pager');
		pagers.each(function() {
			var pager = $(this);
			if (slideOpts.pagerTemplate) {
				var markup = opts.API.tmpl(slideOpts.pagerTemplate, slideOpts, opts, slide[0]);
				pagerLink = $(markup).appendTo(pager);
			} else {
				pagerLink = pager.children().eq(opts.slideCount - 1);
			}
			pagerLink.on(opts.pagerEvent, function(e) {
				if (!opts.pagerEventBubble)
					e.preventDefault();
				opts.API.page(pager, e.currentTarget);
			});
		});
	}

	function page(pager, target) {
		/*jshint validthis:true */
		var opts = this.opts();
		if (opts.busy && !opts.manualTrump)
			return;
		var index = pager.children().index(target);
		var nextSlide = index;
		var fwd = opts.currSlide < nextSlide;
		if (opts.currSlide === nextSlide) {
			return; // no op, clicked pager for the currently displayed slide
		}
		opts.nextSlide = nextSlide;
		opts._tempFx = opts.pagerFx;
		opts.API.prepareTx(true, fwd);
		opts.API.trigger('cycle-pager-activated', [
			opts,
			pager,
			target
		]);
	}
}(jQuery));
/*! prevnext plugin for Cycle2;  version: 20140408 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		next: '> .cycle-next',
		nextEvent: 'click.cycle',
		disabledClass: 'disabled',
		prev: '> .cycle-prev',
		prevEvent: 'click.cycle',
		swipe: false
	});
	$(document).on('cycle-initialized', function(e, opts) {
		opts.API.getComponent('next').on(opts.nextEvent, function(e) {
			e.preventDefault();
			opts.API.next();
		});
		opts.API.getComponent('prev').on(opts.prevEvent, function(e) {
			e.preventDefault();
			opts.API.prev();
		});
		if (opts.swipe) {
			var nextEvent = opts.swipeVert ? 'swipeUp.cycle' : 'swipeLeft.cycle swipeleft.cycle';
			var prevEvent = opts.swipeVert ? 'swipeDown.cycle' : 'swipeRight.cycle swiperight.cycle';
			opts.container.on(nextEvent, function(e) {
				opts._tempFx = opts.swipeFx;
				opts.API.next();
			});
			opts.container.on(prevEvent, function() {
				opts._tempFx = opts.swipeFx;
				opts.API.prev();
			});
		}
	});
	$(document).on('cycle-update-view', function(e, opts, slideOpts, currSlide) {
		if (opts.allowWrap)
			return;
		var cls = opts.disabledClass;
		var next = opts.API.getComponent('next');
		var prev = opts.API.getComponent('prev');
		var prevBoundry = opts._prevBoundry || 0;
		var nextBoundry = opts._nextBoundry !== undefined ? opts._nextBoundry : opts.slideCount - 1;
		if (opts.currSlide === nextBoundry)
			next.addClass(cls).prop('disabled', true);
		else
			next.removeClass(cls).prop('disabled', false);
		if (opts.currSlide === prevBoundry)
			prev.addClass(cls).prop('disabled', true);
		else
			prev.removeClass(cls).prop('disabled', false);
	});
	$(document).on('cycle-destroyed', function(e, opts) {
		opts.API.getComponent('prev').off(opts.nextEvent);
		opts.API.getComponent('next').off(opts.prevEvent);
		opts.container.off('swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle');
	});
}(jQuery));
/*! progressive loader plugin for Cycle2;  version: 20130315 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		progressive: false
	});
	$(document).on('cycle-pre-initialize', function(e, opts) {
		if (!opts.progressive)
			return;
		var API = opts.API;
		var nextFn = API.next;
		var prevFn = API.prev;
		var prepareTxFn = API.prepareTx;
		var type = $.type(opts.progressive);
		var slides, scriptEl;
		if (type === 'array') {
			slides = opts.progressive;
		} else if ($.isFunction(opts.progressive)) {
			slides = opts.progressive(opts);
		} else if (type === 'string') {
			scriptEl = $(opts.progressive);
			slides = $.trim(scriptEl.html());
			if (!slides)
				return;
			// is it json array?
			if (/^(\[)/.test(slides)) {
				try {
					slides = $.parseJSON(slides);
				} catch (err) {
					API.log('error parsing progressive slides', err);
					return;
				}
			} else {
				// plain text, split on delimeter
				slides = slides.split(new RegExp(scriptEl.data('cycle-split') || '\n'));
				// #95; look for empty slide
				if (!slides[slides.length - 1])
					slides.pop();
			}
		}
		if (prepareTxFn) {
			API.prepareTx = function(manual, fwd) {
				var index, slide;
				if (manual || slides.length === 0) {
					prepareTxFn.apply(opts.API, [
						manual,
						fwd
					]);
					return;
				}
				if (fwd && opts.currSlide === opts.slideCount - 1) {
					slide = slides[0];
					slides = slides.slice(1);
					opts.container.one('cycle-slide-added', function(e, opts) {
						setTimeout(function() {
							opts.API.advanceSlide(1);
						}, 50);
					});
					opts.API.add(slide);
				} else if (!fwd && opts.currSlide === 0) {
					index = slides.length - 1;
					slide = slides[index];
					slides = slides.slice(0, index);
					opts.container.one('cycle-slide-added', function(e, opts) {
						setTimeout(function() {
							opts.currSlide = 1;
							opts.API.advanceSlide(-1);
						}, 50);
					});
					opts.API.add(slide, true);
				} else {
					prepareTxFn.apply(opts.API, [
						manual,
						fwd
					]);
				}
			};
		}
		if (nextFn) {
			API.next = function() {
				var opts = this.opts();
				if (slides.length && opts.currSlide === opts.slideCount - 1) {
					var slide = slides[0];
					slides = slides.slice(1);
					opts.container.one('cycle-slide-added', function(e, opts) {
						nextFn.apply(opts.API);
						opts.container.removeClass('cycle-loading');
					});
					opts.container.addClass('cycle-loading');
					opts.API.add(slide);
				} else {
					nextFn.apply(opts.API);
				}
			};
		}
		if (prevFn) {
			API.prev = function() {
				var opts = this.opts();
				if (slides.length && opts.currSlide === 0) {
					var index = slides.length - 1;
					var slide = slides[index];
					slides = slides.slice(0, index);
					opts.container.one('cycle-slide-added', function(e, opts) {
						opts.currSlide = 1;
						opts.API.advanceSlide(-1);
						opts.container.removeClass('cycle-loading');
					});
					opts.container.addClass('cycle-loading');
					opts.API.add(slide, true);
				} else {
					prevFn.apply(opts.API);
				}
			};
		}
	});
}(jQuery));
/*! tmpl plugin for Cycle2;  version: 20121227 */
(function($) {
	'use strict';
	$.extend($.fn.cycle.defaults, {
		tmplRegex: '{{((.)?.*?)}}'
	});
	$.extend($.fn.cycle.API, {
		tmpl: function(str, opts) {
			var regex = new RegExp(opts.tmplRegex || $.fn.cycle.defaults.tmplRegex, 'g');
			var args = $.makeArray(arguments);
			args.shift();
			return str.replace(regex, function(_, str) {
				var i, j, obj, prop, names = str.split('.');
				for (i = 0; i < args.length; i++) {
					obj = args[i];
					if (!obj)
						continue;
					if (names.length > 1) {
						prop = obj;
						for (j = 0; j < names.length; j++) {
							obj = prop;
							prop = prop[names[j]] || str;
						}
					} else {
						prop = obj[str];
					}
					if ($.isFunction(prop))
						return prop.apply(obj, args);
					if (prop !== undefined && prop !== null && prop !== str)
						return prop;
				}
				return str;
			});
		}
	});
}(jQuery));


/* ========================================
07. Ensemble Lightbox
By Osvaldas Valutis, www.osvaldas.info
Available for use under the MIT License
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	var cssTransitionSupport = function() {
			var s = document.body || document.documentElement;
			s = s.style;
			if (s.WebkitTransition === '') {
				return '-webkit-';
			}
			if (s.MozTransition === '') {
				return '-moz-';
			}
			if (s.OTransition === '') {
				return '-o-';
			}
			if (s.transition === '') {
				return '';
			}
			return false;
		},

		isCssTransitionSupport = cssTransitionSupport() !== false,

		cssTransitionTranslateX = function(element, positionX, speed) {
			var options = {},
				prefix = cssTransitionSupport();
			options[prefix + 'transform'] = 'translateX(' + positionX + ')';
			options[prefix + 'transition'] = prefix + 'transform ' + speed + 's linear';
			element.css(options);
		},

		hasTouch = ('ontouchstart' in window),
		hasPointers = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		wasTouched = function(event) {
			if (hasTouch) {
				return true;
			}

			if (!hasPointers || typeof event === 'undefined' || typeof event.pointerType === 'undefined') {
				return false;
			}

			if (typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined') {
				if (event.MSPOINTER_TYPE_MOUSE !== event.pointerType) {
					return true;
				}
			} else if (event.pointerType !== 'mouse') {
				return true;
			}

			return false;
		};

	$.fn.ensembleLightbox = function(opts) {
		var options = $.extend({
				selector: '',
				id: 'ensemble-lightbox',
				allowedTypes: 'png|jpg|jpeg||gif',
				animationSpeed: 250,
				preloadNext: true,
				enableKeyboard: true,
				activity: false,
				arrows: false,
				button: false,
				navigation: false,
				overlay: true,
				caption: true,
				quitOnEnd: false,
				quitOnImgClick: false,
				quitOnDocClick: true,
				quitOnEscKey: true,
				onStart: function() {
					if (options.arrows) {
						arrowsOn(this);
					}
					if (options.navigation) {
						navigationOn(this, options.selector);
					}
					if (options.overlay) {
						overlayOn();
					}
					if (options.button) {
						closeButtonOn();
					}
				},
				onEnd: function() {
					if (options.activity) {
						activityIndicatorOff();
					}
					if (options.arrows) {
						arrowsOff();
					}
					if (options.navigation) {
						navigationOff();
					}
					if (options.overlay) {
						overlayOff();
					}
					if (options.caption) {
						captionOff();
					}
					if (options.button) {
						closeButtonOff();
					}
				},
				onLoadStart: function() {
					if (options.activity) {
						activityIndicatorOn();
					}
					if (options.caption) {
						captionOff();
					}
				},
				onLoadEnd: function() {
					if (options.activity) {
						activityIndicatorOff();
					}
					if (options.arrows) {
						$('.ensemble-lightbox-arrow').css('display', 'block');
					}
					if (options.navigation) {
						navigationUpdate(options.selector);
					}
					if (options.caption) {
						captionOn();
					}
				},
				previousTarget: function() {
					return this.previousTargetDefault();
				},
				previousTargetDefault: function() {
					var targetIndex = targets.index(target) - 1;
					if (targetIndex < 0) {
						if (options.quitOnEnd === true) {
							quitLightbox();
							return false;
						} else {
							targetIndex = targets.length - 1;
						}
					}
					target = targets.eq(targetIndex);
				},
				nextTarget: function() {
					return this.nextTargetDefault();
				},
				nextTargetDefault: function() {
					var targetIndex = targets.index(target) + 1;
					if (targetIndex >= targets.length) {
						if (options.quitOnEnd === true) {
							quitLightbox();
							return false;
						} else {
							targetIndex = 0;
						}
					}
					target = targets.eq(targetIndex);
				}
			}, opts),
			activityIndicatorOn = function() {
				$('<div class="ensemble-lightbox__loading"><div></div></div>').appendTo('body');
			},
			activityIndicatorOff = function() {
				$('.ensemble-lightbox__loading').remove();
			},
			overlayOn = function() {
				$('<div class="ensemble-lightbox__overlay"></div>').appendTo('body');
			},
			overlayOff = function() {
				$(".ensemble-lightbox__overlay").addClass('ensemble-lightbox__leave');
				$(".ensemble-lightbox__overlay").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
					$('.ensemble-lightbox__overlay').remove();
				});

			},
			closeButtonOn = function() {
				$('<a href="#" class="ensemble-lightbox__close"></a>').appendTo('body').on('click', function() {
					$(this).remove();
					quitLightbox();
					return false;
				});
			},
			closeButtonOff = function() {
				$('.ensemble-lightbox__close').remove();
			},
			captionOn = function() {
				var altTxt = target.attr('data-caption');
				if (target.attr('data-caption') === undefined) {
					return;
				} else {
					$('<div class="ensemble-lightbox__caption">' + altTxt + '</div>').appendTo('body');
				}
			},

			captionOff = function() {
				$('.ensemble-lightbox__caption').remove();
			},
			navigationOn = function(instance, selector) {
				var images = $(selector);
				if (images.length) {
					var nav = $('<div class="ensemble-lightbox__nav"></div>');
					for (var i = 0; i < images.length; i++) {
						nav.append('<a href="#"></a>');
					}
					nav.appendTo('body');
					nav.on('click touchend', function() {
						return false;
					});
					var navItems = nav.find('a');
					navItems.on('click touchend', function() {
						var $this = $(this);
						if (images.eq($this.index()).attr('href') !== $('.ensemble-lightbox').attr('src')) {
							var tmpTarget = targets.eq($this.index());
							if (tmpTarget.length) {
								var currentIndex = targets.index(target);
								target = tmpTarget;
								loadImage($this.index() < currentIndex ? 'left' : 'right');
							}
						}
						navItems.removeClass('active');
						navItems.eq($this.index()).addClass('active');
						return false;
					}).on('touchend', function() {
						return false;
					});
				}
			},
			navigationUpdate = function(selector) {
				var items = $('.ensemble-lightbox__nav').find('a');
				items.removeClass('active');
				items.eq($(selector).filter('[href="' + $('.ensemble-lightbox').attr('src') + '"]').index(selector)).addClass('active');
			},
			navigationOff = function() {
				$('.ensemble-lightbox__nav').remove();
			},
			arrowsOn = function(instance) {
				var $arrows = $('<a href="#" class="ensemble-lightbox__arrow ensemble-lightbox__arrow-left"></a>' +
					'<a href="#" class="ensemble-lightbox__arrow ensemble-lightbox__arrow-right"></button>');
				$arrows.appendTo('body');
				$arrows.on('click touchend', function(e) {
					e.preventDefault();
					if ($(this).hasClass('ensemble-lightbox__arrow-left')) {
						loadPreviousImage(instance);
					} else {
						loadNextImage(instance);
					}
					return false;
				});
			},
			arrowsOff = function() {
				$('.ensemble-lightbox__arrow').remove();
			},

			targets = $([]),
			target = $(),
			image = $(),
			imageWidth = 0,
			imageHeight = 0,
			swipeDiff = 0,
			inProgress = false,

			isTargetValid = function(element) {
				var classic = $(element).prop('tagName').toLowerCase() === 'a' && (new RegExp('.(' + options.allowedTypes + ')$', 'i')).test($(element).attr('href'));
				var html5 = $(element).attr('data-lightbox') !== undefined;
				return classic || html5;
			},

			setImage = function() {
				if (!image.length) {
					return true;
				}

				var screenWidth = $(window).width() * 0.8,
					screenHeight = $(window).height() * 0.9,
					tmpImage = new Image();

				tmpImage.src = image.attr('src');
				tmpImage.onload = function() {
					imageWidth = tmpImage.width;
					imageHeight = tmpImage.height;

					if (imageWidth > screenWidth || imageHeight > screenHeight) {
						var ratio = imageWidth / imageHeight > screenWidth / screenHeight ? imageWidth / screenWidth : imageHeight / screenHeight;
						imageWidth /= ratio;
						imageHeight /= ratio;
					}

					image.css({
						'width': imageWidth + 'px',
						'height': imageHeight + 'px',
						'top': ($(window).height() - imageHeight) / 2 + 'px',
						'left': ($(window).width() - imageWidth) / 2 + 'px'
					});
				};
			},

			loadImage = function(direction) {
				if (inProgress) {
					return false;
				}

				direction = typeof direction === 'undefined' ? false : direction === 'left' ? 1 : -1;

				if (image.length) {
					var params = {
						'opacity': 0
					};
					if (isCssTransitionSupport) {
						cssTransitionTranslateX(image, (100 * direction) - swipeDiff + 'px', options.animationSpeed / 1000);
					} else {
						params.left = parseInt(image.css('left')) + 100 * direction + 'px';
					}
					image.animate(params, options.animationSpeed, function() {
						removeImage();
					});
					swipeDiff = 0;
				}

				inProgress = true;
				if (options.onLoadStart !== false) {
					options.onLoadStart();
				}

				setTimeout(function() {
					var imgPath = target.attr('href');
					var altTxt = target.attr('data-caption');
					console.log(target);
					if (options.caption) {
						captionOff();
					}

					image = $('<img class="ensemble-lightbox__image ' + options.id + '" alt="' + altTxt + '" />')
						.attr('src', imgPath)
						.load(function() {
							var params = {
								'opacity': 1
							};

							image.appendTo('body');
							setImage();
							image.css('opacity', 0);

							if (isCssTransitionSupport) {
								cssTransitionTranslateX(image, -100 * direction + 'px', 0);
								setTimeout(function() {
									cssTransitionTranslateX(image, 0 + 'px', options.animationSpeed / 1000);
								}, 50);
							} else {
								var imagePosLeft = parseInt(image.css('left'));
								params.left = imagePosLeft + 'px';
								image.css('left', imagePosLeft - 100 * direction + 'px');
							}

							image.animate(params, options.animationSpeed, function() {
								inProgress = false;
								if (options.onLoadEnd !== false) {
									options.onLoadEnd();
								}
							});
							if (options.preloadNext) {
								var nextTarget = targets.eq(targets.index(target) + 1);
								if (!nextTarget.length) {
									nextTarget = targets.eq(0);
								}
								$('<img />').attr('src', nextTarget.attr('href')).load();
							}
						})
						.error(function() {
							if (options.onLoadEnd !== false) {
								options.onLoadEnd();
							}
						});

					var swipeStart = 0,
						swipeEnd = 0,
						imagePosLeft = 0;

					image.on(hasPointers ? 'pointerup MSPointerUp' : 'click', function(e) {
							e.preventDefault();
							if (options.quitOnImgClick) {
								quitLightbox();
								return false;
							}

							if (wasTouched(e.originalEvent)) {
								return true;
							}
							var posX = (e.pageX || e.originalEvent.pageX) - e.target.offsetLeft;
							if (imageWidth / 2 > posX) {
								loadPreviousImage();
							} else {
								loadNextImage();
							}
						})
						.on('touchstart pointerdown MSPointerDown', function(e) {
							if (!wasTouched(e.originalEvent) || options.quitOnImgClick) {
								return true;
							}
							if (isCssTransitionSupport) {
								imagePosLeft = parseInt(image.css('left'));
							}
							swipeStart = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
						})
						.on('touchmove pointermove MSPointerMove', function(e) {
							if (!wasTouched(e.originalEvent) || options.quitOnImgClick) {
								return true;
							}
							e.preventDefault();
							swipeEnd = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
							swipeDiff = swipeStart - swipeEnd;
							if (isCssTransitionSupport) {
								cssTransitionTranslateX(image, -swipeDiff + 'px', 0);
							} else {
								image.css('left', imagePosLeft - swipeDiff + 'px');
							}
						})
						.on('touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel', function(e) {
							if (!wasTouched(e.originalEvent) || options.quitOnImgClick) {
								return true;
							}
							if (Math.abs(swipeDiff) > 50) {
								if (swipeDiff < 0) {
									loadPreviousImage();
								} else {
									loadNextImage();
								}
							} else {
								if (isCssTransitionSupport) {
									cssTransitionTranslateX(image, 0 + 'px', options.animationSpeed / 1000);
								} else {
									image.animate({
										'left': imagePosLeft + 'px'
									}, options.animationSpeed / 2);
								}
							}
						});

				}, options.animationSpeed + 100);
			},

			loadPreviousImage = function() {
				if (options.previousTarget() !== false) {
					loadImage('left');
				}
			},

			loadNextImage = function() {
				if (options.nextTarget() !== false) {
					loadImage('right');
				}
			},
			removeImage = function() {
				if (!image.length) {
					return false;
				}
				image.remove();
				image = $();
			},

			quitLightbox = function() {
				if (!image.length) {
					return false;
				}
				image.animate({
					'opacity': 0
				}, options.animationSpeed, function() {
					removeImage();
					inProgress = false;
					if (options.onEnd !== false) {
						options.onEnd();
					}
				});
			};

		$(window).on('resize', setImage);

		if (options.quitOnDocClick) {
			$(document).on(hasTouch ? 'touchend' : 'click', function(e) {
				if (image.length && !$(e.target).is(image)) {
					e.preventDefault();
					quitLightbox();
				}
			});
		}

		if (options.enableKeyboard) {
			$(document).on('keyup', function(e) {
				if (!image.length) {
					return true;
				}
				e.preventDefault();
				if (e.keyCode === 27 && options.quitOnEscKey === true) {
					quitLightbox();
				}
				if (e.keyCode === 37) {
					loadPreviousImage();
				} else if (e.keyCode === 39) {
					loadNextImage();
				}
			});
		}

		this.startImageLightbox = function(e) {
			if (!isTargetValid(this)) {
				return true;
			}
			if (e !== undefined) {
				e.preventDefault();
			}
			if (inProgress) {
				return false;
			}
			inProgress = false;
			if (options.onStart !== false) {
				options.onStart();
			}
			target = $(this);
			loadImage();
		};

		$(document).off('click', this.selector);
		$(document).on('click', this.selector, this.startImageLightbox);

		this.each(function() {
			if (!isTargetValid(this)) {
				return true;
			}
			targets = targets.add($(this));
		});

		this.loadPreviousImage = function() {
			loadPreviousImage();
		};

		this.loadNextImage = function() {
			loadNextImage();
		};

		this.quitImageLightbox = function() {
			quitLightbox();
			return this;
		};

		// You can add the other targets to the image queue.
		this.addImageLightbox = function(elements) {
			elements.each(function() {
				if (!isTargetValid(this)) {
					return true;
				}
				targets = targets.add($(this));
			});
			elements.click(this.startImageLightbox);
			return this;
		};
		return this;
	};

})(jQuery, window, document);


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

		$('.modal-close').on('click', function() {
			$modal.fadeOut(animSpeed);
		});

		return $modal;
	};

}(jQuery, window, document));


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


/* ========================================
10. Ensemble draws
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleDraws = function( /*options*/ ) {

		var $draws = this;

		$('.draw__header').on('click', function() {
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


/* ========================================
10. Ensemble tabs
Copyright Ensemble framework
@preserve
======================================== */

(function($, window, document, undefined) {
	'use strict';

	$.fn.ensembleTabs = function( /*options*/ ) {

		var $tabs = this;

		$('.list-item--tabs').click(function() {
			var tabId = $(this).attr('data-tab');

			$('.list-item--tabs').removeClass('current-list-tab');
			$('.tabs__content').removeClass('current-content-tab');

			$(this).addClass('current-list-tab');
			$('#' + tabId).addClass('current-content-tab');
		});

		return $tabs;
	};

}(jQuery, window, document));


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

		$('.notice__close').on('click', function() {
			$('.notice').fadeOut(300);
		});

		return $notices;
	};

}(jQuery, window, document));

/* ========================================
12. Fitvids
opyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
Released under the WTFPL license - http://sam.zoy.org/wtfpl/
@preserve
======================================== */

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
