# Sudo-Dungeon
## How the game functions
The goal of Sudo Dungeon was to make a very traditional dungeon crawler game that is easy to use and understand. I did not want to sacrifice features or complexity but a player shouldn't need to look up rules or guides to be able to play the game.
To accomplish this, I wanted to keep an aside container that would display all of the options that a player could take. Additionally there is action text at the bottom of the screen to inform the player of everything that is happening in the game. My initial rough wireframes looked as so:
![wireframes](https://github.com/DavidTWhitlatch/Sudo-Dungeon/blob/master/img/wireframes.jpg "wireframes")

###ESLint AirBNB Style Guide

![Screen Shot](https://github.com/DavidTWhitlatch/Sudo-Dungeon/blob/master/img/Screen%20Shot.png "Screen Shot")

From here I made a 1050 x 450 px div for my playable board space. This filled the rest of my screen and felt like a good size to start. The main body of the page is scrollable so if the game is viewed in a different resolution, the board can still be seen.

All of the elements on the board are tracked through arrays containing an object for each element. The object holds key values for the X and Y coordinates. They are then pushed to the DOM by multiplying their Xs and Ys by 50pxs each, 50pxs being the size that I wanted each cell/space on the board to be. 

There are two classes set up, one for the player and one for monsters. They both contain stats required for the game functions. There are combat methods to calculate damage. Additionally the player class has a method to handle 'drinking potions' that will modify the players health stat.

I used an event listener to track directional clicks to move the character. This is done with functions to manipulate the X and Y keys for the player and rendering the changes in the DOM.

Combat is accomplished when a player tries to move into a space that contains a monster. Both the player and monster have a chance to attack each other and their damage is subtracted from the others health stat.
```
attackDamage() {
    let hit = Math.random();
    let damage = this.strength * this.weapon;
    if (hit < this.hitChance) {
      addActionText(`Monster took ${damage} damage`);
      return damage;
    } else {
      addActionText(`You missed`);

      return 0;
    }
  }
  ```
  
  ```
  const combat = (monster) => {
  monster.currentHealth -= player.attackDamage();
  player.currentHealth -= monster.attackDamage();
  updateHPStats(player);
}
```

Once all of the monsters on the board have been subdued, the exit 'portal' is opened and the level can be completed. I simply have a variable to hold a value for 'closed' and 'opened'. When the monstar array is equal to zero, the portal is set to open.
I also wanted to added items to my game. right now there are only two items available for pick up: potions and shortswords. whenever the player collects a treasure chest from the board, they are given a random item. potions have a 70% chance to drop and short swords have the remaining 30%.

There are three overlays that the player can reach. They can open an 'Inventory' overlay with 'I' which will show them how many options they have available to them. The other two are 'game over' overlays when the player either dies or completes the level.

## Testing
The program can be run from the index.html file in the root directory. Please feel free to fork, clone and enjoy.

## Difficulties
Two particular issues stand out in my mind when looking back on this project. The first being the action text in the footer. As the player continues to play the game, they will accumulate more action logs. Adding a simple scroll field seemed obvious to me but this would require the player to constantly scroll down the footer to see the newest logs. I did not know of any way to auto scroll to the bottom. The solution I came up with was to rotate the footer 180deg and then  prepend each child text div and rotate them 180deg again. This keeps the scroll field scrolled to the bottom and adds new combat text like normal. The effect is similar to the way a chat scroll funtions.
```
footer {
    font-family: 'Press Start 2P', cursive;
    color: white;
    position:fixed;
    bottom:0;
    background-color: black;
    height: 20vh;
    width: 100vw;
    transform: rotate(180deg);
    direction: rtl;
    padding: 50px;
    background-image: url(img/footerBackground.png);
    background-size: auto;
    background-position: center;
}

.actionText {
    margin: 0;
    transform: rotate(180deg);
    direction: rtl;
    text-align: left;
}
```
Another issue I ran into was how to show a percentage health bar. I ended up putting a green styled div into a grey background div. I removed all the margin and padding for the divs so that the one overlaid the other completely. I then adjust the green divs width whenever the player takes damage to equal the players current health divided by the maximum health. This gives an accurate display bar for how much health the player has.

```
const updateHPStats = (creature) => {
  const currentHPBar = document.querySelector(".currentHP");
  currentHPBar.style.width = ((creature.currentHealth / creature.totalHealth)*100).toString() + "%";
  const currentHPText = document.querySelector(".hpText");
  currentHPText.innerText = `Health: ${creature.currentHealth}/${creature.totalHealth}`;
}
```

## Post Project Plans
- While researching for this project I found open source code for a random maze generator (https://www.khanacademy.org/computer-programming/maze-generator/939110892). I would love to pick it apart and see if I could integrate it into my own code. If not, then I would like to make my own maze generator to handle the map rendering. I know that i will need to adjust how the map background is styled and also how the portal function works.
- I would also like to keep adding more items and a variety of monsters to scatter through out the maze.
- I also have plans to create multiple classes for the player to select at game start

## Resources used
I referenced https://wakeful-baritone.glitch.me/ to kick start my game logic with an alternative to collision detection. I also reference https://www.w3schools.com/, https://developer.mozilla.org/en-US/ and https://stackoverflow.com/ for syntax issues and coding cheat sheets.
