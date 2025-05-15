const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createNote, getNote, getNotes, deleteNote, updateNote } = require('../controllers/notes');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.get('/:noteId', auth, getNote);
router.delete('/:noteId', auth, deleteNote);
router.patch('/:noteId', auth, updateNote);

module.exports = router;