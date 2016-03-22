function randomColor() {
  var colors = ['blue', 'green', 'red', 'yellow', 'gray', 'black', 'purple'];
  var idx = Math.floor(Math.random() * (colors.length + 1));
  return colors[idx];
}

// EXAMPLE 1

(function() {
  var example1 = document.querySelector('.example-1');
  var boxes = example1.querySelectorAll('.box');
  NotificationCenter.addObservers(boxes, 'example1Event', function(e) {
    e.target.style.backgroundColor = randomColor();
  });

  example1.getElementsByTagName('button')[0].addEventListener('click', function() {
    NotificationCenter.trigger('example1Event');
  }, false);
})();


// EXAMPLE 2

(function() {
  var example2 = document.querySelector('.example-2');
  var boxes = example2.querySelectorAll('.box');
  function addFirst() {
    NotificationCenter.addObserver(boxes[0], 'example2Event', function(e) {
      e.target.style.backgroundColor = randomColor();
    });
  }

  function addAll() {
    NotificationCenter.addObservers(boxes, 'example2Event', function(e) {
      e.target.style.backgroundColor = randomColor();
    });
  }

  function removeFirst() {
    NotificationCenter.removeObserver(boxes[0], 'example2Event');
  }

  function removeAll() {
    NotificationCenter.removeObservers(boxes, 'example2Event');
  }

  var buttons = example2.getElementsByTagName('button');

  buttons[0].addEventListener('click', function() {
    addFirst();
  }, false);

  buttons[1].addEventListener('click', function() {
    addAll();
  }, false);

  buttons[2].addEventListener('click', function() {
    NotificationCenter.trigger('example2Event');
  }, false);

  buttons[3].addEventListener('click', function() {
    removeFirst();
  }, false);

  buttons[4].addEventListener('click', function() {
    removeAll();
  }, false);
})();
