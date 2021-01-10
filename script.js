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

  var taskOneInput = "";
  var taskTwoInput = "";
  var taskThreeInput = "";
  var taskFourInput = "";
  var taskFiveInput = "";
  var taskSixInput = "";
  var taskSevenInput = "";
  var taskEightInput = "";
  var taskNineInput = "";

  var tasksInput = [
    taskOneInput,
    taskTwoInput,
    taskThreeInput,
    taskFourInput,
    taskFiveInput,
    taskSixInput,
    taskSevenInput,
    taskEightInput,
    taskNineInput,
  ];

  $("#currentDay").append(moment().format("MMM Do YY"));

  console.log(tasksInput);
  getItems();
  time();

  function renderTasks() {
    console.log(tasksInput);
    for (var i = 0; i < 9; i++) {
      tasksLocation[i].append(storedTaskInput[i]);
      console.log(storedTaskInput[i])
    }
  }

  function getItems() {
    var storedTasks = JSON.parse(localStorage.getItem("storedTaskInput"));
    storedTaskInput = storedTasks;
    renderTasks();
  }
  console.log(tasksLocation);
  function storeInputs() {
    localStorage.setItem("storedTaskInput", JSON.stringify(storedTaskInput));
  }
  var storedTaskInput = [];

  $(".saveBtn").click(function (event) {
    event.preventDefault();
    for (var i = 0; i < 9; i++) {
      var task = tasksLocation[i];
      var taskContent = task.val();
      storedTaskInput.splice(8, 8, taskContent);
      console.log(storedTaskInput);
    }
    storeInputs();
    renderTasks();
  });

  function time() {
    var format = "hh:mm:ss";

    (beforeTime = moment("23:00:00", format)),
      (afterTime = moment("23:00:01", format));

    if (moment().isAfter(afterTime)) {
      taskOne.addClass("past");
      taskOne.removeClass("present");
      taskOne.removeClass("future");

      if (moment().isBefore(beforeTime)) {
        taskOne.addClass("future");
        taskOne.removeClass("present");
        taskOne.removeClass("past");
      }
    }
    if (moment().isBetween()) {
      taskOne.addClass("present");
      taskOne.removeClass("future");
      taskOne.removeClass("past");
    }
  }
});
