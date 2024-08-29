document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playerInput-edit').style.display = "none";
    document.getElementById('playerInput').style.display = "none";
    document.getElementById("Rsidebar").style.display = "none";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById('averages').style.display = "none";
    setgamemode('HP'); // Default to HP
    HP(); // Set initial game mode to HP
});

// Function to show the playerInput div
function showPlayerInput(){
    document.getElementById('playerInput').style.display = "flex";
    document.getElementById('homePage').style.display = "none";
}

// Function to hide playerInput div and return to homepage
function back(){
    document.getElementById('sidebar').style.display = "none";
    document.getElementById('Rsidebar').style.display = "none";
    document.getElementById('averages').style.display = "none";
    document.getElementById("playerInput").style.display = "none";
    document.getElementById("homePage").style.display = "flex";
}

// Function to switch to SND mode
function SND(){
    document.getElementById("Hilltime").style.display = "none";
    document.getElementById("Defencewins").style.display = "flex";
    document.getElementById("Attackwins").style.display = "flex";
    document.getElementById('Captured').style.display = "none";
    document.getElementById('ticksLost').style.display = "none";
    setgamemode('SND');
}

function SNDedit(){
    document.getElementById("hillTime").style.display = "none";
    document.getElementById("defenceWins-edit").style.display = "flex";
    document.getElementById("attackWins-edit").style.display = "flex";
    document.getElementById('Tickscaptured-edit').style.display = "none";
    document.getElementById('Tickslost-edit').style.display = "none";
    setgamemodeedit('SND');
}

// Function to switch to Hardpoint mode
function HP(){
    document.getElementById("Hilltime").style.display = "flex";
    document.getElementById("Defencewins").style.display = "none";
    document.getElementById("Attackwins").style.display = "none";
    document.getElementById('Captured').style.display = "none";
    document.getElementById('ticksLost').style.display = "none";
    setgamemode('HP');
}

function HPedit(){
    document.getElementById("hillTime").style.display = "flex";
    document.getElementById("defenceWins-edit").style.display = "none";
    document.getElementById("attackWins-edit").style.display = "none";
    document.getElementById('Tickscaptured-edit').style.display = "none";
    document.getElementById('Tickslost-edit').style.display = "none";
    setgamemodeedit('HP');
}


// Function to switch to Control mode
function CONTROL(){
    document.getElementById('Hilltime').style.display = 'none';
    document.getElementById('Captured').style.display = 'flex';
    document.getElementById('ticksLost').style.display = 'flex';
    document.getElementById("Defencewins").style.display = "flex";
    document.getElementById("Attackwins").style.display = "flex";
    setgamemode('CONTROL');
}

function CONTROLedit(){
    document.getElementById('hillTime').style.display = 'none';
    document.getElementById('Tickscaptured-edit').style.display = 'flex';
    document.getElementById('Tickslost-edit').style.display = 'flex';
    document.getElementById("defenceWins-edit").style.display = "flex";
    document.getElementById("attackWins-edit").style.display = "flex";
    setgamemodeedit('CONTROL-edit');
}

function editHP(){
    document.getElementById("hillTime-edit").style.display = "flex";
    document.getElementById("defenceWins-edit").style.display = "none";
    document.getElementById("attackWins-edit").style.display = "none";
    document.getElementById("editSave").style.display = "flex";
    setgamemode('HP');
}


// document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
//     checkbox.addEventListener('change', applyFilters);
// });
function checkEnter(event){
    if(event.key === "Enter"){
        searchPlayerName();
    }
}


