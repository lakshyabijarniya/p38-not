class Food{
    constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage("images/milk.png");

  var button =createButton("FEED THE DOG");
  button.position(400,125);
   if(button.mousePressed(function(){
    foodS=foodS-1;
    gameState=1;
    database.ref('/').update({'gameState':gameState})
}));

    var addFood=createButton("Add Food");
    addFood.position(500,125);
    

if(addFood.mousePressed(function(){
foodS=foodS+1;
gameState=2;
database.ref('/').update({'gameState':gameState})
}));
}
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        background(46,139,90);
        fill(255,255,240);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : "+lastFed%12 +"PM",50,30)
        } else if(lastFed===0){
            text("Last Feed : 12 AM",50,30);
        }else{
            text("Last Feed :"+lastFed + "AM",50,30)
        }
    
        var x=70,y=100;
        imageMode(CENTER);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i=i+1){
                if(i%10==0){
                    x=70;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    bedroom(){
        background(bedroomImg,550,500);
    }

    garden(){
        background(gardenImg,550,500);
    }

    washroomImg(){
        background(washroomImg,550,500);
    }
}