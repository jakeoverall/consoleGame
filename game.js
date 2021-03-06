var on, choice, imps = [];
var hero = {
    name: "Impsbane the Bard",
    life: 100,
    weapon: "Staff",
    attackDamage: 12,
    reputation: 32,
    attack: function (enemy) {
        if (enemy.life) {
            console.log(hero.name + " is attacking " + enemy.species + " with his " + hero.weapon + " for " + hero.attackDamage + " life.");
            enemy.life -= hero.attackDamage;
        } else {
            console.log("this " + enemy.species + " is already dead.");
        }
    }
};

var Enemy = function (species, life, weapon, attackDamage) {
    this.species = species;
    this.life = life;
    this.weapon = weapon;
    this.attackDamage = attackDamage;
};

Enemy.prototype.attack = function (who) {
    console.log(this.species + " is attacking " + who.name + " with " + this.weapon + " for " + this.attackDamage + " life.");
    who.life -= this.attackDamage;
};

var setup = function () {
    imps = [];
    var boss = new Enemy('Boss Imp', 35, 'dagger', 9);
    for (var i = 0; i < 5; i++) {
        imps.push(new Enemy('Imp', 10, 'stick', 3));
    };
    imps.push(boss);

    hero.life = 100;
    console.log(hero);
    on = true;
    return imps;
};

var fighting = function () {
    console.log("The Imps are attacking.");
    for (var i = 0; i < imps.length; i++) {
        imps[i].attack(hero);
    }
    getStatus();
};

var getStatus = function () {
    console.log(hero.name + " remaining life: " + hero.life);
};

var gameOver = function () {
    imps = 0;
    hero.life = 0;
    on = false;
    alert('GAME OVER!');
};

var getChoice = function () {
    return prompt('What will you do?  Run or Fight');
};

var impsStatus = function () {
    for (var i = 0; i < imps.length; i++) {
        if (imps[i].life <= 0) {
            imps.splice(i, 1);
            i--;
            console.log(hero.name + " has killed an imp. " + imps.length + " remaining.");
        }
        if (imps.length === 2) {
            hero.potion = true;
            console.log("An imp dropped a health potion be sure to \"Drink Potion\" to survive");
        }
    };
};

var play = function () {
    setup();
    while (on) {
        console.log(hero.name + " encounters " + imps.length + " imps. \"Renowned " + hero.name + "\" a remakably ugly imp growls. \"today you will meet your doom.\"");

        while (imps.length > 0 && hero.life > 0) {
            if (hero.life <= 0) {
                gameOver();
                break;
            }
            choice = getChoice();
            if (choice === "Fight") {
                if (confirm("Are you sure? You will have to kill all " + imps.length + " Imps to survive.")) {
                    fighting();
                    hero.attack(imps[0]);
                    impsStatus();
                }
            } else if (choice === "Run") {
                console.log("While running you lost 10 life.");
                hero.life -= 10;
                getStatus();

            } else if (choice === "Drink Potion") {
                if (hero.potion) {
                    hero.life += 35;
                    getStatus();
                    hero.potion = false;
                } else {
                    console.log("You don't have any");
                }
            } else if (choice === "Give up") {
                console.log("Your insulance is unbearable you did not type either of the choices and will therefore die. Goodbye " + hero.name);
                gameOver();
                break;
            } else {
                console.log("Make a valid choice or type Give Up");
            }
        }

        if (hero.life > 0) {
            hero.reputation += 133425;
            console.log("You have slain another band of filthy imps. Your reputation grows \n Reputation: " + hero.reputation);
            console.log("You WON!!!!!");
            on = false;
        } else {
            console.log("Tonight the Imps will feast upon " + hero.name);
            on = false;
            gameOver();
        }
    }
};
console.log('To get started simple type in play()');
