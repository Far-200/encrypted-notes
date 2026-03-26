const Note = require("../models/Note");
const { encrypt, decrypt } = require("../utils/encryption");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    const { encryptedData, iv } = encrypt(content);

    const note = await Note.create({
      user: req.user._id,
      title,
      content: encryptedData,
      iv,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error.message);
    res.status(500).json({ message: "Failed to create note." });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const safeNotes = notes.map((note) => {
      let readableContent = note.content;

      if (note.iv) {
        try {
          readableContent = decrypt(note.content, note.iv);
        } catch (err) {
          console.error(`Decrypt failed for note ${note._id}:`, err.message);
          readableContent = "[Unable to decrypt note]";
        }
      }

      return {
        ...note._doc,
        content: readableContent,
      };
    });

    res.json(safeNotes);
  } catch (error) {
    console.error("Get notes error:", error.message);
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized." });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted." });
  } catch (error) {
    console.error("Delete note error:", error.message);
    res.status(500).json({ message: "Failed to delete note." });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized." });
    }

    let updatedContent = note.content;
    let updatedIv = note.iv;

    if (content) {
      const { encryptedData, iv } = encrypt(content);
      updatedContent = encryptedData;
      updatedIv = iv;
    }

    note.title = title || note.title;
    note.content = updatedContent;
    note.iv = updatedIv;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    console.error("Update note error:", error.message);
    res.status(500).json({ message: "Failed to update note." });
  }
};

const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized." });
    }

    note.isPinned = !note.isPinned;

    const updated = await note.save();

    res.json(updated);
  } catch (error) {
    console.error("Pin error:", error.message);
    res.status(500).json({ message: "Failed to toggle pin." });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  togglePin,
};
