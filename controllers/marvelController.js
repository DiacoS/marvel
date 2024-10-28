const marvelModel = require("../models/marvelModel");

// Create marvel-hero
exports.createMarvel = (req, res, next) => {
    try {
        const newMarvel = marvelModel.create(req.body);
        res.status(201).json({ message: 'Marvel has been created', marvel: newMarvel });
    } catch (error) {
        next(error);
    }
};

// Read all marvel-heroes
exports.getAllMarvel = (req, res) => {
    const allMarvel = marvelModel.findAll();
    res.json(allMarvel);
};

// Read one Marvel by ID
exports.getMarvelById = (req, res, next) => {
    try {
        const id = Number(req.params.id); // Convert to Number
        const marvel = marvelModel.findById(id); // Find by ID

        if (!marvel) {
            return res.status(404).json({ message: 'Marvel Not Found' });
        }

        res.json(marvel); // Send the found Marvel hero
    } catch (error) {
        next(error);
    }
};

// Update marvel-hero by ID
exports.updateMarvel = (req, res, next) => {
    try {
        const updateMarvel = marvelModel.update(req.params.id, req.body);
        if (!updateMarvel) {
            return res.status(404).send('Marvel Not Found');
        }
        res.json({ message: 'Marvel Updated Successfully', marvel: updateMarvel });
    } catch (error) {
        next(error);
    }
};

// Delete marvel-hero
exports.deleteMarvel = (req, res) => {
    const deleted = marvelModel.delete(req.params.id);
    if (!deleted) {
        return res.status(404).send('Marvel Not Found');
    }
    res.json({ message: 'Marvel Deleted Successfully' });
};
