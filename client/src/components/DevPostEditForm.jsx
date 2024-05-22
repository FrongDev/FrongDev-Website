import { useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import "../css/edit-dev-post.css";

function DevPostEditForm({
  handleSubmit,
  defaultTitle,
  defaultDate,
  defaultContent,
  handleDelete,
  showDeleteBtn,
}) {
  // Edit inputs
  const [editTitleInp, setEditTitleInp] = useState(defaultTitle);
  const [editDateInp, setEditDateInp] = useState(defaultDate);
  const [editContentInp, setEditContentInp] = useState(defaultContent);

  async function handleSubmitWrapper(e) {
    e.preventDefault();

    handleSubmit(editTitleInp, editDateInp, editContentInp);
  }

  return (
    <form onSubmit={handleSubmitWrapper} className="dev-post edit-dev-post">
      <h3>Title:</h3>
      <TextareaAutosize
        value={editTitleInp}
        onChange={(e) => setEditTitleInp(e.target.value)}
      />

      <div className="break" />

      <h3>Date:</h3>
      <input
        type="date"
        value={editDateInp}
        onChange={(e) => setEditDateInp(e.target.value)}
      />

      <div className="break" />

      <h3>Content:</h3>
      <TextareaAutosize
        value={editContentInp}
        onChange={(e) => setEditContentInp(e.target.value)}
      />

      <div className="break" />

      <button type="submit">Submit</button>

      {showDeleteBtn && (
        <>
          <div className="break" />

          <button
            type="button"
            onClick={handleDelete}
            className="dev-edit-delete-btn"
          >
            Delete
          </button>
        </>
      )}
    </form>
  );
}

export { DevPostEditForm };
