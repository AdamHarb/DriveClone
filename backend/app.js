const express = require('express');
const app = express();
const PORT = 3000; // Use your preferred port number

// Import the router
const myRouter = require('./API/routes'); // Assuming the file you provided is named 'router.js'

// Middleware function (example of userAuth)
const userAuth = (req, res, next) => {
    // Your authentication logic here
    const isAuthenticated = true; // Replace with actual logic

    if (isAuthenticated) {
        next(); // Continue to the next middleware/route handler
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Apply middleware to the /test route
myRouter.get('/test', userAuth, (req, res) => {
    res.send('Success!');
});

// Use the router
app.use('/', myRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
