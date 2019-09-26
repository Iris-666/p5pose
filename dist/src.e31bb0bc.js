// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"sketch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSketch = setSketch;
exports.setup = setup;
exports.keyPressed = keyPressed;
exports.mouseClicked = mouseClicked;
exports.draw = draw;
// import "p5/lib/addons/p5.dom";
var scale = 1;
var width = 640 * scale;
var height = 480 * scale; // setSketch sets this

var p5; // setup initializes this

var video; // let osc;

var startbuttonpressed;
var label;
var leftShoulderMove = false;
var rightShoulderMove = false;
var leftEyeMove = false;
var rightEyeMove = false;
var leftElbowMove = false;
var rightElbowMove = false;
var leftWristMove = false;
var rightWristMove = false;
var leftHipMove = false;
var rightHipMove = false;
var leftKneeMove = false;
var rightKneeMove = false;
var leftAnkleMove = false;
var rightAnkleMove = false;
var rightshoulderdeltaX = 0;
var rightshoulderdeltaY = 0;
var leftshoulderdeltaX = 0;
var leftshoulderdeltaY = 0;
var righteyedeltaX = 0;
var righteyedeltaY = 0;
var lefteyedeltaX = 0;
var lefteyedeltaY = 0;
var leftelbowdeltaX = 0;
var leftelbowdeltaY = 0;
var rightelbowdeltaX = 0;
var rightelbowdeltaY = 0;
var leftwristdeltaX = 0;
var leftwristdeltaY = 0;
var rightwristdeltaX = 0;
var rightwristdeltaY = 0;
var lefthipdeltaX = 0;
var lefthipdeltaY = 0;
var righthipdeltaX = 0;
var righthipdeltaY = 0;
var leftkneedeltaX = 0;
var leftkneedeltaY = 0;
var rightkneedeltaX = 0;
var rightkneedeltaY = 0;
var leftankledeltaX = 0;
var leftankledeltaY = 0;
var rightankledeltaX = 0;
var rightankledeltaY = 0;
var leftShoulderPositionX;
var leftShoulderPositionY;
var rightShoulderPositionX;
var rightShoulderPositionY;
var leftEyePositionX;
var leftEyePositionY;
var rightEyePositionX;
var rightEyePositionY;
var leftElbowPositionX;
var leftElbowPositionY;
var rightElbowPositionX;
var rightElbowPositionY;
var leftWristPositionX;
var leftWristPositionY;
var rightWristPositionX;
var rightWristPositionY;
var leftHipPositionX;
var leftHipPositionY;
var rightHipPositionX;
var rightHipPositionY;
var leftKneePositionX;
var leftKneePositionY;
var rightKneePositionX;
var rightKneePositionY;
var leftAnklePositionX;
var leftAnklePositionY;
var rightAnklePositionX;
var rightAnklePositionY;

function setSketch(sketch) {
  p5 = sketch;
}

