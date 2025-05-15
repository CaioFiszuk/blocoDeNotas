const Note = require("../models/note");

module.exports.createNote = (req, res) => {
  const { title, content, owner } = req.body;

  if (!title || !content || !owner) {
    return res.status(400).send({ message: "Invalid Data" });
  }

  Note.create({ title, content, owner })
    .then((note) => res.send({ data: note }))
    .catch((err) =>
      res.status(500).send({ message: "It was not possible for create a notes" + err })

    );
};

module.exports.getNotes = (req, res) => {
  const userId = req.user.id;

  Note.find({owner: userId})
   .then((note) => res.send({ data: note }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.getNote = (req, res) => {
  const { noteId } = req.params;
   Note.findById(noteId)
   .then((note) => res.send({ data: note }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.deleteNote = (req, res) => {
  const { noteId } = req.params;

  Note.findByIdAndDelete(noteId)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404).send({ message: "That note was not found to be deleted" });
      }
      res.send({ message: "Note deleted successfully", data: deletedNote });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error" });
    });
};

module.exports.updateNote = (req, res) => {
   console.log(req.params);
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  .then(note => res.send({ data: note }))
  .catch(err => res.status(500).send('Server error'))
}
