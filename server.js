const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    console.log('home')
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req, res) {
    console.log('notes');
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res) {
    console.log('get notes here');
    let raw = fs.readFileSync('db/db.json', 'utf8');
    let notes = JSON.parse(raw);
    console.log(notes);
    return res.json(notes)
});

app.post("/api/notes", function(req, res) {
    console.log('post notes here');
    let data = req.body;
    let raw = fs.readFileSync('db/db.json', 'utf8');
    let notes = JSON.parse(raw);
    data.id = (parseInt(notes[(notes.length -1)].id) + 1).toString();
     
    console.log(data);
    notes.push(data);
    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), () => {
        return;
    });
});

app.delete("/api/notes/:id", function(req, res) {
    console.log('delete notes here');
    const toDelete = req.params.id
    console.log(toDelete);
    return res;
});

app.listen(PORT, () => {
    console.log("server listening on localhost:" + PORT)
});
