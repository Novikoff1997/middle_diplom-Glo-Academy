const sliderService = () => {
  const services = document.getElementById("services");
  const sliderBlock = services.querySelector(".row");
  const slides = sliderBlock.querySelectorAll(".service-item");
  const showSlideBlock = document.createElement("div");
  const servicesRrrows = services.querySelector(".services-arrows");
  const timeInterval = 5000;

  let interval;
  let currentSlide = 0;
  let slidesToShow = 2;

  const sliderSettings = () => {
    sliderBlock.classList.add("slider");
    slides.forEach((slide) => (slide.style.display = "none"));
    showSlideBlock.classList.add("slider-show-block");
    showSlideBlock.style.position = "relative";
    sliderBlock.prepend(showSlideBlock);
  };

  const showFirstSlides = () => {
    for (let i = 0; i < slidesToShow; i++) {
      const cloneElement = slides[i].cloneNode(true);
      cloneElement.style.display = "block";
      showSlideBlock.append(cloneElement);
    }
  };

  const hideAllSlides = () => {
    slides.forEach((slide) => {
      slide.classList.add("slide");
      slide.style.display = "none";
    });
  };

  const showCurrentSlides = () => {
    showSlideBlock.innerHTML = "";
    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = (currentSlide + i) % slides.length;
      const cloneElement = slides[slideIndex].cloneNode("true");
      showSlideBlock.append(cloneElement);
      cloneElement.style.display = "block";
      setTimeout(() => {
        cloneElement.classList.add("active");
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

  const handleResize = () => {
    let isCompleted = true;
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 576 && isCompleted) {
        showSlideBlock.innerHTML = "";
        slidesToShow = 1;
        stopSlider();
        showFirstSlides();
        startSlider();
        isCompleted = false;
      }
      if (window.innerWidth <= 1210) {
        showSlideBlock.style.flexDirection = "column";
        showSlideBlock.style.gap = "0";
      }
      if (window.innerWidth > 1210) {
        showSlideBlock.style.flexDirection = "row";
        showSlideBlock.style.gap = "30px";
      }
      if (window.innerWidth > 576 && !isCompleted) {
        showSlideBlock.innerHTML = "";
        slidesToShow = 2;
        stopSlider();
        showFirstSlides();
        startSlider();
        isCompleted = true;
      }
    });
    if (window.innerWidth <= 1210) {
      showSlideBlock.style.flexDirection = "column";
      showSlideBlock.style.gap = "0";
    }
    if (window.innerWidth <= 576) {
      slidesToShow = 1;
    }
  };

  servicesRrrows.addEventListener("click", (e) => {
    hideAllSlides();
    if (e.target.closest(".services__arrow--left")) {
      currentSlide = (currentSlide - slidesToShow + slides.length) % slides.length;
    } else if (e.target.closest(".services__arrow--right")) {
      currentSlide = (currentSlide + slidesToShow) % slides.length;
    }
    showCurrentSlides();
  });

  servicesRrrows.addEventListener("mouseenter", () => {
    stopSlider();
  });
  servicesRrrows.addEventListener("mouseleave", () => {
    startSlider();
  });

  handleResize();
  sliderSettings();
  showFirstSlides();
  startSlider();
};

export default sliderService;
