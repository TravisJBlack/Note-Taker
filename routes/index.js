const router = require('express').Router();

//import our modular routes for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
