/*
 * Structure
 * {
 *   namespace: {
 *     event: Event,
 *     items: [
 *       [Object, Function],
 *       ...
 *     ]
 *   }
 * }
*/

var NotificationCenter = {

  observers: {},

  addObserver: function(elem, namespace, action) {
    if (typeof this.observers[namespace] === 'undefined') {
      var event = this._createEvent(namespace);
      this.observers[namespace] = {event: event, items: []};
    }
    if (!this._data(elem, namespace).present) {
      if (typeof elem.addEventListener !== 'undefined') {
        elem.addEventListener(namespace, action, false);
      }
      this.observers[namespace].items.push([elem, action]);
    }
  },

  addObservers: function(elems, namespace, action) {
    for (var i = 0; i < elems.length; i++) {
      this.addObserver(elems[i], namespace, action);
    }
  },

  removeObserver: function(elem, namespace) {
    var data = this._data(elem, namespace);
    if (data.present) {
      if (typeof elem.removeEventListener !== 'undefined') {
        elem.removeEventListener(namespace, data.action, false);
      }
      data.items.splice(data.index, 1);
      if (data.items.length === 0) {
        delete this.observers[namespace];
      }
    }
  },

  removeObservers: function(elems, namespace) {
    for (var i = 0; i < elems.length; i++) {
      this.removeObserver(elems[i], namespace);
    }
  },

  trigger: function(namespace, payload) {
    var object = this.observers[namespace];
    if (typeof object === 'undefined') return;
    var items = object.items;
    for (var i = 0; i < items.length; i++) {
      var elem = items[i][0];
      if (typeof elem.dispatchEvent === 'undefined') {
        items[i][1].call(elem, object.event, payload);
      } else {
        elem.dispatchEvent(object.event);
      }
    }
  },

  removeAllObservers: function() {
    this.observers = {};
  },

  _data: function(elem, namespace) {
    var object = this.observers[namespace];
    if (typeof object === 'undefined') {
      return {present: false};
    }
    var items = object.items;
    var elems = this._elems(items);
    var idx = elems.indexOf(elem);
    var action = this._actions(items)[idx];
    return {
      present: idx >= 0,
      index: idx,
      action:action,
      elem: elem,
      event: object.event,
      items: items
    };
  },

  _elems: function(items) {
    var elems = [];
    for (var i = 0; i < items.length; i++) {
      elems.push(items[i][0]);
    }
    return elems;
  },

  _actions: function(items) {
    var actions = [];
    for (var i = 0; i < items.length; i++) {
      actions.push(items[i][1]);
    }
    return actions;
  },

  _createEvent: function(namespace) {
    if (typeof Event !== 'undefined') {
      return new Event(namespace);
    } else {
      var event = document.createEvent('Event');
      event.initEvent(namespace, true, true);
      return event;
    }
  }

};
