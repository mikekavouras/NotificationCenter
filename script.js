var eventName = 'CustomEvent.net';

function addOne() {
  var box = document.querySelector('.box');
  NotificationCenter.addObserver(box, eventName, function() {
    console.log('triggered event', eventName);
  });
}

function addAll() {
  var boxes = document.querySelectorAll('.box');
  NotificationCenter.addObservers(boxes, eventName, function() {
    console.log('triggered event', eventName);
  });
}

function removeOne() {
  var box = document.querySelector('.box');
  NotificationCenter.removeObserver(box, eventName);
}

function removeAll() {
  var boxes = document.querySelectorAll('.box');
  NotificationCenter.removeObservers(boxes, eventName);
}

var buttons = document.getElementsByTagName('button');

buttons[0].addEventListener('click', function() {
  addOne();
}, false);

buttons[1].addEventListener('click', function() {
  addAll();
}, false);

buttons[2].addEventListener('click', function() {
  NotificationCenter.trigger(eventName);
}, false);

buttons[3].addEventListener('click', function() {
  removeOne();
}, false);

buttons[4].addEventListener('click', function() {
  removeAll();
}, false);
