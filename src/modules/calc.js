const calc = () => {
  const calc = document.getElementById("calc");
  const calcType = document.getElementById("calc-type");
  const calcTypeMaterial = document.getElementById("calc-type-material");
  const calcInput = document.getElementById("calc-input");
  const calcTotal = document.getElementById("calc-total");

  const calcValues = {};

  let res;

  const selected = (selector) => {
    selector.style.borderColor = "white";
    selector.classList.add("success");
  };
  const notSelected = (selector) => {
    selector.style.borderColor = "red";
    selector.classList.remove("success");
  };
  const isSuccess = (selector) => {
    return selector.classList.contains("success");
  };

  const clculate = (value1, value2, value3) => {
    return value1.value * value2.value * value3.value;
  };

  if (!calc) {
    return;
  }

  calc.addEventListener("input", (e) => {
    if (e.target === calcInput) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
    if (calcType.selectedIndex) {
      selected(calcType);
    } else {
      notSelected(calcType);
    }
    if (calcTypeMaterial.selectedIndex) {
      selected(calcTypeMaterial);
    } else {
      notSelected(calcTypeMaterial);
    }
    if (isSuccess(calcType) && isSuccess(calcTypeMaterial)) {
      res = clculate(calcInput, calcType, calcTypeMaterial);
      calcTotal.value = Math.floor(res);

      calcValues["Тип"] = calcType[calcType.selectedIndex].textContent;
      calcValues["Материал"] = calcTypeMaterial[calcTypeMaterial.selectedIndex].textContent;
      calcValues["Площадь"] = calcInput.value;
      calcValues["Цена"] = calcTotal.value;
    }
    localStorage.setItem("calc", JSON.stringify(calcValues));
  });
};

export default calc;
