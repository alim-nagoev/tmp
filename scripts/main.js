// INVOKED FUNCTION
(function () {
	// mobile menu
	const hamburger = document.querySelector('.hamburger');
	const menu = document.querySelector('.header__wrapper');
	// events
	hamburger.addEventListener('click', function () {
		hamburger.classList.toggle('is-active');
		menu.classList.toggle('header__wrapper--open');
	})
	//-------------------------------------------
	// scroll to section
	const headerNavLinks = document.querySelectorAll('.menu__link');
	// events
	headerNavLinks.forEach(function (target) {
		target.addEventListener('click', function (e) {
			e.preventDefault();
			smoothScroll.scrollTo(this.getAttribute('href'), 800);
			menu.classList.remove('header__wrapper--open');
			hamburger.classList.remove('is-active')
		})
	})
	//-------------------------------------------
	// swiper slider
	// about slider top
	const aboutThumbs = new Swiper('.about-controls', {
		spaceBetween: 10,
		slidesPerView: 3,
		breakpointsInverse: true,
		watchSlidesVisibility: true,
		breakpoints: {
			// when window width is >= 640px
			400: {
				watchSlidesVisibility: false,
			}
		}
	});
	// about slider bottom
	const aboutTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		thumbs: {
			swiper: aboutThumbs
		},

	});
	// competence slider top
	const competenceThumbs = new Swiper('.competence-controls', {
		spaceBetween: 10,
		slidesPerView: 'auto',
		// slidesPerView: 'auto',
		// centeredSlides: true,
		// freeMode: true,
		watchSlidesVisibility: true,
		// watchSlidesProgress: true,
		breakpointsInverse: true,
		breakpoints: {
			// when window width is >= 640px
			992: {
				freeMode: false,
				direction: 'vertical'
			}
		}
	});
	// competence slider bottom
	const competenceTop = new Swiper('.competence-thumbs', {
		spaceBetween: 10,
		thumbs: {
			swiper: competenceThumbs
		},
		grabCursor: false,
	});
	// case slider
	// var caseSwiper = new Swiper('.case-container', {
	// 	pagination: {
	// 		el: '.swiper-pagination',
	// 		clickable: true,
	// 	},
	// 	// autoHeight: true,
	// 	loop: true,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	slidesPerView: 1,
	// 	spaceBetween: 30,
	// });

	// DESTROY ON BREAKPOINT
	// Summery
	const caseTriggers = document.querySelectorAll('.case-slide__trigger--mobile');
	caseTriggers.forEach(item => item.addEventListener('click', event => {
		event.preventDefault();
		item.nextElementSibling.classList.toggle('show');
	}));

	// Яндекс карта
	ymaps.ready(init); // вызов функции
	//events
	function init() { // определение функции
		var map = new ymaps.Map('map', { //создаем новый конструктор для карты
			center: [55.7475, 37.5350], //определяем центр карты (http://webmap-blog.ru/tools/getlonglat-ymap2.html)
			zoom: 17, // определяем уровеь масштабирования
			controls: ['zoomControl'], // выбираем какие элементы управления отоброжать
			behaviors: ['drag'] // отключаем масштабирование - включаем перетаскивание
		});
		//Добавляем всплывающую подсказку (hint)
		var placemark = new ymaps.Placemark([55.7475, 37.5350], {
			hintContent: ' Разработка сайта — Телемарк' //контент хинта
		},
			//изображение хинта
			{
				iconLayout: 'default#image', //название
				iconImageHref: 'images/contacts/map_pin.svg', //источник
				iconImageSize: [53, 68], //размер
				iconImageOffset: [-40, -140] //координаты смещения
			});
		//вызываем метку с помощью коллекции geoObjects
		map.geoObjects.add(placemark);
	};


	const FloatLabel = (() => {

		// add active class and placeholder
		const handleFocus = (e) => {
			const target = e.target;
			target.parentNode.classList.add('active');
			target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
		};

		// remove active class and placeholder
		const handleBlur = (e) => {
			const target = e.target;
			if (!target.value) {
				target.parentNode.classList.remove('active');
			}
			target.removeAttribute('placeholder');
		};

		// register events
		const bindEvents = (element) => {
			const floatField = element.querySelector('input');
			floatField.addEventListener('focus', handleFocus);
			floatField.addEventListener('blur', handleBlur);
		};

		// get DOM elements
		const init = () => {
			const floatContainers = document.querySelectorAll('.float-container');

			floatContainers.forEach((element) => {
				if (element.querySelector('input').value) {
					element.classList.add('active');
				}

				bindEvents(element);
			});
		};

		return {
			init: init
		};
	})();

	FloatLabel.init();

})();



const modalOverlay = document.querySelector('.overlay'),
	modal = modalOverlay.querySelector('.modal'),
	modalCall = document.querySelectorAll('.call-modal'),
	modalExit = modal.querySelector('.modal__exit');

// functions

function showModal(event) {
	event.preventDefault();

	modalOverlay.classList.add('overlay--open');
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	event.preventDefault();
	// setTimeout(() => {
	modalOverlay.classList.remove('overlay--open');
	document.body.style.overflow = "inherit";
	// }, 1000);
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
}
// modal cart
modalCall.forEach(button => button.addEventListener('click', showModal))
modalExit.addEventListener('click', closeModal);

window.addEventListener("click", outsideClick);
window.addEventListener("keydown", outsideKeypress);
