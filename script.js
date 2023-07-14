let storedTime = null;

function setClockTime(hours, minutes, seconds) {
  const totalMinutes = hours * 60 + minutes;
  const hourRotation = 30 * (totalMinutes / 60);
  const minuteRotation = 6 * minutes + seconds / 10;
  const secondRotation = 6 * seconds;

  const hourHand = document.getElementById('hour');
  const minuteHand = document.getElementById('minute');
  const secondHand = document.getElementById('second');

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

function resetClockTime() {
  storedTime = null;
}

function updateClock() {
  const currentTime = storedTime ? storedTime : new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  setClockTime(currentHours, currentMinutes, currentSeconds);
}

setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const setTimeBtn = document.getElementById('set-time-btn');
  const resetTimeBtn = document.getElementById('reset-time-btn');
  const timeInputField = document.getElementById('time-input-field');

  setTimeBtn.addEventListener('click', () => {
    const inputTime = timeInputField.value;
    const timeComponents = inputTime.split(':');

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timeComponents.length === 1) {
      const timeValue = parseInt(timeComponents[0]);
      if (!isNaN(timeValue) && timeValue >= 0 && timeValue <= 23) {
        hours = timeValue;
      } else if (!isNaN(timeValue) && timeValue >= 0 && timeValue <= 59) {
        minutes = timeValue;
      }
    } else if (timeComponents.length === 2) {
      hours = parseInt(timeComponents[0]);
      minutes = parseInt(timeComponents[1]);
    } else if (timeComponents.length >= 3) {
      hours = parseInt(timeComponents[0]);
      minutes = parseInt(timeComponents[1]);
      seconds = parseInt(timeComponents[2]);
    }

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      alert('Invalid time format. Please enter a valid time (H:MM:SS, HH:MM, or H).');
    } else {
      const inputTimeDate = new Date();
      inputTimeDate.setHours(hours);
      inputTimeDate.setMinutes(minutes);
      inputTimeDate.setSeconds(seconds);

      storedTime = inputTimeDate;
      setClockTime(hours, minutes, seconds);
    }
  });

  resetTimeBtn.addEventListener('click', () => {
    resetClockTime();
    timeInputField.value = '';
    updateClock();
  });
});
    
