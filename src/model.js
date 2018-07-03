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