class Player {
    constructor(attackLost , defenceLost, id, ticksCaptured, ticksLost, date, side, attackWins, defenceWins, name, winOrLose, map, hillTime, scoreDif, kills, deaths, gamemode) {
        this.gamemode = gamemode;
        this.name = name;
        this.winOrLose = winOrLose;
        this.hillTime = hillTime;
        this.scoreDif = scoreDif;
        this.map = map;
        this.kills = kills;
        this.deaths = deaths;
        this.attackWins = attackWins;
        this.defenceWins = defenceWins;
        this.side = side;
        this.ticksLost = ticksLost;
        this.ticksCaptured = ticksCaptured;
        this.date = date;
        this.id = id;
        this.attackLost = attackLost;
        this.defenceLost = defenceLost;
    }
}
function generateUUID() { // Public Domain/MIT
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function addDataHP() {
    document.getElementById('averages').style.display = 'none';
    const gamemode = document.getElementById('gamemode').value.toUpperCase();
    const name = document.getElementById('playerName').value.toUpperCase();
    const winOrLose = document.getElementById('winOrLose').value.toUpperCase();
    const map = document.getElementById('map').value.toUpperCase();
    const hillTime = parseInt(document.getElementById('hillTime').value);
    const scoreDif = parseInt(document.getElementById('scoreDif').value);
    const kills = parseInt(document.getElementById('kills').value);
    const deaths = parseInt(document.getElementById('deaths').value);
    const side = document.getElementById('side').value.toUpperCase();
    const ticksCaptured = parseInt(document.getElementById('Tickscaptured').value);
    const ticksLost = parseInt(document.getElementById('TicksLost').value);
    const attackWins = parseInt(document.getElementById('attackWins').value);
    const defenceWins = parseInt(document.getElementById('defenceWins').value);
    const attackLost = parseInt(document.getElementById('attackLost').value);
    const defenceLost = parseInt (document.getElementById('defenceLost').value);
    const date = new Date().toLocaleDateString();
    const id = generateUUID();


    
    

    const player = new Player(attackLost, defenceLost, id, ticksCaptured, ticksLost, date, side, attackWins, defenceWins, name, winOrLose, map, hillTime, scoreDif, kills, deaths, gamemode);

    let players = JSON.parse(localStorage.getItem('players')) || [];
        players.push(player);

    localStorage.setItem('players', JSON.stringify(players));
    logPlayers();

    document.getElementById('playerName').value = '';
    document.getElementById('kills').value = "";
    document.getElementById('deaths').value = "";
    document.getElementById('hillTime').value = "";
}
function setgamemode(mode) {
    document.getElementById('gamemode').value = mode;
    localStorage.setItem('gamemode', mode);
}

function setgamemodeedit(mode) {
    document.getElementById('gamemodeedit').value = mode;
    localStorage.setItem('gamemodeedit', mode);
}
function logPlayers() {
    // Retrieve existing players from localStorage
    let players = JSON.parse(localStorage.getItem('players')) || [];
    
    // Log the players to the console
    console.log(players);
}
const filterSnd = document.getElementById('filter-snd');
const filterHP = document.getElementById('filter-hp');
const filterControl = document.getElementById('filter-control');

// Add event listeners to the checkboxes
filterSnd.addEventListener('change', searchPlayerName);
filterHP.addEventListener('change', searchPlayerName);
filterControl.addEventListener('change', searchPlayerName);

function searchPlayerName() {
    document.getElementById('Rsidebar').style.display = "flex";
    document.getElementById('homePage').style.display = "none";
    document.getElementById('sidebar').style.display = "flex";
    document.getElementById('averages').style.display = "flex";
    document.getElementById('playerInput').style.display = "none";

    let gamemodeFilter = null;

    // Set the gamemode filter based on checked boxes
    if (filterSnd.checked) {
        gamemodeFilter = 'SND';
    } else if (filterHP.checked) {
        gamemodeFilter = 'HP';
    } else if (filterControl.checked) {
        gamemodeFilter = 'CONTROL';
    }

    const nameFilter = document.getElementById('searchPlayer').value.toUpperCase();

    let players = JSON.parse(localStorage.getItem('players')) || [];

    // Filter players based on the input criteria
    let filteredPlayers = players.filter(player => 
        player.name.toUpperCase().includes(nameFilter) &&
        (!gamemodeFilter || player.gamemode === gamemodeFilter)
    );
    
    calculateAverages(filteredPlayers);
}

function calculateAverages(filteredPlayers) {
    if (filteredPlayers.length === 0) {
        console.log('No players found.');
        return;
    }
    let totalKills = 0;
    let totalDeaths = 0;
    let totalHillTime = 0;
    let totalScoreDif = 0;
    let totalWins = 0;
    let totalLoss = 0;
    let attackWins = 0;
    let defenceWins = 0;



    filteredPlayers.forEach(player => {
        if (player.attackWins) totalSNDattackwins += player.attackWins;
        if (player.attackLost) totalSNDattacklost += player.attackLost;
        if (player.defenceLost) totalSNDdefencelost += player.defenceLost;
        if (player.defenceWins) totalSNDdefencewins += player.defenceWins;
        if (player.kills) totalKills += player.kills;
        if (player.deaths) totalDeaths += player.deaths;
        if (player.hillTime) totalHillTime += player.hillTime;
        if (player.scoreDif) totalScoreDif += player.scoreDif;
        if( player.winOrLose === 'WIN' || player.winOrLose === 'WON') totalWins += 1;
        else if (player.winOrLose === 'LOSS' || player.winOrLose === 'LOST' || player.winOrLose === 'LOSE') totalLoss += 1;
    });

    const percentAttackWin = totalSNDattackwins/ (totalSNDattacklost + totalSNDdefencelost)    
    const averageKD = totalKills / totalDeaths;  
    const averageHilltime = totalHillTime / filteredPlayers.length;
    const averageScoreDif = totalScoreDif / filteredPlayers.length;
    const winLossRatio = totalWins / totalLoss;
    // Display the results
    document.getElementById('name').value = document.getElementById('searchPlayer').value.toUpperCase();
    document.getElementById('KD').value = averageKD.toFixed(2);
    document.getElementById('averageHillTime').value = averageHilltime.toFixed(2);
    document.getElementById('scoreDifference').value = averageScoreDif.toFixed(2);
    document.getElementById('winLossRatio').value = winLossRatio.toFixed(2);
    console.log(`Average KD: ${averageKD}`);
    displayFilteredPlayers(filteredPlayers);
    logPlayers();
}


function displayFilteredPlayers(filteredPlayers) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = ''; // This clears the previous content
    console.log("Player list cleared");

    // Sort players by date (assuming player.date is a valid date string)
    filteredPlayers.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Group players by date
    const playersByDate = {};
    filteredPlayers.forEach(player => {
        const date = new Date(player.date).toLocaleDateString(); // Format the date as needed
        if (!playersByDate[date]) {
            playersByDate[date] = [];
        }
        playersByDate[date].push(player);
    });

    // Generate the HTML for each date
    for (const date in playersByDate) {
        // Create a container for each date
        const dateContainer = document.createElement('div');
        dateContainer.className = 'date-container';

        // Create the clickable date element
        const dateElement = document.createElement('div');
        dateElement.className = 'date-header';
        dateElement.textContent = date;
        dateElement.style.cursor = 'pointer';
        dateContainer.appendChild(dateElement);

        // Create a container for the maps, initially hidden
        const mapsContainer = document.createElement('div');
        mapsContainer.className = 'maps-container';
        mapsContainer.style.display = 'none';

        // Populate the maps container with the player's maps
        playersByDate[date].forEach((player, index) => {
            const mapElement = document.createElement('div');
            mapElement.className = 'map-item';
            mapElement.textContent = player.map; // Display the map name
            mapElement.style.cursor = 'pointer';
            
            // Add event listener to map element for editing
            mapElement.addEventListener('click', () => {
                editMap(player);
            });

            // Create a delete button for each map item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', (event) => { 
                event.stopPropagation(); // Prevent the click from triggering the map element's event
                deletePlayer(player);
            });

            mapElement.appendChild(deleteButton);
            mapsContainer.appendChild(mapElement);
        });

        // Add a click event to the date element to toggle the visibility of the maps
        dateElement.addEventListener('click', () => {
            mapsContainer.style.display = mapsContainer.style.display === 'none' ? 'block' : 'none';
        });

        dateContainer.appendChild(mapsContainer);
        playerList.appendChild(dateContainer);
    }
}
function editMap(player) {
    document.getElementById('playerInput-edit').style.display = 'flex';
    //editHP();
    document.getElementById('averages').style.display = "none";
    logPlayers();
    
    // Fill the input fields with the player's data
    document.getElementById('gamemodeedit').value = player.gamemode;
    document.getElementById('ticksLost-edit').value = player.ticksLost;
    document.getElementById('playerName-edit').value = player.name;
    document.getElementById('winOrLose-edit').value = player.winOrLose;
    document.getElementById('map-edit').value = player.map;
    document.getElementById('hillTime-edit').value = player.hillTime;
    document.getElementById('scoreDif-edit').value = player.scoreDif;
    document.getElementById('kills-edit').value = player.kills;
    document.getElementById('deaths-edit').value = player.deaths;
    document.getElementById('side-edit').value = player.side;
    // Update the save button to save changes
    const saveButton = document.getElementById('editSave');
    saveButton.onclick = () => saveChanges(player);
}



