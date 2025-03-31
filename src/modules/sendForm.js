import { debounce } from "./helpers";

const sendForm = () => {
  const successBlock = document.createElement("div");
  const errorBlock = document.createElement("div");
  const invalidBlock = document.createElement("div");

  const successText = "Спасибо за заявку! Наш менеджер свяжется с вами.";
  const invalidText = "Проверьте правильность введенных данных!";
  const successBlockColor = "#228B22";
  const errorBlockColor = "#FF4500";
  const invalidBlockColor = "#CD5C5C";

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

    const sendForm = (url) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(formBody),
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      })
        .then((response) => {
          clearTimeout(timeouId);
          console.log(response.type);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          successBlock.classList.remove("open");
          errorBlock.classList.add("open");
          errorBlock.style.backgroundColor = errorBlockColor;
          errorBlock.textContent = `Ошибка, сервер не отвечает :'(`;
          closeStatuBlock(errorBlock);
        });
    };

    formData.forEach((val, key) => {
      formBody[key] = val;
    });
    for (let key in calcData) {
      formBody[key] = calcData[key];
    }

    formSuccess = Array.from(formInputs)
      .filter((input) => input.type !== "hidden")
      .every((input) => input.classList.contains("success"));

    if (formSuccess) {
      successBlock.innerHTML =
        '<img width="40px" src="./images/preloader/preloader.png">Отправка...</img>';
      successBlock.classList.add("open");
      closeStatuBlock(successBlock);
      sendForm("https://jsonplaceholder.typicode.com/posts")
        .then((data) => {
          successBlock.style.backgroundColor = successBlockColor;
          successBlock.textContent = successText;
          closeStatuBlock(successBlock);
        })
        .catch((error) => {
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
    }
    clearInputs();
  }, 300);

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    send(e.target);
  });
  settingsStatusBlocks();
};

export default sendForm;
