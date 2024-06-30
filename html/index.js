// index.js

import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Import using ES module syntax
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional, if you use Bootstrap or custom CSS/JS)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('form'); // Render the form.ejs template
});

app.post('/submit', async (req, res) => {
    const { city, year, sector, scope } = req.body;
    // const apiUrl = `https://dataportalforcities.org/api/emissions?cityid=5024164&year=2015&sector=Waste&scope=total`;
    const apiUrl = `https://dataportalforcities.org/api/emissions?cityid=90003074&year=2013&sector=Waste&scope=total`;

    try {
        // Fetch data from API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        // Render results page with fetched data
        res.render('results', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data. Please try again later.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
