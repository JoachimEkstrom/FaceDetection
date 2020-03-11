var constraints = { audio: false, video: { width: 720, height: 560 } }; 
var video = document.getElementById('video');

// Add Smileys
let rightPic = document.getElementById('picRight')
let leftPic = document.getElementById('picLeft')
let imgl = document.createElement("img");
let imgr = document.createElement("img");
imgl.src = "./pictures/neutral.png";
imgr.src = "./pictures/neutral.png";

leftPic.appendChild(imgl);
rightPic.appendChild(imgr);




Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)

  function startVideo() {
    navigator.mediaDevices.getUserMedia(constraints)
    .then((mediaStream) => {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
        video.play();
    };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}


video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      console.log(resizedDetections[0].expressions)
      expression(resizedDetections[0].expressions)
    }, 500)
})


let exp
let caseNow

function expression(expression) {

  exp = Object.keys(expression).reduce((a, b) => expression[a] > expression[b] ? a : b);
  console.log(exp)

  if (exp === "neutral"){
    caseNow = 0
  } else if (exp === "sad"){
    caseNow = 1
  }else if (exp === "happy"){
    caseNow = 2
  }else if (exp === "angry"){
    caseNow = 3
  }else if (exp === "fearful"){
    caseNow = 4
  }else if (exp === "surprised"){
    caseNow = 5
  }else if (exp === "disgusted"){
    caseNow = 6
  }



  switch ( caseNow ) {
    case 0:
    imgl.src = "./pictures/neutral.png";
    imgr.src = "./pictures/neutral.png";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 1:
    imgl.src = "./pictures/sad.png";
    imgr.src = "./pictures/sad.png";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 2:
    imgl.src = "./pictures/happy.png";
    imgr.src = "./pictures/happy.png";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 3:
    imgl.src = "./pictures/angry.jpg";
    imgr.src = "./pictures/angry.jpg";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 4:
    imgl.src = "./pictures/fearful.jpg";
    imgr.src = "./pictures/fearful.jpg";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 5:
    imgl.src = "./pictures/surprised.jpg";
    imgr.src = "./pictures/surprised.jpg";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
    case 6:
    imgl.src = "./pictures/disgusted.png";
    imgr.src = "./pictures/disgusted.png";
    leftPic.appendChild(imgl, imgl);
    rightPic.appendChild(imgr, imgr);
    break;
  }



}  
