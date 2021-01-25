const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

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
					PREV: "Previous",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// tabs
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {

		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(".scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);
			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	var x = window.location.host;
	let screenName;
	screenName = '08-red.png';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
		//$(".footerCart").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	$(document).on('click', '.btn-top', function () {
		let th = $(this);
		$('html, body').animate({ scrollTop: 0 }, 100, function () {
			th.removeClass('show')

		});
	})
	function whenResize() {
		const topH = document.documentElement.clientHeight / 2;
		if ($(window).scrollTop() > topH) {
			$('.btn-top  ').addClass('show');
		} else {
			$('.btn-top  ').removeClass('show');
		}

	}

	window.addEventListener('resize ', () => {
		whenResize();

	}, { passive: true });
	$(window).scroll(function () {
		whenResize();

	});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}
	$(".footer__title").click(function () {
		$(this).toggleClass('active').next().slideToggle()
	})


	//dd js
	function CloseMissOnClick(){
		if (event.target.closest('.dd-js') !== this){
			$(this).removeClass('active');
			document.removeEventListener('click', closeFunc);
		}
	}
	let closeFunc;
	$('.dd-btn-js').click(function (){
		document.removeEventListener('click', closeFunc);
		event.stopPropagation();

		let currDd = this.parentElement;
		$('.dd-js').each(function (){
			if (this !== currDd){
				$(this).removeClass('active');
			}
			else{
				$(this).toggleClass('active');
			}
		});

		closeFunc = CloseMissOnClick.bind(this.parentElement);
		document.addEventListener('click', closeFunc)
	})

	//usageSlider
	$('.sUsage').each(function (){
		let usageSlider = new Swiper($(this).find('.usage-slider-js'), {
			slidesPerView: "auto",
			watchOverflow: true,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 100,
			},

			breakpoints: {
				0: {
					spaceBetween: 20,
				},
				768: {
					spaceBetween: 0,
				},
			},
			//pugination
			pagination: {
				el: $(this).find('.usage-pugin--js'),
				clickable: true,
			},
			//nav
			navigation: {
				nextEl: $(this).find('.usage-next--js'),
				prevEl: $(this).find('.usage-prev--js'),
			},

		});
	});

	//usageSlider
	$('.sCatalog').each(function (){
		let catalogSlider = new Swiper($(this).find('.catalog-slider-js'), {
			slidesPerView: "auto",
			//watchOverflow: true,
			spaceBetween: 17,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 5,
			},

			//pugination
			pagination: {
				el: $(this).find('.catalog-pugin--js'),
				clickable: true,
			},

			//nav
			navigation: {
				nextEl: $(this).find('.catalog-next--js'),
				prevEl: $(this).find('.catalog-prev--js'),
			},
		});
	});

	//
	let cleanSlider = new Swiper('.clean-slider-js', {
		slidesPerView: "auto",
		watchOverflow: true,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},

		//pugination
		pagination: {
			el: $(this).find('.clean-pugin--js'),
			clickable: true,
		},

		//nav
		navigation: {
			nextEl: $(this).find('.clean-next--js'),
			prevEl: $(this).find('.clean-prev--js'),
		},
	});
	//promo slider
	let promoSlider = new Swiper('.promo-slider-js', {
		slidesPerView: "auto",
		watchOverflow: true,

		breakpoints: {
			0 : {
				spaceBetween: 30,
			},
			576 : {
				spaceBetween: 50,
			},
			768 : {
				spaceBetween: 70,
			},
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},

		//pugination
		pagination: {
			el: $(this).find('.promo-pugin--js'),
			clickable: true,
		},

		//nav
		navigation: {
			nextEl: $(this).find('.promo-next--js'),
			prevEl: $(this).find('.promo-prev--js'),
		},
	});

	//newsSlider
	let newsSlider = new Swiper('.news-slider-js', {
		slidesPerView: "auto",
		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			1024: {
				spaceBetween: 0,
			}
		},
		//pugin
		pagination: {
			el: $(this).find('.news-pugin--js'),
			clickable: true,
		},

		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
	});

	//socMediaSlider
	let socMediaSlider = new Swiper('.soc-m-slider-js', {
		slidesPerView: "auto",
		loop: true,
		breakpoints: {
			0: {
				spaceBetween: 15,
			},
			768: {
				spaceBetween: 20,
			}
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},
	});

	//hSlider
	let hSlider = new Swiper('.h-slider-js', {
		slidesPerView: "auto",
		loop: true,
		//watchOverflow: true,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},

		//pugination
		pagination: {
			el: $(this).find('.h-pugin--js'),
			clickable: true,
		},

		//nav
		navigation: {
			nextEl: $(this).find('.h-slide-next--js'),
			prevEl: $(this).find('.h-slide-prev--js'),
		},
	});
	//menu js
	$('.burger-js').click(function (){
		//close dt all submenu
		closeSubMenu();

		//decorative toggle
		$(this).toggleClass('active');

		//xl
		$('.navMenu--js').toggleClass('active');

		//down xl
		$('.mob-menu--js').toggleClass('active');
		$('body').toggleClass('fixed2');
	});

	//dt-menu-toggle
	$('.menu-link-js').click(function (){
		event.preventDefault();

		let self = this;
		$('.menu-link-js').each(function (){
			if (this === self){
				$(this).toggleClass('active');
				$(this.parentElement).find('.dt-dd-menu--js').toggleClass('active');
			}
			else{
				$(this).removeClass('active');
				$(this.parentElement).find('.dt-dd-menu--js').removeClass('active');
			}
		});
	});

	//close on resize/scroll prevent all display bugs connected with menu usage on diff screen sizes
	window.addEventListener('scroll', function (){
		if (window.matchMedia("(min-width: 1024px)").matches) {
			closeAllMenu();
		}
	}, {passive: true});
	window.addEventListener('resize', function (){
		if (window.matchMedia("(min-width: 1024px)").matches) {
			closeAllMenu();
		}
	}, {passive: true});
	//

	//back btn
	$('.back-btn-js').click(function (){
		let currDD = this.closest('.dt-dd-menu--js');
		if (!currDD) return
		currDD.classList.remove('active');

		let currLink = currDD.parentElement.querySelector('.menu-link-js');
		currLink.classList.remove('active');
	});

	//close funcs
	function closeSubMenu(){
		$('.menu-link-js').each(function (){
			$(this).removeClass('active');
			$(this.parentElement).find('.dt-dd-menu--js').removeClass('active');
		});
	}
	function closeSubMenuXL(){
		$('.burger-js').removeClass('active');
		$('.navMenu--js').removeClass('active');
	}
	function closeSubMenuSM(){
		$('.burger-js').removeClass('active');
		$('.mob-menu--js').removeClass('active');
		$('body').removeClass('fixed2');
	}
	function closeAllMenu(){
		closeSubMenu();
		closeSubMenuXL();
		closeSubMenuSM();
	}

	//mob mnu slide toggle, desktop toggle killed with css
	$('.sb-title-js').click(function (){
		let self = this;
		let currDD = this.closest('.dt-dd-menu--js');

		$(currDD).find('.sb-title-js').each(function (){
			if (this === self){
				$(this).toggleClass('active');
				$(this.nextElementSibling).slideToggle(function (){
					$(this).toggleClass('active');
				});
			}
			else{
				$(this).removeClass('active');
				$(this.nextElementSibling).slideUp(function (){
					$(this).removeClass('active');
				});
			}
		});
	});

	//mob menu close(open in burger)
	$('.mob-menu--js').click(function (){
		if (window.matchMedia("(max-width: 1024px)").matches) {
			if (this === event.target){
				closeSubMenuSM();
			}
		}
	});
	$('.close-sm-menu-js').click(closeSubMenuSM);


	//page 05
	$('.q-head-js').click(function (){
		$(this).toggleClass('active');
		$(this.parentElement).find('.q-descr-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});

	//img-svg
	$('img.img-svg-js').each(function () {
		var $img = $(this);
		console.log(this);
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
	});


	//prod card
	let prodCardThumb = new Swiper('.prod-thumb-js', {
		slidesPerView: 'auto',

		breakpoints: {
			1: {
				direction: 'horizontal',
				spaceBetween: 10,
			},
			1300: {
				direction: 'vertical',
				spaceBetween: 8,
			},
		},

		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},

	});
	let prodCardSlider = new Swiper('.prod-slider-js', {
		spaceBetween: 20,

		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		loop: true,
		//pugination
		pagination: {
			el: $(this).find('.prod-pugin--js'),
			clickable: true,
		},

		//nav
		navigation: {
			nextEl: $(this).find('.prod-next--js'),
			prevEl: $(this).find('.prod-prev--js'),
		},

	});
	//end prod card

	//vanilla js .scroll-link
	function smoothScroll(qSelector){
		let elements = document.querySelectorAll(qSelector);
		if (elements.length === 0) return

		for (let elem of elements){

			elem.addEventListener('click', function () {
				let destinyID = this.getAttribute('href');
				event.preventDefault();

				let destinyElem = document.querySelector(destinyID);
				if (!destinyElem) return

				let destinyTop = getCoords(destinyElem).top;

				window.scrollTo({
					top: destinyTop,
					behavior: "smooth"
				});

			});
		}
	}
	smoothScroll('.ancor-js');
	function getCoords(elem) { // crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}
	//category menu js
	$('.cat-title-js').click(function (){
		event.preventDefault();

		$(this).toggleClass('active');
		$(this.parentElement).find('.cat-sbmnu-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});


	//- TODO
	// 1 clean js file
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
