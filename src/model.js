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
        this.x = 2;
        this.y = 2;
    }

    //method for attack action
    attackDamage() {
        let hit = Math.random();
        let damage = this.strength * this.weapon;
        if (hit < this.hitChance) {
            const actionText = document.createElement('div')
            actionText.innerText += `Monster took ${damage} damage\n`;
            actionText.className = 'actionText';
            document.querySelector('footer').prepend(actionText)
            return damage;
        } else {
            const actionText = document.createElement('div')
            actionText.innerText += `You missed\n`;
            actionText.className = 'actionText';
            document.querySelector('footer').prepend(actionText)
            return 0;
        }
    }

    //Method for drinking a potion
    drinkPot() {
        this.currentHealth += 15;
        if (this.currentHealth > this.totalHealth) {
            this.currentHealth = this.totalHealth;
        }
    }

}

class Monster {
    constructor(x, y) {
        this.totalHealth = 10;
        this.currentHealth = 10;
        this.strength = 5;
        this.hitChance = .4;
        this.weapon = .8;
        this.x = x;
        this.y = y;
    }
    //method for attack action
    attackDamage() {
        let hit = Math.random();
        let damage = this.strength * this.weapon;
        if (hit < this.hitChance) {
            const actionText = document.createElement('div')
            actionText.innerText += `You took ${damage} damage\n`;
            actionText.className = 'actionText';
            document.querySelector('footer').prepend(actionText)
            return damage;
        } else {
            const actionText = document.createElement('div')
            actionText.innerText += `The Monster missed\n`;
            actionText.className = 'actionText';
            document.querySelector('footer').prepend(actionText)
            return 0;
        }
    }
}

const player = new Player(fist);

const dragon34 = new Monster(3, 4);
const dragon106 = new Monster(10, 6);

const monsters = [
    dragon34,
    dragon106
]

let portal = 1;

  const rocks = [
    {x: 0, y: 5},
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 1, y: 5},
    {x: 2, y: 3},
    {x: 3, y: 0},
    {x: 3, y: 1},
    {x: 3, y: 2},
    {x: 3, y: 3},
    {x: 3, y: 5},
    {x: 3, y: 6},
    {x: 4, y: 5},
    {x: 5, y: 1},
    {x: 5, y: 2},
    {x: 5, y: 3},
    {x: 5, y: 4},
    {x: 5, y: 5},
    {x: 6, y: 3},
    {x: 7, y: 0},
    {x: 7, y: 1},
    {x: 7, y: 3},
    {x: 7, y: 5},
    {x: 8, y: 1},
    {x: 8, y: 5},
    {x: 9, y: 1},
    {x: 9, y: 2},
    {x: 9, y: 3},
    {x: 9, y: 4},
    {x: 9, y: 5},
    {x: 11, y: 0},
    {x: 11, y: 1},
    {x: 11, y: 2},
    {x: 11, y: 3},
    {x: 11, y: 5},
    {x: 12, y: 5},
    {x: 13, y: 1},
    {x: 13, y: 2},
    {x: 13, y: 3},
    {x: 13, y: 4},
    {x: 13, y: 5},
    {x: 14, y: 1},
    {x: 14, y: 5},
    {x: 15, y: 1},
    {x: 15, y: 2},
    {x: 15, y: 3},
    {x: 15, y: 5},
    {x: 16, y: 1},
    {x: 16, y: 5},
    {x: 17, y: 1},
    {x: 17, y: 3},
    {x: 17, y: 4},
    {x: 17, y: 5},
    {x: 18, y: 3},
  ];
  
  const plants = [
    {x: 4, y: 6},
    {x: 14, y: 2},
  ];

  //if win condition is met,
  //open exit from the level
  const openPortal = () => {
    portal = 0;
    document.querySelector('.portal').style.backgroundColor = 'blue';
  }

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
    if (x < 0 || y < 0 || x > 18 || y > 6) {
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

    //is there a portal and is it open?
    if (isThereAPortalAt(x, y) && portal === 1) {
        return false;
    }
    if (isThereAPortalAt(x, y) && portal === 0) {
        displayWinMessage();
    }


    // If there is a monster at the coordinate, 
    // the player and monster attack each other.
    // If the monster is dead, remove it from the DOM
    if (isThereAMonsterAt(x, y)) {
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            if (monster.x === x && monster.y === y) {
                combat(monster);
                if (!isCreatureAlive(monster)) {
                    monsters.splice(i, 1);
                    document.querySelector(`#xy${x}${y}`).remove();
                    const actionText = document.createElement('div')
                    actionText.innerText += `You killed the monster`;
                    actionText.className = 'actionText';
                    document.querySelector('footer').prepend(actionText)
                }
                if (!isCreatureAlive(player)) {
                    displayLoseMessage();
                    document.querySelector('.player').remove();
                }

            }
        }
        return false;
    }
    return true;
  };
  
