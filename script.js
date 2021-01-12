$(document).ready(function () {
  var taskOne = $("#nineAm");
  var taskTwo = $("#tenAm");
  var taskThree = $("#elevenAm");
  var taskFour = $("#twelvePm");
  var taskFive = $("#onePm");
  var taskSix = $("#twoPm");
  var taskSeven = $("#threePm");
  var taskEight = $("#fourPm");
  var taskNine = $("#fivePm");

  var btnOne = $("#btnOne");
  var btnTwo = $("#btnTwo");
  var btnThree = $("#btnThree");
  var btnFour = $("#btnFour");
  var btnFive = $("#btnFive");
  var btnSix = $("#btnSix");
  var btnSeven = $("#btnSeven");
  var btnEight = $("#btnEight");
  var btnNine = $("#btnNine");

  var buttons = [
    btnOne,
    btnTwo,
    btnThree,
    btnFour,
    btnFive,
    btnSix,
    btnSeven,
    btnEight,
    btnNine,
  ];

  var saveBtn = document.querySelectorAll(".saveBtn");

  var tasksLocation = [
    taskOne,
    taskTwo,
    taskThree,
    taskFour,
    taskFive,
    taskSix,
    taskSeven,
    taskEight,
    taskNine,
  ];

  $("#currentDay").append(moment().format("MMM Do YY"));

  getItems();
  time();

  function renderTasks() {
    for (var i = 0; i < 9; i++) {
      tasksLocation[i].val(tasksLocation[i].val() + storedTaskInput[i]);
    }
  }

  function getItems() {
    var storedTasks = JSON.parse(localStorage.getItem("storedTaskInput"));
    storedTaskInput = storedTasks;
    renderTasks();
  }
  function storeInputs() {
    localStorage.setItem("storedTaskInput", JSON.stringify(storedTaskInput));
  }
  var storedTaskInput = [];

  function userInput(event) {
    event.preventDefault();
    for (var i = 0; i < 9; i++) {
      var task = tasksLocation[i];
      var taskContent = task.val();
      storedTaskInput.splice(8, 8, taskContent);
    }
    storeInputs();
  }

  function time() {
    for (var j = 0; j < tasksLocation.length; j++) {
      var format = "hh:mm:ss";
      (beforeTime = moment(j + 9 + ":00:00", format)),
        (afterTime = moment(j + 10 + ":00:00", format));

      if (moment().isAfter(afterTime)) {
        tasksLocation[j].addClass("past");
        tasksLocation[j].removeClass("present");
        tasksLocation[j].removeClass("future");
      }
      if (moment().isBefore(beforeTime)) {
        tasksLocation[j].addClass("future");
        tasksLocation[j].removeClass("present");
        tasksLocation[j].removeClass("past");
      }
      if (moment().isBetween(beforeTime, afterTime)) {
        tasksLocation[j].addClass("present");
        tasksLocation[j].removeClass("future");
        tasksLocation[j].removeClass("past");
      }
    }
  }
  saveBtn.forEach(function (saveBtn) {
    saveBtn.addEventListener("click", userInput);
  });
});
