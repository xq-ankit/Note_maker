const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      user: req.user._id
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).send();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).send();
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

console.log('Note routes created');