function saveChanges(player) {
    // Retrieve the updated data from the input fields
    document.getElementById('playerInput-edit').style.display = "none";
    player.name = document.getElementById('playerName-edit').value.toUpperCase();
    player.winOrLose = document.getElementById('winOrLose-edit').value.toUpperCase();
    player.map = document.getElementById('map-edit').value.toUpperCase();
    player.hillTime = parseInt(document.getElementById('hillTime-edit').value);
    player.scoreDif = parseInt(document.getElementById('scoreDif-edit').value);
    player.kills = parseInt(document.getElementById('kills-edit').value);
    player.deaths = parseInt(document.getElementById('deaths-edit').value);
    player.side = document.getElementById('side-edit').value.toUpperCase();

    // Save the updated player data back to localStorage
    let players = JSON.parse(localStorage.getItem('players')) || [];
    const index = players.findIndex(p => p.date === player.date && p.ID === player.ID);
    if (index !== -1) {
        players[index] = player;
        localStorage.setItem('players', JSON.stringify(players));
        console.log('Player data updated:', player);
    }

    searchPlayerName(player);
    // Refresh the display
}

// function deletePlayer(player) {
//     if (confirm('Are you sure you want to delete this map data?')) {
//         let players = JSON.parse(localStorage.getItem('players')) || [];
//         const index = players.findIndex(p => p.date === player.date && p.ID === player.ID);
//         localStorage.setItem('players', JSON.stringify(players));
//         console.log('Map data deleted:', player);

