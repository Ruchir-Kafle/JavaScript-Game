// DOM elements
// Selecting main box
const mainBox = document.querySelector(".box");

// Selecting the box that renders the players stats and all of the bs which are to display those stats
const playerStatsBox = mainBox.querySelector(".stats");
const XPBold = playerStatsBox.querySelector(".XP-bold");
const playerHealthBold = playerStatsBox.querySelector(".player-health-bold");
const goldBold = playerStatsBox.querySelector(".gold-bold");

// Selecting the box that renders the players options and all of the buttons which provide the player functionality
const optionsBox = mainBox.querySelector(".options");
const attackButton = optionsBox.querySelector(".attack");
const dodgeButton = optionsBox.querySelector(".dodge");
const runButton = optionsBox.querySelector(".run");

// Selecting the box that renders the monsters stats and all of the bs which are to display those stats
const monsterStatsBox = mainBox.querySelector(".monster-stats");
const monsterNameBold = monsterStatsBox.querySelector(".name-bold");
const monsterHealthBold = monsterStatsBox.querySelector(".monster-health-bold");

// Selecting the box that renders the game state
const gameStateBox = mainBox.querySelector(".game-state");

// Selecting the monster attack box
const monsterAttackBox = mainBox.querySelector(".monster-attack");

// Selecting the start screen and the start button
const startBox = document.querySelector(".start-screen");
const startButton = startBox.querySelector("button");

// Objects
// Player object
const player = {
    health: 100,
    XP: 0,
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
            title: "Slash",
            damage: 10
        },

        {
            title: "Chomp",
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
        },

    ]
};

// Monster list
const monsterList = [dragon, goblin];

// Functions
// Function that selects a random monster
function randomMonster() {
    let randomMonster = monsterList[Math.floor(Math.random() * monsterList.length)];

    return randomMonster;
};

// Function that updates the monster display
function monsterUpdate(monster) {
        monsterNameBold.innerHTML = monster.name;
        monsterHealthBold.innerHTML = monster.health;
        gameStateBox.innerHTML = `<span>You are fighting a ${monster.name.toLowerCase()}</span>`;
};

// Function that updates the player display
function playerUpdate() {
    playerHealthBold.innerHTML = player.health;
    XPBold.innerHTML = player.XP;
    goldBold.innerHTML = player.gold;
};

// Code
// Setting the default website stats
let currentMonster = randomMonster();
monsterUpdate(currentMonster);


// Event listeners
attackButton.addEventListener("click", () => {
    currentMonster.health -= player.damage;

    if (currentMonster.health <= 0) {
        currentMonster.health = currentMonster.maxHealth;
        player.gold += currentMonster.maxHealth / 50;
        player.XP += currentMonster.maxHealth / 10;
        monsterAttackBox.innerHTML = ``
        currentMonster = randomMonster();
    };

    let monsterAttack = currentMonster.attacks[Math.floor(Math.random() * currentMonster.attacks.length)]
    player.health -= monsterAttack.damage

    const attackParagraph = `<p>The ${currentMonster.name} attacked you with its ${monsterAttack.title} attack</p>`
    monsterAttackBox.innerHTML = attackParagraph
    
    playerUpdate()
    monsterUpdate(currentMonster);
});

startButton.addEventListener("click", () => {
    startBox.classList.add("hidden")
    mainBox.classList.remove("hidden")
});