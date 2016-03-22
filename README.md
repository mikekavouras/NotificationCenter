<h1>NotificationCenter.js</h1>
`NotificationCenter.js` is inspired by `NSNotificationCenter`. While some may argue that the global notification pattern is inherently faulty, there are enough times where it is the most appropriate way to communicate between objects.

`NotificationCenter.js` works with both **DOM objects** and **vanilla objects**. 


### Examples

**DOM Objects**

```javascript
  var randomColor = function() {
    var colors = ['red', 'blue', 'green', 'purple', 'gray'];
    var idx = Math.floor(Math.random() * (colors.length + 1));
    return colors[idx];
  };
  
  var boxes = document.querySelectorAll('.box');

  NotificationCenter.addObservers(boxes, 'customDOMEvent', function(e) {
    e.target.style.backgroundColor = randomColor();
  });

  var button = document.getElementsByTagName('button')[2];
  button.addEventListener('click', function() {
    NotificationCenter.trigger('customDOMEvent');
  }, false);
  
}
```
