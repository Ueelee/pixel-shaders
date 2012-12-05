// Generated by CoffeeScript 1.4.0
(function() {
  var askForCam, streaming, video;

  video = null;

  streaming = false;

  askForCam = function() {
    var error, success;
    success = function(stream) {
      console.log("received stream");
      if (navigator.mozGetUserMedia !== void 0) {
        video.src = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
      video.play();
      return streaming = true;
    };
    error = function(err) {
      alert('Webcam required');
      return console.log(err);
    };
    return navigator.getUserMedia({
      video: true
    }, success, error);
  };

  module.exports = function() {
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (!video) {
      video = document.createElement('video');
      video.width = 640;
      video.height = 480;
      setTimeout(askForCam, 200);
    }
    if (streaming && video.readyState === 4) {
      return video;
    } else {
      return false;
    }
  };

}).call(this);
