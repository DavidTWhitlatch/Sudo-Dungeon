/* List of Weapons*/
const fist = .8;
const shortSword = 1.2;






class Player {
    constructor(weapon) {
        this.totalHealth = 18;
        this.currentHealth = 18;
        this.strength = 5;
        this.hitChance = .8;
        this.weapon = weapon;
    }

    attackDamage() {
        let hit = Math.random();
        let damage = this.strength * this.weapon;
        if (hit < this.hitChance) {
            console.log(`Monster took ${damage} damage`);
            return damage;
        } else {
            console.log('Missed!');
            return 0;
        }
    }

    drinkPot() {
        this.currentHealth += 15;
        if (this.currentHealth > this.totalHealth) {
            this.currentHealth = this.totalHealth;
        }
    }

}

class Monster {
    constructor() {
        this.totalHealth = 10;
        this.currentHealth = 10;
        this.strength = 5;
        this.hitChance = .4;
        this.weapon = .8;
    }

    attackDamage() {
        let hit = Math.random();
        let damage = this.strength * this.weapon;
        if (hit < this.hitChance) {
            console.log(`Monster took ${damage} damage`);
            return damage;
        } else {
            console.log('Missed!');
            return 0;
        }
    }
}

const zane = new Player(fist);

const dragon = new Monster();

dragon.currentHealth -= zane.attackDamage();
console.log(dragon.currentHealth);

const character = {
    x: 0,
    y: 0
  };
  
  const rocks = [
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 2, y: 3}
  ];
  
  const plants = [
    {x: 1, y: 2},
    {x: 3, y: 0}
  ];

  // Check if there is a rock at the provided coordinates.
  // Returns a Boolean
  const isThereARockAt = (x, y) => {
    // Loop through rocks, and check if any rock is at the given point.
    for (let i = 0; i < rocks.length; i++) {
      const rock = rocks[i];
      if (rock.x === x && rock.y === y) {
        return true;
      }
    }
    return false;
  };
  
  // Check if the provided coordinate is within the grid's bounds.
  // Returns a Boolean
  const isCoordinateInGrid = (x, y) => {
    if (x < 0 || y < 0 || x > 3 || y > 3) {
      return false;
    }
    return true;
  }
  
  // Check if a player can move to the provided coordinates.
  // Returns a Boolean
  const canMoveTo = (x, y) => {
    // If the coordinate to move is outside of the grid,
    // the player can't move to it.
    if (!isCoordinateInGrid(x, y)) {
      return false;
    }
    // If there is a rock at the coordinate, 
    // the player can't move to it.
    if (isThereARockAt(x, y)) {
      return false;
    }
    return true;
  };
  
  // Check if there is a plant at the provided coordinates.
  // Returns a Boolean
  const isThereAPlantAt = (x, y) => {
    // Loop through plants, and check if any plant is at the given point.
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      if (plant.x === x && plant.y === y) {
        return true;
      }
    }
    return false;
  };
  
  // Remove the plant from the global plant array.
  // Returns nothing
  const removePlantAt = (x, y) => {
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      if (plant.x === x && plant.y === y) {
        plants.splice(i, 1);
      }
    }
  };
  
  // Display a win message to the player.
  // Returns nothing
  const displayWinMessage = () => {
    // Only display one win message.
    if (document.querySelector('.win-message') !== null) {
      return;
    }
    const winMessageElement = document.createElement('div');
    winMessageElement.className = 'win-message';
    winMessageElement.innerHTML = 'Mmm! Blerf is full!';
    document.querySelector('.playBoard').appendChild(winMessageElement);
  };
  
  // Move the character to an x,y grid coordinate.
  // Returns nothing
  const moveCharacterTo = (x, y) => {
    const character = document.querySelector('.character');
    // Multiply the coordinates by 50 because each grid square
    // is 50x50 pixels in size.
    character.style.top = (y * 50).toString() + 'px';
    character.style.left = (x * 50).toString() + 'px';
    if (isThereAPlantAt(x, y)) {
      removePlantAt(x, y);
      renderPlants();
    }
    if (plants.length === 0) {
      displayWinMessage();
    }
  };
  
  // Move the character left one tile, if Blerf can.
  const moveLeft = () => {
    if (canMoveTo(character.x - 1, character.y)) {
      character.x -= 1;
      moveCharacterTo(character.x, character.y);
    }
  }
  
  // Move the character right one tile, if Blerf can.
  const moveRight = () => {
    if (canMoveTo(character.x + 1, character.y)) {
      character.x += 1;
      moveCharacterTo(character.x, character.y);
    }
  }
  
  // Move the character up one tile, if Blerf can.
  const moveUp = () => {
    if (canMoveTo(character.x, character.y - 1)) {
      character.y -= 1;
      moveCharacterTo(character.x, character.y);
    }
  };
  
  // Move the character down one tile, if Blerf can.
  const moveDown = () => {
    if (canMoveTo(character.x, character.y + 1)) {
      character.y += 1;
      moveCharacterTo(character.x, character.y);
    }
  };
  
  // Create rock DOM elements and add them to the playBoard.
  const renderRocks = () => {
    for (let i = 0; i < rocks.length; i++) {
      const rock = rocks[i];
      const rockElement = document.createElement('div');
      rockElement.className = 'rock';
      // Multiply the x,y coordinates by 50 because each grid square
      // is 50x50 pixels in size.
      rockElement.style.left = (rock.x * 50).toString() + 'px';
      rockElement.style.top = (rock.y * 50).toString() + 'px';
      document.querySelector('.playBoard').appendChild(rockElement);
    }
  };
  renderRocks();
  
  // Create plant DOM elements and add them to the playBoard.
  const renderPlants = () => {
    // Remove plants if any are on the grid.
    const plantElements = document.querySelectorAll('.plant');
    for (let i = 0; i < plantElements.length; i++) {
      plantElements[i].remove();
    }
    
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      const plantElement = document.createElement('div');
      plantElement.className = 'plant';
      plantElement.style.left = (plant.x * 50).toString() + 'px';
      plantElement.style.top = (plant.y * 50).toString() + 'px';
      document.querySelector('.playBoard').appendChild(plantElement);
    }
  };
  renderPlants();
  
  const renderBlerf = () => {
      const blerfElement = document.createElement('div');
      blerfElement.className = 'character';
      blerfElement.style.left = '0px';
      blerfElement.style.top = '0px';
      document.querySelector('.playBoard').appendChild(blerfElement);
  };
renderBlerf();

  // Add an event listener for when the user presses keys.
  document.body.addEventListener('keydown', evt => {
    const keyCode = evt.keyCode;
    // If the user pressed any directional keys, 
    // prevent the browser default of scrolling the page.
    if ([37, 38, 39, 40].includes(keyCode)) {
      evt.preventDefault();
    }
    // Attempt to move the character in the direction 
    switch (keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        moveUp();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  });