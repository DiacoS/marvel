exports.validateMarvel = (req, res, next) => {
    const {name, power, alias} = req.body;
    if (!name || typeof name !== 'string' || !power || typeof power !== 'string' || (alias && typeof alias !== 'string')) {
        return res.status(400).json({
            message: 'Invalid input. Name and power are required. Alias must be a string if provided.'
        });
    }
    next();
};