function setup() {
  p5.createCanvas(width, height);
  video = p5.select('video') || p5.createCapture(p5.VIDEO);
  video.size(width, height); // Create a new poseNet method with a single detection

  var poseNet = ml5.poseNet(video, function () {
    return p5.select('#status').hide();
  }); // Every time we get a new pose, draw it

  poseNet.on('pose', drawPoses); // Hide the video element, and just show the canvas

  video.hide(); // let moveArray = [leftShoulderMove,rightShoulderMove,leftEyeMove,rightEyeMove];
  // moveArray.forEach(function(item) {
  //   console.log(item);
  // }) 
  // const audioButton = p5.createButton('click to start audio');
  // audioButton.position(5, height + 100);
  // audioButton.mouseClicked(() => {
  //   p5.userStartAudio().then(() => {
  //     audioButton.remove();
  //     osc = new window.p5.Oscillator();
  //     osc.start();
  //   });
  // });

  label = p5.createDiv();
  label.position(5, height + 50);
  label.style('font-size', '24pt');
  var startButton = p5.createButton('click to start');
  startButton.position(5, height + 90);
  startButton.mouseClicked(function () {
    startbuttonpressed = true;
    startButton.remove();
  });
  var rightShoulderButton = p5.createButton('Right Shoulder');
  rightShoulderButton.position(120, height + 120);
  rightShoulderButton.mouseClicked(function () {
    rightShoulderMove = true;
    leftShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftShoulderButton = p5.createButton('Left Shoulder');
  leftShoulderButton.position(5, height + 120);
  leftShoulderButton.mouseClicked(function () {
    leftShoulderMove = true;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftEyeButton = p5.createButton('Left Eye');
  leftEyeButton.position(5, height + 150);
  leftEyeButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = true;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var rightEyeButton = p5.createButton('Right Eye');
  rightEyeButton.position(120, height + 150);
  rightEyeButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = true;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftElbowButton = p5.createButton('Left Elbow');
  leftElbowButton.position(5, height + 180);
  leftElbowButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = true;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var rightElbowButton = p5.createButton('Right Elbow');
  rightElbowButton.position(120, height + 180);
  rightElbowButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = true;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftWristButton = p5.createButton('Left Wrist');
  leftWristButton.position(5, height + 210);
  leftWristButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = true;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var rightWristButton = p5.createButton('Right Wrist');
  rightWristButton.position(120, height + 210);
  rightWristButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = true;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftHipButton = p5.createButton('Left Hip');
  leftHipButton.position(5, height + 240);
  leftHipButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = true;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var rightHipButton = p5.createButton('Right Hip');
  rightHipButton.position(120, height + 240);
  rightHipButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = true;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftKneeButton = p5.createButton('Left Knee');
  leftKneeButton.position(5, height + 270);
  leftKneeButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = true;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var rightKneeButton = p5.createButton('Right Knee');
  rightKneeButton.position(120, height + 270);
  rightKneeButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = true;
    leftAnkleMove = false;
    rightAnkleMove = false;
  });
  var leftAnkleButton = p5.createButton('Left Ankle');
  leftAnkleButton.position(5, height + 300);
  leftAnkleButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = true;
    rightAnkleMove = false;
  });
  var rightAnkleButton = p5.createButton('Right Ankle');
  rightAnkleButton.position(120, height + 300);
  rightAnkleButton.mouseClicked(function () {
    leftShoulderMove = false;
    rightShoulderMove = false;
    leftEyeMove = false;
    rightEyeMove = false;
    leftElbowMove = false;
    rightElbowMove = false;
    leftWristMove = false;
    rightWristMove = false;
    leftHipMove = false;
    rightHipMove = false;
    leftKneeMove = false;
    rightKneeMove = false;
    leftAnkleMove = false;
    rightAnkleMove = true;
  }); // for (let count = 0;count <= 3; count += 1){
  //   console.log(count);
  //   if (moveArray[count] == true) {
  //      let left = 3 - count;
  //      for(let i = 1; i <= left; i += 1){
  //        moveArray[count + i] = false;
  //      }
  //   }
  // }
} // Define a function that is when the user presses a key. The `event` argument
// has properties, including `event.key`, that tell which key is pressed.
//
// See https://p5js.org/reference/#/p5/keyPressed


