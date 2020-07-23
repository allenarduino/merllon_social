"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timedMutationObserver;
var observeMutations, disconnectObserver; // fall back to polling if MutationObserver is not available

if (window.MutationObserver) {
  observeMutations = function observeMutations(callback, _timeout, node, config) {
    var observer = new MutationObserver(callback);
    observer.observe(node, config);
    return observer;
  };

  disconnectObserver = function disconnectObserver(observer) {
    observer.disconnect();
  };
} else {
  observeMutations = function observeMutations(callback, timeout) {
    return setInterval(callback, Math.min(timeout, 500));
  };

  disconnectObserver = function disconnectObserver(observer) {
    clearInterval(observer);
  };
}

var defaultObserverConfig = {
  attributes: true,
  childList: true,
  subtree: true
};

function timedMutationObserver(callback, timeout) {
  var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var observerConfig = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultObserverConfig;
  var cancel;
  var result = new Promise(function (resolve, reject) {
    var observer;
    var timeoutId;
    var success;

    cancel = function cancel() {
      disconnectObserver(observer);
      clearTimeout(timeoutId);

      if (!success) {
        var reason = new Error('MutationObserver cancelled');
        reason.cancelled = true;
        reason.timedOut = false;
        reject(reason);
      }
    };

    observer = observeMutations(function () {
      if (!success && (success = callback())) {
        cancel();
        resolve(success);
      }
    }, timeout, node, observerConfig);
    timeoutId = setTimeout(function () {
      disconnectObserver(observer);
      clearTimeout(timeoutId);

      if (!success) {
        var reason = new Error('MutationObserver timed out');
        reason.cancelled = false;
        reason.timedOut = true;
        reject(reason);
      }
    }, timeout);
  });
  result.cancel = cancel;
  return result;
}