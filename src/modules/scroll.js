const scroll = () => {
  const scrollButton = document.querySelector(".smooth-scroll");
  scrollButton.style.opacity = 0;

  document.addEventListener("scroll", () => {
    if (window.scrollY >= 1200) {
      scrollButton.style.cssText = " transition: opacity 0.2s; opacity: 1; cursor: pointer";
    } else {
      scrollButton.style.opacity = 0;
    }
  });

  scrollButton.addEventListener("click", () => {
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });
  });
};

export default scroll;
