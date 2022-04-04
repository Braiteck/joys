$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper-container').each(function (i) {
		$(this).addClass('products_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 16,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 3
					}
				}
			}

		productsSliders.push(new Swiper('.products_s' + i, options))

		if (slides > productsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productsSliders[i].destroy(true, true)
			productsSliders[i] = new Swiper('.products_s' + i, options)
		}
	})


	// Карусель статей
	const articlesSliders = []

	$('.articles .swiper-container').each(function (i) {
		$(this).addClass('articles_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 0,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
								'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
							)
						})
					},
					resize: swiper => {
						setTimeout(() => {
							$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
								'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
							)
						})
					}
				}
			}

		articlesSliders.push(new Swiper('.articles_s' + i, options))

		if (slides > articlesSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			articlesSliders[i].destroy(true, true)
			articlesSliders[i] = new Swiper('.articles_s' + i, options)
		}
	})


	// Товар - смена цвета
	$('.product .colors .btn').click(function (e) {
		e.preventDefault()

		let btnIndex = $(this).index(),
			parent = $(this).closest('.product')

		parent.find('.colors .btn').removeClass('active')
		$(this).addClass('active')

		parent.find('.thumb img').hide()
		parent.find('.thumb img').eq(btnIndex).fadeIn(200)
	})


	// Подменю
	$('header .menu .item > a.sub_link').addClass('touch_link')

	$('header .menu .item > a.sub_link').click(function (e) {
		const $dropdown = $(this).next()

		if ($dropdown.css('visibility') === 'hidden') {
			e.preventDefault()

			$('header .menu .sub_menu').removeClass('show')
			$dropdown.addClass('show')

			initModelsSlider($dropdown.find('#shop_tab1'))
		}
	})

	$('header .menu .sub_menu .close_btn').click(function (e) {
		e.preventDefault()

		$('header .menu .sub_menu').removeClass('show')
	})

	// Закрываем Подменю при клике за её пределами
	$(document).click((e) => {
		if ($(e.target).closest('.menu').length === 0) {
			$('header .menu .sub_menu').removeClass('show')
		}
	})


	// Корзина
	$('header .btns .cart_btn, .mob_header .btns .cart_btn').click(function (e) {
		e.preventDefault()

		$('.auth_info').removeClass('show')
		if ($(window).width() < 1024) { $('header').removeClass('show') }

		$('body').addClass('menu_open')
		$('.overlay').fadeIn(300)
		$('.cart_info').removeClass('mob_hide').addClass('show')
	})


	// Авторизация
	$('header .btns .auth_btn, .mob_header .btns .auth_btn').click(function (e) {
		e.preventDefault()

		$('.cart_info').removeClass('show')
		if ($(window).width() < 1024) { $('header').removeClass('show') }

		$('body').addClass('menu_open')
		$('.overlay').fadeIn(300)
		$('.auth_info.login').addClass('show')
	})

	// Авторизация - Регистрация
	$('.auth_info .form .register_btn').click(function (e) {
		e.preventDefault()

		$('.auth_info.login').removeClass('show')

		$('body').addClass('menu_open')
		$('.overlay').fadeIn(300)
		$('.auth_info.register').addClass('show')
	})


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.auth_info, .cart_info').removeClass('show')

		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})


	// Залипание блока
	$('.sticky').stick_in_parent()


	$('.overlay').click((e) => {
		e.preventDefault()

		$('body').removeClass('menu_open')
		$('.overlay').fadeOut(200)
		$('.cart_info, .auth_info, header').removeClass('show')
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



function initModelsSlider(parent) {
	// Карусель моделей
	const modelsSliders = []

	parent.find('.swiper-container').each(function (i) {
		$(this).addClass('models_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 20,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 4
					}
				}
			}

		modelsSliders.push(new Swiper('.models_s' + i, options))

		if (slides > modelsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			modelsSliders[i].destroy(true, true)
			modelsSliders[i] = new Swiper('.models_s' + i, options)
		}
	})
}