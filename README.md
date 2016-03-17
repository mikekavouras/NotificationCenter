<h1>Notifications.js</h1>
<p>Notifications.js was designed as an extremely lightweight abstraction layer between JavaScript events and the DOM.</p>

```javascript
  var boxes = document.querySelectorAll('.box');

  NotificationCenter.addObserver(boxes[0], 'changeColor', function(e) {
    e.target.style.backgroundColor = 'blue';
  });

  NotificationCenter.addObserver(boxes[1], 'changeColor', function(e) {
    e.target.style.backgroundColor = 'red';
  });

  var button = document.getElementsByTagName('button');
  button.addEventListener('click', function() {
    NotificationCenter.trigger('changeColor');
  }, false);
}
```
