const router = require('express').Router();

//import our modular routes for /notes and /pages
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
