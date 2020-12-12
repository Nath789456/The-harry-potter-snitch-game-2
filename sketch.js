
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var snitchScore;
var x = 500;
var y = 200;
var harry, harryImg;
var backgroundImg, bg;
var demetorGroup, dementorImg1, dementorImg2;
var snitchImg, snitchGroup;
var gameOver, gameOverImg;
var reset, resetImg;
var bgMusic;

function preload(){
harryImg= loadImage("harryFly.png");
backgroundImg=loadImage("Bg.png");

dementorImg1=loadImage("dementors1.png");
snitchImg= loadImage("snitch1.png");
gameOverImg=loadImage("gameOver.png");
resetImg=loadImage("reset.png");
//bgMusic= loadSound("harryMusic.mp3")

}

function setup() { 
  //createCanvas(400, 400);
  createCanvas(800,600);

 
//mode=1;
score=0;
snitchScore=0;
  bg=createSprite(0,0,800,600);
  bg.addImage(backgroundImg);
  bg.scale=1;
  bg.velocityX=-2;

  harry= createSprite(x,y,70,20);
  harry.addImage(harryImg);
  harry.scale=1;
  harry.setCollider("rectangle",0,0,harry.width, harry.height);
 dementorGroup= new Group();
 snitchGroup=new Group();

gameOver= createSprite(200,200,20,40);
gameOver.addImage(gameOverImg);
gameOver.scale=0.3;
gameOver.visible=false;

reset= createSprite(200,320,20,40);
reset.addImage(resetImg);
reset.scale=0.07;
reset.visible=false;


} 

function draw() { 
  background(0);
  //Engine.update(engine);
  fill(255);
  //bgMusic.play();
  
  if (x >= 900){
    x = 0; 
   }
 if(bg.x<0){
   bg.x=bg.width/2;
 }
  //textColor(255);
  if(gameState===PLAY){
    //.play();
    textSize(20);
    fill("white");
    //text("Press on the enter key to start game!!", 400,50);
    score= score+Math.round((getFrameRate()/60)); 
  if (keyDown(UP_ARROW)) {
    harry.velocityX=0;
    harry.velocityY=-5;
  }
  if (keyDown(DOWN_ARROW)) {
     harry.velocityX=0;
     harry.velocityY=5;
   }
   spawnDementors();
   spawnSnitch();
   if(snitchGroup.isTouching(harry)){
     snicth=snitchScore+1;
     snitchGroup.destroyEach();
   }

    if(dementorGroup.isTouching(harry)){
      gameState=END;
    }

 }


  else if(gameState===END){
    //text("Game Over",200,200);
    gameOver.visible=true;
    reset.visible=true;
    harry.velocityY=0;
    dementorGroup.setVelocityEach(0);
    snitchGroup.setVelocityEach(0);
    bg.velocityX=0;
    if(mousePressedOver(reset)){
      restartgame();
    }
   
  
  
  
  }
 drawSprites();
 text("The Harry Potter Snitch seize game", 60,40);
 text("Press on the up and down arrow keys to move Harry!!",100,500);
 text("Distance Covered: " + score, 500,50);
 text("Snitches Caught: " + snitchScore,500,80);
}




function spawnDementors() {
  if(frameCount % 100 === 0) {
    var dementor = createSprite(900,250,10,40);
    //obstacle.debug = true;
    dementor.y=Math.round(random(250,600));
    dementor.velocityX = -3;//(6 + 3*score/100);
    dementor.addImage(dementorImg1);
  dementor.scale=0.5;
  dementor.setCollider("circle",0,0,1);
  dementorGroup.add(dementor);
}}


function spawnSnitch(){
  if(frameCount %400 ===0){
    var snitch= createSprite(900,250,20,30);
    snitch.y=Math.round(random(200,800));
    snitch.velocityX=-6;
    snitch.addImage(snitchImg);
    snitch.scale=0.3;
    snitchGroup.add(snitch);

  }
}

function restartgame(){
  gameState = PLAY;
  gameOver.visible = false;
  reset.visible = false;
  
  dementorGroup.destroyEach();
  snitchGroup.destroyEach();
  score=0;

}