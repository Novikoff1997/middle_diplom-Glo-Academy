const modal = () => {
  const overlay = document.querySelector(".overlay");

  const closeElements = (modalWindow) => {
    overlay.style.display = "none";
    modalWindow.style.display = "none";
  };
  const openElements = (modalWindow) => {
    overlay.style.display = "block";
    modalWindow.style.display = "block";
  };

  const closeModal = (modalWindow, closeButton) => {
    document.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === closeButton) {
        closeElements(modalWindow);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeElements(modalWindow);
      }
    });
  };

  const modalCallback = () => {
    const callbackButton = document.querySelector(".button");
    const headerModal = document.querySelector(".header-modal ");
    const headerModalCloseButton = document.querySelector(".header-modal__close");

    callbackButton.addEventListener("click", () => {
      openElements(headerModal);
      closeModal(headerModal, headerModalCloseButton);
    });
  };

  const servicesModal = () => {
    const servicesModal = document.querySelector(".services-modal");
    const servicesModalCloseButton = document.querySelector(".services-modal__close");

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("service-button") || e.target.closest(".service-button")) {
        openElements(servicesModal);
        closeModal(servicesModal, servicesModalCloseButton);
      }
    });
  };

  modalCallback();
  servicesModal();
};

export default modal;
