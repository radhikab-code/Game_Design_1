function setup() {
  createCanvas(600, 800);
  angleMode(DEGREES)
  noStroke();
}

function draw() {
  background(0);


  let blink = map(sin(frameCount * 3), -1, 1, 50, 255); 
  fill(255, 0, 0, blink);
  //circle 1
  push();
  translate(0,0);
  rotate(15);
  ellipse(400,140,180,110);
  pop();
  
  //circle 2
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(125,25,40,70);
  pop();
  
  //circle 3
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(100,100,35,20);
  pop();
  
  //circle 4
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(300,100,50,25);
  pop();
  
  //circle 5
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(120,280,65,110);
  pop();
  
  //circle 6
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250,230,45,25);
  pop();
  
  //circle 7
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380,320,130,90);
  pop();
  
  //circle 8
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250,430,90,55);
  pop();
  
  //circle 9
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380,440,50,30);
  pop();
  
  //circle 10
  push();
  translate(0,0);
  rotate(10)
  ellipse(480,380,35,60);
  pop();
  
  //circle 11
  push();
  translate(0,0);
  rotate(10)
  ellipse(140,580,65,35);
  pop();
  
  //circle 12
  push();
  translate(0,0);
  rotate(12)
  ellipse(240,700,95,55);
  pop();
  
  //circle 13
  push();
  translate(0,0);
  rotate(12)
  ellipse(470,20,140,90);
  pop();
  
   //circle 14
  push();
  translate(0,0);
  rotate(12)
  ellipse(100,100,55,35);
  pop();

  fill(255);
  let shakeRange = 2;
  
  fill(255,255,255);
  //circle 1.1
  push();
  translate(0,0);
  rotate(15);
  ellipse(400 + random(-shakeRange, shakeRange), 170 + random(-shakeRange, shakeRange), 120, 50);
  pop();
  
  //circle 2.1
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(135+ random(-shakeRange, shakeRange),25 + random(-shakeRange, shakeRange),18,35);
  pop();
  
  //circle 3.1
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(100 + random(-shakeRange, shakeRange),105 + random(-shakeRange, shakeRange),18,10);
  pop();
  
  //circle 4.1
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(300 + random(-shakeRange, shakeRange),105 + random(-shakeRange, shakeRange),30,15);
  pop();
  
  //circle 5.1
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(138 + random(-shakeRange, shakeRange),280 + random(-shakeRange, shakeRange),29,70);
  pop();
  
  
  //circle 6.1
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250 + random(-shakeRange, shakeRange),237 + random(-shakeRange, shakeRange),25,10);
  pop();
  
  //circle 7.1
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380 + random(-shakeRange, shakeRange),293 + random(-shakeRange, shakeRange),80,35);
  pop();
  
  //circle 8.1
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250 + random(-shakeRange, shakeRange),415 + random(-shakeRange, shakeRange),60,25);
  pop();
  
  //circle 9.1
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380 + random(-shakeRange, shakeRange),433 + random(-shakeRange, shakeRange),30,15);
  pop();
  
  //circle 10.1
  push();
  translate(0,0);
  rotate(10)
  ellipse(470 + random(-shakeRange, shakeRange),380 + random(-shakeRange, shakeRange),18,35);
  pop();
  
  //circle 11.1
  push();
  translate(0,0);
  rotate(10)
  ellipse(145 + random(-shakeRange, shakeRange),574 + random(-shakeRange, shakeRange),40,22);
  pop();
  
  //circle 12.1
  push();
  translate(0,0);
  rotate(12)
  ellipse(240 + random(-shakeRange, shakeRange),685 + random(-shakeRange, shakeRange),55,25);
  pop();
  
  //circle 13.1
  push();
  translate(0,0);
  rotate(12)
  ellipse(470 + random(-shakeRange, shakeRange),45 + random(-shakeRange, shakeRange),90,40);
  pop();
  
  //circle 14.1
  push();
  translate(0,0);
  rotate(12)
  ellipse(100 + random(-shakeRange, shakeRange),110 + random(-shakeRange, shakeRange),35,15);
  pop();
  
  fill(0,0,0);
  //circle 1.2
  push();
  translate(0,0);
  rotate(15);
  ellipse(400,175,48,40);
  pop();
  
  //circle 2.2
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(138,25,12,15);
  pop();
  
  //circle 3.2
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(100,106,8,6);
  pop();
  
  //circle 4.2
  push();
  translate(0,0);
  rotate(18)
  scale(2)
  ellipse(300,108,10,8);
  pop();
  
  //circle 5.2
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(144,280,18,30);
  pop();
  
  
  //circle 6.2
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250,238,10,7);
  pop();
  
  //circle 7.2
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380,287,30,25);
  pop();
  
  //circle 8.2
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(250,410,20,15);
  pop();
  
  //circle 9.2
  push();
  translate(0,0);
  rotate(10)
  scale(1.5)
  ellipse(380,430,10,8);
  pop();
  
  //circle 10.2
  push();
  translate(0,0);
  rotate(10)
  ellipse(466,380,10,15);
  pop();
  
  //circle 11.2
  push();
  translate(0,0);
  rotate(10)
  ellipse(145,570,16,12);
  pop();
  
  //circle 12.2
  push();
  translate(0,0);
  rotate(12)
  ellipse(240,680,25,15);
  pop();
  
  //circle 13.2
  push();
  translate(0,0);
  rotate(12)
  ellipse(470,51,40,28);
  pop();
  
  //circle 14.2
  push();
  translate(0,0);
  rotate(12)
  ellipse(100,113,15,10);
  pop();
  
}