//Create variables here
var dog,sadDog,happyDog;
var foodObj;
var foods, foodStock;
var fedTime, lastTime, food, addfood;
function preload()
{
	//load images here
  sadDog = loadImage("image/Dpg.png");
  happyDog = loadImage("image/happy dog.png");
}

function setup() {
  database = fireBase.database()
	createCanvas(800, 700);  

  foodobj = new Food();

  foodStock = dadabase.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = craeteSprite("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood. position(800,95);
  addFood. mousePressed(addFood);


}


function draw() {  
 background(46,139,87);

foodObj.display();

fedTime = database.ref("FeedTime");
fedTime.on("value", function (data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if (lastfed >= 12) {
  text("Last Feed: " + lastFed %12 + "PM", 350, 30);
}
else if(lastFed == 0){
text("Last Feed : 12", 350, 30);
}
else {
  text("Last Feed : " + lastFed + "AM" ,350, 30);
}
  drawSprites();


}

//function to read Stock 
function readStock (data){
  foodS = data.val();
  foodObj.updateFeedStack(foodS);
}

//function to update food stock and last fed time 
function feedDog (){
  dog.addImage(happyDog);

  foodObj.updateFoodStack( foodObj.getFoodStack)()-1;
  database.ref('/').update({
    Food:foodObj.getFoodStack(),
    FeedTime:hour()
  })

}

//function to add foo in stocks
function addFoods(){
  foodS++;
  database.ref('/').update({
Food:foodS
  })
}
