import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
  //using Context
  const context = useContext(NoteContext);
  const { notes, fetchNote, editNote } = context;

  //Fetching Notes only once
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchNote();
    } else {
      alert("token expired.Please login");
      navigate("/login");
    }
  }, []);

  //Creating newState for updated note -- UNOTE
  //its a edited note
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
  });

  //Onclicking edit Note in Modal
  const handleClick = async (e) => {
    e.preventDefault();
    //passing updated info of note
    editNote(note.id, note.title, note.description, note.type);
    setNote({
      id: "",
      title: "",
      description: "",
      type: "",
    });
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (note) => {
    //Updating Note id in UNOTE
    setNote({ ...note, id: note._id });
  };
  return (
    <>
      {/* Modal for Update Note */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3" onSubmit={handleClick}>
                <div className="col-12">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={note.title}
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
                    value={note.description}
                    onChange={handleChange}
                    className="form-control"
                    id="description"
                    placeholder="description"
                    required
                    minLength={5}
                  />
                </div>
                <div>
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={note.type}
                    onChange={handleChange}
                    className="form-control"
                    id="type"
                    placeholder="type"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update Note
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying Notes */}
      <div className="row">
        <h3 className="mb-3 ">Your Notes</h3>
        {notes.map((note) => {
          return (
            // Passing props
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
