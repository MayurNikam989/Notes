import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notes-backend-ye3g.onrender.com";
  const initialValue = [
    {
      _id: "68da3877a7d298cabcd530af",
      user: "68da3632ec1160500d72924c",
      title: "Note1",
      description: "Hi I am Note 1",
      type: "general",
      date: "1759131767266",
      __v: 0,
    },
  ];

  //client side notes
  const [notes, setNotes] = useState(initialValue);

  //Fn to fetch all Notes
  const fetchNote = async () => {
    //Calling API
    const response = await fetch(`${host}/api/notes/fetchnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    //Updating Notes at client
    setNotes(json);
  };

  //Fn to add Notes
  const addNote = async (title, description, type) => {
    //Calling API
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        type,
      }),
    });
    const json = await response.json();
    // console.log(json);
    //adding notes to client side notes
    setNotes(notes.concat(json));
  };

  //Fn to Delete Note
  const deleteNote = async (id) => {
    //API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    // console.log("Deleyre" + id);
    //Deleting at client side
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Updating Note
  const editNote = async (id, title, description, type) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        type,
      }),
    });
    const json = await response.json();
    // console.log(json);

    //to edit notes at client side without reload
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].type = type;
        setNotes(newNotes);
        break;
      }
    }
  };

  //Passing NoteCOntext
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
