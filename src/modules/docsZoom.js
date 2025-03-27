const docsZoom = () => {
  const docs = document.getElementById("documents");
  const overlay = document.querySelector(".overlay");
  const imageBlock = document.createElement("div");

  const openImage = (imageTarget) => {
    const imgHref = imageTarget.parentElement.href.replace(/^.*:\/\/[^\/]*\//, "/");
    overlay.style.cssText = "display: flex; justify-content: center; align-items: center;";
    imageBlock.innerHTML = `<img src="${imgHref}"></img>`;
    imageBlock.style.cssText = "transform: scale(0.3); transition: transform 0.5s; position:";
    requestAnimationFrame(() => {
      imageBlock.style.transform = "scale(0.7)";
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
