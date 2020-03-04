const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    console.log('oi!')
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req, res) {
    console.log('hello?');
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.listen(PORT, () => {
    console.log("server listening on localhost:" + PORT)
});

app.get("/api/notes", function(req, res) {
    console.log('hey there');
    return res.json(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function(req, res) {
    console.log('WRYYYYYY');
    return res.json(path.join(__dirname, "db/db.json"));
});

// app.get("/api/notes/:id", (req, res) => {
//     let chosen = req.params.id;
//     let notes = fs.readFile(path.join(__dirname, 'db/db.json'));

//     for(const note in notes) {
//         if(chosen === note.id) {
//             return res.json(note);
//         }
//     };

//     return res.json(false);
// });

