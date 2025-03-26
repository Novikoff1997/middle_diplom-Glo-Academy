const sendForm = (calcValues = {}) => {
  const formIsSuccess = (form) => {
    let success = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.type === "hidden") {
        input.classList.add("success");
      }
      if (!input.classList.contains("success")) {
        success = false;
      }
    });
    return success;
  };

  const getFormBody = (form) => {
    const formData = new FormData(form);
    const formBody = {};
    formData.forEach((val, key) => {
      formBody[key] = val;
    });
    return formBody;
  };

  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };

  document.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusBlock = document.createElement("div");
    statusBlock.style.textAlign = "center";
    e.target.append(statusBlock);
    statusBlock.innerHTML = '<img width="25px" src="./images/preloader/preloader.gif"></img>';

    if (formIsSuccess(e.target)) {
      const formBody = getFormBody(e.target);
      sendData(formBody).then((data) => {
        statusBlock.textContent = "Форма успешно отправлена!";
        e.target.querySelectorAll("input").forEach((input) => {
          input.value = "";
        });
      });
    } else {
      alert("Данные введены некорректно");
    }
    setTimeout(() => {
      statusBlock.style.transition = "opacity 0.2s";
      statusBlock.style.opacity = "0";
    }, 3000);
  });
};

export default sendForm;
