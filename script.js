colors = [
  "darksalmon",
  "cadetblue",
  "darkseagreen",
  "slategray",
  "darkgray",
  "sandybrown",
  "powderblue",
  "palevioletred",
  "goldenrod"
];

function log(message) {
  var $textarea = $('textarea');
  var text = $textarea.val();
  $textarea.val(text + '\n' + message);
  $textarea.get(0).scrollTop = $textarea.get(0).scrollHeight;
}

$(document).ready(function() {

  var $firstGroup = $('.box:lt(5)');
  var $secondGroup = $('.box').not($firstGroup);

  $firstGroup.bind('click', function() {
    var $self = $(this);

    if ($self.hasClass('bound')) {
      Notifications.removeObserver($(this), "changeColor");
      log("Box " + $self.index() + " has unsubscribed from the changeColor: event");
    } else {
      log("Box " + $self.index() + " has subscribed to the changeColor: event");
      Notifications.addObserver($(this), "changeColor");
    }

    $self.toggleClass('bound')
  });

  $secondGroup.bind('click', function() {
    var $self = $(this);

    if ($self.hasClass('bound')) {
      Notifications.removeObserver($(this), "move");
      log("Box " + $self.index() + " has unsubscribed from the move: event");
    } else {
      log("Box " + $self.index() + " has subscribed to the move: event");
      Notifications.addObserver($(this), "move");
    }

    $self.toggleClass('bound')
  });

  $firstGroup.bind('changeColor', function() {
    var rand = Math.floor(Math.random() * colors.length + 1);
    $(this).css('background' , colors[rand]);
  });

  $secondGroup.bind('move', function() {
    var $self = $(this);
    var translate = parseInt($self.attr('data-translate'), 10);
    $self.css('-webkit-transform', 'translateY('+translate+'px)');
    $self.attr('data-translate', translate + 5);
  });

  $('#change').click(function() {
    Notifications.trigger('changeColor');
    log('event fired: colorChanged');
  });

  $('#move').click(function() {
    Notifications.trigger('move');
    log('event fired: move');
  });

  $('#show').click(function() {
    var text = "";
    var obj = Notifications.observers;

    for (var key in obj) {
      text += "event: " + key + " has ";
      if (Notifications.observers[key].length > 0) {
        var arr = Notifications.observers[key];
        text += arr.length + " observer";
        if (arr.length > 1) text += "s";
      }
      text += '\n';
    }

    if ($.trim(text) === "")
      log("There are 0 observers");
    else
      log(text);
  });

  $(document).bind('keydown', function(e) {
    var code = e.keyCode;
    var index = null;
    switch (code) {
      case 49:
        index = 0;
        break;
      case 50:
        index = 1;
        break;
      case 51:
        index = 2;
        break;
      case 52:
        index = 3;
        break;
      case 53:
        index = 4;
        break;
      case 54:
        index = 5;
        break;
      case 55:
        index = 6;
        break;
      case 56:
        index = 7;
        break;
      case 57:
        index = 8;
        break;
      case 48:
        index = 9;
        break;
      case 38:
        $('#change').trigger('click');
        break;
      case 40:
        $('#move').trigger('click');
        break;
      default:
        return;
    }

    if (index === null) return;

    $('.box').eq(index).trigger('click');
  });
});
