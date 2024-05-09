// DOM elements
// Selecting main box
const gameBox = document.querySelector(".box");

// Selecting the box that renders the players stats and all of the bs which are to display those stats
const playerStatsBox = gameBox.querySelector(".stats");
const levelsBold = playerStatsBox.querySelector(".levels-bold");
const XPBold = playerStatsBox.querySelector(".XP-bold");
const playerHealthBold = playerStatsBox.querySelector(".player-health-bold");
const goldBold = playerStatsBox.querySelector(".gold-bold");

// Selecting the box that renders the players options and all of the buttons which provide the player functionality
const optionsBox = gameBox.querySelector(".options");
const attackButton = optionsBox.querySelector(".attack");
const dodgeButton = optionsBox.querySelector(".dodge");
const runButton = optionsBox.querySelector(".run");

// Selecting the box that renders the monsters stats and all of the bs which are to display those stats
const monsterStatsBox = gameBox.querySelector(".monster-stats");
const monsterNameBold = monsterStatsBox.querySelector(".name-bold");
const monsterHealthBold = monsterStatsBox.querySelector(".monster-health-bold");

// Selecting the box that renders the game state
const gameStateBox = gameBox.querySelector(".game-state");

// Selecting the move box
const moveBox = gameBox.querySelector(".move-box");

// Selecting the start screen and the start button
const startBox = document.querySelector(".start-screen");
const startHeading = startBox.querySelector("h1")
const startButton = startBox.querySelector("button");

// Objects
// Player object
const player = {
    health: 100,
    maxHealth: 100,
    evasiveness: 1,
    levels: 0,
    XP: 0,
    XPRequirement: 1,
    gold: 0,
    damage: 30
};

// Monster objects
// Dragon monster
const dragon = {
    name: "Dragon",
    maxHealth: 300,
    health: 300,
    heldItem: "Dragon Tooth",
    attacks: [
        {
            title: "Fireball",
            damage: 30
        },
        
        {
            title: "Chomp",
            damage: 20
        },

        {
            title: "Slash",
            damage: 10
        }
    ]
};

// Orc monster
const orc = {
    name: "Orc",
    maxHealth: 75,
    health: 75,
    heldItem: "None",
    attacks: [
        {
            title: "Super-Punch",
            damage: 40
        },

        {
            title: "Kick",
            damage: 30
        },

        {
            title: "Punch",
            damage: 20
        },

        {
            title: "Flick",
            damage: 10
        }
    ]
};

// Troll monster
const troll = {
    name: "Troll",
    maxHealth: 100,
    health: 100,
    heldItem: "Wooden Club",
    attacks: [
        {
            title: "Bash",
            damage: 20
        }
    ]
};

// Goblin monster
const goblin = {
    name: "Goblin",
    maxHealth: 50,
    health: 50,
    heldItem: "Knife",
    attacks: [
        {
            title: "Screech",
            damage: 10
        },

        {
            title: "Slash",
            damage: 5
        }

    ]
};


// Monster list
const monsterList = [dragon, goblin, troll, orc];

// Functions
// Function that selects a random monster
function randomMonster() {
    let randomMonster = monsterList[Math.floor(Math.random() * monsterList.length)];

    return randomMonster;
};

// Function that updates the monster display
function monsterUpdate(currentMonster) {
    monsterNameBold.innerHTML = currentMonster.name;
    monsterHealthBold.innerHTML = currentMonster.health;
    gameStateBox.innerHTML = `<span>You are fighting a ${currentMonster.name.toLowerCase()}.</span>`;
};

// Function that updates the player display
function playerUpdate() {
    playerHealthBold.innerHTML = player.health;
    levelsBold.innerHTML = player.levels;
    XPBold.innerHTML = `${player.XP} / ${player.XPRequirement}`;
    goldBold.innerHTML = player.gold;
};

