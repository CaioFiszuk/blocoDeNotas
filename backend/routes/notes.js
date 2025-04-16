const router = require('express').Router();
const { createNote, getNote, getNotes, deleteNote, updateNote } = require('../controllers/notes');

router.post('/', createNote);
router.get('/', getNotes);
router.get('/noteId', getNote);
router.delete('/:noteId', deleteNote);
router.patch('/:noteId', updateNote);

module.exports = router;