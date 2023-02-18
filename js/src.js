let today;
document.addEventListener("DOMContentLoaded", function () {
  let currentDate;
  currentDate = new Date();
  // currentDate = new Date("2023-02-21");

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  today =
    ("0" + currentDay).slice(-2) +
    "-" +
    ("0" + currentMonth).slice(-2) +
    "-" +
    currentYear;
  console.log(`Сегодня ${today}`);

  // Изменяем месяц для удобства выбора начала семестра
  let dateStart;
  if (currentMonth >= 9) {
    dateStart = currentYear + "-" + "09-01";
  } else {
    dateStart = currentYear + "-" + "02-01";
  }

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

// Возвращает список с неделями в длинном формате
function selectionWeekLong(week) {
  let arrWeekLongNames;
  switch (week) {
    case 0:
      arrWeekLongNames = ["верхняя", "нижняя"];
      break;
    case 1:
      arrWeekLongNames = ["нечетная", "четная"];
      break;
  }
  return arrWeekLongNames;
}

// Возвращает список с неделями в коротком формате
function selectionWeekShort(week) {
  let arrWeekShortNames;
  switch (week) {
    case 0:
      arrWeekShortNames = ["В", "Н"];
      break;
    case 1:
      arrWeekShortNames = ["Н", "Ч"];
      break;
  }
  return arrWeekShortNames;
}

// Сравнивает верхнюю/нечетную неделю с текущей и
// возвращает значение в коротком формате
function shortNameCurrentWeek(
  arrWeekShortNames,
  evenUpperWeek,
  evenCurrentWeek
) {
  let weekShortName;
  if (evenUpperWeek == evenCurrentWeek) {
    weekShortName = arrWeekShortNames[0];
  } else {
    weekShortName = arrWeekShortNames[1];
  }
  return weekShortName;
}

// Сравнивает верхнюю/нечетную неделю с текущей и
// возвращает значение в длинном формате
function longNameCurrentWeek(arrWeekLongNames, evenUpperWeek, evenCurrentWeek) {
  let weekLongName;
  if (evenUpperWeek == evenCurrentWeek) {
    weekLongName = arrWeekLongNames[0];
  } else {
    weekLongName = arrWeekLongNames[1];
  }
  return weekLongName;
}

// Действия при изменении даты
function changeDate() {
  btnPrintCalendar.style.visibility = "hidden";
  btnConfirm.removeAttribute("disabled");

  document.getElementsByClassName("text__name-week")[0].innerHTML =
    "Нажмите «Подтвердить», чтобы узнать текущую неделю.";

  let table = document.querySelector("table");
  let arrTable = document.getElementsByTagName("table");
  while (arrTable.length != 0) {
    table.remove();
    table = document.querySelector("table");
    arrTable = document.getElementsByTagName("table");
  }
}

let btnConfirm;
let currentDayColor;
let btnPrintCalendar;

// текущий номер недели, начиная с начала учебного года
let currentNumWeek;

// Определитель недели в зависимости от текущего дня
function determineWeek() {
  // Отображаем кнопку печати календаря
  btnPrintCalendar = document.getElementById("printCalendar");
  btnPrintCalendar.style.visibility = "visible";

  let dateInput;
  dateInput = document.getElementById("currentDate").value;

  btnConfirm = document.getElementById("detWeek");
  btnConfirm.setAttribute("disabled", "disabled");

  dateInput = new Date(dateInput);

  let day;
  let month;
  let year;
  day = dateInput.getDate();
  month = dateInput.getMonth() + 1;
  year = dateInput.getFullYear();
  console.log("LUXON", day, month, year);

  let date;
  date = luxon.DateTime.local(year, month, day);

  let numberUpperWeek;
  numberUpperWeek = date.weekNumber;

  let evenUpperWeek;
  evenUpperWeek = even(numberUpperWeek);

  let currentWeek;
  currentWeek = luxon.DateTime.now().weekNumber;

  // Вычисление номера текущей недели
  currentNumWeek = currentWeek - date.weekNumber + 1;

  let evenCurrentWeek;
  evenCurrentWeek = even(currentWeek);
  // console.log(`Проверка четности текущей недели: ${evenCurrentWeek}`);

  // ---------------------------------------
  // Выбор недели
  let selectedWeek;
  selectedWeek = document.getElementById("select").selectedIndex;
  // console.log(selectedWeek);

  let arrWeekShortNames;
  let arrWeekLongNames;
  arrWeekShortNames = selectionWeekShort(selectedWeek);
  arrWeekLongNames = selectionWeekLong(selectedWeek);

  let weekLongName;
  let weekShortName;
  weekLongName = longNameCurrentWeek(
    arrWeekLongNames,
    evenUpperWeek,
    evenCurrentWeek
  );
  weekShortName = longNameCurrentWeek(
    arrWeekShortNames,
    evenUpperWeek,
    evenCurrentWeek
  );

  let result = document.getElementsByClassName("text__name-week")[0];
  result.innerHTML = `Сегодня ${today} 
  <br> ${currentNumWeek} ${weekLongName} неделя`;

  // Отображаем календарь на семестр
  if (month >= 9) {
    for (let i = 9; i <= 12; i++) {
      calendarMonth(year, i, day, month, arrWeekShortNames);
    }
  } else {
    for (let i = 2; i <= 6; i++) {
      calendarMonth(year, i, day, month, arrWeekShortNames);
    }
  }
}

let currentDate, currentDay, currentMonth, currentYear;
// Отобразить календарь с верхними и нижними неделями
function calendarMonth(
  year,
  month,
  dayDateInput,
  monthDateInput,
  arrWeekShortNames
) {
  month = month - 1;
  let calendar = document.getElementsByClassName("calendar")[0];
  let date = new Date(year, month);
  let numberDayWeek = getDayWeek(date);
  let lastDayMonth = new Date(year, month + 1, 0).getDate();

  let table = `<table>
  <caption>${determineMonth(month + 1)}</caption>
      <tr>
         <th>пн</th>
         <th>вт</th>
         <th>ср</th>
         <th>чт</th>
         <th>пт</th>
         <th>сб</th>
         <th>вс</th>
         <th>${arrWeekShortNames[0]}/${arrWeekShortNames[1]}</th>
      </tr>`;

  // Цвет недель
  let colorWeek;
  if (
    compareWeeks(year, month, 1, monthDateInput, dayDateInput)[0] ==
    arrWeekShortNames[1]
  ) {
    colorWeek = "background-color: #cee5f5";
  } else {
    colorWeek = "background-color: #ffffff;";
  }
  table += `<tr style = "${colorWeek}">`;

  // Добавляем пустые ячейки перед числами
  let j = 0;
  for (let i = 1; i < numberDayWeek; i++) {
    j++;
    table += "<td></td>";
  }

  // Текущая дата (необходимо, чтобы в цикле закрасить цветом)
  // let currentDate, currentDay, currentMonth, currentYear;
  currentDate = luxon.DateTime.now();
  // currentDate = luxon.DateTime.local(2023, 9, 1);
  currentDay = currentDate.day;
  currentMonth = currentDate.month;
  currentYear = currentDate.year;

  // Добавляем числа в календарь
  let resCompareWeeks;
  let colorDay;
  let className;
  for (let i = 1; i <= lastDayMonth; i++) {
    j++;

    // Цвет текущего дня
    if (currentDay == i && currentMonth == month + 1) {
      colorDay = "background-color: #ffaeae";
      className = "current-day";
    } else {
      colorDay = colorWeek;
      className = "day";
    }

    if (getDayWeek(new Date(year, month, i)) == 7) {
      table += `<td class = "${className}" style = "${colorDay}">${i}</td>`;
      resCompareWeeks = compareWeeks(
        year,
        month,
        i,
        monthDateInput,
        dayDateInput
      )[0];
      if (j % 7 == 0) {
        table += `<td>${resCompareWeeks}</td>`;
      }
      table += `</tr>`;
      // Цвет недель
      if (resCompareWeeks == arrWeekShortNames[0]) {
        colorWeek = "background-color: #cee5f5;";
        // необходимо при печати, чтобы не отображалась текущая дата
        if (month == currentMonth - 1) {
          currentDayColor = "#cee5f5";
        }
      } else {
        colorWeek = "background-color: #ffffff;";
        // необходимо при печати, чтобы не отображалась текущая дата
        if (month == currentMonth - 1) {
          currentDayColor = "#ffffff";
        }
      }
      table += `<tr style = "${colorWeek}">`;
    } else {
      table += `<td class = "${className}" style = "${colorDay}">${i}</td>`;
      if (j % 7 == 0) {
        table += `<td>${
          compareWeeks(year, month, i, monthDateInput, dayDateInput)[0]
        }</td>`;
      }
    }
  }

  // Добавляем пустые ячейки после чисел
  let lastNumberMonthInWeek = getDayWeek(new Date(year, month, lastDayMonth)); // Последнее число месяца по счету в неделе
  for (let i = lastNumberMonthInWeek + 1; i <= 7; i++) {
    j++;
    table += "<td></td>";
    if (j % 7 == 0) {
      table += `<td>${
        compareWeeks(year, month, lastDayMonth, monthDateInput, dayDateInput)[0]
      }</td>`;
    }
  }
  table += "</tr>";

  table += "</table>";
  calendar.innerHTML += table;
}

// Сравнение верхней недели (стартовой) с текущей
function compareWeeks(year, month, day, monthDateInput, dayDateInput) {
  let dateInput = luxon.DateTime.local(year, monthDateInput, dayDateInput);
  let numberUpperWeek = dateInput.weekNumber;
  let evenUpperWeek = even(numberUpperWeek);
  let currentWeek = luxon.DateTime.local(year, month + 1, day).weekNumber;
  let evenCurrentWeek = even(currentWeek);

  // ---------------------------------------
  // Выбор недели
  let selectedWeek = document.getElementById("select").selectedIndex;

  // ---------------------------------------
  let arrWeekShortNames, arrWeekLongNames;
  arrWeekShortNames = selectionWeekShort(selectedWeek);
  arrWeekLongNames = selectionWeekLong(selectedWeek);

  let weekLongName, weekShortName;
  weekLongName = longNameCurrentWeek(
    arrWeekLongNames,
    evenUpperWeek,
    evenCurrentWeek
  );
  weekShortName = longNameCurrentWeek(
    arrWeekShortNames,
    evenUpperWeek,
    evenCurrentWeek
  );

  return [weekShortName, weekLongName];
}

// Возвращает номер дня недели в привычном формате
// пн = 1; вс = 7
function getDayWeek(date) {
  let dayWeek = date.getDay();
  if (dayWeek == 0) {
    return 7;
  } else {
    return dayWeek;
  }
}

// Определитель месяца
function determineMonth(number) {
  switch (number) {
    case 1:
      return "Январь";
    case 2:
      return "Февраль";
    case 3:
      return "Март";
    case 4:
      return "Апрель";
    case 5:
      return "Май";
    case 6:
      return "Июнь";
    case 7:
      return "Июль";
    case 8:
      return "Август";
    case 9:
      return "Сентябрь";
    case 10:
      return "Октябрь";
    case 11:
      return "Ноябрь";
    case 12:
      return "Декабрь";
  }
}

function printCalendar() {
  let colorCurrentDayForPrint =
    document.getElementsByClassName("current-day")[0];
  colorCurrentDayForPrint.style.backgroundColor = currentDayColor;
  windowPrint = window.print();

  // Возвращаем в исходное состояние текущий день в календаре
  colorCurrentDayForPrint.style.backgroundColor = "#ffaeae";
}