// Fuction that controls what happens upon the player's death
function playerDeath(currentMonster) {
    if (player.health <= 0) {
        player.maxHealth = 100;
        player.health = player.maxHealth;
        player.gold = 0;
        player.levels = 0;
        player.XP = 0;
        player.damage = 30;
        player.XPRequirement = 1;
        player.evasiveness = 1;
        currentMonster.health = currentMonster.maxHealth;
        moveBox.classList.add("hidden");

        startHeading.innerHTML = "You died! Press \"START\" to try again!"

        startBox.classList.toggle("hidden");
        gameBox.classList.toggle("hidden");
    };
};

// Function that resets player statistics and generates a new monster
function nextMonster(currentMonster, message) {
    currentMonster.health = currentMonster.maxHealth;

    player.evasiveness = 1;
    player.health = player.maxHealth;

    moveBox.innerHTML = `<p>${message}</p>`;

    currentMonster = randomMonster();

    moveBox.innerHTML += `<p>You are now fighting a ${currentMonster.name}.</p>`;

    return currentMonster
};

// Function that controls monster attacks
function fireMonsterAttack(currentMonster) {
    const chanceToDodge = Math.floor(Math.random() * (12 / player.evasiveness));

    if (chanceToDodge == 0) {
        moveBox.innerHTML = `You dodged the ${currentMonster.name}'s attack!`;
    } else {
        let monsterAttack = currentMonster.attacks[Math.floor(Math.random() * currentMonster.attacks.length)];
        player.health -= monsterAttack.damage;
    
        const attackParagraph = `<p>The ${currentMonster.name} attacked you with its ${monsterAttack.title} attack 
        and did ${monsterAttack.damage} damage!</p>`;
    
        moveBox.innerHTML = attackParagraph;
    
        playerDeath(currentMonster);
    };
};

// Setting some base code
let currentMonster = randomMonster();
playerUpdate()
monsterUpdate(currentMonster);

// Event listeners
attackButton.addEventListener("click", () => {
    moveBox.classList.remove("hidden");
    currentMonster.health -= player.damage;

    if (currentMonster.health <= 0) {
        const gold = Math.ceil(currentMonster.maxHealth / 50);
        const XP = Math.ceil(currentMonster.maxHealth / 10);

        player.gold += gold;
        player.XP += XP;

        for (;player.XP >= player.XPRequirement;) {
            player.XP -= player.XPRequirement;
            player.XPRequirement = Math.ceil(player.XPRequirement * 1.5);
            player.levels += 1;
            player.damage += 5;
            player.maxHealth += 2;
        };

        currentMonster = nextMonster(currentMonster, `You killed the ${currentMonster.name}! 
        You earned ${gold} gold and ${XP} XP!`);
       
    } else {
        fireMonsterAttack(currentMonster);
    };

    playerUpdate();
    monsterUpdate(currentMonster);
});

dodgeButton.addEventListener("click", () => {
    moveBox.classList.remove("hidden");
    const chanceToDodge = Math.floor(Math.random() * 3);

    if (chanceToDodge == 0) {
        if (player.evasiveness < 6) {
            player.evasiveness += 1;
            moveBox.innerHTML = `<p>You successfully evaded the ${currentMonster.name}'s attack! +1 Evasiveness</p>`
        } else {
            moveBox.innerHTML = `<p>You successfully evaded the ${currentMonster.name}'s attack, however you've already maxed out your evasiveness!</p>`
        };
        
    } else {
        fireMonsterAttack(currentMonster);
    };

    playerUpdate();
});

runButton.addEventListener("click", () => {
    moveBox.classList.remove("hidden");
    const chanceToRun = Math.floor(Math.random() * (6 / player.evasiveness));

    if (chanceToRun == 0) {
        currentMonster = nextMonster(currentMonster, `You successfully ran from the ${currentMonster.name}!`);
    } else {
        fireMonsterAttack(currentMonster);
    };

    playerUpdate();
    monsterUpdate(currentMonster);
});

startButton.addEventListener("click", () => {
    currentMonster = randomMonster();
    playerUpdate()
    monsterUpdate(currentMonster);

    startBox.classList.toggle("hidden");
    gameBox.classList.toggle("hidden");
});