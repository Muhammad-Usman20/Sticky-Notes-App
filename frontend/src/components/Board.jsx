import React, { useEffect, useState } from "react";
import axios from "axios";
import StickyNote from "./StickyNote";
import styles from "./Board.module.css"; // ✅ Import CSS module

const Board = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF8FAB"];

  // Load notes from MongoDB
  useEffect(() => {
    axios.get("http://localhost:5000/notes").then((res) => setNotes(res.data));
  }, []);

  // Add new note
  const addNote = async () => {
    if (!text.trim()) return;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      text,
      color: randomColor,
      position: { x: 100, y: 100 },
    };
    const res = await axios.post("http://localhost:5000/notes", newNote);
    setNotes([...notes, res.data]);
    setText("");
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  };

  // Update note position
  const updatePosition = async (id, data) => {
    const updated = await axios.put(`http://localhost:5000/notes/${id}`, {
      position: { x: data.x, y: data.y },
    });
    setNotes(notes.map((note) => (note._id === id ? updated.data : note)));
  };

  return (
    <div className={styles.board}>
      <div className={styles.inputContainer}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note..."
          className={styles.input}
        />
        <button onClick={addNote} className={styles.addBtn}>
          ➕ Add Note
        </button>
      </div>

      {notes.map((note) => (
        <StickyNote
          key={note._id}
          note={note}
          onDelete={deleteNote}
          onStop={updatePosition}
        />
      ))}
    </div>
  );
};

export default Board;

