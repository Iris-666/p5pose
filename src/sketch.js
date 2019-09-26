// import "p5/lib/addons/p5.dom";

const scale = 1;
const width = 640 * scale;
const height = 480 * scale;

// setSketch sets this
let p5;

// setup initializes this
let video;
// let osc;
let startbuttonpressed;
let label;


let leftShoulderMove = false;
let rightShoulderMove = false;
let leftEyeMove = false;
let rightEyeMove = false;
let leftElbowMove = false;
let rightElbowMove = false;
let leftWristMove = false;
let rightWristMove = false;
let leftHipMove = false;
let rightHipMove = false;
let leftKneeMove = false;
let rightKneeMove = false;
let leftAnkleMove = false;
let rightAnkleMove = false;



let rightshoulderdeltaX = 0;
let rightshoulderdeltaY = 0;
let leftshoulderdeltaX = 0;
let leftshoulderdeltaY = 0;
let righteyedeltaX = 0;
let righteyedeltaY = 0;
let lefteyedeltaX = 0;
let lefteyedeltaY = 0;
let leftelbowdeltaX = 0;
let leftelbowdeltaY = 0;
let rightelbowdeltaX = 0;
let rightelbowdeltaY = 0;
let leftwristdeltaX = 0;
let leftwristdeltaY = 0;
let rightwristdeltaX = 0;
let rightwristdeltaY = 0;
let lefthipdeltaX = 0;
let lefthipdeltaY = 0;
let righthipdeltaX = 0;
let righthipdeltaY = 0;
let leftkneedeltaX = 0;
let leftkneedeltaY = 0;
let rightkneedeltaX = 0;
let rightkneedeltaY = 0;
let leftankledeltaX = 0;
let leftankledeltaY = 0;
let rightankledeltaX = 0;
let rightankledeltaY = 0;





let leftShoulderPositionX;
let leftShoulderPositionY;
let rightShoulderPositionX;
let rightShoulderPositionY;
let leftEyePositionX;
let leftEyePositionY;
let rightEyePositionX;
let rightEyePositionY;
let leftElbowPositionX;
let leftElbowPositionY;
let rightElbowPositionX;
let rightElbowPositionY;
let leftWristPositionX;
let leftWristPositionY;
let rightWristPositionX;
let rightWristPositionY;
let leftHipPositionX;
let leftHipPositionY;
let rightHipPositionX;
let rightHipPositionY;
let leftKneePositionX;
let leftKneePositionY;
let rightKneePositionX;
let rightKneePositionY;
let leftAnklePositionX;
let leftAnklePositionY;
let rightAnklePositionX;
let rightAnklePositionY;




export function setSketch(sketch) {
  p5 = sketch;
}

