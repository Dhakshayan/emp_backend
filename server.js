const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Express App
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test Route
app.get("/", async (req, res) => {
    try {
        // Fetch all rows from the 'employees' table
        const { data, error } = await supabase.from("employees").select("*");
        if (error) throw error;

        // Send data as the response
        res.status(200).json(data);
    } catch (err) {
        // Log and send error message
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
