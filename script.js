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
// append current day to web page
  $("#currentDay").append(moment().format("MMM Do YY"));

  getItems();
  time();

  // getting each task user has inputed from the stored version
  // adding it the the same input area as it was inputted by user 
  function renderTasks() {
    if (storedTaskInput === null){
      return;
    }
    for (var i = 0; i < 9; i++) {
      console.log(storedTaskInput)
      var taskOrigin = tasksLocation[i];
      var storedTask = storedTaskInput[i];
      taskOrigin.val(taskOrigin.val() + storedTask);  
    }
  }
// getting stored items in local storage and executing renderTasks() 
  function getItems() {
    var storedTasks = JSON.parse(localStorage.getItem("storedTaskInput"));
    storedTaskInput = storedTasks;
    renderTasks();
  }
  function storeInputs() {
    localStorage.setItem("storedTaskInput", JSON.stringify(storedTaskInput));
  }
  // empty array for tasks to be added to, will ultimatley be stored and displayed
  var storedTaskInput = [];
// function to add input to the storedTaskInput array
  function userInput(event) {
    event.preventDefault();
    for (var i = 0; i < 9; i++) {
      var task = tasksLocation[i];
      var taskContent = task.val();
      storedTaskInput.splice(8, 8, taskContent);
    }
    // call function to save to local storage
    storeInputs();
  }

  // adds and removes past, present and future tag based on current time
  function time() {
    for (var j = 0; j < tasksLocation.length; j++) {
      var format = "hh:mm:ss";
      (beforeTime = moment(j + 9 + ":00:00", format)), // starts at 9am and adds new hour each time it runs for loop
        (afterTime = moment(j + 10 + ":00:00", format)); // ends at 6pm

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
  // when button is clicked, executes userInputs()
  // Localstorage is executed onclick as well
  saveBtn.forEach(function (saveBtn) {
    saveBtn.addEventListener("click", userInput);
  });
});
