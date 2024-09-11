const express = require('express');
const { compileProgram } = require('./compiler');
const { testProgram } = require('./tester');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Compile API
app.post('/compile', async (req, res) => {
    console.log("Compiling...")
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'No code provided!' });
        }

        // Save code and compile using Anchor
        const compileLog = await compileProgram(code);
        res.status(200).json(compileLog);
    } catch (error) {
        res.status(500).json({ error: 'Compilation failed!', details: error.message });
    }
});

// Test API
app.post('/test', async (req, res) => {
    console.log("Testing...")
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'No code provided!' });
        }

        // Save code and test using Anchor
        const testLog = await testProgram(code);
        res.status(200).json(testLog);
    } catch (error) {
        res.status(500).json({ error: 'Testing failed!', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
