describe('NotificationCenter', function() {

  beforeEach(function() {
    NotificationCenter.removeAllObservers();
  });

  describe('Adding an observer', function() {

    it('can add a DOM observer', function() {
      var DOMElement = document.createElement('div');
      NotificationCenter.addObserver(DOMElement, 'DOMEvent', function() {});
      expect(NotificationCenter.observers['DOMEvent']).not.toBe(undefined);
    });

    it('can add an Object observer', function() {
      var t = {};
      NotificationCenter.addObserver(t, 'objectEvent', function() {});
      expect(NotificationCenter.observers['objectEvent']).not.toBe(undefined);
    });

    it('cannot add the same observer for the same event more than once', function() {
      var DOMElement = document.createElement('div');
      NotificationCenter.addObserver(DOMElement, 'DOMEvent', function() {});
      NotificationCenter.addObserver(DOMElement, 'DOMEvent', function() {});
      expect(NotificationCenter.observers['DOMEvent'].items.length).toBe(1);
    });

  });

  describe('Removing an observer', function() {
    var DOMElement;
    var object;
    var objectEvent = 'objectEvent';
    var DOMEvent = 'DOMEvent';

    beforeEach(function() {
      DOMElement = document.createElement('div');
      object = {};
      NotificationCenter.addObserver(DOMElement, DOMEvent, function() {});
      NotificationCenter.addObserver(object, objectEvent, function() {});
    });

    it('can remove a DOM observer', function() {
      NotificationCenter.removeObserver(DOMElement, DOMEvent);
      expect(NotificationCenter.observers[DOMEvent]).toBe(undefined);
    });

    it('can remove an Object observer', function() {
      NotificationCenter.removeObserver(object, objectEvent);
      expect(NotificationCenter.observers[objectEvent]).toBe(undefined);
    });

    it('cannot remove anything if the item is not found', function() {
      NotificationCenter.removeObserver({}, objectEvent);
      expect(NotificationCenter.observers[objectEvent].items.length).toBe(1);
    });

    it('can only remove the element from the specified event', function() {
      NotificationCenter.addObserver(DOMElement, 'differentEvent', function() {});
      NotificationCenter.removeObserver(DOMElement, DOMEvent);
      expect(NotificationCenter.observers['differentEvent'].items.length).toBe(1);
      expect(NotificationCenter.observers[DOMEvent]).toBe(undefined);
    });

    it('can remove all observers', function() {
      NotificationCenter.removeAllObservers();
      expect(Object.keys(NotificationCenter.observers).length).toBe(0);
    });
  });

  describe('Triggering an event', function() {

    it('can trigger a custom DOM event', function() {
      var i = 0;
      var div = document.createElement('div');
      NotificationCenter.addObserver(div, 'customEvent', function() {
        i = 1;
      });
      expect(i).toEqual(0);
      NotificationCenter.trigger('customEvent');
      expect(i).toEqual(1);
    });

    it('can trigger a custom Object event', function() {
      var i = 0;
      var t = {fire: function() { i = 1; }};
      NotificationCenter.addObserver(t, 'customEvent', t.fire);
      expect(i).toEqual(0);
      NotificationCenter.trigger('customEvent');
      expect(i).toEqual(1);
    });

    it('can deliver a payload', function() {
      var t = {
        fire: function(event, payload) {
          expect(payload).not.toBe(undefined);
          expect(payload.message).toEqual('hello, world');
        }
      };
      NotificationCenter.addObserver(t, 'customEvent', t.fire);
      NotificationCenter.trigger('customEvent', {message: 'hello, world'});
    });

  });


});
