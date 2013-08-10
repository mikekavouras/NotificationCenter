<h1>Notifications.js</h1>
<p>Notifications.js was designed as an abstraction layer between JavaScript events and the DOM.</p>

<code>
  var colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange"
  ];
</code>

<code>
  var $ball = $('.ball');
</code>

<code>
  $ball.bind('changeColor', function() { <br>
    var rand = Math.floor(Math.random() * colors.length + 1);
    $(this).css('backgroundColor', colors[rand]);
  });
</code>

<code>
  Notifications.addObserver($ball, "changeColor");
</code>
