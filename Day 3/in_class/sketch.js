function setup() {
  createCanvas(400, 400);
background(220);

}

function draw() {
  rect(200,200,50,50);
  
  
}

function mouseClicked(){
  if(mouseX<250 && mouseX>200 && mouseY>200 && mouseY<250)
  {
    console.log("button clicked");
  }
}
//function mouseClicked(){
 // if(mouseY < height/2){
  //  fill("yellow");
 //   ellipse(mouseX,mouseY,50);
  //} else{
   // fill("red");
  //  rect(mouseX,mouseY,50,80);
//}
//}
