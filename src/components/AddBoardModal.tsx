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
  const [boardIcon, setBoardIcon] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(boardName, boardIcon);
    onClose();
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
          {/* Implement an icon picker or simple input/select for now */}
          <input
            type="text"
            value={boardIcon}
            onChange={(e) => setBoardIcon(e.target.value)}
          />
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
