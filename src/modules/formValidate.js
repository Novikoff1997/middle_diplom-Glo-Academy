const formValidate = () => {
  const success = (input) => {
    input.classList.add("success");
    input.classList.remove("invalid");
    input.style.borderColor = "green";
  };
  const invalid = (input) => {
    input.classList.add("invalid");
    input.classList.remove("success");
    input.style.borderColor = "red";
  };

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("input", (e) => {
      switch (e.target.name) {
        case "fio":
          if (!/^[а-яa-z\s]+$/gi.test(e.target.value)) {
            invalid(e.target);
          } else {
            success(e.target);
          }
          break;
        case "phone":
          if (!/^(?:\+?[1-9]\s?)[1-9\s-]{0,15}$/g.test(e.target.value)) {
            invalid(e.target);
          } else {
            success(e.target);
          }
          break;
      }
    });
  });
};

export default formValidate;
