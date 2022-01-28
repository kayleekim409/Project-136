var videos = "";
var status = "";
var objectsName = "";
var objects = [];
function preload() {
    videos = loadVideo("video.mp4");
}
function draw() {
    image(video, 0, 0, 480, 380);
    
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i=0; i< objects.length; i++) {
            document.getElementById("status").innerHTML = "Status - Detecting Objects";
            percentage = floor(objects[i].confidence * 100);
            name = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            fill("red");
            text(name + " " + percentage + "%", x + 15, y + 15);
            noFill();
            stroke("black");
            rect(x, y, width, height);
        }
        if (name == object_name) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = objectsName + "Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(objectsName + "Found");
            synth.speak(utterThis);
        }
        else {
            document.getElementById("object_status").innerHTML = objectsName + "Not Found";
    }
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    objectsName = document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