const combat = (monster) => {
    monster.currentHealth -= player.attackDamage();
    player.currentHealth -= monster.attackDamage();
}

  // If a creature's health reaches zero
  // return boolean
  const isCreatureAlive = (creature) => {
      if (creature.currentHealth > 0) {
          return true;
        } else{
            return false;
        }
    };
    
    // Check if there is a monster at the provided coordinates.
    // Returns a Boolean
    const isThereAMonsterAt = (x, y) => {
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            if (monster.x === x && monster.y === y) {
                return true;
            }
        }
        return false;
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

const isThereAPortalAt = (x, y) => {
    //checks for portal at the given point
        if (x === 18 && y ===4) {
            return true;
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
  
  
  // Move the player to an x,y grid coordinate.
  // Returns nothing
  const movePlayerTo = (x, y) => {
      const player = document.querySelector('.player');
      // Multiply the coordinates by 50 because each grid square
      // is 50x50 pixels in size.
      player.style.top = (y * 50).toString() + 'px';
      player.style.left = (x * 50).toString() + 'px';
      if (isThereAPlantAt(x, y)) {
          removePlantAt(x, y);
          renderPlants();
        }
        //If the monster are all ded,
        //open an exit from the level
        
        if (monsters.length === 0) {
            openPortal();
        }
    };
    
    // Move the player left one tile, if the player can.
    const moveLeft = () => {
        if (canMoveTo(player.x - 1, player.y)) {
            player.x -= 1;
            movePlayerTo(player.x, player.y);
        }
    }
    
    // Move the player right one tile, if the player can.
    const moveRight = () => {
        if (canMoveTo(player.x + 1, player.y)) {
            player.x += 1;
            movePlayerTo(player.x, player.y);
        }
    }
    
    // Move the player up one tile, if the player can.
    const moveUp = () => {
        if (canMoveTo(player.x, player.y - 1)) {
            player.y -= 1;
            movePlayerTo(player.x, player.y);
        }
    };
    
    // Move the player down one tile, if the player can.
    const moveDown = () => {
        if (canMoveTo(player.x, player.y + 1)) {
            player.y += 1;
            movePlayerTo(player.x, player.y);
        }
    };
    
    
    //   Display a win message to the player.
    //   Returns nothing
      const displayWinMessage = () => {
        // Only display one win message.
        if (document.querySelector('.win-message') !== null) {
          return;
        }
        const winMessageElement = document.createElement('div');
        winMessageElement.className = 'win-message';
        winMessageElement.innerHTML = 'You have reached the next level';
        document.querySelector('.playBoard').appendChild(winMessageElement);
      };
    
    //   Display a win message to the player.
    //   Returns nothing
    const displayLoseMessage = () => {
        // Only display one win message.
        if (document.querySelector('.lose-message') !== null) {
          return;
        }
        const loseMessageElement = document.createElement('div');
        loseMessageElement.className = 'lose-message';
        loseMessageElement.innerHTML = 'You died';
        document.querySelector('.playBoard').appendChild(loseMessageElement);
      };
      
    //-------------------------------Moving to view.js later-----------------------------
    
    
    // Create rock DOM elements and add them to the playBoard.
    // portal will be the exit that will open when monsters are ded.
const renderPortal = () => {
    const portalElement = document.createElement('div');
    portalElement.className = 'portal';
    // Multiply the x,y coordinates by 50 because each grid square
    // is 50x50 pixels in size.
    portalElement.style.left = (18 * 50).toString() + 'px';
    portalElement.style.top = (4 * 50).toString() + 'px';
    document.querySelector('.playBoard').appendChild(portalElement);
    
  };
  renderPortal();

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
  
  // Create monster DOM elements and add them to the playBoard.
  const renderMonsters = () => {
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      const monsterElement = document.createElement('div');
      monsterElement.className = 'monster';
      monsterElement.id = `xy${monster.x}${monster.y}`;
      // Multiply the x,y coordinates by 50 because each grid square
      // is 50x50 pixels in size.
      monsterElement.style.left = (monster.x * 50).toString() + 'px';
      monsterElement.style.top = (monster.y * 50).toString() + 'px';
      document.querySelector('.playBoard').appendChild(monsterElement);
    }
  };
  renderMonsters();

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

  // Create plant DOM elements and add them to the playBoard.
  const renderPlayer = () => {
      const playerElement = document.createElement('div');
      playerElement.className = 'player';
      // Multiply the x,y coordinates by 50 because each grid square
      // is 50x50 pixels in size.
      playerElement.style.left = (player.x * 50).toString() + 'px';
      playerElement.style.top = (player.y * 50).toString() + 'px';
      document.querySelector('.playBoard').appendChild(playerElement);
  };
  renderPlayer();

  // Add an event listener for when the user presses keys.
  document.body.addEventListener('keydown', evt => {
    const keyCode = evt.keyCode;
    // If the user pressed any directional keys, 
    // prevent the browser default of scrolling the page.
    if ([37, 38, 39, 40].includes(keyCode)) {
      evt.preventDefault();
    }
    // Attempt to move the player in the direction 
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