function keyPressed(event) {
  console.log('keyPressed', event.key);

  if (leftShoulderMove == true) {
    if (event.key === 'ArrowLeft') {
      leftshoulderdeltaX = leftshoulderdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      leftshoulderdeltaX = leftshoulderdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      leftshoulderdeltaY = leftshoulderdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      leftshoulderdeltaY = leftshoulderdeltaY + 10;
    }

    return false;
  }

  if (rightShoulderMove == true) {
    if (event.key === 'ArrowLeft') {
      rightshoulderdeltaX = rightshoulderdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      rightshoulderdeltaX = rightshoulderdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      rightshoulderdeltaY = rightshoulderdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      rightshoulderdeltaY = rightshoulderdeltaY + 10;
    }

    return false;
  }

  if (leftEyeMove == true) {
    if (event.key === 'ArrowLeft') {
      lefteyedeltaX = lefteyedeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      lefteyedeltaX = lefteyedeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      lefteyedeltaY = lefteyedeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      lefteyedeltaY = lefteyedeltaY + 10;
    }

    return false;
  }

  if (rightEyeMove == true) {
    if (event.key === 'ArrowLeft') {
      righteyedeltaX = righteyedeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      righteyedeltaX = righteyedeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      righteyedeltaY = righteyedeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      righteyedeltaY = righteyedeltaY + 10;
    }

    return false;
  }

  if (leftElbowMove == true) {
    if (event.key === 'ArrowLeft') {
      leftelbowdeltaX = leftelbowdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      leftelbowdeltaX = leftelbowdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      leftelbowdeltaY = leftelbowdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      leftelbowdeltaY = leftelbowdeltaY + 10;
    }

    return false;
  }

  if (rightElbowMove == true) {
    if (event.key === 'ArrowLeft') {
      rightelbowdeltaX = rightelbowdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      rightelbowdeltaX = rightelbowdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      rightelbowdeltaY = rightelbowdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      rightelbowdeltaY = rightelbowdeltaY + 10;
    }

    return false;
  }

  if (leftWristMove == true) {
    if (event.key === 'ArrowLeft') {
      leftwristdeltaX = leftwristdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      leftwristdeltaX = leftwristdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      leftwristdeltaY = leftwristdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      leftwristdeltaY = leftwristdeltaY + 10;
    }

    return false;
  }

  if (rightWristMove == true) {
    if (event.key === 'ArrowLeft') {
      rightwristdeltaX = rightwristdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      rightwristdeltaX = rightwristdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      rightwristdeltaY = rightwristdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      rightwristdeltaY = rightwristdeltaY + 10;
    }

    return false;
  }

  if (leftHipMove == true) {
    if (event.key === 'ArrowLeft') {
      lefthipdeltaX = lefthipdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      lefthipdeltaX = lefthipdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      lefthipdeltaY = lefthipdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      lefthipdeltaY = lefthipdeltaY + 10;
    }

    return false;
  }

  if (rightHipMove == true) {
    if (event.key === 'ArrowLeft') {
      righthipdeltaX = righthipdeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      righthipdeltaX = righthipdeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      righthipdeltaY = righthipdeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      righthipdeltaY = righthipdeltaY + 10;
    }

    return false;
  }

  if (leftKneeMove == true) {
    if (event.key === 'ArrowLeft') {
      leftkneedeltaX = leftkneedeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      leftkneedeltaX = leftkneedeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      leftkneedeltaY = leftkneedeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      leftkneedeltaY = leftkneedeltaY + 10;
    }

    return false;
  }

  if (rightKneeMove == true) {
    if (event.key === 'ArrowLeft') {
      rightkneedeltaX = rightkneedeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      rightkneedeltaX = rightkneedeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      rightkneedeltaY = rightkneedeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      rightkneedeltaY = rightkneedeltaY + 10;
    }

    return false;
  }

  if (leftAnkleMove == true) {
    if (event.key === 'ArrowLeft') {
      leftankledeltaX = leftankledeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      leftankledeltaX = leftankledeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      leftankledeltaY = leftankledeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      leftankledeltaY = leftankledeltaY + 10;
    }

    return false;
  }

  if (rightAnkleMove == true) {
    if (event.key === 'ArrowLeft') {
      rightankledeltaX = rightankledeltaX + 10;
    }

    if (event.key === 'ArrowRight') {
      rightankledeltaX = rightankledeltaX - 10;
    }

    if (event.key === 'ArrowUp') {
      rightankledeltaY = rightankledeltaY - 10;
    }

    if (event.key === 'ArrowDown') {
      rightankledeltaY = rightankledeltaY + 10;
    }

    return false;
  }
} // Define a function that is when the user clicks the mouse (or trackpad). The
// `event` argument Similar functions can be defined to tell when the mouse is
// released, or dragged.


function mouseClicked(event) {
  console.log('mouseClicked', event.clientX, event.clientY);
}

function draw() {}

function drawPoses(poses) {
  // p5.backgroundColor = "black";
  p5.translate(width, 0); // move to far corner

  p5.scale(-1.0, 1.0); // p5.image(video, 0, 0, video.width, video.height);

  p5.fill(0, 100);
  p5.rect(0, 0, width, height);

  if (poses.length > 0) {
    var pose = poses[0].pose; //console.log('Score =', pose.score);
    // label.html('Score = ' + JSON.stringify(pose.keypoints));
  }

  if (startbuttonpressed == true) {
    drawKeypoints(poses); // drawSkeleton(poses);
    // playAudio(poses);
  }
} // }
// function playAudio(poses) {
//   if (!osc) {
//     return;
//   }
//   if (poses.length == 0) {
//     osc.amp(0);
//     return;
//   }
//   const pose = poses[0].pose;
//   const wrist1 = pose.keypoints[9];
//   const wrist2 = pose.keypoints[10];
//   const dx = wrist2.position.x - wrist1.position.x;
//   const scaled = Math.abs(dx) / width;
//   const octave = 2 + 4 * scaled;
//   const freq = 16.352 * 2 ** octave;
//   osc.freq(0.9 * osc.getFreq() + 0.1 * freq);
//   const avgWristY = (wrist1.position.y + wrist2.position.y) / 2;
//   const amp = 1 - avgWristY / height;
//   osc.amp(0.9 * osc.getAmp() + 0.1 * amp);
//   label.html(`freq=${freq} amp=${amp}`);
// }
// Draw ellipses over the detected keypoints


