img="";
objects=[];
status="";
song1="";
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(380,380);
    video.hide();
    object_detector= ml5.objectDetector("cocossd",modelLoaded);

}
function preload(){
    sound = loadSound("souf.mp3");
}
function modelLoaded(){
    console.log("model Loaded!!");
  
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);

    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);
    
    if(status != ""){
        
        r=random(255);
        g=random(255);
        b=random(255);
        object_detector.detect(video,gotResults);

      
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Object Detected";
            fill("cyan");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            
            noFill();
            stroke("cornflowerblue");
            rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
            
if(objects[i].label=="dog"){
document.getElementById("baby").innerHTML="Dog found";
sound.stop();
}
else{


document.getElementById("baby").innerHTML="Dog not found";
sound.play();
}
        }
if(objects.length==0){
    document.getElementById("baby").innerHTML="Dog not found";
    sound.play()
}

   
        }
    }
