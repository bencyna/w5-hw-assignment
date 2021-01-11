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

//   var taskOneInput = "";
//   var taskTwoInput = "";
//   var taskThreeInput = "";
//   var taskFourInput = "";
//   var taskFiveInput = "";
//   var taskSixInput = "";
//   var taskSevenInput = "";
//   var taskEightInput = "";
//   var taskNineInput = "";

//   var tasksInput = [
//     taskOneInput,
//     taskTwoInput,
//     taskThreeInput,
//     taskFourInput,
//     taskFiveInput,
//     taskSixInput,
//     taskSevenInput,
//     taskEightInput,
//     taskNineInput,
//   ];

  $("#currentDay").append(moment().format("MMM Do YY"));

  getItems();
  time();

  function renderTasks() {
    for (var i = 0; i < 9; i++) {
      tasksLocation[i].append(storedTaskInput[i]);
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
      console.log(storedTaskInput);
      console.log(task.val());
    }
    storeInputs();
    renderTasks();
  }

  function time() {
    for (var j = 9; j < tasksLocation.length + 9; j++) {
      var format = "hh:mm:ss";
      (beforeTime = moment(j + ":00:00", format)),
        (afterTime = moment(j + 1 + ":00:00", format));

      if (moment().isAfter(afterTime)) {
        tasksLocation[j - 9].addClass("past");
        tasksLocation[j - 9].removeClass("present");
        tasksLocation[j - 9].removeClass("future");
      }
      if (moment().isBefore(beforeTime)) {
        tasksLocation[j - 9].addClass("future");
        tasksLocation[j - 9].removeClass("present");
        tasksLocation[j - 9].removeClass("past");
      }
      if (moment().isBetween(beforeTime, afterTime)) {
        tasksLocation[j - 9].addClass("present");
        tasksLocation[j - 9].removeClass("future");
        tasksLocation[j - 9].removeClass("past");
      }
    }

    saveBtn.forEach(function (saveBtn) {
      saveBtn.addEventListener("click", userInput);
    });
  }
});

