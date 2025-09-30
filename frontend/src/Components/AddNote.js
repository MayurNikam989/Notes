import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    type: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    addNote(
      credentials.title,
      credentials.description,
      credentials.type || "general"
    );
    setCredentials({
      title: "",
      description: "",
      type: "",
    });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3 className="mb-3">Add Note</h3>
      <form className="row g-3" onSubmit={handleClick}>
        <div className="col-12">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={credentials.title}
            onChange={handleChange}
            className="form-control"
            id="title"
            placeholder="Title"
            required
            minLength={3}
          />
        </div>
        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="textarea"
            name="description"
            value={credentials.description}
            onChange={handleChange}
            className="form-control"
            id="description"
            placeholder="description"
            required
            minLength={5}
          />
        </div>
        <div className="col-12">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            name="type"
            value={credentials.type}
            onChange={handleChange}
            className="form-control"
            id="type"
            placeholder="type"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNote;
