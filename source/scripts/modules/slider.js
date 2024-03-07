const sliders = document.querySelectorAll(".swiper-container");
const thumbs = document.querySelector(".slider-thumbs");

const defaultSliderOptions = {
  speed: 2200,
  watchOverflow: true,
  observer: true,
  resizeObserver: true,
  loop: true,
};

const initSlider = (elem) => {
  if (!elem) return;

  const sliderOptions = { ...defaultSliderOptions };

  if (elem.hasAttribute("data-autoplay")) {
    sliderOptions.autoplay = {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }

  if (elem.hasAttribute("data-slides")) {
    sliderOptions.breakpoints = {
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    };
  }

  if (elem.hasAttribute("data-navigation")) {
    sliderOptions.navigation = {
      nextEl: ".button--right",
      prevEl: ".button--left",
    };
  }

  if (elem.hasAttribute("data-pagination")) {
    sliderOptions.pagination = {
      el: ".slider-pagination",
      type: "bullets",
      clickable: true,
      dinamicBullets: true,
    };
  }

  if (elem.hasAttribute("data-with-thumbs")) {
    sliderOptions.thumbs = {
      swiper: thumbs,
    };
  }

  if (elem.hasAttribute("data-thumb")) {
    sliderOptions.breakpoints = {
      480: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    };
  }

  const swiper = new Swiper(elem, sliderOptions);
};

if (sliders.length > 0) {
  sliders.forEach((elem) => {
    initSlider(elem);
  });
}
