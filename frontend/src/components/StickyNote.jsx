import React, { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./StickyNote.module.css";


const StickyNote = ({ note, onDelete, onStop }) => {
    const nodeRef = useRef(null); // ✅ Use ref to avoid findDOMNode warning

    return (
        <Draggable
            nodeRef={nodeRef} // ✅ Required for React 18+
            defaultPosition={{ x: note?.position?.x || 100, y: note?.position?.y || 100 }}
            onStop={(e, data) => onStop(note._id, data)}
        >
            <div
                ref={nodeRef}
                style={{
                    backgroundColor: note.color,
                    padding: "15px",
                    width: "200px",
                    borderRadius: "10px",
                    position: "absolute",
                    cursor: "move",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                    color: "black"
                }}
            >
                <p>{note.text}</p>
                <button
                    onClick={() => onDelete(note._id)}
                    style={{
                        border: "none",
                        background: "#ff5c5c",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        marginTop: "5px"
                    }}
                >
                    Delete
                </button>
            </div>
        </Draggable>
    );
};

export default StickyNote;











