// List of Weapons
const fist = 0.8;
const shortSword = 1.2;

class Player {
  constructor(weapon) {
    this.totalHealth = 18;
    this.currentHealth = 18;
    this.strength = 5;
    this.hitChance = 0.8;
    this.weapon = weapon;
    this.x = 2;
    this.y = 2;
    this.inventory = [
      { potion: 1 },
    ];
  }

  // method for attack action
  attackDamage() {
    const hit = Math.random();
    const damage = this.strength * this.weapon;
    if (hit < this.hitChance) {
      addActionText(`Monster took ${damage} damage`);
      return damage;
    } else {
      addActionText(`You missed`);
      return 0;
    }
  }

  // Method for drinking a potion
  drinkPot() {
    if (this.inventory[0].potion > 0) {
      this.currentHealth += 15;
      if (this.currentHealth > this.totalHealth) {
        this.currentHealth = this.totalHealth;
      }
      this.inventory[0].potion -= 1;
      const potionBox = document.querySelector('.potions');
      potionBox.innerText = `P: potions (${player.inventory[0].potion})`;
      updateHPStats(this);
    } else {
      addActionText('No potions left')
    }
  }
}

class Monster {
  constructor(x, y) {
    this.totalHealth = 10;
    this.currentHealth = 10;
    this.strength = 5;
    this.hitChance = .4;
    this.weapon = .6;
    this.x = x;
    this.y = y;
  }

  // method for attack action
  attackDamage() {
    const hit = Math.random();
    const damage = this.strength * this.weapon;
    if (hit < this.hitChance) {
      addActionText(`You took ${damage} damage`);
      return damage;
    } else {
      addActionText(`The monster missed`);
      return 0;
    }
  }
}

// set class instances and variables needed
const player = new Player(fist);
const dragon34 = new Monster(3, 4);
const dragon106 = new Monster(10, 6);
const dragon80 = new Monster(8, 0);

const monsters = [
  dragon34,
  dragon106,
  dragon80,
];
let portal = 1;

const walls = [
  { x: 0, y: 5 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 1, y: 5 },
  { x: 2, y: 3 },
  { x: 3, y: 0 },
  { x: 3, y: 1 },
  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 3, y: 5 },
  { x: 3, y: 6 },
  { x: 4, y: 5 },
  { x: 5, y: 1 },
  { x: 5, y: 2 },
  { x: 5, y: 3 },
  { x: 5, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 3 },
  { x: 7, y: 0 },
  { x: 7, y: 1 },
  { x: 7, y: 3 },
  { x: 7, y: 5 },
  { x: 8, y: 1 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
  { x: 9, y: 2 },
  { x: 9, y: 3 },
  { x: 9, y: 4 },
  { x: 9, y: 5 },
  { x: 11, y: 0 },
  { x: 11, y: 1 },
  { x: 11, y: 2 },
  { x: 11, y: 3 },
  { x: 11, y: 5 },
  { x: 12, y: 5 },
  { x: 13, y: 1 },
  { x: 13, y: 2 },
  { x: 13, y: 3 },
  { x: 13, y: 4 },
  { x: 13, y: 5 },
  { x: 14, y: 1 },
  { x: 14, y: 5 },
  { x: 15, y: 1 },
  { x: 15, y: 2 },
  { x: 15, y: 3 },
  { x: 15, y: 5 },
  { x: 16, y: 1 },
  { x: 16, y: 5 },
  { x: 17, y: 1 },
  { x: 17, y: 3 },
  { x: 17, y: 4 },
  { x: 17, y: 5 },
  { x: 18, y: 3 },
];

const treasures = [
  { x: 4, y: 6 },
  { x: 14, y: 2 },
];

// item received when treasure is picked up
const giveItem = () => {
  const itemIndex = Math.random();
  if (itemIndex < 0.7) {
    player.inventory[0].potion += 1;
    const potionBox = document.querySelector('.potions');
    potionBox.innerText = `P: potions (${player.inventory[0].potion})`;
    addActionText('You received a potion');
  }
  else if (itemIndex >= 0.7) {
    player.weapon = shortSword;
    addActionText('You obtained a short sword, +.4 damage multiplier');
    currentWeapon = document.querySelector('.weapon');
    currentWeapon.innerText = 'weapon: short sword';
  }
};

// if win condition is met,
// open exit from the level
const openPortal = () => {
  portal = 0;
  document.querySelector('.portal').style.backgroundImage = "url('img/openPortal.gif')";
};

