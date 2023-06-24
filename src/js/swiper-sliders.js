//SWIPER
// import Swiper bundle with all modules installed
import Swiper, { Lazy, Pagination, Navigation, Autoplay, EffectFade, EffectCards } from 'swiper';

//Index Slider
const indexSwiper = new Swiper('.index_swiper', {
  // Optional parameters
  loop: true,
  preloadImages: false,
  lazy: false,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Autoplay, Lazy, EffectFade],

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  lazy: {
    loadPrevNext: false
   },

  speed: 800,
  autoplay: {
    delay: 8000
  },

});

//Galerie Slider
const sldr = new Swiper('.sldr', {
  // Optional parameters
  loop: false,
  preloadImages: false,
  lazy: false,
  spaceBetween: 32,

  modules: [Pagination, Lazy, Navigation],

  lazy: {
    loadPrevNext: false
   },

   // If we need pagination
   pagination: {
     el: '.swiper-pagination',
     type: 'bullets',
     clickable: true
   },
   navigation: {
     nextEl: '.swiper-btn-next',
     prevEl: '.swiper-btn-prev'
   },
   renderBullet: function (index, className) {
     return '<span class="' + className + '">' + (index + 1) + '</span>';
   },

   breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2.5,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },

});


//Reasons Slider
const reasonsSwiper = new Swiper('.reasons_swiper', {
  // Optional parameters
  loop: false,
  preloadImages: false,
  lazy: false,

  modules: [Pagination, Lazy,],

  lazy: {
    loadPrevNext: false
   },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },

});
