"use strict";

// INVOKED FUNCTION
(function () {
	// mobile menu
	var hamburger = document.querySelector('.hamburger');
	var menu = document.querySelector('.header__wrapper'); // events

	hamburger.addEventListener('click', function () {
		hamburger.classList.toggle('is-active');
		menu.classList.toggle('header__wrapper--open');
	}); //-------------------------------------------
	// scroll to section

	var headerNavLinks = document.querySelectorAll('.menu__link'); // events

	headerNavLinks.forEach(function (target) {
		target.addEventListener('click', function (e) {
			e.preventDefault();
			smoothScroll.scrollTo(this.getAttribute('href'), 800);
			menu.classList.remove('header__wrapper--open');
			hamburger.classList.remove('is-active');
		});
	}); //-------------------------------------------
	// swiper slider
	// about slider top

	var aboutThumbs = new Swiper('.about-controls', {
		spaceBetween: 10,
		slidesPerView: 3,
		breakpointsInverse: true,
		watchSlidesVisibility: true,
		breakpoints: {
			// when window width is >= 640px
			400: {
				watchSlidesVisibility: false
			}
		}
	}); // about slider bottom

	var aboutTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		thumbs: {
			swiper: aboutThumbs
		}
	}); // competence slider top

	var competenceThumbs = new Swiper('.competence-controls', {
		spaceBetween: 10,
		slidesPerView: 'auto',
		watchSlidesVisibility: true,
		breakpointsInverse: true,
		breakpoints: {
			992: {
				freeMode: false,
				direction: 'vertical'
			}
		}
	}); // competence slider bottom

	var competenceTop = new Swiper('.competence-thumbs', {
		spaceBetween: 10,
		thumbs: {
			swiper: competenceThumbs
		}
	}); // case slider

	var caseSwiper = new Swiper('.case-container', {
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		breakpointsInverse: true,
		breakpoints: {
			1200: {
				slidesPerView: 'auto',
				spaceBetween: 44,
				watchSlidesVisibility: true
			},
			1600: {
				slidesPerView: 'auto',
				spaceBetween: 100
			}
		}
	}); // DESTROY ON BREAKPOINT
	// Summery

	var caseTriggers = document.querySelectorAll('.case-slide__trigger--mobile');
	caseTriggers.forEach(function (item) {
		return item.addEventListener('click', function (event) {
			event.preventDefault();
			item.nextElementSibling.classList.toggle('show');
		});
	}); // Яндекс карта

	ymaps.ready(init); //events

	function init() {
		var map = new ymaps.Map('map', {
			center: [55.7475, 37.5350],
			zoom: 17,
			controls: ['zoomControl'],
			behaviors: ['drag']
		});
		var placemark = new ymaps.Placemark([55.7475, 37.5350], {
			hintContent: ' Разработка сайта — Телемарк'
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/contacts/map_pin.svg',
			iconImageSize: [53, 68],
			iconImageOffset: [-40, -140]
		});
		map.geoObjects.add(placemark);
	}

	;

	var FloatLabel = function () {
		// add active class and placeholder
		var handleFocus = function handleFocus(e) {
			var target = e.target;
			target.parentNode.classList.add('active');
			target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
		}; // remove active class and placeholder


		var handleBlur = function handleBlur(e) {
			var target = e.target;

			if (!target.value) {
				target.parentNode.classList.remove('active');
			}

			target.removeAttribute('placeholder');
		}; // register events


		var bindEvents = function bindEvents(element) {
			var floatField = element.querySelector('input');
			floatField.addEventListener('focus', handleFocus);
			floatField.addEventListener('blur', handleBlur);
		}; // get DOM elements


		var init = function init() {
			var floatContainers = document.querySelectorAll('.float-container');
			floatContainers.forEach(function (element) {
				if (element.querySelector('input').value) {
					element.classList.add('active');
				}

				bindEvents(element);
			});
		};

		return {
			init: init
		};
	}();

	FloatLabel.init();


	var modalOverlay = document.querySelector('.overlay'),
		modal = modalOverlay.querySelector('.modal--client'),
		modalThanks = document.querySelector('.modal--thanks'),
		modalForm = document.querySelector('.form'),
		modalCall = document.querySelectorAll('.call-modal'),
		modalExit = document.querySelectorAll('.modal__exit');

	function showModal(event) {
		event.preventDefault();
		modalOverlay.classList.add('overlay--open');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		event.preventDefault();
		modalOverlay.classList.remove('overlay--open');
		document.body.style.overflow = "inherit";
	}

	function outsideClick(event) {
		if (event.target === modalOverlay) {
			modalOverlay.classList.remove('overlay--open');
			document.body.style.overflow = "inherit";
		}
	}

	function outsideKeypress(event) {
		if (event.keyCode == 27) {
			modalOverlay.classList.remove('overlay--open');
			document.body.style.overflow = "inherit";
		}
	} // modal cart


	modalCall.forEach(function (button) {
		return button.addEventListener('click', showModal);
	});
	modalExit.forEach(function (button) {
		return button.addEventListener('click', closeModal);
	});
	modalForm.addEventListener('submit', function (event) {
		event.preventDefault();
		modal.style.display = 'none';
		modalThanks.style.display = 'block';
	});
	window.addEventListener("click", outsideClick);
	window.addEventListener("keydown", outsideKeypress);
})();