// function to handle combat action
const combat = (monster) => {
  monster.currentHealth -= player.attackDamage();
  player.currentHealth -= monster.attackDamage();
  updateHPStats(player);
};

// Check if there is a wall at the provided coordinates.
// Returns a Boolean
const isThereAWallAt = (x, y) => {
  // Loop through walls, and check if any wall is at the given point.
  for (let i = 0; i < walls.length; i += 1) {
    const wall = walls[i];
    if (wall.x === x && wall.y === y) {
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
  // If there is a wall at the coordinate,
  // the player can't move to it.
  if (isThereAWallAt(x, y)) {
    return false;
  }

  // is there a portal and is it open?
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
    for (let i = 0; i < monsters.length; i += 1) {
      const monster = monsters[i];
      if (monster.x === x && monster.y === y) {
        combat(monster);
        if (!isCreatureAlive(monster)) {
          monsters.splice(i, 1);
          document.querySelector(`#xy${x}${y}`).remove();
          addActionText('You killed the monster');
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

// If a creature's health reaches zero
// return boolean
const isCreatureAlive = (creature) => {
  if (creature.currentHealth > 0) {
    return true;
  } else {
    return false;
  }
};

// Check if there is a monster at the provided coordinates.
// Returns a Boolean

const isThereAMonsterAt = (x, y) => {
  for (let i = 0; i < monsters.length; i += 1) {
    const monster = monsters[i];
    if (monster.x === x && monster.y === y) {
      return true;
    }
  }
  return false;
};

// Check if there is a treasure at the provided coordinates.
// Returns a Boolean
const isThereATreasureAt = (x, y) => {
  // Loop through treasures, and check if any treasure is at the given point.
  for (let i = 0; i < treasures.length; i += 1) {
    const treasure = treasures[i];
    if (treasure.x === x && treasure.y === y) {
      giveItem();
      return true;
    }
  }
  return false;
};

const isThereAPortalAt = (x, y) => {
  // checks for portal at the given point
  if (x === 18 && y === 4) {
    return true;
  }
  return false;
};

// Remove the treasure from the global treasure array.
// Returns nothing
const removeTreasureAt = (x, y) => {
  for (let i = 0; i < treasures.length; i += 1) {
    const treasure = treasures[i];
    if (treasure.x === x && treasure.y === y) {
      treasures.splice(i, 1);
      document.querySelector(`#tr${x}${y}`).remove();
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
  if (isThereATreasureAt(x, y)) {
    removeTreasureAt(x, y);
    // renderTreasures();
  }
  // If the monster are all ded,
  // open an exit from the level
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
  winMessageElement.innerHTML = 'You Win!';
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


// opening and closing inventory functions with event listeners
const inventoryEvent = (evt) => {
  const keyCode = evt.keyCode;
  switch (keyCode) {
    case 80:
      player.drinkPot();
      break;
    case 27:
      closeInventory();
      break;
  }
};

const openInventory = () => {
  let inventoryBox = document.querySelector('.inventory');
  inventoryBox.style.visibility = 'visible';
  document.body.addEventListener('keydown', inventoryEvent);
};

const closeInventory = () => {
  let inventoryBox = document.querySelector('.inventory');
  inventoryBox.style.visibility = 'hidden';
  document.body.removeEventListener('keydown', inventoryEvent)
};

//--------------------------------------------------------------------------------------

// render stats in aside
const renderHPStats = () => {
  const hpLine = document.createElement('div');
  hpLine.className = 'statLine';
  document.querySelector('aside').appendChild(hpLine);
  const hpText = document.createElement('div');
  hpText.className = 'hpText';
  hpText.innerText = `Health: ${player.currentHealth}/${player.totalHealth}`;
  document.querySelector('.statLine').appendChild(hpText);
  const totalHP = document.createElement('span');
  totalHP.className = 'totalHP';
  document.querySelector('.statLine').appendChild(totalHP);
  const currentHP = document.createElement('span');
  currentHP.className = 'currentHP';
  document.querySelector('.totalHP').appendChild(currentHP);
}
renderHPStats();

// update HP text and health bar after taking damage
const updateHPStats = (creature) => {
  const currentHPBar = document.querySelector(".currentHP");
  currentHPBar.style.width = ((creature.currentHealth / creature.totalHealth) * 100).toString() + "%";
  const currentHPText = document.querySelector(".hpText");
  currentHPText.innerText = `Health: ${creature.currentHealth}/${creature.totalHealth}`;
}

// render strength stat in aside
const renderStrengthStat = () => {
  const strengthStat = document.createElement('div');
  strengthStat.className = 'statLine';
  strengthStat.innerText = `Strength: ${player.strength}`;
  document.querySelector('aside').appendChild(strengthStat);
}
renderStrengthStat();

// render weapon stat in aside
const renderCurrentWeapon = () => {
  const currentWeapon = document.createElement('div');
  currentWeapon.className = 'statLine';
  currentWeapon.classList.add('weapon');
  if (player.weapon === .8) {
    currentWeapon.innerText = 'weapon: bare fists';
  } else if (player.weapon === 1.2) {
    currentWeapon.innerText = 'weapon: short sword';
  }
  document.querySelector('aside').appendChild(currentWeapon);
}
renderCurrentWeapon();

// line break separating stats from inpot options in aside
const statLineBreak = document.createElement('div');
statLineBreak.className = 'statLineBreak';
document.querySelector('aside').appendChild(statLineBreak);

// adding movement buttons to aside
const renderMovement = () => {
  const movementText = document.createElement('div');
  movementText.className = 'statLine';
  movementText.innerText = 'Movement/Combat:';
  document.querySelector('aside').appendChild(movementText);
  const movementUp = document.createElement('div');
  movementUp.className = 'buttonCenter';
  movementUp.innerText = '\u2191';
  document.querySelector('aside').appendChild(movementUp);
  const movementButtons = document.createElement('div');
  movementButtons.className = 'buttonCenter';
  movementButtons.innerText = '\u2190 \u2193 \u2192';
  document.querySelector('aside').appendChild(movementButtons);
}
renderMovement();

// render option to open inventory in aside
const buttonOptions = () => {
  const inventorybutton = document.createElement('div');
  inventorybutton.className = 'statLine';
  inventorybutton.innerText = 'I: open inventory'
  document.querySelector('aside').appendChild(inventorybutton);
}
buttonOptions();


// Add text to the footer action field
const addActionText = (string) => {
  const actionText = document.createElement('div')
  actionText.innerText += `${string}`;
  actionText.className = 'actionText';
  document.querySelector('.actionField').prepend(actionText)
}

// Create wall DOM elements and add them to the playBoard.
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

// Create wall DOM elements and add them to the playBoard.
const renderWalls = () => {
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const wallElement = document.createElement('div');
    wallElement.className = 'wall';
    // Multiply the x,y coordinates by 50 because each grid square
    // is 50x50 pixels in size.
    wallElement.style.left = (wall.x * 50).toString() + 'px';
    wallElement.style.top = (wall.y * 50).toString() + 'px';
    document.querySelector('.playBoard').appendChild(wallElement);
  }
};
renderWalls();

// Create monster DOM elements and add them to the playBoard.
const renderMonsters = () => {
  for (let i = 0; i < monsters.length; i += 1) {
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

// Create treasure DOM elements and add them to the playBoard.
const renderTreasures = () => {
  // Remove treasures if any are on the grid.
  const treasureElements = document.querySelectorAll('.treasure');
  for (let i = 0; i < treasureElements.length; i += 1) {
    treasureElements[i].remove();
  }

  for (let i = 0; i < treasures.length; i += 1) {
    const treasure = treasures[i];
    const treasureElement = document.createElement('div');
    treasureElement.className = 'treasure';
    treasureElement.id = `tr${treasure.x}${treasure.y}`;
    treasureElement.style.left = (treasure.x * 50).toString() + 'px';
    treasureElement.style.top = (treasure.y * 50).toString() + 'px';
    document.querySelector('.playBoard').appendChild(treasureElement);
  }
};
renderTreasures();

// Create player DOM elements and add them to the playBoard.
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

// render inventory field and hide it
const inventory = () => {
  const inventoryBox = document.createElement('div');
  inventoryBox.className = 'inventory';
  inventoryBox.style.visibility = 'hidden';
  document.querySelector('.playBoard').appendChild(inventoryBox);
  const potionBox = document.createElement('div');
  potionBox.className = 'potions';
  potionBox.innerText = `P: potions (${player.inventory[0].potion})`;
  document.querySelector('.inventory').appendChild(potionBox);
  const escBox = document.createElement('div');
  escBox.innerText = `esc: close inventory`;
  document.querySelector('.inventory').appendChild(escBox);
};

inventory();

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
    case 73:
      openInventory();
      break;
  }
});
