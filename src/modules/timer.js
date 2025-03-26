const timer = (date) => {
  const setTimeAllBlocks = (selector, date) => {
    const blocks = document.querySelectorAll(selector);

    blocks.forEach((block) => {
      block.textContent = date;
    });
  };

  const setZero = (value) => {
    return value.toString().padStart(2, "0");
  };

  const getTimeRemaning = () => {
    const timerToData = new Date(date).getTime();
    const dateNow = new Date().getTime();

    let timeRemaning = (timerToData - dateNow) / 1000;
    let days = Math.floor(timeRemaning / 60 / 60 / 24);
    let hours = Math.floor((timeRemaning / 60 / 60) % 24);
    let minutes = Math.floor((timeRemaning / 60) % 60);
    let seconds = Math.floor(timeRemaning % 60);

    return { timeRemaning, days, hours, minutes, seconds };
  };

  const updateClock = () => {
    let getTime = getTimeRemaning();
    setTimeAllBlocks(".count_1>span", setZero(getTime.days));
    setTimeAllBlocks(".count_2>span", setZero(getTime.hours));
    setTimeAllBlocks(".count_3>span", setZero(getTime.minutes));
    setTimeAllBlocks(".count_4>span", setZero(getTime.seconds));
  };

  const startTimer = (timeRemaning) => {
    if (timeRemaning > 0) {
      setInterval(updateClock, 1000);
    } else {
      daysBlock.textContent = "00";
      hoursBlock.textContent = "00";
      minutesBlock.textContent = "00";
      secondsBlock.textContent = "00";
    }
  };
  updateClock();
  startTimer(getTimeRemaning().timeRemaning);
};

export default timer;
