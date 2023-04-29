/* Your Code Here */
function createEmployeeRecord(arr) {
  let employeeObj = {};
  employeeObj.firstName = arr[0];
  employeeObj.familyName = arr[1];
  employeeObj.title = arr[2];
  employeeObj.payPerHour = arr[3];
  employeeObj.timeInEvents = [];
  employeeObj.timeOutEvents = [];
  return employeeObj;
}

function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord);
}

function createTimeInEvent(dateStr) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStr.split(" ")[1].slice(0, 2) + "00"),
    date: dateStr.split(" ")[0],
  });
  return this;
}
function createTimeOutEvent(dateStr) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStr.split(" ")[1].slice(0, 2) + "00"),
    date: dateStr.split(" ")[0],
  });
  return this;
}
function hoursWorkedOnDate(dateStr) {
  let timeInEvent = this.timeInEvents.find((event) => event.date === dateStr);
  let timeOutEvent = this.timeOutEvents.find((event) => event.date === dateStr);

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  } else {
    return 0;
  }
}
function wagesEarnedOnDate(dateStr) {
  let hoursWorked = hoursWorkedOnDate.bind(this, dateStr);
  return parseInt(hoursWorked() * this.payPerHour);
}
function findEmployeeByFirstName(arr, name) {
  return arr.find((element) => element.firstName === name);
}
function calculatePayroll(arr) {
  return arr.reduce((accum, employee) => accum + allWagesFor.call(employee), 0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
