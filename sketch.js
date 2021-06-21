var barnImg,carImg,cowImg,eggsImg,farmerImg1,farmerImg2,houseImg,jungleImg,milkImg,roadImg,shopImg;
var gameState;
var bgImg, bgColor;
var farmer, cow, milk;
var milkCounter, balance;

function preload(){
    barnImg = loadImage("images/barn.png");
    carImg = loadImage("images/car.png");
    cowImg = loadImage("images/cow.png");
    eggsImg  = loadImage("images/eggs.png");
    farmerImg1 = loadAnimation("images/farmer1.1.png");
    farmerImg2  = loadAnimation("images/farmer1.1.png","images/farmer1.2.png","images/farmer1.3.png");
    houseImg  = loadImage("images/house.png");
    jungleImg  = loadImage("images/jungle.png");
    milkImg  = loadImage("images/milk.png");
    roadImg  = loadImage("images/road.png");
    shopImg  = loadImage("images/shop.png");
}
function setup(){
    createCanvas(windowWidth, windowHeight);
    gameState = "start";
    bgImg = houseImg;
    bgColor =  "white"
    //ground = createSprite(width/2,height/2);
    //ground.addImage(bgImg);
    //ground.scale = 0.1;
    cow = createSprite(3*width/4,height-100,20,50);
    cow.addImage(cowImg);
    cow.scale = 0.3;
    cow.visible = false;

    farmer = createSprite(width/2+70,height-100,20,50);
    farmer.addAnimation("farmer1",farmerImg1); 
    farmer.addAnimation("farmer2",farmerImg2); 

    milkCounter = 0;
    balance = 0;    
}

function draw(){
        
    background(bgColor);
    imageMode(CENTER);
    image(bgImg,width/2,height/2,width,height);

    if(gameState === "shop"){
        textSize(15);
        fill("red");
        text("ACCOUNT BALANCE=$"+balance,width-200, 100);
    } 

    if(milk){
        milk.x = farmer.x;
    }
    
    navigateFarmer();
   
    if(farmer.x === width/2){
        farmer.changeAnimation("farmer1",farmerImg1);
    }

    if(keyDown("M") && gameState === "barn" && milkCounter < 1){
        milkCounter += 1;
        milk = createSprite(3*width/4,height-100,20,50);
        milk.addImage(milkImg);
        milk.scale = 0.1;       
    } 
    if(keyDown("C") && gameState === "shop" && milkCounter === 1){
        milk.destroy();
        milkCounter=0;
        balance += 100;
        console.log(balance);
    }
    drawSprites();
   
}

function navigateFarmer(){
    if(keyDown(RIGHT_ARROW) ){
        farmer.x += 30;
        farmer.changeAnimation("farmer2",farmerImg2);
        //console.log(farmer.x+"***"+width);     
        if(gameState === "start" && farmer.x > width-50){
            clear();
            console.log("barn")
            bgColor =  "green";
            bgImg = barnImg;            
            farmer.x = width/2;
            gameState = "barn"; 
            cow.visible = true;
        }else if(gameState === "barn" && farmer.x > width-50){
            bgImg = roadImg;
            bgColor = "grey"
            console.log("road")
            farmer.x = width/2;
            gameState = "road";              
            cow.visible = false;
        }else if(gameState === "road" && farmer.x > width-50){            
            bgImg = shopImg;
            console.log("shop")
            farmer.x = width/2;
            gameState = "shop"; 
        }  
    }
}

