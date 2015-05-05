// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
  new CustomEvent("test");
} catch(e) {
 var CustomEvent = function(event, params) {
      var evt;
      params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
      };

      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

// Polyfill for MouseEvent on IE9/10/11

if (typeof MouseEvent !== 'function') {
    (function (){
        var _MouseEvent = window.MouseEvent;
        window.MouseEvent = function (type, dict){
            dict = dict | {};
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent(
                    type,
                    (typeof dict.bubbles == 'undefined') ? true : !!dict.bubbles,
                    (typeof dict.cancelable == 'undefined') ? false : !!dict.cancelable,
                    dict.view || window,
                    dict.detail | 0,
                    dict.screenX | 0,
                    dict.screenY | 0,
                    dict.clientX | 0,
                    dict.clientY | 0,
                    !!dict.ctrlKey,
                    !!dict.altKey,
                    !!dict.shiftKey,
                    !!dict.metaKey,
                    dict.button | 0,
                    dict.relatedTarget || null
            );
            return event;
        }
    })();
}
