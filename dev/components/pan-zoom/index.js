// Generated by CoffeeScript 1.4.0

/*
Options:
  element
  minX
  maxX
  minY
  maxY
  flipY
  flipX
*/


(function() {
  var $, Emitter, lerp, mouseWheelEvent;

  $ = require("jquery");

  Emitter = require('emitter');

  mouseWheelEvent = function(orgEvent) {
    var delta, deltaX, deltaY;
    delta = 0;
    deltaX = 0;
    deltaY = 0;
    if (orgEvent.wheelDelta) {
      delta = orgEvent.wheelDelta / 120;
    }
    if (orgEvent.detail) {
      delta = -orgEvent.detail / 3;
    }
    deltaY = delta;
    if (orgEvent.axis !== void 0 && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      deltaY = 0;
      deltaX = -1 * delta;
    }
    if (orgEvent.wheelDeltaY !== void 0) {
      deltaY = orgEvent.wheelDeltaY / 120;
    }
    if (orgEvent.wheelDeltaX !== void 0) {
      deltaX = -1 * orgEvent.wheelDeltaX / 120;
    }
    return [delta, deltaX, deltaY];
  };

  lerp = function(x, min, max) {
    return min + x * (max - min);
  };

  module.exports = function(opts) {
    var $element, down, pz, toLocal, wheel;
    $element = $(opts.element);
    pz = {};
    pz.minX = opts.minX;
    pz.maxX = opts.maxX;
    pz.minY = opts.minY;
    pz.maxY = opts.maxY;
    Emitter(pz);
    toLocal = function(pageX, pageY) {
      var height, offset, width, x, y;
      width = $element.width();
      height = $element.height();
      offset = $element.offset();
      x = (pageX - offset.left) / width;
      y = (pageY - offset.top) / height;
      if (opts.flipX) {
        x = 1 - x;
      }
      if (opts.flipY) {
        y = 1 - y;
      }
      return [lerp(x, pz.minX, pz.maxX), lerp(y, pz.minY, pz.maxY)];
    };
    down = function(e) {
      var downX, downY, move, up, _ref;
      _ref = toLocal(e.pageX, e.pageY), downX = _ref[0], downY = _ref[1];
      move = function(e) {
        var x, y, _ref1;
        _ref1 = toLocal(e.pageX, e.pageY), x = _ref1[0], y = _ref1[1];
        pz.minX += downX - x;
        pz.maxX += downX - x;
        pz.minY += downY - y;
        pz.maxY += downY - y;
        return pz.emit("update");
      };
      up = function(e) {
        $(document).off("mousemove", move);
        return $(document).off("mouseup", up);
      };
      $(document).on("mousemove", move);
      $(document).on("mouseup", up);
      return e.preventDefault();
    };
    $element.on("mousedown", down);
    wheel = function(e) {
      var delta, deltaLimit, deltaX, deltaY, scale, scaleFactor, x, y, _ref, _ref1;
      _ref = mouseWheelEvent(e.originalEvent), delta = _ref[0], deltaX = _ref[1], deltaY = _ref[2];
      _ref1 = toLocal(e.originalEvent.pageX, e.originalEvent.pageY), x = _ref1[0], y = _ref1[1];
      deltaLimit = 2.8;
      delta = Math.min(Math.max(delta, -deltaLimit), deltaLimit);
      scaleFactor = 1.1;
      scale = Math.pow(scaleFactor, -delta);
      pz.minX = (pz.minX - x) * scale + x;
      pz.maxX = (pz.maxX - x) * scale + x;
      pz.minY = (pz.minY - y) * scale + y;
      pz.maxY = (pz.maxY - y) * scale + y;
      e.preventDefault();
      return pz.emit("update");
    };
    $element.on("mousewheel", wheel);
    $element.on("DOMMouseScroll", wheel);
    return pz;
  };

}).call(this);
