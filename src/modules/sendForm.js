import { debounce } from "./helpers";

const sendForm = () => {
  const pageName = document.querySelector(".slogan").textContent.toLocaleLowerCase();

  const successBlock = document.createElement("div");
  const errorBlock = document.createElement("div");
  const invalidBlock = document.createElement("div");

  const successText = "Спасибо за заявку! Наш менеджер свяжется с вами.";
  const invalidText = "Проверьте правильность введенных данных!";
  const successBlockColor = "#228B22";
  const errorBlockColor = "#FF4500";
  const invalidBlockColor = "#CD5C5C";
  const loaderColor = "#b2b2b2";

  let controller = new AbortController();
  let signal = controller.signal;
  let timeoutId = setTimeout(() => controller.abort(), 4000);

  const requestTimeout = () => {
    controller = new AbortController();
    signal = controller.signal;
    timeoutId = setTimeout(() => controller.abort(), 4000);
  };

  const settingsStatusBlocks = () => {
    document.body.append(successBlock);
    document.body.append(errorBlock);
    document.body.append(invalidBlock);
    successBlock.classList.add("status-block");
    errorBlock.classList.add("status-block");
    invalidBlock.classList.add("status-block");
  };

  const send = debounce((formTarget) => {
    const form = formTarget;
    const formInputs = form.querySelectorAll("input");
    const formData = new FormData(form);
    const formBody = {};

    let formSuccess;
    let calcData;

    if (localStorage["calc"]) {
      calcData = JSON.parse(localStorage.getItem("calc"));
    }

    const closeStatuBlock = (statusBlock) => {
      setTimeout(() => {
        statusBlock.style = "";
        statusBlock.classList.remove("open");
        statusBlock.innerHTML = "";
      }, 4000);
    };

    const clearInputs = () => {
      formInputs.forEach((input) => {
        if (input.type !== "hidden") {
          input.value = "";
          input.classList.remove("success", "invalid");
        }
      });
    };
    const clearInvalidInput = () => {
      formInputs.forEach((input) => {
        if (input.type !== "hidden" && !input.classList.contains("success")) {
          input.value = "";
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
        signal: signal,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
    };

    formData.forEach((val, key) => {
      formBody[key] = val;
    });
    for (let key in calcData) {
      formBody[key] = calcData[key];
    }
    formBody["page"] = pageName;

    formSuccess = Array.from(formInputs)
      .filter((input) => input.type !== "hidden")
      .every((input) => input.classList.contains("success"));

    if (formSuccess) {
      requestTimeout();
      successBlock.innerHTML =
        '<img width="40px" src="./images/preloader/preloader.png">Отправка...</img>';
      successBlock.style.backgroundColor = loaderColor;
      successBlock.classList.add("open");
      closeStatuBlock(successBlock);
      sendForm("https://dummyjson.com/test")
        .then((data) => {
          clearTimeout(timeoutId);
          successBlock.style.backgroundColor = successBlockColor;
          successBlock.textContent = successText;
          closeStatuBlock(successBlock);
          clearInputs();
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          errorBlock.classList.add("open");
          errorBlock.style.backgroundColor = errorBlockColor;
          errorBlock.innerHTML = `${error.message} <br> Попробуйте позже`;
          closeStatuBlock(errorBlock);
        });
    } else {
      invalidBlock.classList.add("open");
      invalidBlock.style.backgroundColor = invalidBlockColor;
      invalidBlock.textContent = invalidText;
      closeStatuBlock(invalidBlock);
      clearInvalidInput();
    }
  }, 300);

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    send(e.target);
  });
  settingsStatusBlocks();
};

export default sendForm;
