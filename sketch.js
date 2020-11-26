var player;
var level1;
var door1;
var level1Inside;
var gameState="start"
var edges=[];

function preload(){
sansUP=loadAnimation("sprites/sansUP1.png","sprites/sansUP2.png","sprites/sansUP3.png","sprites/sansUP4.png");
sansDOWN=loadAnimation("sprites/sansDOWN1.png","sprites/sansDOWN2.png","sprites/sansDOWN3.png","sprites/sansDOWN4.png");
sansLEFT=loadAnimation("sprites/sansLEFT1.png","sprites/sansLEFT2.png","sprites/sansLEFT3.png","sprites/sansLEFT4.png");
sansRIGHT=loadAnimation("sprites/sansRIGHT1.png","sprites/sansRIGHT2.png","sprites/sansRIGHT3.png","sprites/sansRIGHT4.png");
sansIDLE=loadImage("sprites/sansIDLE.png");
sansDOWNIDLE=loadAnimation("sprites/sansDOWN1.png");
sansUPIDLE=loadAnimation("sprites/sansUP1.png");
sansLEFTIDLE=loadAnimation("sprites/sansLEFT1.png");
sansRIGHTIDLE=loadAnimation("sprites/sansRIGHT1.png");
level1Outside=loadImage("sprites/level1.png");
level1Door=loadImage("sprites/door.png");
level1Inside=loadImage("sprites/level1Inside.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-110);
  player =createSprite(250,400,50,50);
  level1 =createSprite(700,150,500,500);
  door1 =createSprite(845,180,60,50);
  door1.addImage("level1Door",level1Door);
  level1.addImage("level1Outside",level1Outside);
  player.addAnimation("sansIDLE",sansIDLE);
  player.addAnimation("sansUP",sansUP);
  player.addAnimation("sansDOWN",sansDOWN);
  player.addAnimation("sansLEFT",sansLEFT);
  player.addAnimation("sansRIGHT",sansRIGHT);
  player.addAnimation("sansDOWNIDLE",sansDOWNIDLE);
  player.addAnimation("sansUPIDLE",sansUPIDLE);
  player.addAnimation("sansLEFTIDLE",sansLEFTIDLE);
  player.addAnimation("sansRIGHTIDLE",sansRIGHTIDLE);
  player.depth=level1.depth+1
  //level1.debug=true
  //player.debug=true
  //door1.debug=true
  level1.setCollider("rectangle",0,0,400,260)
  door1.setCollider("rectangle",-140,70,100,100)
  door1.scale=0.9
}

function draw() {
  background("white");  
  playerMovement();
  borderCreation();
if(gameState==="start"){
  stage1();
}
if(gameState==="level1Inside"){
background(level1Inside);
}
  //console.log(World.mouseX+"---"+World.mouseY)
  drawSprites();
}

function borderCreation(){

edges = createEdgeSprites();
if (player.isTouching(edges[2]) || player.isTouching(edges[3]) || player.isTouching(edges[1])|| player.isTouching(edges[0])) {
  player.bounceOff(edges[2]);
  player.bounceOff(edges[3]);
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
}

}

function playerMovement(){

  if(keyDown("RIGHT_ARROW")){
    player.changeAnimation("sansRIGHT",sansRIGHT);
    player.velocityX=5
    player.velocityY=0
  }
  if(keyDown("LEFT_ARROW")){
    player.changeAnimation("sansLEFT",sansLEFT);
    player.velocityX=-5
    player.velocityY=0
  }
  if(keyDown("UP_ARROW")){
    player.changeAnimation("sansUP",sansUP);
    player.velocityX=0
    player.velocityY=-5
  }
  if(keyDown("DOWN_ARROW")){
    player.changeAnimation("sansDOWN",sansDOWN);
    player.velocityX=0
    player.velocityY=5
  }
  if(keyWentUp("RIGHT_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansRIGHTIDLE",sansRIGHTIDLE);
  }
  if(keyWentUp("LEFT_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansLEFTIDLE",sansLEFTIDLE);
  }
  if(keyWentUp("UP_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansUPIDLE",sansUPIDLE);
  }
  if(keyWentUp("DOWN_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansDOWNIDLE",sansDOWNIDLE);
  }
}

function stage1(){
  player.collide(level1);
  if(player.isTouching(door1)){
  //disable level1 one house and the door so the in side of the outside house shows
  gameState="level1Inside"
  level1.visible=false
  door1.visible=false
  }
}