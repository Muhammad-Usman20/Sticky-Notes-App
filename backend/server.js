const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Note = require('./models/Note');

dotenv.config();
const app = express();

// ✅ CORS setup for Vite (localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log(err));

// ✅ Get all notes
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// ✅ Add a new note
app.post('/notes', async (req, res) => {
    const { text, color, position } = req.body;
    const newNote = new Note({ text, color, position });
    await newNote.save();
    res.json(newNote);
});

// ✅ Update note position
app.put('/notes/:id', async (req, res) => {
    const { position } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { position }, { new: true });
    res.json(note);
});

// ✅ Delete note
app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



















