const docsZoom = () => {
  const docs = document.getElementById("documents");
  const overlay = document.querySelector(".overlay");
  const imageBlock = document.createElement("div");

  const openImage = (imageTarget) => {
    let imgHref = imageTarget.parentElement;
    imgHref = imgHref.parentElement.href.replace(/^.*:\/\/[^\/]*\//, "/");
    console.log(imgHref);
    overlay.style.cssText =
      "display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.5s";
    imageBlock.innerHTML = `<img src="${imgHref}"></img>`;
    imageBlock.style.cssText = "transform: scale(0.3); transition: transform 0.5s; position:";
    requestAnimationFrame(() => {
      imageBlock.style.transform = "scale(0.7)";
      overlay.style.opacity = "1";
    });
    overlay.append(imageBlock);
  };
  const closeImage = () => {
    overlay.innerHTML = "";
    overlay.style.display = "none";
  };

  docs.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("document-overlay")) {
      openImage(e.target);
    }
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeImage();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === `Escape`) {
      closeImage();
    }
  });
};

export default docsZoom;
