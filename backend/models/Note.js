const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: String,
    color: String,
    position: {
        x: Number,
        y: Number
    }
});

module.exports = mongoose.model('Note', noteSchema);
// export default Note;
