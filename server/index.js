const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for assessments (will be replaced by file/db later if needed)
// In-memory storage
let assessments = [];
let users = [];

// Auth Routes
app.post('/api/register', (req, res) => {
    const { email, password, name, organization, role } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now(),
        email,
        password, // In a real app, hash this!
        name,
        organization,
        role
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

// Routes
app.get('/', (req, res) => {
    res.send('RainHarvest Server is running');
});

// Get all assessments
app.get('/api/assessments', (req, res) => {
    res.json(assessments);
});

// Save a new assessment
app.post('/api/assessments', (req, res) => {
    const assessment = req.body;
    if (!assessment.id) {
        assessment.id = Date.now();
    }
    assessments.push(assessment);
    res.status(201).json(assessment);
});

// Delete an assessment
app.delete('/api/assessments/:id', (req, res) => {
    const { id } = req.params;
    assessments = assessments.filter(a => a.id != id);
    res.status(200).json({ message: 'Assessment deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
