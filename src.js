document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date();
  // let currentDate = new Date("2022-09-08");

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  let today =
    currentYear +
    "-" +
    ("0" + currentMonth).slice(-2) +
    "-" +
    ("0" + currentDay).slice(-2);
  console.log(`Сегодня ${today}`);

  // Изменяем месяц для удобства выбора начала семестра
  let dateStart;
  if (currentMonth >= 9) {
    dateStart = currentYear + "-" + "09-01";
  } else {
    dateStart = currentYear + "-" + "02-01";
  }

  // document.getElementById("currentDate").value = today;
  document.getElementById("currentDate").value = dateStart;
});

// Проверка четности числа
function even(number) {
  if (number % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

// Определитель недели
function defineWeek() {
  let dateInput = document.getElementById("currentDate").value;
  // console.log("Дата в Input: ", dateInput);

  dateInput = new Date(dateInput);
  // console.log(dateInput);

  let day = dateInput.getDate();
  let month = dateInput.getMonth() + 1;
  let year = dateInput.getFullYear();
  // console.log(day, month, year);

  let date = luxon.DateTime.local(year, month, day);

  let numberUpperWeek = date.weekNumber;
  // console.log(`Номер верхней недели в году: ${numberUpperWeek}`);

  let evenUpperWeek = even(numberUpperWeek);
  // console.log(`Проверка четности недели: ${evenUpperWeek}`);

  let currentWeek = luxon.DateTime.now().weekNumber;
  // console.log(`Текущая неделя: ${currentWeek}`);

  let evenCurrentWeek = even(currentWeek);
  // console.log(`Проверка четности текущей недели: ${evenCurrentWeek}`);

  // ---------------------------------------
  // Выбор недели
  let selectedWeek = document.getElementById(
    "block-week-selector__select"
  ).selectedIndex;
  // console.log(selectedWeek);

  switch (selectedWeek) {
    case 0:
      arrWeekNames = ["верхняя", "нижняя"];
      break;
    case 1:
      arrWeekNames = ["четная", "нечетная"];
      break;
  }
  // console.log(arrWeekNames);
  // ---------------------------------------

  let week;
  if (evenUpperWeek == evenCurrentWeek) {
    // week = "верхняя";
    week = arrWeekNames[0];
  } else {
    // week = "нижняя";
    week = arrWeekNames[1];
  }
  console.log(`Сейчас ${week} неделя`);

  let result = document.getElementsByClassName("text__name-week")[0];
  result.innerHTML = `Сейчас ${week} неделя`;
}
