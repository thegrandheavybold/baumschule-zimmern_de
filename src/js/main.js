//JS Support check and touch screen check
var html = document.querySelector("html");
  html.classList.remove("no-js");
  html.classList.add("js");

function is_touch_device() {
  return !!('ontouchstart' in window);
}

  if(is_touch_device()) {
    html.classList.add("touch");
    html.classList.remove("no-touch");
  }
  else {
    html.classList.remove("touch");
    html.classList.add("no-touch");
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

document.addEventListener('DOMContentLoaded', function() {
  const scrollDown = document.getElementById('scrollDown');
  const introSection = document.getElementById('intro');
  
  if (scrollDown && introSection) {
    scrollDown.addEventListener('click', function() {
      // Calculate the new scroll position and scroll
      const newPosition = introSection.offsetTop + 15;
      window.scrollTo({
        top: newPosition
      });
    });
  }
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


document.addEventListener('DOMContentLoaded', function() {
  // Get a reference to the "Detailansicht" span
  const detailSpan = document.getElementById('detail_oc');

  // Get a reference to the "phase_detail__more" element
  const detailElement = document.querySelector('.phase_detail__more');

  // Get a reference to the section to scroll to
  const planungsprozessSection = document.getElementById('planungsprozess');

  // Initialize a variable to track the state (open/closed)
  let isOpen = false;

  // Check if the "Detailansicht" span and "phase_detail__more" element exist
  if (detailSpan && detailElement) {
    // Add a click event listener to the "Detailansicht" span
    detailSpan.addEventListener('click', function() {
      // Toggle the state (open/closed)
      isOpen = !isOpen;

      // Toggle the "is_open" class on the "phase_detail__more" element
      detailElement.classList.toggle('is_open', isOpen);

      // Check if the state is closed (second click)
      if (!isOpen && planungsprozessSection) {
        // Scroll to the top of the "planungsprozess" section
        planungsprozessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
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
const oov = gsap.utils.toArray('[data="oov"]');
  oov.forEach(oov => {
    gsap.from(oov, {
    y: 50,
    opacity: 0,
      scrollTrigger: {
        trigger: oov,
        scrub: 4,
        end: "bottom 90%"
      }
    })
});

//Paralax
gsap.to(".para", {
  scrollTrigger: {
    scrub: true
  }, 
  y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
  ease: "none"
});

//Swiper js Sliders
import 'swiper-sliders.js'


// Include Lightbox > DimBox
import dimbox from 'dimbox';

//Lightbox Configurations
dimbox.setConfig({
    showDownloadButton: false,
    svgCloseButton: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.70711" y1="2.29289" x2="29.7071" y2="30.2929" stroke-width="2" stroke-linejoin="round"/><line x1="29.7071" y1="0.707107" x2="1.70711" y2="28.7071" stroke-width="2" stroke-linejoin="round"/></svg>',
    svgPrevNextButton: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="62" height="62" stroke-width="2"/><path d="M28 23L36 32L28 41" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/></svg>'
});


// Get the main and footer elements by their ids
const mainElement = document.querySelector('main');
const footerElement = document.querySelector('footer');

 // Get the button element by its id
  const toggleButton = document.getElementById('menubutton');

  // Toggle the 'mm__isopen' class on the main and footer elements when the button is clicked
  toggleButton.addEventListener('click', function() {
      if (mainElement.classList.contains('mm__isopen')) {
          // If main is hidden, show it along with the footer
          mainElement.classList.remove('mm__isopen');
          footerElement.classList.remove('mm__isopen');
      } else {
          // If main is visible, mm__isopen it along with the footer
          mainElement.classList.add('mm__isopen');
          footerElement.classList.add('mm__isopen');
      }
  });


import 'formValidation.js'

import mixitup from 'mixitup';
 
var containerEl = document.querySelector('.gllry__content');
var mixer;

if (containerEl) {
  mixer = mixitup('.gllry__content', {
    animation: {
        effects: 'fade scale(0.7)',
        easing: 'ease-in-out'
    },
    controls: {
          toggleDefault: 'none',
          toggleLogic: 'or'
      }
  });
}