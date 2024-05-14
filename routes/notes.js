const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

  // This API route is a POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.info(`${req.method} request note added`);
  
    const { title, text,} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note sucessfully added`);
    } else {
      res.error('Error in adding note');
    }
  });

notes.delete('/:id', (req, res) => {
  const notesId = req.params.id;
  readFromFile('./db/db.json').then((data) => JSON.parse(data))
  .then((json) => {
    // Make a new array of all tips except the one with the ID provided in the URL
    const result = json.filter((notes) => notes.id !== notesId);

    // Save that array to the filesystem
    writeToFile('./db/db.json', result);

    // Respond to the DELETE request
    res.json(`Note ${notesId} has been deleted 🗑️`);
  });
});

  module.exports = notes;