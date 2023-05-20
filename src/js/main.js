//JS Support check and touch screen check
var html = document.querySelector("html");
  html.classList.remove("no-js");
  html.classList.add("js");

function is_touch_device() {
  return !!('ontouchstart' in window);
}

  if(is_touch_device()) {
    html.classList.add("touch");
  }
  else {
    html.classList.remove("touch");
  }

import 'navigation.js'

//Shrinking Header on Scroll
window.addEventListener('scroll', function(){

  const target = document.querySelector('header');
    var sticky = target.offsetTop + 100;

    if (window.pageYOffset > sticky) {
      target.classList.add('sticky');
    } else {
       target.classList.remove('sticky');
    }

});

//Scroll & Parallax Function
window.addEventListener('scroll', function() {

  const target = document.querySelector('.lax');

  var scrolled = window.pageYOffset;
  var rate = scrolled * .35;

    if (target){
      target.style.transform = 'translate3D(0px, '+rate+'px, 0px)';
    }

});


//Smooth Scroll to Top function
document.querySelector('.scrollUp').addEventListener('click', function(){
  scrollTo(0, 0);
});


//Fade in when in view Function
const inViewport = (entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is_inview", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {
  threshold: 1
};

// Attach observer to every [data-inview] element:
const ELs_inViewport = document.querySelectorAll('[data]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});




//Detail toggle more Content
const button = document.querySelector('#detail_oc');
const more = document.querySelector('.phase_detail__more');
window.addEventListener('click', () => {
  more.classList.toggle("is_open");
  button.classList.toggle("is_open");
});

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


//Import Accordion js
import Accordion from 'accordion-js';
const accordions = Array.from(document.querySelectorAll('.accordion-container'));

// User options
new Accordion(accordions, {
  duration: 400,
  showMultiple: false,
  ariaEnabled: true,
  onOpen: function(currentElement) {
  console.log(currentElement);
  }
});


import  gsap  from 'gsap';
import  ScrollTrigger  from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//gsap outofview fadeUp
const oov = gsap.utils.toArray('.oov');
  oov.forEach(oov => {
    gsap.from(oov, {
    y: 150,
    opacity: 0,
      scrollTrigger: {
        trigger: oov,
        scrub: 2,
        end: "bottom 90%"
      }
    })
});
