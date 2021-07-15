//Create variables here
var dog,happyDog,sadDog;
var bedroom,garden,washroom,livingroom;
var database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var addFood,feed;
var foodObj;
var gameState,readState;
var milkBottle2;

function preload()
{
	//load images here
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
  
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/washRoom.png");
  livingroom=loadImage("images/Living Room.png");

  milkBottle2=loadImage("images/milk.png");
}

function setup() {
  database=firebase.database();
	createCanvas(600, 600);

  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  foodStock.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  

  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
}


function draw() {  
  background("yellow");
  foodObj.display();
  writeStock(foodS);

  if(foodS == 0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBottle2.visible=true;
  }

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkBottle2.visible=false;
       dog.y=250; 
}
 
  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }))

  if(gameState==3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }))

  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===5){
    dog.addImage(livngroom);;
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dodg.scale=1;
    milkBottle2.visible=false;
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }



  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }



  drawSprites();
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}





function update(state){
  database.ref('/').update({
    gameState:state
  })
}