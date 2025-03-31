const slider = () => {
  const slider = document.getElementById("benefits");
  const sliderBlock = document.querySelector(".benefits-wrap");
  const slides = sliderBlock.querySelectorAll(".benefits__item");
  const arrowBlock = slider.querySelector(".benefits-arrows");
  const timeInterval = 5000;
  const showSlidesBlock = document.createElement("div");

  let slidesToShow = 3;
  let currentSlide = 0;
  let interval;
  showSlidesBlock.classList.add("slider-show-block");
  sliderBlock.append(showSlidesBlock);

  if (!sliderBlock || slides.length === 0) {
    return;
  }

  const sliderSettings = () => {
    sliderBlock.classList.add("slider");
    slides.forEach((slide) => {
      slide.classList.add("slide");
    });
  };

  const showFirstSlides = () => {
    for (let i = 0; i < slidesToShow; i++) {
      slides[i % slides.length].classList.add("active");
      showSlidesBlock.append(slides[i % slides.length]);
    }
  };

  const hideAllSlides = () => {
    slides.forEach((slide) => slide.classList.remove("active"));
  };

  const showCurrentSlides = () => {
    showSlidesBlock.innerHTML = "";
    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = (currentSlide + i) % slides.length;
      const cloneSlide = slides[slideIndex].cloneNode(true);
      showSlidesBlock.append(cloneSlide);
      setTimeout(() => {
        cloneSlide.classList.add("active");
      }, 100);
    }
  };

  const autoSlide = () => {
    hideAllSlides();
    currentSlide = (currentSlide + slidesToShow) % slides.length;
    showCurrentSlides();
  };

  const startSlider = () => {
    interval = setInterval(autoSlide, timeInterval);
  };

  const stopSlider = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllSlides();

    if (e.target.closest(".benefits__arrow--left")) {
      currentSlide = (currentSlide - slidesToShow + slides.length) % slides.length;
    } else if (e.target.closest(".benefits__arrow--right")) {
      currentSlide = (currentSlide + slidesToShow) % slides.length;
    }

    showCurrentSlides();
  });

  arrowBlock.addEventListener("mouseenter", () => {
    stopSlider();
  });

  arrowBlock.addEventListener("mouseleave", () => {
    startSlider();
  });

  const handleResize = () => {
    let isCompleted = true;
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 576 && isCompleted) {
        showSlidesBlock.innerHTML = "";
        slidesToShow = 1;
        stopSlider();
        showFirstSlides();
        startSlider();
        isCompleted = false;
      }
      if (window.innerWidth > 576 && !isCompleted) {
        showSlidesBlock.innerHTML = "";
        slidesToShow = 3;
        stopSlider();
        showFirstSlides();
        startSlider();
        isCompleted = true;
      }
    });
    if (window.innerWidth <= 1210) {
      showSlidesBlock.style.flexDirection = "column";
      showSlidesBlock.style.gap = "0";
    }
    if (window.innerWidth <= 576) {
      slidesToShow = 1;
    }
  };

  handleResize();
  sliderSettings();
  showFirstSlides();
  startSlider();
};

export default slider;