export function setup() {
  p5.createCanvas(width, height);
  video = p5.select('video') || p5.createCapture(p5.VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  const poseNet = ml5.poseNet(video, () => p5.select('#status').hide());

  // Every time we get a new pose, draw it
  
  poseNet.on('pose', drawPoses);
  

  // Hide the video element, and just show the canvas
  video.hide();

// let moveArray = [leftShoulderMove,rightShoulderMove,leftEyeMove,rightEyeMove];
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


  const startButton = p5.createButton('click to start');
  startButton.position(5, height + 90);
  startButton.mouseClicked(() => {
  startbuttonpressed = true;
      startButton.remove();
  }) 

  const rightShoulderButton = p5.createButton('Right Shoulder');
  rightShoulderButton.position(120, height+120);
  rightShoulderButton.mouseClicked(() => {
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
  })

  const leftShoulderButton = p5.createButton('Left Shoulder');
  leftShoulderButton.position(5,height+120);
  leftShoulderButton.mouseClicked(() => {
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
  })

  const leftEyeButton = p5.createButton('Left Eye');
  leftEyeButton.position(5,height+150);
  leftEyeButton.mouseClicked(() => {
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

  })

  const rightEyeButton = p5.createButton('Right Eye');
  rightEyeButton.position(120,height+150);
  rightEyeButton.mouseClicked(() => {
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

  })

  const leftElbowButton = p5.createButton('Left Elbow');
  leftElbowButton.position(5,height+180);
  leftElbowButton.mouseClicked(() => {
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

  })
  
  const rightElbowButton = p5.createButton('Right Elbow');
  rightElbowButton.position(120,height+180);
  rightElbowButton.mouseClicked(() => {
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

  })
  const leftWristButton = p5.createButton('Left Wrist');
  leftWristButton.position(5,height+210);
  leftWristButton.mouseClicked(() => {
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

  })
  
  const rightWristButton = p5.createButton('Right Wrist');
  rightWristButton.position(120,height+210);
  rightWristButton.mouseClicked(() => {
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

  })
  const leftHipButton = p5.createButton('Left Hip');
  leftHipButton.position(5,height+240);
  leftHipButton.mouseClicked(() => {
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

  })
  
  const rightHipButton = p5.createButton('Right Hip');
  rightHipButton.position(120,height+240);
  rightHipButton.mouseClicked(() => {
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

  })
  const leftKneeButton = p5.createButton('Left Knee');
  leftKneeButton.position(5,height+270);
  leftKneeButton.mouseClicked(() => {
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

  })
  
  const rightKneeButton = p5.createButton('Right Knee');
  rightKneeButton.position(120,height+270);
  rightKneeButton.mouseClicked(() => {
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

  })
  const leftAnkleButton = p5.createButton('Left Ankle');
  leftAnkleButton.position(5,height+300);
  leftAnkleButton.mouseClicked(() => {
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

  })
  
  const rightAnkleButton = p5.createButton('Right Ankle');
  rightAnkleButton.position(120,height+300);
  rightAnkleButton.mouseClicked(() => {
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

  })



  // for (let count = 0;count <= 3; count += 1){
  //   console.log(count);
  //   if (moveArray[count] == true) {
  //      let left = 3 - count;
  //      for(let i = 1; i <= left; i += 1){
  //        moveArray[count + i] = false;
  //      }
  //   }
   
  // }
}

// Define a function that is when the user presses a key. The `event` argument
// has properties, including `event.key`, that tell which key is pressed.
//
// See https://p5js.org/reference/#/p5/keyPressed
export function keyPressed(event) {
  console.log('keyPressed', event.key);
  if (leftShoulderMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightShoulderMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftEyeMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightEyeMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftElbowMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightElbowMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftWristMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightWristMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftHipMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightHipMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftKneeMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightKneeMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (leftAnkleMove == true){
    if (event.key === 'ArrowLeft'){
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
  if (rightAnkleMove == true){
    if (event.key === 'ArrowLeft'){
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


}

// Define a function that is when the user clicks the mouse (or trackpad). The
// `event` argument Similar functions can be defined to tell when the mouse is
// released, or dragged.
export function mouseClicked(event) {
  console.log('mouseClicked', event.clientX, event.clientY);
}

export function draw() { 
}


function drawPoses(poses) {
  // p5.backgroundColor = "black";
  p5.translate(width, 0); // move to far corner
  p5.scale(-1.0, 1.0);
  // p5.image(video, 0, 0, video.width, video.height);
  p5.fill(0,100);

	  p5.rect(0,0,width,height);
	
	  if(poses.length > 0){
	    const pose = poses[0].pose;
	    //console.log('Score =', pose.score);
	    // label.html('Score = ' + JSON.stringify(pose.keypoints));
	  }
  if  (startbuttonpressed == true) {
  drawKeypoints(poses);
  // drawSkeleton(poses);
  // playAudio(poses);
  }
}

// }
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
  poses.forEach((pose) =>
    pose.pose.keypoints.forEach((keypoint) => {
      let x = document.getElementById("confidence");
      // console.log(x.value)
     
      if (keypoint.score > x.value) {
        p5.fill(255,255,255);
        p5.noStroke();
        // p5.ellipse(keypoint.position.x, keypoint.position.y, 20, 10);

        const pose = poses[0].pose;
        const eye1 = pose.keypoints[1];
        const eye2 = pose.keypoints[2];
        const distance_eyes = Math.abs(eye1.position.x - eye2.position.x);
        // console.log(distance_eyes);
       
        if(keypoint.part == 'nose'){
          p5.fill(215,196,187);
          p5.circle(keypoint.position.x,keypoint.position.y-10,distance_eyes*1.8);
        }

        if(keypoint.part == "leftEye") {
          leftEyePositionX = keypoint.position.x + lefteyedeltaX;
          leftEyePositionY = keypoint.position.y + lefteyedeltaY;
        }
        if(keypoint.part == "rightEye") {
          rightEyePositionX = keypoint.position.x + righteyedeltaX;
          rightEyePositionY = keypoint.position.y + righteyedeltaY;
        }

        if(keypoint.part == 'rightEye'){
          p5.fill(255);
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.ellipse(rightEyePositionX,rightEyePositionY, distance_eyes/1.5,distance_eyes/2.2);
          p5.fill(0);
          p5.circle(rightEyePositionX,rightEyePositionY, distance_eyes/2.2);
        }

        if(keypoint.part == 'leftEye'){
          p5.fill(255);
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.ellipse(leftEyePositionX,leftEyePositionY, distance_eyes/1.5,distance_eyes/2.2);
          p5.fill(0);
          p5.circle(leftEyePositionX,leftEyePositionY, distance_eyes/2.2);
        }

       
          if(keypoint.part == 'leftShoulder') {
            p5.rect(leftShoulderPositionX, leftShoulderPositionY,10,10);
            leftShoulderPositionX = keypoint.position.x + leftshoulderdeltaX;
            leftShoulderPositionY = keypoint.position.y + leftshoulderdeltaY;
            
          }

          if (keypoint.part == 'rightShoulder') {
            p5.rect(rightShoulderPositionX, rightShoulderPositionY,10,10);
            rightShoulderPositionX = keypoint.position.x + rightshoulderdeltaX;
            rightShoulderPositionY = keypoint.position.y + rightshoulderdeltaY;
          }

          if(keypoint.part == "leftElbow") {
            p5.rect(leftElbowPositionX, leftElbowPositionY,10,10);
            leftElbowPositionX = keypoint.position.x + leftelbowdeltaX;
            leftElbowPositionY = keypoint.position.y + leftelbowdeltaY;
           }
          if(keypoint.part == "rightElbow") {
            p5.rect(rightElbowPositionX, rightElbowPositionY,10,10);
            rightElbowPositionX = keypoint.position.x + rightelbowdeltaX;
            rightElbowPositionY = keypoint.position.y + rightelbowdeltaY;
          }
          if(keypoint.part == "leftWrist") {
            p5.rect(leftWristPositionX, leftWristPositionY,10,10);
            leftWristPositionX = keypoint.position.x + leftwristdeltaX;
            leftWristPositionY = keypoint.position.y + leftwristdeltaY;
           }
          if(keypoint.part == "rightWrist") {
            p5.rect(rightWristPositionX, rightWristPositionY,10,10);
            rightWristPositionX = keypoint.position.x + rightwristdeltaX;
            rightWristPositionY = keypoint.position.y + rightwristdeltaY;
          }
          if(keypoint.part == "leftHip") {
            p5.rect(leftHipPositionX, leftHipPositionY,10,10);
            leftHipPositionX = keypoint.position.x + lefthipdeltaX;
            leftHipPositionY = keypoint.position.y + lefthipdeltaY;
           }
          if(keypoint.part == "rightHip") {
            p5.rect(rightHipPositionX, rightHipPositionY,10,10);
            rightHipPositionX = keypoint.position.x + righthipdeltaX;
            rightHipPositionY = keypoint.position.y + righthipdeltaY;
          }
          if(keypoint.part == "leftKnee") {
            p5.rect(leftKneePositionX, leftKneePositionY,10,10);
            leftKneePositionX = keypoint.position.x + leftkneedeltaX;
            leftKneePositionY = keypoint.position.y + leftkneedeltaY;
           }
          if(keypoint.part == "rightKnee") {
            p5.rect(rightKneePositionX, rightKneePositionY,10,10);
            rightKneePositionX = keypoint.position.x + rightkneedeltaX;
            rightKneePositionY = keypoint.position.y + rightkneedeltaY;
          }
          if(keypoint.part == "leftAnkle") {
            p5.rect(leftAnklePositionX, leftAnklePositionY,10,10);
            leftAnklePositionX = keypoint.position.x + leftankledeltaX;
            leftAnklePositionY = keypoint.position.y + leftankledeltaY;
           }
          if(keypoint.part == "rightAnkle") {
            p5.rect(rightAnklePositionX, rightAnklePositionY,10,10);
            rightAnklePositionX = keypoint.position.x + rightankledeltaX;
            rightAnklePositionY = keypoint.position.y + rightankledeltaY;
          }



    
          // if(keypoint.part == 'leftShoulder'){
          //   p5.rect(leftShoulderPositionX, leftShoulderPositionY,10,10);
          // }
          // if(keypoint.part == 'rightShoulder') {
          //   p5.rect(rightShoulderPositionX, rightShoulderPositionY,10,10);
          // }
          p5.stroke(255, 107, 140);
          p5.strokeWeight(4);
          p5.line(leftShoulderPositionX, leftShoulderPositionY,rightShoulderPositionX, rightShoulderPositionY);
         p5.line(leftElbowPositionX,leftElbowPositionY,leftShoulderPositionX, leftShoulderPositionY);
         p5.line(rightElbowPositionX,rightElbowPositionY,rightShoulderPositionX, rightShoulderPositionY);
         p5.line(leftElbowPositionX,leftElbowPositionY,leftWristPositionX, leftWristPositionY);
         p5.line(rightElbowPositionX,rightElbowPositionY,rightWristPositionX, rightWristPositionY);
         p5.line(leftHipPositionX, leftHipPositionY,rightHipPositionX, rightHipPositionY);
         p5.line(leftHipPositionX,leftHipPositionY,leftShoulderPositionX, leftShoulderPositionY);
         p5.line(rightHipPositionX,rightHipPositionY,rightShoulderPositionX, rightShoulderPositionY);
         p5.line(leftHipPositionX,leftHipPositionY,leftKneePositionX, leftKneePositionY);
         p5.line(rightHipPositionX,rightHipPositionY,rightKneePositionX, rightKneePositionY);
         p5.line(leftAnklePositionX,leftAnklePositionY,leftKneePositionX, leftKneePositionY);
         p5.line(rightAnklePositionX,rightAnklePositionY,rightKneePositionX, rightKneePositionY);

        }        
      }
    )
  )
}

// function drawSkeleton(poses) {
//     poses.forEach((pose) => {
//       pose.skeleton.forEach((skeleton) => {
//         const [p1, p2] = skeleton;
//         p5.stroke(255, 107, 140);
//         p5.strokeWeight(4);
//         p5.line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
//       });
//     });
// }



