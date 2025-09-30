import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  //Using context for deleteNote
  const context = useContext(noteContext);
  const { deleteNote } = context;
  //destructing props
  const { note, updateNote } = props;
  return (
    <div className="card col-md-3 m-2">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h4 className="card-title">{note.title}</h4>
          <i
            className="fas fa-trash-alt mx-2 "
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fas fa-edit mx-2 "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => updateNote(note)}
          ></i>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{note.type}</h6>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};

export default Noteitem;
