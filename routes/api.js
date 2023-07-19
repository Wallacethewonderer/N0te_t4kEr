const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const address = path.join(__dirname, "../db/db.json");
const { v4 } = require("uuid");
const data = require(address)
console.log(data)

router.get("/notes", (req, res) => {
	res.sendFile(address);
});

router.post("/notes", (res, req) => {
	
	let note = {
		title: res.body.title,
		text: res.body.text,
		id: v4(),
	};
	console.log(note)
    data.push(note)
	console.log(data)
    fs.writeFileSync(address, JSON.stringify(data))
    res.json(data)
	
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const noteIndex = data.findIndex(note => note.id === id);
    
    if (noteIndex !== -1) {
        data.splice(noteIndex, 1);
        fs.writeFileSync(address, JSON.stringify(data));
        res.json({ status: 'success', message: 'Note deleted' });
    } else {
        res.status(404).json({ status: 'error', message: 'Note not found' });
    }
});


module.exports = router;