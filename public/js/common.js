"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Close",
					NEXT: "Next",
					PREV: "Previous" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// tabs
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	var x = window.location.host;
	var screenName;
	screenName = '06.png';

	if (screenName && x === "localhost:3000") {
		$(".footer").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>")); //$(".footerCart").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	$(document).on('click', '.btn-top', function () {
		var th = $(this);
		$('html, body').animate({
			scrollTop: 0
		}, 100, function () {
			th.removeClass('show');
		});
	});

	function whenResize() {
		var topH = document.documentElement.clientHeight / 2;

		if ($(window).scrollTop() > topH) {
			$('.btn-top  ').addClass('show');
		} else {
			$('.btn-top  ').removeClass('show');
		}
	}

	window.addEventListener('resize ', function () {
		whenResize();
	}, {
		passive: true
	});
	$(window).scroll(function () {
		whenResize();
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	};

	$(".footer__title").click(function () {
		$(this).toggleClass('active').next().slideToggle();
	}); //dd js

	function CloseMissOnClick() {
		if (event.target.closest('.dd-js') !== this) {
			$(this).removeClass('active');
			document.removeEventListener('click', closeFunc);
		}
	}

	var closeFunc;
	$('.dd-btn-js').click(function () {
		document.removeEventListener('click', closeFunc);
		event.stopPropagation();
		var currDd = this.parentElement;
		$('.dd-js').each(function () {
			if (this !== currDd) {
				$(this).removeClass('active');
			} else {
				$(this).toggleClass('active');
			}
		});
		closeFunc = CloseMissOnClick.bind(this.parentElement);
		document.addEventListener('click', closeFunc);
	}); //usageSlider

	$('.sUsage').each(function () {
		var usageSlider = new Swiper($(this).find('.usage-slider-js'), {
			slidesPerView: "auto",
			watchOverflow: true,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 100
			},
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				768: {
					spaceBetween: 0
				}
			},
			//pugination
			pagination: {
				el: $(this).find('.usage-pugin--js'),
				clickable: true
			},
			//nav
			navigation: {
				nextEl: $(this).find('.usage-next--js'),
				prevEl: $(this).find('.usage-prev--js')
			}
		});
	}); //usageSlider

	$('.sCatalog').each(function () {
		var catalogSlider = new Swiper($(this).find('.catalog-slider-js'), {
			slidesPerView: "auto",
			//watchOverflow: true,
			spaceBetween: 17,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 5
			},
			//pugination
			pagination: {
				el: $(this).find('.catalog-pugin--js'),
				clickable: true
			},
			//nav
			navigation: {
				nextEl: $(this).find('.catalog-next--js'),
				prevEl: $(this).find('.catalog-prev--js')
			}
		});
	}); //

	var cleanSlider = new Swiper('.clean-slider-js', {
		slidesPerView: "auto",
		watchOverflow: true,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10
		},
		//pugination
		pagination: {
			el: $(this).find('.clean-pugin--js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: $(this).find('.clean-next--js'),
			prevEl: $(this).find('.clean-prev--js')
		}
	}); //promo slider

	var promoSlider = new Swiper('.promo-slider-js', {
		slidesPerView: "auto",
		watchOverflow: true,
		breakpoints: {
			0: {
				spaceBetween: 30
			},
			576: {
				spaceBetween: 50
			},
			768: {
				spaceBetween: 70
			}
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		},
		//pugination
		pagination: {
			el: $(this).find('.promo-pugin--js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: $(this).find('.promo-next--js'),
			prevEl: $(this).find('.promo-prev--js')
		}
	}); //newsSlider

	var newsSlider = new Swiper('.news-slider-js', {
		slidesPerView: "auto",
		breakpoints: {
			0: {
				spaceBetween: 20
			},
			1024: {
				spaceBetween: 0
			}
		},
		//pugin
		pagination: {
			el: $(this).find('.news-pugin--js'),
			clickable: true
		},
		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		}
	}); //socMediaSlider

	var socMediaSlider = new Swiper('.soc-m-slider-js', {
		slidesPerView: "auto",
		loop: true,
		breakpoints: {
			0: {
				spaceBetween: 15
			},
			768: {
				spaceBetween: 20
			}
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10
		}
	}); //hSlider

	var hSlider = new Swiper('.h-slider-js', {
		slidesPerView: "auto",
		loop: true,
		//watchOverflow: true,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		},
		//pugination
		pagination: {
			el: $(this).find('.h-pugin--js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: $(this).find('.h-slide-next--js'),
			prevEl: $(this).find('.h-slide-prev--js')
		}
	}); //menu js

	$('.burger-js').click(function () {
		//close dt all submenu
		closeSubMenu(); //decorative toggle

		$(this).toggleClass('active'); //xl

		$('.navMenu--js').toggleClass('active'); //down xl

		$('.mob-menu--js').toggleClass('active');
		$('body').toggleClass('fixed2');
	}); //dt-menu-toggle

	$('.menu-link-js').click(function () {
		event.preventDefault();
		var self = this;
		$('.menu-link-js').each(function () {
			if (this === self) {
				$(this).toggleClass('active');
				$(this.parentElement).find('.dt-dd-menu--js').toggleClass('active');
			} else {
				$(this).removeClass('active');
				$(this.parentElement).find('.dt-dd-menu--js').removeClass('active');
			}
		});
	}); //close on resize/scroll prevent all display bugs connected with menu usage on diff screen sizes

	window.addEventListener('scroll', function () {
		if (window.matchMedia("(min-width: 1024px)").matches) {
			closeAllMenu();
		}
	}, {
		passive: true
	});
	window.addEventListener('resize', function () {
		if (window.matchMedia("(min-width: 1024px)").matches) {
			closeAllMenu();
		}
	}, {
		passive: true
	}); //
	//back btn

	$('.back-btn-js').click(function () {
		var currDD = this.closest('.dt-dd-menu--js');
		if (!currDD) return;
		currDD.classList.remove('active');
		var currLink = currDD.parentElement.querySelector('.menu-link-js');
		currLink.classList.remove('active');
	}); //close funcs

	function closeSubMenu() {
		$('.menu-link-js').each(function () {
			$(this).removeClass('active');
			$(this.parentElement).find('.dt-dd-menu--js').removeClass('active');
		});
	}

	function closeSubMenuXL() {
		$('.burger-js').removeClass('active');
		$('.navMenu--js').removeClass('active');
	}

	function closeSubMenuSM() {
		$('.burger-js').removeClass('active');
		$('.mob-menu--js').removeClass('active');
		$('body').removeClass('fixed2');
	}

	function closeAllMenu() {
		closeSubMenu();
		closeSubMenuXL();
		closeSubMenuSM();
	} //mob mnu slide toggle, desktop toggle killed with css


	$('.sb-title-js').click(function () {
		var self = this;
		var currDD = this.closest('.dt-dd-menu--js');
		$(currDD).find('.sb-title-js').each(function () {
			if (this === self) {
				$(this).toggleClass('active');
				$(this.nextElementSibling).slideToggle(function () {
					$(this).toggleClass('active');
				});
			} else {
				$(this).removeClass('active');
				$(this.nextElementSibling).slideUp(function () {
					$(this).removeClass('active');
				});
			}
		});
	}); //mob menu close(open in burger)

	$('.mob-menu--js').click(function () {
		if (window.matchMedia("(max-width: 1024px)").matches) {
			if (this === event.target) {
				closeSubMenuSM();
			}
		}
	});
	$('.close-sm-menu-js').click(closeSubMenuSM); //page 05

	$('.q-head-js').click(function () {
		$(this).toggleClass('active');
		$(this.parentElement).find('.q-descr-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	}); //img-svg

	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	}); //prod card

	var prodCardThumb = new Swiper('.prod-thumb-js', {
		slidesPerView: 'auto',
		breakpoints: {
			1: {
				direction: 'horizontal',
				spaceBetween: 10
			},
			// 1024: {
			// 	direction: 'vertical',
			// 	spaceBetween: 10,
			// },
			1300: {
				direction: 'vertical',
				spaceBetween: 8
			}
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6
		}
	});
	var prodCardSlider = new Swiper('.prod-slider-js', {
		spaceBetween: 20,
		thumbs: {
			swiper: prodCardThumb
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3
		},
		loop: true,
		//pugination
		pagination: {
			el: $(this).find('.prod-pugin--js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: $(this).find('.prod-next--js'),
			prevEl: $(this).find('.prod-prev--js')
		}
	}); //end prod card
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}