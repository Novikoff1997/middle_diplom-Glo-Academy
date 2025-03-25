const modal = () => {
  const callbackButton = document.querySelector(".button");

  const modalCallback = (button) => {
    const overlay = document.querySelector(".overlay");
    const headerModal = document.querySelector(".header-modal ");
    const headerModalCloseButton = document.querySelector(".header-modal__close");

    const closeElements = () => {
      overlay.style.display = "none";
      headerModal.style.display = "none";
    };
    const openElements = () => {
      overlay.style.display = "block";
      headerModal.style.display = "block";
    };

    const closeModal = () => {
      document.addEventListener("click", (e) => {
        if (e.target === overlay || e.target === headerModalCloseButton) {
          closeElements();
        }

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeElements();
          }
        });
      });
    };

    button.addEventListener("click", () => {
      openElements();
      closeModal();
    });
  };

  modalCallback(callbackButton);
};

export default modal;
