const fs = require('fs');
const path = require('path');

let marvelList = [];
let currentId = 1;

// Function to load heroes from JSON file
const loadHeroes = () => {
    const filePath = path.join(__dirname, '../heroes.json'); // Adjust path as needed
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const heroes = JSON.parse(data);
        marvelList = heroes;

        // Set the current ID to the next available ID
        if (heroes.length > 0) {
            currentId = Math.max(...heroes.map(hero => hero.id)) + 1;
        }
    } catch (error) {
        console.error('Error loading heroes:', error);
    }
};

// Save heroes back to JSON file (if needed in the future)
// const saveHeroes = () => {
//     const filePath = path.join(__dirname, '../heroes.json');
//     fs.writeFileSync(filePath, JSON.stringify(marvelList, null, 2));
// };

// Create marvel-hero (in memory only)
exports.create = (marvelData) => {
    const newMarvel = {
        id: currentId++, ...marvelData
    };
    marvelList.push(newMarvel);
    // Do not save to file
    return newMarvel;
};

// Get all marvel-heroes
exports.findAll = () => {
    return marvelList;
};

// Get one marvel-hero by ID
exports.findById = (id) => {
    return marvelList.find(marvel => marvel.id === id); // Find by ID
};

// Update marvel-hero (in memory only)
exports.update = (id, updateData) => {
    const marvelIndex = marvelList.findIndex(marvel => marvel.id === Number(id));
    if (marvelIndex === -1) return null;
    marvelList[marvelIndex] = { id: Number(id), ...updateData };
    // Do not save to file
    return marvelList[marvelIndex];
};

// Delete marvel-hero (in memory only)
exports.delete = (id) => {
    const marvelIndex = marvelList.findIndex(marvel => marvel.id === Number(id));
    if (marvelIndex === -1) return false;
    marvelList.splice(marvelIndex, 1);
    // Do not save to file
    return true;
};

// Initial loading of heroes
loadHeroes();
