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
$(window).on('load', function() {
	$('.animated-parent').appear();
	$('.animate-on-click').on('click', function() {
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
$(window).on('load', function() {
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
