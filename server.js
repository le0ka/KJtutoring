const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/save-booking', (req, res) => {
    const { name, email, subject, date, time } = req.body;

    const entry = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nDate: ${date}\nTime: ${time}\n------------------------\n`;
    const filePath = path.join(__dirname, 'public', 'bookings.txt');

    // Append the booking data to the file
    fs.appendFile(filePath, entry, (err) => {
        if (err) {
            console.error('Error saving booking:', err);
            res.status(500).send('Server error');
            return;
        }
        res.redirect('/thank_you.html');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
