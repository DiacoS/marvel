const express = require('express');
const morgan = require('morgan');
const marvelRoutes = require('./routes/marvelRoute');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Routes
app.use('/marvel', marvelRoutes); // Ensure your routes are defined

// Redirect root URL to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for 404 Not Found
app.use((req, res, next) => {
    console.error(`404 Not Found: ${req.originalUrl}`); // Log the requested URL for debugging
    const error = new Error('Marvel not found');
    error.status = 404;
    next(error);
});

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
module.exports = app;