

class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._items=[];
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character
  }

  get items(){
    return this._items
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }
  
  describe() {
    return "Looking around the " + this._name + " you can see " + this._description;
  }

  /**
  * Link a room to this one
  *
  * @param {string} direction Direction of the room
  * @param {Room} roomToLink Linked room
  */
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  addItem(item){
    this._items.push(item);
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is " + direction;
      details.push(text);
    }
    return details;
  }



  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way",);
      alert(this._name)
      return this;
    }
  }
}



class Item {
  constructor(name) {
    this._name = name,
      this._description = ""
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }


  describe() {
    return   this._name + this._description;
  }


}


class Character {
  constructor(name) {
    this._name = name,
      this._description = ""
    this._conversation = ""
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }
 
  describe() {
    return "You have met " + this._name + ", " + this._name + " is " + this._description;
  }

  converse() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name);
    this._weakness = "";
  }

  set weakness(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._weakness = value;
  }


  //fight(item) {
  //if (item = this._weakness) {
    //  return true;
    //} else {
    //  return false;
   // }
  

}


const Kitchen = new Room("kitchen");
Kitchen.description = "a large room lined with old victorian style cabinets and a large round table in the middle";
const Lounge = new Room("lounge");
Lounge.description = "a grand room filled with cobwebs along with two dusty sofas and a recently lit fireplace";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with an old victorian bar and a worn pool table";
const Hall = new Room("hall");
Hall.description = "a grand entrance hall with large creepy paintings around the walls and a creaky staircase leading to the second floor";
const Landing =new Room("landing")
Landing.description = "a large corridoor with rooms coming off it"

Hall.linkRoom("south", Lounge);
Hall.linkRoom("east", Kitchen);
Hall.linkRoom("upstairs", Landing);
Kitchen.linkRoom("west", Hall);
Lounge.linkRoom("north", Hall);
Lounge.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Lounge)






const Bob = new Enemy("Bob");
Bob.conversation = "get out of my house!";
Bob.description = "an angry ghost";
Bob.pronoun = "he";
Bob.weakness = "holy water";

const Frank = new Enemy("Frank");
Frank.conversation = "get out of my house!";
Frank.description = "a ghost";
Frank.pronoun = "he";
Frank.weakness = "holy water";



const holyWater = new Item("Holy Water");
holyWater.description = "Holy Water";


Kitchen.character = Bob;
GamesRoom.character =Frank;


Lounge.addItem(holyWater);
Hall.addItem(holyWater);



function displayRoomInfo(room) {
  let occupantMsg = ""
  if (room.character === "") {
    occupantMsg = ""
  } else {
    occupantMsg = room.character.describe() + ". " + room.character.converse()
  } 

  var itemMessage = ""

  if(room.items.length >0){
    for( let i=0; i< room.items.length; i++){
      itemMessage += room.items[i].describe() + ". "
    }
  }


  textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>"+ "<p>" + itemMessage + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

function fightGhosts(){
  if(inventory[Bob.weakness] === null){
        alert("you need holy water duh")
  } 
else { alert("bob is defeated")
    
  }
}
var inventory = {};

function addItem(item){
  inventory[item.itemname]=item;
   
}

function displayInventory() {
  // Find the length of the array of keys, if empty, it should be 0
  if(Object.keys(inventory).length === 0) {
    alert("you got nothing");



  } else {
    // TODO something here to show inventory
    alert("you have holy water");
  }
}




function pickUpItems(room){
  if(room.items.length >0){
    for( let i=0; i< room.items.length; i++){
      addItem(room.items[i])
    }alert("you now have holy water");
  }
}
function startGame() {
  
  currentRoom = Hall
  displayRoomInfo(currentRoom);

  
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west", "upstairs", "downstairs"]
      const actions = ["pickup", "inventory", "fight"]

      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command)
        displayRoomInfo(currentRoom);
      }
      else if (actions.includes(command.toLowerCase())) {
        switch(command.toLowerCase())
        {
          case "fight":
          {
              fightGhosts(Kitchen);
              break;
          }
          case "pickup": 
          {
            pickUpItems(currentRoom);
            break;
          }
          case "inventory":
          {
            displayInventory();
            break;
          }
          default:
            break;
        }
      } else {
        document.getElementById("usertext").value = ""
        alert("that is not a valid command please try again")
      }

    }
  });
}

