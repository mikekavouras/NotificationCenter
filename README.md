<h1>Notifications.js</h1>
<p>Notifications.js was designed as an abstraction layer between JavaScript events and the DOM.</p>

```
  var colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange"
  ];

  var $ball = $('.ball');

  $ball.bind('changeColor', function() { <br>
    var rand = Math.floor(Math.random() * colors.length + 1);
    $(this).css('backgroundColor', colors[rand]);
  });

  Notifications.addObserver($ball, "changeColor");
```
