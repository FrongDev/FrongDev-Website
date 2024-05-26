import { useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

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
    <form
      onSubmit={handleSubmitWrapper}
      className="rounded-[--dev-post-border-radius] bg-[--background-color] p-[6px]"
    >
      <h3 className="font-bold">Title:</h3>
      <TextareaAutosize
        value={editTitleInp}
        onChange={(e) => setEditTitleInp(e.target.value)}
        className="w-full"
      />

      <div className="h-4" />

      <h3 className="font-bold">Date:</h3>
      <input
        type="date"
        value={editDateInp}
        onChange={(e) => setEditDateInp(e.target.value)}
        className="w-full"
      />

      <div className="h-4" />

      <h3 className="font-bold">Content:</h3>
      <TextareaAutosize
        value={editContentInp}
        onChange={(e) => setEditContentInp(e.target.value)}
        className="w-full"
      />

      <div className="h-4" />

      <button type="submit" className="w-full">
        Submit
      </button>

      {showDeleteBtn && (
        <>
          <div className="h-4" />

          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-my-white"
          >
            Delete
          </button>
        </>
      )}
    </form>
  );
}

export { DevPostEditForm };
