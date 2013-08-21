<h1>Notifications.js</h1>
<p>Notifications.js was designed as an abstraction layer between JavaScript events and the DOM.</p>

```javascript
  var colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange"
  ];

  var $ball = $('.ball');

  // bind a custom event to $ball
  $ball.bind('changeColor', function() {
    var rand = Math.floor(Math.random() * colors.length + 1);
    $(this).css('backgroundColor', colors[rand]);
  });

  // add $ball to Notifications as an observer of the 'changeColor' event
  Notifications.addObserver($ball, "changeColor");

  // bind the 'up' arrow keydown event to trigger the 'changeColor' event
  $(document).bind('keydown', function(e) {
    if (e.keyCode !== 38) return;

    Notifications.trigger('changeColor');
  });
```
