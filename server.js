const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage for validated data
const tempStorage = [];

// Serve static files (if any)
app.use(express.static('public'));

// Route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, gender, terms } = req.body;

    // Server-side validation
    const errors = [];
    if (!name || !email || !age || !gender || !terms) {
        errors.push('All fields are required and terms must be accepted.');
    }
    if (isNaN(age) || age < 18 || age > 100) {
        errors.push('Age must be a valid number between 18 and 100.');
    }

    if (errors.length > 0) {
        res.render('index', { errors });
    } else {
        // Store validated data in temporary storage
        tempStorage.push({ name, email, age, gender });
        res.render('result', { name, email, age, gender });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
