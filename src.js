// import DateTime from 'luxon/src/datetime.js'
// const date = DateTime.now().weekNumber
// console.log(`The current week number is ${date}`)

var DateTime = luxon.DateTime;
var currentWeekInYear = DateTime.now().weekNumber;
// console.log(`Текущая неделя ${currentWeekInYear}`);

// const dateLuxon = luxon.DateTime.local( 2005 );
// let d = '2022-09-05';
// let date = d.getDate();
// let month = d.getMonth()+1;
// let year = d.getYear();
// const dateLuxon = luxon.DateTime.local( 2005 );
// const weekDate = dateLuxon.set( { weekNumber: 1 } );
// const startDate = weekDate.set( { weekday: 1 } );
// const endDate = weekDate.set( { weekday: 7 } );

// console.log( date.toISODate(), weekDate.toISODate(), startDate.toISODate(), endDate.toISODate() );
// console.log(dateLuxon.weekNumber);
// console.log(date, month, year);

// Определитель недели
function defineWeek() {
  let dateInput = document.getElementById("currentDate").value;
  console.log("Дата в Input: ", dateInput);
  // 2022-09-05
  // let upperWeek  = new Date(date);
  dateInput = new Date(dateInput);
  console.log(dateInput);
  let day = dateInput.getDate();
  let month = dateInput.getMonth() + 1;
  let year = dateInput.getFullYear();
  console.log(day, month, year);

  let date = luxon.DateTime.local(year, month, day);
  // console.log(upperWeek.getDate(), upperWeek.getMonth()+1);

  var numberUpperWeek = date.weekNumber;
  console.log(`Номер верхней недели в году ${numberUpperWeek}`);

  // https://moment.github.io/luxon/#/install
}

// проверка четности числа
function even(number) {
  if (number % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

// console.log(even(3));
