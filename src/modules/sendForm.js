import { debounce } from "./helpers";

const sendForm = () => {
  const statusBlock = document.createElement("div");
  document.body.append(statusBlock);
  statusBlock.classList.add("status-block");

  const send = debounce((formTarget) => {
    const form = formTarget;
    const formInputs = form.querySelectorAll("input");
    const formData = new FormData(form);
    const formBody = {};

    let formSuccess;

    statusBlock.innerHTML =
      '<img width="40px" src="./images/preloader/preloader.png">Отправка...</img>';
    statusBlock.classList.add("open");

    const closeStatuBlock = () => {
      setTimeout(() => {
        statusBlock.style = "";
        statusBlock.classList.remove("open");
        statusBlock.innerHTML = "";
      }, 3000);
    };

    const clearInputs = () => {
      formInputs.forEach((input) => {
        if (input.type !== "hidden") {
          input.value = "";
          input.classList.remove("success", "invalid");
        }
      });
    };

    const sendForm = (url) => {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(formBody),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    };

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    formSuccess = Array.from(formInputs)
      .filter((input) => input.type !== "hidden")
      .every((input) => input.classList.contains("success"));

    if (formSuccess) {
      sendForm("https://jsonplaceholder.typicode.com/posts").then((data) => {
        statusBlock.style.backgroundColor = "green";
        statusBlock.textContent = "Спасибо за заявку! Наш менеджер свяжется с вами.";
        closeStatuBlock();
      });
    } else {
      statusBlock.style.backgroundColor = "red";
      statusBlock.textContent = "Проверьте правильность введенных данных!";
      closeStatuBlock();
    }
    clearInputs();
  }, 300);

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    send(e.target);
  });
};

export default sendForm;