//         searchPlayerName();
//     }
// }

function deletePlayer(player) {
    if (confirm('Are you sure you want to delete this map data?')) {
        let players = JSON.parse(localStorage.getItem('players')) || [];
        
        // Find the index of the player in the array
        const index = players.findIndex(p => p.date === player.date && p.id === player.id);

        // Check if the player was found
        if (index !== -1) {
            // Remove the player from the array
            players.splice(index, 1);

            // Save the updated array back to localStorage
            localStorage.setItem('players', JSON.stringify(players));
            console.log('Map data deleted:', player);

            // Recalculate averages and update the displayed statistics
            searchPlayerName(); // Call this function to refresh everything
        } else {
            console.log('Player not found:', player);
        }
    }
}
    // Find the index of the player to be edited based on name, map, and date
    

    function editData() {
        document.getElementById('averages').style.display = 'none';
        const gamemode = document.getElementById('gamemodeedit').value.toUpperCase();
        const ticksCaptured = pareInt(document.getElementById('Tickscaptured').value);
        const ticksLost = pareInt(document.getElementById('TicksLost').value);
        const name = document.getElementById('playerName-edit').value.toUpperCase();
        const winOrLose = document.getElementById('winOrLose-edit').value.toUpperCase();
        const map = document.getElementById('map-edit').value.toUpperCase();
        const hillTime = parseInt(document.getElementById('hillTime-edit').value);
        const scoreDif = parseInt(document.getElementById('scoreDif-edit').value);
        const kills = parseInt(document.getElementById('kills-edit').value);
        const deaths = parseInt(document.getElementById('deaths-edit').value);
        const side = document.getElementById('side-edit').value.toUpperCase();
        const date = new Date().toLocaleDateString();
        const id = id;
    
        // Retrieve players from localStorage
        let players = JSON.parse(localStorage.getItem('players')) || [];
        const playerIndex = players.findIndex(p => 
            p.name === name && 
            p.map === map && 
            p.date === date && 
            p.gamemode === gamemode &&
            p.id === id
        );
    
    
    if (playerIndex !== -1) {
        // Update the player's data
        players[playerIndex].winOrLose = winOrLose;
        players[playerIndex].hillTime = hillTime;
        players[playerIndex].scoreDif = scoreDif;
        players[playerIndex].kills = kills;
        players[playerIndex].deaths = deaths;
        players[playerIndex].side = side;
        players[playerIndex].ticksCaptured = ticksCaptured;
        players[playerIndex].ticksLost = ticksLost;
        players[playerIndex].map = map;

        // Save the updated array back to localStorage
        localStorage.setItem('players', JSON.stringify(players));
        logPlayers();
    } else {
        console.error("Player not found. Please check the player details.");
    }
}


// function applyFilters() {
//     let players = JSON.parse(localStorage.getItem('players')) || [];

//     // Get checkbox values
//     const hpFilter = document.getElementById('filter-hp').checked;
//     const sndFilter = document.getElementById('filter-snd').checked;
//     const controlFilter = document.getElementById('filter-control').checked;
//     const winFilter = document.getElementById('filter-win').checked;
//     const lossFilter = document.getElementById('filter-lose').checked;

//     // Collect selected filter values
//     const gamemodeFilters = [];
//     if (hpFilter) gamemodeFilters.push('HP');
//     if (sndFilter) gamemodeFilters.push('SND');
//     if (controlFilter) gamemodeFilters.push('CONTROL');
    
//     const winOrLoseFilter = winFilter ? 'WON' : lossFilter ? 'LOST' : null;

//     // Apply filters to the players array
//     const filteredPlayers = players.filter(player => 
//         (gamemodeFilters.length === 0 || gamemodeFilters.includes(player.gamemode)) &&
//         (winOrLoseFilter ? player.winOrLose.toUpperCase() === winOrLoseFilter : true)
//     );

//     searchPlayerName(filteredPlayers);
//     updateAverages(filteredPlayers); // Make sure to call this function
// }

// function updateAverages(filteredPlayers) {
//     let totalKills = 0;
//     let totalDeaths = 0;
//     let totalGood = 0;
//     let totalBad = 0;

//     filteredPlayers.forEach(player => {
//         totalKills += player.kills;
//         totalDeaths += player.deaths;
//         if (player.side === 'Good') {
//             totalGood++;
//         } else if (player.side === 'Bad') {
//             totalBad++;
//         }
//     });

//     const kdRatio = totalKills / totalDeaths || 0;
//     const goodBadRatio = totalGood / totalBad || 0;

//     // Update the UI with these values
// }
//This below will clear your data. 
//localStorage.clear();