function drawKeypoints(poses) {
  poses.forEach(function (pose) {
    return pose.pose.keypoints.forEach(function (keypoint) {
      var x = document.getElementById("confidence"); // console.log(x.value)

      if (keypoint.score > x.value) {
        p5.fill(255, 255, 255);
        p5.noStroke(); // p5.ellipse(keypoint.position.x, keypoint.position.y, 20, 10);

        var _pose = poses[0].pose;
        var eye1 = _pose.keypoints[1];
        var eye2 = _pose.keypoints[2];
        var distance_eyes = Math.abs(eye1.position.x - eye2.position.x); // console.log(distance_eyes);

        if (keypoint.part == 'nose') {
          p5.fill(215, 196, 187);
          p5.circle(keypoint.position.x, keypoint.position.y - 10, distance_eyes * 1.8);
        }

        if (keypoint.part == "leftEye") {
          leftEyePositionX = keypoint.position.x + lefteyedeltaX;
          leftEyePositionY = keypoint.position.y + lefteyedeltaY;
        }

        if (keypoint.part == "rightEye") {
          rightEyePositionX = keypoint.position.x + righteyedeltaX;
          rightEyePositionY = keypoint.position.y + righteyedeltaY;
        }

        if (keypoint.part == 'rightEye') {
          p5.fill(255);
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.ellipse(rightEyePositionX, rightEyePositionY, distance_eyes / 1.5, distance_eyes / 2.2);
          p5.fill(0);
          p5.circle(rightEyePositionX, rightEyePositionY, distance_eyes / 2.2);
        }

        if (keypoint.part == 'leftEye') {
          p5.fill(255);
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.ellipse(leftEyePositionX, leftEyePositionY, distance_eyes / 1.5, distance_eyes / 2.2);
          p5.fill(0);
          p5.circle(leftEyePositionX, leftEyePositionY, distance_eyes / 2.2);
        }

        if (keypoint.part == 'leftShoulder') {
          p5.rect(leftShoulderPositionX, leftShoulderPositionY, 10, 10);
          leftShoulderPositionX = keypoint.position.x + leftshoulderdeltaX;
          leftShoulderPositionY = keypoint.position.y + leftshoulderdeltaY;
        }

        if (keypoint.part == 'rightShoulder') {
          p5.rect(rightShoulderPositionX, rightShoulderPositionY, 10, 10);
          rightShoulderPositionX = keypoint.position.x + rightshoulderdeltaX;
          rightShoulderPositionY = keypoint.position.y + rightshoulderdeltaY;
        }

        if (keypoint.part == "leftElbow") {
          p5.rect(leftElbowPositionX, leftElbowPositionY, 10, 10);
          leftElbowPositionX = keypoint.position.x + leftelbowdeltaX;
          leftElbowPositionY = keypoint.position.y + leftelbowdeltaY;
        }

        if (keypoint.part == "rightElbow") {
          p5.rect(rightElbowPositionX, rightElbowPositionY, 10, 10);
          rightElbowPositionX = keypoint.position.x + rightelbowdeltaX;
          rightElbowPositionY = keypoint.position.y + rightelbowdeltaY;
        }

        if (keypoint.part == "leftWrist") {
          p5.rect(leftWristPositionX, leftWristPositionY, 10, 10);
          leftWristPositionX = keypoint.position.x + leftwristdeltaX;
          leftWristPositionY = keypoint.position.y + leftwristdeltaY;
        }

        if (keypoint.part == "rightWrist") {
          p5.rect(rightWristPositionX, rightWristPositionY, 10, 10);
          rightWristPositionX = keypoint.position.x + rightwristdeltaX;
          rightWristPositionY = keypoint.position.y + rightwristdeltaY;
        }

        if (keypoint.part == "leftHip") {
          p5.rect(leftHipPositionX, leftHipPositionY, 10, 10);
          leftHipPositionX = keypoint.position.x + lefthipdeltaX;
          leftHipPositionY = keypoint.position.y + lefthipdeltaY;
        }

        if (keypoint.part == "rightHip") {
          p5.rect(rightHipPositionX, rightHipPositionY, 10, 10);
          rightHipPositionX = keypoint.position.x + righthipdeltaX;
          rightHipPositionY = keypoint.position.y + righthipdeltaY;
        }

        if (keypoint.part == "leftKnee") {
          p5.rect(leftKneePositionX, leftKneePositionY, 10, 10);
          leftKneePositionX = keypoint.position.x + leftkneedeltaX;
          leftKneePositionY = keypoint.position.y + leftkneedeltaY;
        }

        if (keypoint.part == "rightKnee") {
          p5.rect(rightKneePositionX, rightKneePositionY, 10, 10);
          rightKneePositionX = keypoint.position.x + rightkneedeltaX;
          rightKneePositionY = keypoint.position.y + rightkneedeltaY;
        }

        if (keypoint.part == "leftAnkle") {
          p5.rect(leftAnklePositionX, leftAnklePositionY, 10, 10);
          leftAnklePositionX = keypoint.position.x + leftankledeltaX;
          leftAnklePositionY = keypoint.position.y + leftankledeltaY;
        }

        if (keypoint.part == "rightAnkle") {
          p5.rect(rightAnklePositionX, rightAnklePositionY, 10, 10);
          rightAnklePositionX = keypoint.position.x + rightankledeltaX;
          rightAnklePositionY = keypoint.position.y + rightankledeltaY;
        } // if(keypoint.part == 'leftShoulder'){
        //   p5.rect(leftShoulderPositionX, leftShoulderPositionY,10,10);
        // }
        // if(keypoint.part == 'rightShoulder') {
        //   p5.rect(rightShoulderPositionX, rightShoulderPositionY,10,10);
        // }


        p5.stroke(255, 107, 140);
        p5.strokeWeight(4);
        p5.line(leftShoulderPositionX, leftShoulderPositionY, rightShoulderPositionX, rightShoulderPositionY);
        p5.line(leftElbowPositionX, leftElbowPositionY, leftShoulderPositionX, leftShoulderPositionY);
        p5.line(rightElbowPositionX, rightElbowPositionY, rightShoulderPositionX, rightShoulderPositionY);
        p5.line(leftElbowPositionX, leftElbowPositionY, leftWristPositionX, leftWristPositionY);
        p5.line(rightElbowPositionX, rightElbowPositionY, rightWristPositionX, rightWristPositionY);
        p5.line(leftHipPositionX, leftHipPositionY, rightHipPositionX, rightHipPositionY);
        p5.line(leftHipPositionX, leftHipPositionY, leftShoulderPositionX, leftShoulderPositionY);
        p5.line(rightHipPositionX, rightHipPositionY, rightShoulderPositionX, rightShoulderPositionY);
        p5.line(leftHipPositionX, leftHipPositionY, leftKneePositionX, leftKneePositionY);
        p5.line(rightHipPositionX, rightHipPositionY, rightKneePositionX, rightKneePositionY);
        p5.line(leftAnklePositionX, leftAnklePositionY, leftKneePositionX, leftKneePositionY);
        p5.line(rightAnklePositionX, rightAnklePositionY, rightKneePositionX, rightKneePositionY);
      }
    });
  });
} // function drawSkeleton(poses) {
//     poses.forEach((pose) => {
//       pose.skeleton.forEach((skeleton) => {
//         const [p1, p2] = skeleton;
//         p5.stroke(255, 107, 140);
//         p5.strokeWeight(4);
//         p5.line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
//       });
//     });
// }
},{}],"index.js":[function(require,module,exports) {
"use strict";

var sketch = _interopRequireWildcard(require("./sketch"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// // import p5 from 'p5';
// import * as sketch from './sketch';
// // Force page refresh on hot reload
// if (module.hot) {
//     module.hot.accept(() => window.location.reload());
// }
// const s2 = (p5s) => {
//   sketch.setSketch(p5s);
//   p5s.setup = () => sketch.setup(sketch);
//   p5s.draw = () => sketch.draw(sketch);
// }
// new p5(s2, 'container');
// Force page refresh on hot reload
if (module.hot) {
  module.hot.accept(function () {
    return window.location.reload();
  });
}

var s2 = function s2(p5s) {
  sketch.setSketch(p5s);
  Object.keys(sketch).forEach(function (k) {
    p5s[k] = sketch[k];
  });
}; // eslint-disable-next-line new-cap


new p5(s2, 'container');
},{"./sketch":"sketch.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52166" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map