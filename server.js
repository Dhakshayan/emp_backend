const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const app = express();
const port = 5000;


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("employees").select("*");
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post("/employees", async (req, res) => {
    try {
        const employee = req.body;

        const { data, error } = await supabase.from("employees").insert([employee]);
        if (error) throw error;

        res.status(201).json({ message: "Employee added successfully", data });
    } catch (err) {
        console.error("Error adding employee:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
