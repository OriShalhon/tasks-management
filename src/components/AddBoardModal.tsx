import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./AddBoardModal.css";

interface AddBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (boardName: string, boardIcon: string) => void;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [boardName, setBoardName] = useState("");
  const [boardIcon, setBoardIcon] = useState("work"); // Default icon selection

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleSave = () => {
    if (boardName.trim()) {
      onSave(boardName, boardIcon);
      setBoardName(""); // Reset the form fields
      setBoardIcon("work");
    } else {
      alert("Board name cannot be empty.");
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Board</h2>
        <div className="form-group">
          <label>Board Name:</label>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Choose Icon:</label>
          <select
            value={boardIcon}
            onChange={(e) => setBoardIcon(e.target.value)}
          >
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="home">Home</option>
            <option value="travel">Travel</option>
            <option value="exercise">Exercise</option>
            <option value="art">Art</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default AddBoardModal;
